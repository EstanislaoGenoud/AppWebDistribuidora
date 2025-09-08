import { Request, Response } from "express";
import {
  getAllAccountProvidersFromDB,
  getAccountProviderByIdFromDB,
  updateAccountProviderInDB,
  deleteAccountProviderFromDB,
  saveAccountProviderToDB,
} from "../services/accountProviderServices";
import { get } from "http";
// Controladores para manejar las operaciones de cuentas de proveedores
// Obtener todas las cuentas
export const getAllAccountProvider = async (req: Request, res: Response) => {
  try{
    const accountProviders= await getAllAccountProvidersFromDB();
    res.json(accountProviders);
  }catch(error){
    res
      .status(500)
      .json({ message: "Error al obtener las cuentas de los proveedores", error });
  }
};
// Obtener una cuenta por ID
export const getAccountProvider = (req: Request, res: Response) => {
  const legajoProv = parseInt(req.params.legajoProv);
  if (isNaN(legajoProv)) {
    res.status(400).json({ message: "ID de cuenta inválido" });
    return;
  }
  getAccountProviderByIdFromDB(legajoProv)
    .then((accountProvider) => {
      if (!accountProvider) {
        res.status(404).json({ message: "Cuenta de proveedor no encontrada" });
      } else {
        res.json(accountProvider);
      }
    })
    .catch((error) => {
      console.error("Error al obtener la cuenta del proveedor:", error);
      res
        .status(500)
        .json({ message: "Error al obtener la cuenta del proveedor", error });
    });
};
// Crear cuenta
export const createAccountProvider =async (req: Request, res: Response):Promise <void> => {
  try{
    const {legajoProv, totalPagado, saldoActual, fechaPago}=req.body;
    // Validación
    if(!legajoProv || totalPagado===undefined || saldoActual===undefined || !fechaPago){
      res.status(400).json({message:"Faltan datos obligatorios"});
      return;
    }
    // Convertir la fecha enviada a objeto Date
    const fechaPagoDate=new Date(fechaPago);
    if(isNaN(fechaPagoDate.getTime())){
      res.status(400).json({message:"Fecha de pago inválida"});
      return;
    }
    await saveAccountProviderToDB(legajoProv, totalPagado, saldoActual, fechaPagoDate);
    res.status(201).json({message:"Cuenta del proveedor creada exitosamente"});
  }catch(error){
    res.status(500).json({message:"Error al crear la cuenta del proveedor", error});
  }
};
// Actualizar cuenta
export const updateAccountProvider = (req: Request, res: Response) => {
  const legajoProv = parseInt(req.params.LegajoProv);
  if (isNaN(legajoProv)) {
    res.status(400).json({ message: "ID de cuenta inválido" });
    return;
  }
  const { totalPagado, saldoActual } = req.body;
  if (totalPagado === undefined || saldoActual === undefined) {
    res.status(400).json({ message: "Faltan datos para actualizar" });
    return;
  }
  updateAccountProviderInDB(legajoProv, totalPagado, saldoActual, new Date())
    .then(() => {
      res.json({ message: "Cuenta del proveedor actualizada exitosamente" });
    })
    .catch((error) => {
      console.error("Error al actualizar la cuenta del proveedor:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar la cuenta del proveedor", error });
    });
};
// Eliminar cuenta
export const deleteAccountProvider = (req: Request, res: Response) => {
  const legajoProv = parseInt(req.params.legajoProv);
  if (isNaN(legajoProv)) {
    res.status(400).json({ message: "ID de cuenta inválido" });
    return;
  }
  deleteAccountProviderFromDB(legajoProv)
    .then(() => {
      res.json({ message: "Cuenta del proveedor eliminada exitosamente" });
    })
    .catch((error) => {
      console.error("Error al eliminar la cuenta del proveedor:", error);
      res
        .status(500)
        .json({ message: "Error al eliminar la cuenta del proveedor", error });
    });
};
