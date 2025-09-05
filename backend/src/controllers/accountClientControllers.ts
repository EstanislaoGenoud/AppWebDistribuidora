import { Request, Response } from "express";
import {
  getAllAccountClientsFromDB,
  getAccountClientByIdFromDB,
  updateAccountClientInDB,
  deleteAccountClientFromDB,
  saveAccountClientToDB,
} from "../services/accountClientServices";
// Controladores para manejar las operaciones de cuentas de clientes
// Obtener todas las cuentas
export const getAllAccountClient = async (req: Request, res: Response) => {
  try {
    const accountClients = await getAllAccountClientsFromDB();
    res.json(accountClients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las cuentas de los clientes", error });
  }
};
// Obtener una cuenta por ID
export const getAccountClient = (req: Request, res: Response) => {
  const idCuenta = Number(req.params.idCuenta);
  if (isNaN(idCuenta)) {
    res.status(400).json({ message: "ID de cuenta inválido" });
    return;
  }
  getAccountClientByIdFromDB(idCuenta)
    .then((accountClient) => {
      if (!accountClient) {
        res.status(404).json({ message: "Cuenta de cliente no encontrada" });
      } else {
        res.json(accountClient);
      }
    })
    .catch((error) => {
      console.error("Error al obtener la cuenta del cliente:", error);
      res
        .status(500)
        .json({ message: "Error al obtener la cuenta del cliente", error });
    });
};
// Crear cuenta
export const createAccountClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { idCliente, totalPagado, saldoActual, fechaPago } = req.body;
    // Validación
    if (
      !idCliente ||
      totalPagado === undefined ||
      saldoActual === undefined ||
      !fechaPago
    ) {
      res.status(400).json({ message: "Faltan datos obligatorios" });
      return;
    }
    // Convertir la fecha enviada a objeto Date
    const fechaPagoObj = new Date(fechaPago);
    if (isNaN(fechaPagoObj.getTime())) {
      res
        .status(400)
        .json({ message: "Fecha de pago inválida. Usa formato YYYY-MM-DD" });
      return;
    }
    // Guardar en la base de datos
    await saveAccountClientToDB(
      idCliente,
      totalPagado,
      saldoActual,
      fechaPagoObj
    );

    res
      .status(201)
      .json({ message: "Pago registrado exitosamente para el cliente" });
  } catch (error) {
    console.error("Error al crear la cuenta del cliente:", error);
    res
      .status(500)
      .json({ message: "Error al registrar el pago del cliente", error });
  }
};
// Actualizar cuenta
export const updateAccountClient = (req: Request, res: Response) => {
  const idCuenta = Number(req.params.idCuenta);
  if (isNaN(idCuenta)) {
    res.status(400).json({ message: "ID de cuenta inválido" });
    return;
  }
  const { totalPagado, saldoActual } = req.body;
  if (totalPagado === undefined || saldoActual === undefined) {
    res.status(400).json({ message: "Faltan datos para actualizar" });
    return;
  }
  updateAccountClientInDB(idCuenta, totalPagado, saldoActual, new Date())
    .then(() => {
      res.json({ message: "Cuenta del cliente actualizada exitosamente" });
    })
    .catch((error) => {
      console.error("Error al actualizar la cuenta del cliente:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar la cuenta del cliente", error });
    });
};
// Eliminar cuenta
export const deleteAccountClient = (req: Request, res: Response) => {
  const idCuenta = Number(req.params.idCuenta);
  if (isNaN(idCuenta)) {
    res.status(400).json({ message: "ID de cuenta inválido" });
    return;
  }
  deleteAccountClientFromDB(idCuenta)
    .then(() => {
      res.json({ message: "Cuenta del cliente eliminada exitosamente" });
    })
    .catch((error) => {
      console.error("Error al eliminar la cuenta del cliente:", error);
      res
        .status(500)
        .json({ message: "Error al eliminar la cuenta del cliente", error });
    });
};
