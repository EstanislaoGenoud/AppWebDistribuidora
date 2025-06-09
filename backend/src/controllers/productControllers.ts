import {Request, Response} from 'express';

export const getAllProducts = (req: Request, res: Response) => {
  res.json({message: 'Obtener todos los productos'});
  
}
export const createProduct = (req: Request, res: Response) => {
  res.json({message: 'Crear un producto'});
}
export const updateProduct = (req: Request, res: Response) => {
  res.json({message: 'Actualizar un producto'});
}
export const deleteProduct = (req: Request, res: Response) => {
  res.json({message: 'Eliminar un producto'});
}
export const getProduct = (req: Request, res: Response) => {
  res.json({message: 'Obtener un producto'});
}