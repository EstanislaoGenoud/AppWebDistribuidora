import express from 'express';
import { apiKeyMiddleware } from './middleware/apiKeyMiddleware';
// Importing routes
import productRoutes from './routes/product';
import clientRoutes from './routes/clients'
import user from './routes/users';
import employedRoutes from './routes/employed';
import providerRoutes from './routes/providers';

const app=express();
app.use(express.json());
app.get('/',  (req, res) => {
  console.log('Root endpoint hit');
  res.send('API funcionando');
	//res.send('Welcome to the API: Use /api/users, /api/products, or /api/clients to access the respective endpoints.');
});

// Middleware to handle API key authentication
app.use(apiKeyMiddleware);


// Using routes
app.use('/api/users', user);
app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/employed', employedRoutes);
// Starting the server
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});