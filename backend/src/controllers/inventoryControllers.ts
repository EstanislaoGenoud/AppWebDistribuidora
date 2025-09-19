import {Request, Response} from 'express';
import { getInventoryFromDB, procesarMovimiento } from '../services/inventoryServices';
import { RequestHandler } from "express";
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



export const createInventory: RequestHandler = async (req, res) => {
  try {
    const { idProduct, tipo, cantidad, motivo } = req.body;

    if (!idProduct || !tipo || !cantidad) {
      res.status(400).json({ error: "Faltan parámetros obligatorios" });
      return; // 👈 esto evita el error de tipos
    }

    const result = await procesarMovimiento({
      idProduct,
      tipo,
      cantidad,
      motivo,
    });

    res.json({
      message: "Movimiento procesado correctamente",
      data: result,
    });
  } catch (error: any) {
    console.error("Error en movimiento de inventario:", error);
    res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
};
export const updateInventory=(req:Request, res:Response)=>{
  res.json({message: 'Actualizar un inventario'});
}
export const deleteInventory=(req:Request, res:Response)=>{
  res.json({message: 'Eliminar un inventario'});
}