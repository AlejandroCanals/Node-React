import { Sequelize } from 'sequelize';

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        process.env.DB_NAME || '',
        process.env.DB_USER || '',
        process.env.DB_PASSWORD || '',
        {
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT) || 5432,
          dialect: 'postgres',
          logging: false,
        }
      );
    }
    return Database.instance;
  }
  public static async testConnection(): Promise<void> {
    try {
      const sequelize = this.getInstance();
      await sequelize.authenticate();
      console.log('¡Conexión exitosa con la base de datos!');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }


}
export default Database;
