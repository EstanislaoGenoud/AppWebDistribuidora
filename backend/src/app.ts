import express from 'express';
import { apiKeyMiddleware } from './middleware/apiKeyMiddleware';
// Importing routes
import productRoutes from './routes/product';
import clientRoutes from './routes/clients'
import user from './routes/users';
import employedRoutes from './routes/employed';

const app=express();
app.use(express.json());
app.get('/',  (req, res) => {
	res.send('Welcome to the API: Use /api/users, /api/products, or /api/clients to access the respective endpoints.');
});

// Middleware to handle API key authentication
app.use(apiKeyMiddleware);


// Using routes
app.use('/api/users', user);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/employed', employedRoutes);
// Starting the server
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});