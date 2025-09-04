import { Request, Response } from "express";
import {
  saveEmployedToDB,
  getAllEmployedFromDB,
  getEmployedByIdFromDB,
  deleteEmployedFromDB,
  updateEmployedInDB,
} from "../services/employedServices";

// Obtener todos los empleados
export const getAllEmployed = async (req: Request, res: Response) => {
  try {
    const empleados = await getAllEmployedFromDB();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados", error });
  }
};
// Obtener un empleado por ID
export const getEmployed = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  getEmployedByIdFromDB(id)
    .then((empleado) => {
      if (!empleado) {
        res.status(404).json({ message: "Empleado no encontrado" });
      } else {
        res.json(empleado);
      }
    })
    .catch((error) => {
      console.error("Error al obtener el empleado:", error);
      res.status(500).json({ message: "Error al obtener el empleado", error });
    });
};
// Crear un nuevo empleado
export const createEmployed = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Solicitud recibida para crear empleado:", req.body);
    const {
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      genero,
      email,
      localidad,
      calle,
      nroCalle,
      idCargo,
    } = req.body;

    const dniNum = Number(dni);
    const nroCalleNum = Number(nroCalle);
    const idCargoNum = Number(idCargo);

    if (
      !nombre ||
      !apellido ||
      isNaN(dniNum) ||
      !fechaNacimiento ||
      !genero ||
      !email ||
      !localidad ||
      !calle ||
      isNaN(nroCalleNum) ||
      isNaN(idCargoNum)
    ) {
      res.status(400).json({
        message: "Faltan datos",
        detalle: {
          nombre,
          apellido,
          dni,
          fechaNacimiento,
          genero,
          email,
          localidad,
          calle,
          nroCalle,
          idCargo,
        },
      });
      return;
    }
    const fechaNacimientoDate = new Date(fechaNacimiento);
    if (isNaN(fechaNacimientoDate.getTime())) {
      res
        .status(400)
        .json({ message: "Formato de fecha inválido. Debe ser YYYY-MM-DD" });
      return;
    }
    await saveEmployedToDB(
      nombre,
      apellido,
      dniNum,
      fechaNacimientoDate,
      genero,
      email,
      localidad,
      calle,
      nroCalleNum,
      idCargoNum
    );
    res.status(201).json({ message: "Empleado creado correctamente" });
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    res.status(500).json({ message: "Error al crear el empleado", error });
  }
};
// Actualizar un empleado
export const updateEmployed = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  const {
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    genero,
    email,
    localidad,
    calle,
    nroCalle,
    idCargo,
  } = req.body;

  const dniNum = Number(dni);
  const nroCalleNum = Number(nroCalle);
  const idCargoNum = Number(idCargo);
  const fechaNacimientoDate = new Date(fechaNacimiento);

  if (
    !nombre ||
    !apellido ||
    isNaN(dniNum) ||
    !fechaNacimiento ||
    !genero ||
    !email ||
    !localidad ||
    !calle ||
    isNaN(nroCalleNum) ||
    isNaN(idCargoNum) ||
    isNaN(fechaNacimientoDate.getTime())
  ) {
    res.status(400).json({
      message: "Datos inválidos o incompletos",
      detalle: {
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        genero,
        email,
        localidad,
        calle,
        nroCalle,
        idCargo,
      },
    });
    return;
  }

  updateEmployedInDB(
    id,
    nombre,
    apellido,
    dniNum,
    fechaNacimientoDate,
    genero,
    email,
    localidad,
    calle,
    nroCalleNum,
    idCargoNum
  )
    .then((result) => {
      const affected = (result as any).affectedRows ?? (result as any).rowCount;
      if (affected === 0) {
        res.status(404).json({ message: "Empleado no encontrado" });
      } else {
        res.json({ message: "Empleado actualizado correctamente" });
      }
    })
    .catch((error) => {
      console.error("Error al actualizar el empleado:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar el empleado", error });
    });
};

export const deleteEmployed = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  deleteEmployedFromDB(id)
    .then((result) => {
      const affected = (result as any).affectedRows ?? (result as any).rowCount;
      if (affected === 0) {
        res.status(404).json({ message: "Empleado no encontrado" });
      } else {
        res.json({ message: "Empleado eliminado correctamente" });
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el empleado:", error);
      res.status(500).json({ message: "Error al eliminar el empleado", error });
    });
};
