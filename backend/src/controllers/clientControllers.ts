import {Request, Response} from 'express';
import { 
  getAllClientsFromDB,
  getClientByIdFromDB,
  updateClientInDB,
  deleteClientFromDB,
  saveClientToDB
} from '../services/clientServices';
// Controladores para manejar las operaciones de clientes
// Obtener todos los clientes
export const getAllClients= async (req:Request, res:Response)=>{
  try{
    const clients=await getAllClientsFromDB();
    res.json(clients);
  }catch(error){
    res.json({message: 'Error al obtener todos los clientes'});
  }
}
// Obtener un cliente por ID 
export const getClient=(req:Request, res:Response)=>{
  const id=(req.params.id);
  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  getClientByIdFromDB(id)
    .then((client)=>{
      if (!client) {
        res.status(404).json({ message: 'Cliente no encontrado' });
      } else {
        res.json(client);
      }
    })
    .catch((error) => {
      console.error('Error al obtener el cliente:', error);
      res.status(500).json({ message: 'Error al obtener el cliente', error });
    });
}
// Crear cliente
export const createClient=async (req:Request, res:Response): Promise<void>=>{
  try{
    console.log('Solicitud recibida para crear cliente:', req.body);
    const { // Datos del cliente
      idCliente,
      nombre, 
      apellido, 
      telefono, 
      cuit, 
      localidad, 
      calle, 
      nroCalle,
      nomNegocio
    }=req.body;
    if (!idCliente || !nombre || !apellido || !telefono || !cuit || !localidad || !calle || !nroCalle || !nomNegocio) {
      res.status(400).json({ message: 'Faltan datos' });
      return;
    }
    await saveClientToDB(idCliente, nombre, telefono, cuit, localidad, calle, nroCalle, apellido, nomNegocio);
    res.status(201).json({ message: 'Cliente creado exitosamente' });
  }catch(error){
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
}
// Actualizar un cliente por ID
export const updateClient=(req:Request, res:Response)=>{
  const id=parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  const { 
    nombre, 
    telefono, 
    cuit, 
    localidad, 
    calle, 
    nroCalle, 
    apellido, 
    nomNegocio 
  } = req.body;
  if (!nombre || !telefono || !cuit || !localidad || !calle || !nroCalle || !apellido || !nomNegocio) {
    res.status(400).json({ message: 'Faltan datos' });
    return;
  }
  updateClientInDB(id, nombre, telefono, cuit, localidad, calle, nroCalle, apellido, nomNegocio)
    .then(() => {
      res.status(200).json({ message: 'Cliente actualizado exitosamente' });
    })
    .catch((error) => {
      console.error('Error al actualizar el cliente:', error);
      res.status(500).json({ message: 'Error al actualizar el cliente', error });
    });
  res.json({message: 'Actualizar un cliente'});
}
// Eliminar un cliente por ID
export const deleteClient=(req:Request, res:Response)=>{
  const id =(req.params.id);
  if(!id || typeof id !== 'string') {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  deleteClientFromDB(id)
    .then(()=>{
      res.json({ message: 'Cliente eliminado correctamente' });
    })
    .catch((error) => {
      console.error('Error al eliminar el cliente:', error);
      if (error.message.includes('no encontrado')) {
        res.status(404).json({ message: error.message });
        return;
      } else {
        res.status(500).json({ message: 'Error al eliminar el cliente', error });
      }
    });
}