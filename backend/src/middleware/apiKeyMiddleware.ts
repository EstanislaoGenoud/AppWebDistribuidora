import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY || 'G3n0ud@D1st';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;
  console.log('API_KEY from .env:', process.env.API_KEY);

  if (!apiKey) {
    res.status(401).json({ message: 'API Key requerida' });
    return;
  }

  if (apiKey !== API_KEY) {
    res.status(403).json({ message: 'API Key inválida' });
    return;
  }

  next();
};