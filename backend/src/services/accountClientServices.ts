import db from '../config/db';
import { RowDataPacket } from 'mysql2';

interface CuentaCliente extends RowDataPacket {
  idCuenta: number;
  idCliente: string;
  totalPagado: number;
  saldoActual: number;
  created_at: Date;
  updated_at: Date;
}
// Guardar una nueva cuenta de cliente
export async function saveAccountClientToDB(
  idCliente: string,
  totalPagado: number,
  saldoActual: number,
  fechaPago: Date
) {
  try {
    // Primero verificamos que el cliente exista
    const [clientRows] = await db.query<RowDataPacket[]>('SELECT * FROM Cliente WHERE idCliente = ?', [idCliente]);
    if (clientRows.length === 0) {
      throw new Error('El cliente no existe');
    }

    const [result] = await db.query(
      'INSERT INTO CuentaCliente (idCliente, totalPagado, saldoActual, FechaDePago) VALUES (?, ?, ?,?)',
      [idCliente, totalPagado, saldoActual, fechaPago]
    );

    return result;
  } catch (error) {
    console.error('Error saving account client to database:', error);
    throw error;
  }
}
// Obtener todas las cuentas
export async function getAllAccountClientsFromDB() {
  try {
    const [rows] = await db.query<CuentaCliente[]>('SELECT * FROM CuentaCliente');
    return rows;
  } catch (error) {
    console.error('Error fetching account clients from database:', error);
    throw error;
  }
}
// Obtener una cuenta por ID
export async function getAccountClientByIdFromDB(idCliente: string) {
  try {
    const [rows] = await db.query<CuentaCliente[]>('SELECT * FROM CuentaCliente WHERE idCliente LIKE ?', [idCliente]);
    console.log("Filas encontradas: ", rows);
    return rows[0];
  } catch (error) {
    console.error('Error fetching account client by ID:', error);
    throw error;
  }
}
// Actualizar cuenta
export async function updateAccountClientInDB(
  idCliente: string,
  totalPagado: number,
  saldoActual: number,
  fechaPago: Date
) {
  try {
    const [result] = await db.query(
      'UPDATE CuentaCliente SET totalPagado = ?, saldoActual = ?, FechaDePago = ?,updated_at = NOW() WHERE idCuenta = ?',
      [totalPagado, saldoActual, idCliente, fechaPago]
    );
    return result;
  } catch (error) {
    console.error('Error updating account client:', error);
    throw error;
  }
}
// Eliminar cuenta
export async function deleteAccountClientFromDB(idCliente: string) {
  try {
    const [result] = await db.query('DELETE FROM CuentaCliente WHERE idCliente = ?', [idCliente]);
    return result;
  } catch (error) {
    console.error('Error deleting account client:', error);
    throw error;
  }
}