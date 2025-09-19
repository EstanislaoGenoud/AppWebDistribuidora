import db from '../config/db';
import { RowDataPacket } from 'mysql2';
interface Inventario extends RowDataPacket{
  idProduct:string;
  stockActual:number;
}
type TipoOperacion='ajuste'|'venta'|'compra'|'devolucion';
interface MovimientoInventario{
  idProduct:string;
  tipo:TipoOperacion
  cantidad:number;
  motivo?:string;
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
export async function procesarMovimiento({
  idProduct,
  tipo,
  cantidad,
  motivo = '',
}: MovimientoInventario) {
  try {
    const [rows] = await db.query<Inventario[]>(
      'SELECT stockActual FROM Inventario WHERE idProduct=?',
      [idProduct]
    );
    if (rows.length === 0) throw new Error('Producto no encontrado');
    let stockActual = rows[0].stockActual;

    let nuevoStock = stockActual;
    let tipoHistorial: 'Entrada' | 'Salida' = 'Entrada';
    let motivoFinal = motivo;

    switch (tipo) {
      case 'ajuste':
        nuevoStock = cantidad; 
        if (nuevoStock > stockActual) {
          tipoHistorial = 'Entrada';
        } else {
          tipoHistorial = 'Salida';
        }
        motivoFinal = motivo || 'Ajuste manual';
        break;

      case 'venta':
        nuevoStock = stockActual - cantidad;
        tipoHistorial = 'Salida';
        motivoFinal = motivo || 'Venta';
        break;

      case 'compra':
        nuevoStock = stockActual + cantidad;
        tipoHistorial = 'Entrada';
        motivoFinal = motivo || 'Compra';
        break;

      case 'devolucion':
        nuevoStock = stockActual + cantidad;
        tipoHistorial = 'Entrada';
        motivoFinal = motivo || 'Devolución de cliente';
        break;

      default:
        throw new Error(`Tipo de operación no soportada: ${tipo}`);
    }

    if (nuevoStock < 0) throw new Error('El stock no puede ser negativo');

    await db.query('UPDATE Inventario SET stockActual=? WHERE idProduct=?', [
      nuevoStock,
      idProduct,
    ]);
    const diferencia =
      tipo === 'ajuste' ? Math.abs(nuevoStock - stockActual) : cantidad;

    if (diferencia > 0) {
      await historialRegister(idProduct, tipoHistorial, motivoFinal, diferencia);
    }

    return { success: true, idProduct, stockAnterior: stockActual, stockNuevo: nuevoStock };
  } catch (error) {
    console.error('Error procesando movimiento de inventario:', error);
    throw error;
  }
}