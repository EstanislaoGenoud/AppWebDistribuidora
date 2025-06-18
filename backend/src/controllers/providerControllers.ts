import {Request, Response} from 'express';
import {  // Imports para manejar proveedores
saveProviderToDB, 
  getAllProviderFromDB, 
  getProviderByIdFromDB,
  deleteProviderFromDB,
  updateProviderInDB
} from '../services/prodiverServices';
// Controladores para manejar las operaciones de proveedores
// Obtener todos los proveedores
export const getAllProviders = (req: Request, res: Response) => {
  getAllProviderFromDB()
    .then(providers => {
      res.status(200).json({
        message: 'Proveedores obtenidos correctamente',
        data: providers
      });
    })
    .catch(error => {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ error: 'Error al obtener proveedores' });
    });
};
// Obtener un proveedor por ID
export const getProvider= async (req:Request, res:Response)=>{
  const id= parseInt(req.params.id);
  try{
    const provider= await getProviderByIdFromDB(id);
    res.status(200).json({
      message: 'Proveedor obtenido correctamente',
      data: provider
      });
  }catch(error){
    console.error('Error al obtener proveedor:', error);
    res.status(500).json({ error: 'Error al obtener proveedor' });
  }
}

export const createProvider = async (req: Request, res: Response): Promise<void> => {
  try {
    const {nombre, localidad, cuit, calle, nroCalle } = req.body;

    // Validación básica de datos requeridos
    if (
      nombre === undefined || localidad === undefined ||
      cuit === undefined || calle === undefined || nroCalle === undefined
    ) {
      res.status(400).json({ message: 'Faltan datos para crear el proveedor' });
      return;
    }

    // Validación de tipos de datos
    if (
      typeof nombre !== 'string' ||
      typeof localidad !== 'string' ||
      typeof cuit !== 'string' ||
      typeof calle !== 'string' ||
      typeof nroCalle !== 'number'
    ) {
      res.status(400).json({ message: 'Datos inválidos para crear el proveedor' });
      return;
    }

    // Verificación de existencia

    // Guardado en base de datos
    await saveProviderToDB(nombre, localidad, cuit, calle, nroCalle);

    res.status(201).json({
      message: 'Proveedor creado correctamente',
      data: {nombre, localidad, cuit, calle, nroCalle }
    });

  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ message: 'Error al crear proveedor' });
  }
};

export const updateProvider=(req:Request, res:Response)=>{
  const id = parseInt(req.params.id);
  if( isNaN(id)){
    res.status(400).json({message: 'ID inválido'});
    return;
  }
  const { legajoProv, nombre, localidad, cuit, calle, nroCalle}= req.body;
  if(!legajoProv || !nombre || !localidad || !cuit || !calle || !nroCalle){
    res.status(400).json({message: 'Faltan datos para actualizar el proveedor'});
    return;
  }
  updateProviderInDB(legajoProv, nombre, localidad, cuit, calle, nroCalle)
    .then(()=>{
      res.json({message: 'Proveedor actualizado correctamente'});
    })
    .catch((error)=>{
      console.error('Error al actualizar el proveedor:', error);
      res.status(500).json({message: 'Error al actualizar el proveedor', error});
    });
}
export const deleteProvider=(req:Request, res:Response)=>{
  const id=parseInt(req.params.id);
  if(isNaN(id)){
    res.status(400).json({ message: 'ID inválido' });
    return;
  }
  deleteProviderFromDB(id)
    .then(()=>{
      res.status(200).json({message: 'Proveedor eliminado correctamente'});
    });
}