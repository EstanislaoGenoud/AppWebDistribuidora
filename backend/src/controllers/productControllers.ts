import { Request, Response } from "express";
import {
  getAllProductsFromDB,
  getProductByIdFromDB,
  saveProductToDB,
  updateProductInDB,
  deleteProductFromDB,
} from "../services/productServices";
// Controladores para manejar las operaciones de productos
// Obtener todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsFromDB();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};
// Obtener un producto por ID
export const getProduct = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }
  getProductByIdFromDB(id)
    .then((product) => {
      if (!product || (Array.isArray(product) && product.length === 0)) {
        res.status(404).json({ message: "Producto no encontrado" });
      } else {
        res.json(product);
      }
    })
    .catch((error) => {
      console.error("Error al obtener el producto:", error);
      res.status(500).json({ message: "Error al obtener el producto", error });
    });
};
// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      idProduct,
      legajo,
      nombre,
      marca,
      categoria,
      precioCompra,
      idUnidad,
      precioVenta,
    } = req.body;
    if (
      !idProduct ||
      !legajo ||
      !nombre ||
      !marca ||
      !categoria ||
      !precioCompra ||
      !idUnidad ||
      !precioVenta
    ) {
      res.status(400).json({ message: "Faltan datos" });
      return;
    }
    const existingProduct = await getProductByIdFromDB(idProduct);
    if (existingProduct.length > 0) {
      res.status(400).json({ message: "El ID del producto ya existe" });
      return;
    }
    await saveProductToDB(
      idProduct,
      legajo,
      nombre,
      marca,
      categoria,
      precioCompra,
      idUnidad,
      precioVenta
    );
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};
// Actualizar un producto existente
export const updateProduct =async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }
    const {
      idProduct,
      legajo,
      nombre,
      marca,
      categoria,
      precioCompra,
      idUnidad,
      precioVenta
    }= req.body;
    if (
      !idProduct ||
      !legajo ||
      !nombre ||
      !marca ||
      !categoria ||
      !precioCompra ||
      !idUnidad ||
      !precioVenta
    ) {
      res.status(400).json({ message: "Faltan datos" });
      return;
    }
    const existingProduct = await getProductByIdFromDB(id);
    if (existingProduct.length === 0) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }
    await updateProductInDB(
      id,
      nombre,
      marca,
      categoria,
      precioCompra,
      idUnidad,
      precioVenta
    );
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};
// Eliminar un producto
export const deleteProduct = (req: Request, res: Response) => {
  const id=req.params.id;
  if(!id){
    res.status(400).json({message: "ID inválido"});
    return;
  }
  deleteProductFromDB(id)
    .then((result)=>{
      const affected=(result as any).affectedRows ?? (result as any).rowCount;
      if(affected===0){
        res.status(404).json({message: "Producto no encontrado"});
      } else {
        res.json({message: "Producto eliminado correctamente"});
      }
    })
    .catch((error)=>{
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({message: "Error al eliminar el producto", error});
    });
};

