import db from '../config/db';
import { RowDataPacket } from 'mysql2';
interface Cliente extends RowDataPacket {
  idCliente: number;
  nombre: string;
  telefono: string;
  cuit: string;
  localidad: string;
  calle: string;
  nroCalle: number;
  apellido: string;
  nomNegocio: string;
}
export async function saveClientToDB(
  nombre: string,
  telefono: string,
  cuit: string,
  localidad: string,
  calle: string,
  nroCalle: number,
  apellido: string,
  nomNegocio: string
) {
  try {
    const [result] = await db.query(
      'INSERT INTO Clientes (nombre, telefono, cuit, localidad, calle, nroCalle, apellido, nomNegocio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, telefono, cuit, localidad, calle, nroCalle, apellido, nomNegocio]
    );
    return result;
  } catch (error) {
    console.error('Error saving client to database:', error);
    throw error;
  }
}
export async function getAllClientsFromDB() {
  try {
    const [rows] = await db.query<Cliente[]>('SELECT * FROM Clientes');
    return rows;
  } catch (error) {
    console.error('Error fetching clients from database:', error);
    throw error;
  }
}
export async function getClientByIdFromDB(id: number) {
  try {
    const [rows] = await db.query<Cliente[]>('SELECT * FROM Clientes WHERE idCliente = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching client by ID from database:', error);
    throw error;
  }
}
export async function updateClientInDB(
  id: number,
  nombre: string,
  telefono: string,
  cuit: string,
  localidad: string,
  calle: string,
  nroCalle: number,
  apellido: string,
  nomNegocio: string
) {
  try {
    const [result] = await db.query(
      'UPDATE Clientes SET nombre = ?, telefono = ?, cuit = ?, localidad = ?, calle = ?, nroCalle = ?, apellido = ?, nomNegocio = ? WHERE idCliente = ?',
      [nombre, telefono, cuit, localidad, calle, nroCalle, apellido, nomNegocio, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating client in database:', error);
    throw error;
  }
}
export async function deleteClientFromDB(id: number) {
  try {
    const [result] = await db.query('DELETE FROM Clientes WHERE idCliente = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting client from database:', error);
    throw error;
  }
}
