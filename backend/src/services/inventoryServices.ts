import db from '../config/db';
import { RowDataPacket } from 'mysql2';
interface Inventario extends RowDataPacket{
  idProduct:string;
  stockActual:number;
}
interface historial extends RowDataPacket{
  idHistorial:number;
  idProduct:string;
  tipo:string;
  fecha:Date;
  motivo:string;
  cantidad:number;
}
export async function getInventoryFromDB(){
  try{
    const [rows]=await db.query<Inventario[]>('SELECT idProduct, stockActual FROM Inventario');
    return rows;
  }catch(error){
    console.error('Error fetching inventory from database:', error);
    throw error;
  }
}
export async function getInventoryByIdFromDB(idProduct:string){
  try{
    const [rows]=await db.query<Inventario[]>('SELECT * FROM Inventario WHERE idProduct=?',[idProduct]);
    return rows[0];
  }catch(error){
    console.error('Error fetching inventory by ID from database:', error);
    throw error;
  }
}
export async function historialRegister(idProduct:string, tipo:'Entrada'|'Salida', motivo:string, cantidad:number){
  try{
    await db.query('INSERT INTO HistorialInventario (idProduct, tipo, fecha, motivo, cantidad) VALUES (?, ?, NOW(), ?, ?)',
      [idProduct, tipo, motivo, cantidad]);
  }catch(error){
    console.error('Error inserting into inventory history:', error);
    throw error;
  }
}
export async function updateInventoryInDB(idProduct:string, nuevoStock:number){
  try{
    const [rows]=await db.query<Inventario[]>('SELECT StockActual FROM Inventario WHERE idProduct=?',[idProduct]);
    if(rows.length===0){
      throw new Error('Producto no encontrado en el inventario');
    }
    const stockAnterior=rows[0].stockActual;
    await db.query('UPDATE Inventario SET StockActual=? WHERE idProduct=?',[nuevoStock, idProduct]);
    const diferencia=nuevoStock-stockAnterior;
    if(diferencia!==0){
      const tipo=diferencia>0?'Entrada':'Salida';
      await historialRegister(idProduct, tipo, 'Ajuste manual', Math.abs(diferencia));
    }
    return{succes:true};
  }catch(error){
    console.error('Error updating inventory in database:', error);
    throw error;
  }
}
export async function descontarPorVenta(idProduct:string, cantidadVendida:number){
  try{
    await db.query('UPDATE Inventario SET StockActual=StockActual-? WHERE idProduct=?',[cantidadVendida, idProduct]);
    await historialRegister(idProduct, 'Salida', 'Venta', cantidadVendida);
    return{succes:true};
  }catch(error){
    console.error('Error deducting inventory for sale:', error);
    throw error;
  }
}
export async function aumentarPorCompra(idProduct:string, cantidadComprada:number){
  try{
    await db.query('UPDATE Inventario SET StockActual=StockActual+? WHERE idProduct=?',[cantidadComprada, idProduct]);
    await historialRegister(idProduct, 'Entrada', 'Compra', cantidadComprada);
    return{succes:true};
  }catch(error){
    console.error('Error increasing inventory for purchase:', error);
    throw error;
  }
}