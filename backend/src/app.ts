import express from 'express';
import cors from 'cors';
//import { apiKeyMiddleware } from './middleware/apiKeyMiddleware';
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

const app=express();
// Ensure PORT is a number for TypeScript and Node listen overloads
const PORT = Number(process.env.PORT) || 8080;
// Enable CORS for all origins (adjust origin in production as needed)
app.use(cors());

app.use(express.json());
app.get('/',  (req, res) => {
	res.send('Welcome to the API: Use /api/users, /api/products, or /api/clients to access the respective endpoints.');
});

// Middleware to handle API key / Firebase authentication
// Important: place CORS and any public routes before authMiddleware so preflight requests are not blocked
app.use(authMiddleware);


// Using routes
app.use('/api/users', user);
app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/employed', employedRoutes);
app.use('/api/accountClient', accountClientRoutes);
app.use('/api/accountProvider', accountProviderRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);
// Starting the server

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});