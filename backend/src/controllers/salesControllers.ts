import {Request, Response} from 'express';

export const getAllSales=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todas las ventas'});
}
export const getSale=(req:Request, res:Response)=>{
  res.json({message: 'Obtener una venta'});
}
export const createSale=(req:Request, res:Response)=>{
  res.json({message: 'Crear una venta'});
}
export const updateSale=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar una venta'});
}
export const deleteSale=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar una venta'});
}