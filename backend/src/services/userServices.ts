import db from '../config/db';
import { RowDataPacket } from 'mysql2';
interface Usuario extends RowDataPacket {
  id: number;
  NombreUsuario: string;
  password_hash: string;
  email: string;
  rol: string;
}

export async function saveUserToDB(nombreUsuario: string, password_hash: string, email: string, rol: string) {
  try {
    const [result] = await db.query(
      'INSERT INTO Usuarios (NombreUsuario, password_hash, email, rol) VALUES (?, ?, ?, ?)',
      [nombreUsuario, password_hash, email, rol]
    );
    return result;
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
}
export async function getUserByUsernameFromDB(NombreUsuario: string) {
  try {
    const [rows] = await db.query<Usuario[]>(
      'SELECT * FROM Usuarios WHERE NombreUsuario = ?',
      [NombreUsuario]
    );
    return rows[0]; // Devuelve el primer usuario encontrado (o undefined si no existe)
  } catch (error) {
    console.error('Error fetching user by username from database:', error);
    throw error;
  }
}
export async function getAllUsersFromDB() {
  try {
    const [rows] = await db.query('SELECT * FROM Usuarios');
    return rows;
  } catch (error) {
    console.error('Error fetching users from database:', error);
    throw error;
  }
}
export async function getUserByIdFromDB(id: number) {
  try {
    const [rows] = await db.query<Usuario[]>('SELECT * FROM Usuarios WHERE idUsuario = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user by ID from database:', error);
    throw error;
  }
}

export async function updateUserInDB(id: number, nombreUsuario: string, password_hash: string, email: string, rol: string) {
  try {
    const [result] = await db.query(
      'UPDATE Usuarios SET NombreUsuario = ?, password_hash = ?, email = ?, rol = ? WHERE id = ?',
      [nombreUsuario, password_hash, email, rol, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating user in database:', error);
    throw error;
  }
}
export async function deleteUserFromDB(id: number) {
  try {
    const [result] = await db.query('DELETE FROM Usuarios WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting user from database:', error);
    throw error;
  }
}