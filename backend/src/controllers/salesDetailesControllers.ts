import {Request, Response} from 'express';
export const getAllSalesDetailes=(req:Request, res:Response)=>{
  res.json({message: 'Obtener todas los detalles de las ventas'});
}
export const getSalesDetailes=(req:Request, res:Response)=>{
  res.json({message: 'Obtener un detalle de una venta'});
}
export const createSalesDetailes=(req:Request, res:Response)=>{
  res.json({message: 'Crear un detalle de una venta'});
}
export const updateSalesDetailes=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar un detalle de una venta'});
}
export const deleteSalesDetailes=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar un detalle de una venta'});
}