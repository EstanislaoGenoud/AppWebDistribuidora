import express from 'express';
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
app.use(express.json());
app.get('/',  (req, res) => {
	res.send('Welcome to the API: Use /api/users, /api/products, or /api/clients to access the respective endpoints.');
});

// Middleware to handle API key authentication
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
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});