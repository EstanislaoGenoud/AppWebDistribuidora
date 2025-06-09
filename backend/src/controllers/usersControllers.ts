import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import { saveUserToDB} from '../services/userServices';


export const getAllUsers=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todos los usuarios'});
}
export const getUser=(req:Request, res:Response)=>{
  res.json({message: 'Obtener un usuario'});
}
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Solicitud recibida para crear usuario:', req.body);
    const { NombreUsuario, password_hash, email, rol } = req.body;

    if (!password_hash || !NombreUsuario || !email || !rol) {
      res.status(400).json({ message: 'Faltan datos' });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    await saveUserToDB(NombreUsuario, hashedPassword, email, rol);

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};
export const updateUser=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar un usuario'});
}
export const deleteUser=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar un usuario'});
}