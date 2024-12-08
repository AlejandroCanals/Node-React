import Database from './config/database';
import * as dotenv from 'dotenv';
dotenv.config();
import User from './models/user.model'; // Importa los modelos después


(async () => {
  try {
    const sequelize = Database.getInstance();

    console.log('Sincronizando modelos...');
    await sequelize.sync({ force: false }); // Cambia force a true si necesitas recrear las tablas
    console.log('¡Modelos sincronizados con éxito!');

  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
})();