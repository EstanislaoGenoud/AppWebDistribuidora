// Middleware para autenticar usuarios con Firebase
import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
//import serviceAccount from '../../path/to/your/serviceAccountKey.json'; // Asegúrate de tener el archivo JSON con las credenciales

// Inicializa la app de Firebase Admin
//admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//});