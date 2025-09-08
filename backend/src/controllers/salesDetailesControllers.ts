import {Request, Response} from 'express';
import db from '../config/db';
import { createVenta } from '../services/salesDetailesServices';
export const getAllSalesDetailes=async (req:Request, res:Response)=>{
  try {
    const [ventas]: any = await db.query(`
      SELECT v.*, d.idDetalleVenta, d.idProduct, d.cantidad, d.precioUnitario, d.subTotal
      FROM Venta v
      LEFT JOIN DetalleVenta d ON v.idVenta = d.idVenta
      ORDER BY v.idVenta DESC
    `);

    // Agrupar resultados por venta
    const ventasAgrupadas: any = {};
    for (const row of ventas) {
      if (!ventasAgrupadas[row.idVenta]) {
        ventasAgrupadas[row.idVenta] = {
          idVenta: row.idVenta,
          idCliente: row.idCliente,
          tipo: row.tipo,
          numeroComprobante: row.numeroComprobante,
          fecha: row.fecha,
          montoTotal: row.montoTotal,
          created_at: row.created_at,
          updated_at: row.updated_at,
          detalles: []
        };
      }
      if (row.idDetalleVenta) {
        ventasAgrupadas[row.idVenta].detalles.push({
          idDetalleVenta: row.idDetalleVenta,
          idProduct: row.idProduct,
          cantidad: row.cantidad,
          precioUnitario: row.precioUnitario,
          subTotal: row.subTotal
        });
      }
    }

    res.json(Object.values(ventasAgrupadas));
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
};
export const getSalesDetailes=async (req:Request, res:Response)=>{
  try {
    const { idVenta } = req.params;

    const [venta]: any = await db.query(
      `SELECT v.*, d.idDetalleVenta, d.idProduct, d.cantidad, d.precioUnitario, d.subTotal
        FROM Venta v
        LEFT JOIN DetalleVenta d ON v.idVenta = d.idVenta
        WHERE v.idVenta = ?`,
      [idVenta]
    );

    if (venta.length === 0) {
      res.status(404).json({ message: "Venta no encontrada" });
      return;
    }

    // Formatear respuesta
    const ventaFormateada = {
      idVenta: venta[0].idVenta,
      idCliente: venta[0].idCliente,
      tipo: venta[0].tipo,
      numeroComprobante: venta[0].numeroComprobante,
      fecha: venta[0].fecha,
      montoTotal: venta[0].montoTotal,
      created_at: venta[0].created_at,
      updated_at: venta[0].updated_at,
      detalles: venta
        .filter((row: any) => row.idDetalleVenta)
        .map((row: any) => ({
          idDetalleVenta: row.idDetalleVenta,
          idProduct: row.idProduct,
          cantidad: row.cantidad,
          precioUnitario: row.precioUnitario,
          subTotal: row.subTotal
        }))
    };

    res.json(ventaFormateada);
  } catch (error) {
    console.error("Error al obtener venta por ID:", error);
    res.status(500).json({ message: "Error al obtener venta por ID", error });
  }
};
export const createSalesDetailes= async(req:Request, res:Response):Promise<void>=>{
  try{
    const {idCliente, tipo, numeroComprobante, fecha, detalles} = req.body;
    if(!idCliente || !tipo || !numeroComprobante || !fecha || !detalles || !Array.isArray(detalles) || detalles.length === 0){
      res.status(400).json({message: 'Datos incompletos o inválidos'});
    }
    const fechaDate=new Date(fecha);
    if(isNaN(fechaDate.getTime())){
      res.status(400).json({message: 'Fecha inválida'});
    }
    const result= await createVenta(idCliente, tipo, numeroComprobante, fechaDate, detalles);
    res.status(201).json({
      message: 'Venta creada exitosamente', 
      ventaId: result});
  }catch(error){
    console.error('Error al crear la venta:', error);
    res.status(500).json({message: 'Error al crear la venta', error});
  }
}
export const deleteSalesDetailes=(req:Request, res:Response) =>{
  
}