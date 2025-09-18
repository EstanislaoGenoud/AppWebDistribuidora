import {Request, Response} from 'express';
import { getInventoryFromDB } from '../services/inventoryServices';
export const getAllInventory=async (req:Request, res:Response)=>{
  try{
    const inventory = await getInventoryFromDB();
    res.json(inventory);
  }catch(error){
    res.status(500).json({message: 'Error al obtener el inventario', error});
  }
};
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