import db from "../config/db";

interface Detalle {
  idProduct: string;
  cantidad: number;
  precioUnitario: number;
}

export async function createVenta(
  idCliente: string,
  tipo: string,
  numeroComprobante: string,
  fecha: Date,
  detalles: Detalle[]
) {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    // Paso 1: Insertar en Venta
    const [ventaResult]: any = await connection.query(
      `INSERT INTO Venta (idCliente, tipo, numeroComprobante, fecha, montoTotal, created_at, updated_at) 
      VALUES (?, ?, ?, ?, 0, NOW(), NOW())`,
      [idCliente, tipo, numeroComprobante, fecha]
    );

    const idVenta = ventaResult.insertId;
    let total = 0;

    // Paso 2: Insertar en DetalleVenta + movimiento en Inventario
    for (const det of detalles) {
      const subTotal = det.cantidad * det.precioUnitario;
      total += subTotal;

      // Guardar detalle
      await connection.query(
        `INSERT INTO DetalleVenta (idVenta, idProduct, cantidad, precioUnitario, subTotal, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [idVenta, det.cantidad, det.idProduct, det.precioUnitario, subTotal]
      );

      // Movimiento de inventario (EGRESO)
      await connection.query(
        `UPDATE Inventario
        SET cantidad=cantidad-?
        WHERE idProduct = ?`,
        [det.idProduct, det.cantidad]
      );
    }

    // Paso 3: Actualizar monto total en Venta
    await connection.query(
      `UPDATE Venta SET montoTotal = ?, updated_at = NOW() WHERE idVenta = ?`,
      [total, idVenta]
    );

    await connection.commit();
    connection.release();

    return { idVenta, total };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}
