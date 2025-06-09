import {Request, Response} from 'express';

export const getAllAccountClient=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todass las cuentas de los clientes'});
}
export const getAccountClient=(req:Request, res:Response)=>{
  res.json({message: 'Obtener una cuenta de un cliente'});
}
export const createAccountClient=(req:Request, res:Response)=>{
  res.json({message: 'Crear una cuenta de un cliente'});
}
export const updateAccountClient=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar una cuenta de un cliente'});
}
export const deleteAccountClient=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar una cuenta de un cliente'});
}