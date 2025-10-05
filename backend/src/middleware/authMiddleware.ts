import { Request, Response, NextFunction, RequestHandler } from 'express';
import { apiKeyMiddleware } from './apiKeyMiddleware';
import { firebaseAuthMiddleware } from './firebaseAuthMiddleware';
export  const authMiddleware:RequestHandler= async (
  req,
  res,
  next 
) => {
  try{
    // Allow preflight requests to pass through without authentication
    if (req.method === 'OPTIONS') {
      return next();
    }
    if(process.env.NODE_ENV === 'development'){
      apiKeyMiddleware(req, res, next);
  }else{
      firebaseAuthMiddleware(req, res, next);
  }
  }catch(error){
    console.error('Error en el middleware de autenticación:', error);
    res.status(401).json({ message: 'NO AUTORIZADO' });
  }
}