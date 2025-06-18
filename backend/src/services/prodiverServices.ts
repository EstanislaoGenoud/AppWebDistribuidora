import db from '../config/db';
import { RowDataPacket } from 'mysql2';
// Definición de la interfaz Proveedor
interface Proveedor extends RowDataPacket {
  nombre: string;
  localidad: string;
  cuit: string;
  calle: string;
  nroCalle: number;
}
// Obtener todos los proveedores de la base de datos
export async function getAllProviderFromDB() {
  try {
    const [rows]= await db.query('SELECT * FROM Proveedor');
    return rows as RowDataPacket[];
  }catch (error) {
    console.error('Error fetching all providers from database:', error);
    throw error;
  }
}
// Obtener un proveedor por ID
export async function getProviderByIdFromDB(id: number) {
  try {
    const [rows] = await db.query('SELECT * FROM Proveedor WHERE legajoProv = ?', [id]);

    const providers = rows as RowDataPacket[];

    if (providers.length === 0) {
      throw new Error(`Proveedor con legajo ${id} no encontrado`);
    }

    return providers[0]; // retornamos el proveedor encontrado
  } catch (error) {
    console.error('Error fetching provider by ID from database:', error);
    throw error;
  }
}
// Guardar un proveedor en la base de datos
export async function saveProviderToDB(
  
  nombre: string,
  localidad: string,
  cuit: string,
  calle: string,
  nroCalle: number
){
  try{
    const [results]=await db.query(
      'INSERT INTO Proveedor (nombre, localidad, cuit, calle, nroCalle) VALUES (?, ?, ?, ?, ?)',
      [nombre, localidad, cuit, calle, nroCalle]
    );
    console.log('Proveedor insertado:', results);
    return results;
  }catch(error) {
    console.error('Error saving provider to database:', error);
    throw error;
  }
}
// Actualizar un proveedor en la base de datos
export async function updateProviderInDB(
  legajoProv: number,
  nombre: string,
  localidad: string,
  cuit: string,
  calle: string,
  nroCalle: number
){
  try{
    const [results]=await db.query(
      'UPDATE Proveedor SET nombre = ?, localidad = ?, cuit = ?, calle = ?, nroCalle = ? WHERE legajoProv = ?',
    [nombre, localidad, cuit, calle, nroCalle, legajoProv]
    );
    console.log('Proveedor actualizado:', results);
    return results;
  }catch(error){
    console.error('Error updating provider in database:', error);
    throw error;
  }
}
// Eliminar un proveedor de la base de datos
export async function deleteProviderFromDB(legajoProv:number){
  try{
    const [results] = await db.query(
      'DELETE FROM Proveedor WHERE legajoProv = ?',
      [legajoProv]
    );
    if((results as any).affectedRows === 0) {
      throw new Error(`Proveedor con legajo ${legajoProv} no encontrado`);
    }
  }catch(error){
    console.error('Error deleting provider from database:', error);
    throw error;
  }
}
