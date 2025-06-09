import {Request, Response} from 'express';
export const getAllInventory=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todos los inventarios'});
}
export const getInventory=(req:Request, res:Response)=>{
  res.json({message: 'Obtener un inventario'});
}
export const createInventory=(req:Request, res:Response)=>{
  res.json({message: 'Crear un inventario'});
}
export const updateInventory=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar un inventario'});
}
export const deleteInventory=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar un inventario'});
}