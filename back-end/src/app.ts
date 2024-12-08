import express from 'express';

const app = express();

// Middlewares globales
app.use(express.json()); // Parse JSON requests

// Rutas
import routes from './routes/index.js';
app.use('/api', routes);

export default app;
