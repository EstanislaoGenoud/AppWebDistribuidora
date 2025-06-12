import db from '../config/db';
import { RowDataPacket } from 'mysql2';
interface Empleado extends RowDataPacket {
  idEmpleado: number;
  nombre: string;
  apellido: string;
  dni: number;
  fechaNacimiento: Date;
  genero: string;
  email: string;
  localidad: string;
  calle: string;
  nroCalle: number;
  idCargo: number;
}
// Guardar un empleado en la base de datos
export async function saveEmployedToDB(
  nombre: string,
  apellido: string,
  dni: number,
  fechaNacimiento: Date,
  genero: string,
  email: string,
  localidad: string,
  calle: string,
  nroCalle: number,
  idCargo: number  // 👈 Agregamos este parámetro
) {
  try {
    const [cargoRows] = await db.query(
      'SELECT * FROM Cargo WHERE idCargo = ?',
      [idCargo]
    );
    if((cargoRows as any[]).length === 0) {
      throw new Error(`Cargo con id ${idCargo} no encontrado`);
    }
    const [result] = await db.query(
      'INSERT INTO Empleado (nombre, apellido, dni, fechaNacimiento, genero, email, localidad, calle, nroCalle, idCargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, dni, fechaNacimiento, genero, email, localidad, calle, nroCalle, idCargo]
    );
    console.log('Empleado insertado:', result);
    return result;
  } catch (error) {
    console.error('Error saving employed to database:', error);
    throw error;
  }
}
// Obtener todos los empleados
export async function getAllEmployedFromDB() {
  try {
    const [rows] = await db.query('SELECT * FROM Empleado');
    return rows;
  } catch (error) {
    console.error('Error fetching all employed from database:', error);
    throw error;
  }
}
// Obtener un empleado por ID
export async function getEmployedByIdFromDB(id: number) {
  try {
    const [rows] = await db.query<Empleado[]>('SELECT * FROM Empleado WHERE idEmpleado = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching employed by ID:', error);
    throw error;
  }
}
// Actualizar un empleado por ID
export async function updateEmployedInDB(
  id: number,
  nombre: string,
  apellido: string,
  dni: number,
  fechaNacimiento: Date,
  genero: string,
  email: string,
  localidad: string,
  calle: string,
  nroCalle: number,
  idCargo: number
) {
  try {
    const [result] = await db.query(
      'UPDATE Empleado SET nombre = ?, apellido = ?, dni = ?, fechaNacimiento = ?, genero = ?, email = ?, localidad = ?, calle = ?, nroCalle = ?, idCargo = ? WHERE idEmpleado = ?',
      [nombre, apellido, dni, fechaNacimiento, genero, email, localidad, calle, nroCalle, idCargo, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating employed in database:', error);
    throw error;
  }
}
// Eliminar un empleado por ID
export async function deleteEmployedFromDB(id: number) {
  try {
    const [result] = await db.query('DELETE FROM Empleado WHERE idEmpleado = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting employed from database:', error);
    throw error;
  }
}