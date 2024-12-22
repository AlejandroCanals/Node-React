import * as dotenv from 'dotenv';
dotenv.config();
import Database from './config/database';
import app from './app';


(async () => {
  try {
    console.log('Probar conexión con la base de datos...');
    await Database.testConnection(); // Prueba la conexión

    console.log('Sincronizando modelos...');
    const sequelize = Database.getInstance();
    await sequelize.sync({ alter: true });  //alter : true -> actulizar las tablas , force : false -> crea tablas no existentes sin modificar datos de otras

    console.log('¡Modelos sincronizados con éxito!');

    // Inicia el servidor Express
    const PORT = process.env.PORT || 3000 ;
    console.log(PORT);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
})();
