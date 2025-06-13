import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import { saveUserToDB} from '../services/userServices';
import { // Imports para manejar usuarios
  getAllUsersFromDB,
  getUserByIdFromDB, 
  deleteUserFromDB, 
  updateUserInDB, 
  getUserByUsernameFromDB 
} from '../services/userServices';
// Controladores para manejar las operaciones de usuarios
// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersFromDB();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};
// Obtener un usuario por ID
export const getUser=(req:Request, res:Response)=>{
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  getUserByIdFromDB(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json(user);
      }
    })
    .catch((error) => {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    });
}
// Crear usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Solicitud recibida para crear usuario:', req.body);
    const { NombreUsuario, password_hash, email, rol } = req.body;

    if (!password_hash || !NombreUsuario || !email || !rol) {
      res.status(400).json({ message: 'Faltan datos' });
      return;
    }

    // Validación de contraseña
    if (
      password_hash.length < 8 ||
      password_hash.length > 20 ||
      !/^[a-zA-Z0-9]+$/.test(password_hash)
    ) {
      res.status(400).json({
        message:
          'La contraseña debe tener entre 8 y 20 caracteres y no contener caracteres especiales'
      });
      return;
    }

    // Validación de nombre de usuario
    if (!/^[a-zA-Z0-9]+$/.test(NombreUsuario)) {
      res.status(400).json({
        message: 'El nombre de usuario solo puede contener letras y números'
      });
      return;
    }

    // Validación de email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      res.status(400).json({ message: 'El email no es válido' });
      return;
    }

    // Validación de rol
    if (rol !== 'admin' && rol !== 'user' && rol !== 'developer') {
      res.status(400).json({
        message: 'Rol inválido. Debe ser "admin", "user" o "developer"'
      });
      return;
    }

    // Verificar si el usuario ya existe
    const existingUser = await getUserByUsernameFromDB(NombreUsuario);
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    await saveUserToDB(NombreUsuario, hashedPassword, email, rol);

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};
// Actualizar un usuario
export const updateUser=(req:Request, res:Response)=>{
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  const { NombreUsuario, password_hash, email, rol } = req.body;
  if (!NombreUsuario || !password_hash || !email || !rol) {
    res.status(400).json({ message: 'Faltan datos' });
    return;
  }
  updateUserInDB(id, NombreUsuario, password_hash, email, rol)
    .then(() => {
      res.json({ message: 'Usuario actualizado correctamente' });
    })
    .catch((error) => {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    });

  res.json({message: 'Actualizar un usuario'});
}
// Eliminar un usuario
export const deleteUser=(req:Request, res:Response)=>{
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  deleteUserFromDB(id)
    .then(() => {
      res.json({ message: 'Usuario eliminado correctamente' });
    })
    .catch((error) => {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    });
}