import { Request, Response, NextFunction } from 'express';
import { apiKeyMiddleware } from './apiKeyMiddleware';
//import { firebaseAuthMiddleware } from './firebaseAuthMiddleware';
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if(process.env.NODE_ENV === 'development'){
    return apiKeyMiddleware(req, res, next);
  }else{
    //return firebaseAuthMiddleware(req, res, next);
  }
}