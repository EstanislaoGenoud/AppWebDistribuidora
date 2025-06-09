import {Request, Response} from 'express';

export const getAllClients=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todos los clientes'});
}

export const getClient=(req:Request, res:Response)=>{
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