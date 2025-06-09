import {Request, Response} from 'express';
export const getAccountProvider=(req:Request, res:Response)=>{
  res.json({message: 'Obtener una cuenta de un proveedor'});
}
export const getAllAccountProvider=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todas las cuentas de los proveedores'});
}
export const createAccountProvider=(req:Request, res:Response)=>{
  res.json({message: 'Crear una cuenta de un proveedor'});
}
export const updateAccountProvider=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar una cuenta de un proveedor'});
}
export const deleteAccountProvider=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar una cuenta de un proveedor'});
}