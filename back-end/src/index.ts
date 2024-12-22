import * as dotenv from 'dotenv';
dotenv.config();
import Database from './config/database';
import app from './app';



(async () => {
  try {

    const sequelize = Database.getInstance();
    console.log(typeof(process.env.DB_PASSWORD));

    console.log('Sincronizando modelos...');
    
    await sequelize.sync({ force: false }); 
    console.log('¡Modelos sincronizados con éxito!');

    // Inicia el servidor Express
    const PORT = process.env.PORT || 3000 ;
    console.log(PORT);

    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al sincronizar los modelos o iniciar el servidor:', error);
    process.exit(1);
  }
})();
