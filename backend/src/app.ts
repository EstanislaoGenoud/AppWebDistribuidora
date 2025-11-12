import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import cors from 'cors';
import { authMiddleware } from './middleware/authMiddleware';
// Importing routes
import productRoutes from './routes/products';
import clientRoutes from './routes/clients';
import user from './routes/users';
import employedRoutes from './routes/employed';
import providerRoutes from './routes/providers';
import accountClientRoutes from './routes/accountClients';
import accountProviderRoutes from './routes/accountProviders';
import salesRoutes from './routes/sales';
import inventoryRoutes from './routes/inventories';

import { swaggerUi, swaggerSpec } from './config/swagger';
const app=express();
// Ensure PORT is a number for TypeScript and Node listen overloads
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
// Enable CORS for all origins (adjust origin in production as needed)
app.use(cors());

app.use(express.json());
app.get('/',  (req, res) => {
	res.send('Welcome to the API: Use /api/users, /api/products, or /api/clients to access the respective endpoints.');
});

// Middleware to handle API key / Firebase authentication
// Important: place CORS and any public routes before authMiddleware so preflight requests are not blocked


// Using routes
app.use('/api/users', authMiddleware, user);
app.use('/api/products', authMiddleware, productRoutes);
app.use('/api/providers', authMiddleware, providerRoutes);
app.use('/api/clients', authMiddleware, clientRoutes);
app.use('/api/employed', authMiddleware, employedRoutes);
app.use('/api/accountClient', authMiddleware, accountClientRoutes);
app.use('/api/accountProvider', authMiddleware, accountProviderRoutes);
app.use('/api/sales', authMiddleware, salesRoutes);
app.use('/api/inventory', authMiddleware, inventoryRoutes);
// Starting the server
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
  console.log(`🌐 URL base: http://localhost:${PORT}/`);
  console.log(`📘 Documentación Swagger: http://localhost:${PORT}/api-docs`);
});