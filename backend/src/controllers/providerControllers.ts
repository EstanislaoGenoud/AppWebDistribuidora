import {Request, Response} from 'express';

export const getProviders=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todos los proveedores'});
}

export const getProvider=(req:Request, res:Response)=>{
  res.json({message: 'Obtener un proveedor'});
}

export const createProvider=(req:Request, res:Response)=>{
  res.json({message: 'Crear un proveedor'});
}

export const updateProvider=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar un proveedor'});
}

export const deleteProvider=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar un proveedor'});
}