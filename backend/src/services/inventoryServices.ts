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
export async function updateInventoryInDB(idProduct:string, stockActual:number){
  try{
    const [result]=await db.query('UPDATE Inventario SET stockActual=? WHERE idProduct=?',[stockActual, idProduct]);
    const [historialResult]=await db.query('INSERT INTO Historial (idProduct, tipo, fecha, motivo, cantidad) VALUES (?, ?, NOW(), ?, ?)', [idProduct, stockActual>0?'Entrada':'Salida', 'Ajuste manual', Math.abs(stockActual)]);
    // FALTA INSERTAR EN EL HISTORIAL
    return result;
  }catch(error){
    console.error('Error updating inventory in database:', error);
    throw error;
  }
}
