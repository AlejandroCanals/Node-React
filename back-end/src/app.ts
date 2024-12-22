import express from 'express';

const app = express();

// Middlewares globales
app.use(express.json());

// Rutas
import routes from './routes/index';
app.use('/api', routes);

export default app;
