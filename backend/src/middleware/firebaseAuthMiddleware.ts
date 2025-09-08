// Middleware para autenticar usuarios con Firebase
import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // La clave privada puede tener saltos de línea que deben ser reemplazados
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
export async function firebaseAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación válido' });
  }
  const token=authHeader.split('Bearer ')[1];
  try{
    const decodedToken= await admin.auth().verifyIdToken(token);
    (req as any).user=decodedToken;
    next();
  }catch(error){
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  }

}