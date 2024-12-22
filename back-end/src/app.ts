import express from 'express';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';


const app = express();
app.use(express.json());

// Rutas
app.use('/api', routes);

app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Ruta no encontrada' });
  });

app.use(errorHandler);

export default app;
