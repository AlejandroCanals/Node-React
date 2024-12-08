import * as dotenv from 'dotenv';
import Database from './config/database';

dotenv.config();

(async () => {
  console.log('Iniciando prueba de conexión a la base de datos...');
  try {
    await Database.testConnection();
    console.log('Prueba de conexión completada.');
  } catch (error) {
    console.error('Error durante la prueba de conexión:', error);
  }
})();
