import {Request, Response} from 'express';
import { 
  getAllClientsFromDB,
  getClientByIdFromDB,
  updateClientInDB,
  deleteClientFromDB,
  saveClientToDB
} from '../services/clientServices';
import { getUser } from './usersControllers';

export const getAllClients= async (req:Request, res:Response)=>{
  try{
    const clients=await getAllClientsFromDB();
    res.json(clients);
  }catch(error){
    res.json({message: 'Obtener todos los clientes'});
  }
}

export const getClient=(req:Request, res:Response)=>{
  const id=parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  res.json({message: 'Obtener un cliente'});
}

export const createClient=(req:Request, res:Response)=>{
  res.json({message: 'Crear un cliente'});
}

export const updateClient=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar un cliente'});
}

export const deleteClient=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar un cliente'});
}