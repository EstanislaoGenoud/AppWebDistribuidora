import db from '../config/db';

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