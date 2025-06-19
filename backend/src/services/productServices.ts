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
export async function saveProductToDB(idProduct:string, legajo:string, nombre:string, marca:string, categoria:string, precioCompra:number, idUnidad:number, precioVenta:number) {
  try {
    const [result] = await db.query(
      'INSERT INTO Producto (idProduct, legajo, nombre, marca, categoria, precioCompra, idUnidad, precioVenta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [idProduct, legajo, nombre, marca, categoria, precioCompra, idUnidad, precioVenta]
    );
    return result;
  } catch (error) {
    console.error('Error saving product to database:', error);
    throw error;
  }
}

export async function getAllProductsFromDB() {
  try {
    const [rows] = await db.query('SELECT * FROM Producto');
    return rows;
  } catch (error) {
    console.error('Error fetching all products from database:', error);
    throw error;
  }
}