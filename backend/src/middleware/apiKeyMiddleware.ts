import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.header("x-api-key");
  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    console.error("⚠️ No se encontró API_KEY en el archivo .env");
    res.status(500).json({ message: "Error interno: API Key no configurada" });
    return;
  }

  if (!apiKey) {
    res.status(401).json({ message: "Falta la API Key en el header" });
    return;
  }

  if (apiKey !== validApiKey) {
    res.status(401).json({ message: "API Key inválida" });
    return;
  }
  next(); // sigue con la ruta
}