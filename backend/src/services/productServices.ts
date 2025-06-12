import db from "../config/db";

export async function getAllProductsFromDB() {
  try {
    const [rows] = await db.query('SELECT * FROM Productos');
    return rows;
  } catch (error) {
    console.error('Error fetching all products from database:', error);
    throw error;
  }
}

// SEGUIR DESPUES DE CREAR LOS SERVICIOS Y CONTROLADORES DE PROVEEDORES