import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;

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