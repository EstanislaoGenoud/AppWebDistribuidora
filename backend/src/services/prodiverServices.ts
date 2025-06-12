import db from '../config/db.js';
import { RowDataPacket } from 'mysql2';
// Definición de la interfaz Proveedor
interface Proveedor extends RowDataPacket {
  legajoProv: number;
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
export async function getProviderByIdFromDB(id:number){
  try{
    const [rows]=await db.query('SELECT *FROM Proveedor WHERE legajoProv= ?', [id]);
    if((rows as RowDataPacket[]).length === 0) {
      throw new Error(`Proveedor con ID ${id} no encontrado`);
    }
  }catch(error) {
    console.error('Error fetching provider by ID from database:', error);
    throw error;
  }
}
// Guardar un proveedor en la base de datos
export async function saveProviderToDB(
  legajoProv: number,
  nombre: string,
  localidad: string,
  cuit: string,
  calle: string,
  nroCalle: number
){
  try{
    const [results]=await db.query(
      'INSERT INTO Proveedor (legajoProv, nombre, localidad, cuit, calle, nroCalle) VALUES (?, ?, ?, ?, ?, ?)',
      [legajoProv, nombre, localidad, cuit, calle, nroCalle]
    );
    console.log('Proveedor insertado:', results);
    return results;
  }catch(error) {
    console.error('Error saving provider to database:', error);
    throw error;
  }
}