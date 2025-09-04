import db from "../config/db";
import { RowDataPacket } from "mysql2";

interface Producto extends RowDataPacket {
  idProduct: string;
  legajo: string;
  nombre: string;
  marca: string;
  categoria: string;
  precioCompra: number;
  idUnidad: number;
  precioVenta: number;
}
export async function saveProductToDB(
  idProduct: string,
  legajo: string,
  nombre: string,
  marca: string,
  categoria: string,
  precioCompra: number,
  idUnidad: number,
  precioVenta: number
) {
  try {
    const [result] = await db.query(
      "INSERT INTO Producto (idProduct, legajo, nombre, marca, categoria, precioCompra, idUnidad, precioVenta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        idProduct,
        legajo,
        nombre,
        marca,
        categoria,
        precioCompra,
        idUnidad,
        precioVenta,
      ]
    );
    return result;
  } catch (error) {
    console.error("Error saving product to database:", error);
    throw error;
  }
}

export async function getAllProductsFromDB() {
  try {
    const [rows] = await db.query("SELECT * FROM Producto");
    return rows;
  } catch (error) {
    console.error("Error fetching all products from database:", error);
    throw error;
  }
}
export async function getProductByIdFromDB(id: string) {
  try {
    const [rows] = await db.query<Producto[]>(
      "SELECT * FROM Producto WHERE idProduct = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching product by ID from database:", error);
    throw error;
  }
}
export async function updateProductInDB(
  id: string,
  nombre: string,
  marca: string,
  categoria: string,
  precioCompra: number,
  idUnidad: number,
  precioVenta: number
) {
  try {
    const [result] = await db.query(
      "UPDATE Producto SET nombre = ?, marca = ?, categoria = ?, precioCompra = ?, idUnidad = ?, precioVenta = ? WHERE idProduct = ?",
      [nombre, marca, categoria, precioCompra, idUnidad, precioVenta, id]
    );
    return result;
  } catch (error) {
    console.error("Error updating product in database:", error);
    throw error;
  }
}
export async function deleteProductFromDB(id: string) {
  try {
    const [result] = await db.query("DELETE FROM Producto WHERE idProduct= ?", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error("Error deleting product from database:", error);
    throw error;
  }
}
