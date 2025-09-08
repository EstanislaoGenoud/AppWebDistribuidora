import db from '../config/db';
import { RowDataPacket } from 'mysql2';

interface CuentaProveedor extends RowDataPacket{
  idCuenta:number;
  legajoProv:number;
  totalPagado:number;
  saldoActual:number;
  created_at:Date;
  updated_at:Date;
}
export async function saveAccountProviderToDB(
  legajoProv:number,
  totalPagado:number,
  saldoActual:number,
  fechaPago:Date
){
  try {
    // Primero verificamos que el proveedor exista
    const [providerRows] = await db.query<RowDataPacket[]>('SELECT * FROM Proveedor WHERE legajoProv = ?', [legajoProv]);
    if (providerRows.length === 0) {
      throw new Error('El proveedor no existe');
    }
    const [result] = await db.query(
      'INSERT INTO CuentaProveedor (legajoProv, totalPagado, saldoActual, FechaDePago) VALUES (?, ?, ?,?)',
      [legajoProv, totalPagado, saldoActual, fechaPago]
    );
    return result;
  } catch (error) {
    console.error('Error saving account provider to database:', error);
    throw error;
  }
}
// Obtener todas las cuentas
export async function getAllAccountProvidersFromDB(){
  try{
    const[rows]=await db.query<CuentaProveedor[]>('SELECT * FROM CuentaProveedor');
    return rows;
  }catch(error){
    console.error('Error fetching account providers from database:', error);
    throw error;
  }
}
// Obtener una cuenta por ID
export async function getAccountProviderByIdFromDB(legajoProv:number){
  try{
    const[rows]=await db.query<CuentaProveedor[]>('SELECT * FROM CuentaProveedor WHERE legajoProv LIKE ?', [legajoProv]);
    console.log("Filas encontradas: ", rows);
    return rows[0];
  }catch(error){
    console.error('Error fetching account provider by ID:', error);
    throw error;
  }
}
// Actualizar cuenta
export async function updateAccountProviderInDB(
  legajoProv:number,
  totalPagado:number,
  saldoActual:number,
  fechaPago:Date
){
  try{
    const[result]=await db.query(
      'UPDATE CuentaProveedor SET totalPagado = ?, saldoActual = ?, FechaDePago = ? WHERE legajoProv = ?',
      [totalPagado, saldoActual, fechaPago, legajoProv]
    );
    return result;
  }catch(error){
    console.error('Error updating account provider:', error);
    throw error;
  } 
}
// Eliminar cuenta
export async function deleteAccountProviderFromDB(legajoProv:number){
  try{
    const[result]=await db.query(
      'DELETE FROM CuentaProveedor WHERE legajoProv = ?',
      [legajoProv]
    );
    return result;
  }catch(error){
    console.error('Error deleting account provider:', error);
    throw error;
  }
}