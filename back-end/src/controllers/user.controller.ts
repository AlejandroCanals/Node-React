import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

class UserController {
  constructor() {
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  // Método auxiliar para validar ID de usuario
  private validateUserId(req: Request): number {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      throw { statusCode: 400, message: 'Invalid user ID' }; // Lanza un error para el middleware
    }
    return userId;
  }

  // Crear un nuevo usuario
  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw { statusCode: 400, message: 'Name, email, and password are required.' };
      }

      const user = await UserService.createUser({ name, email, password });
      res.status(201).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  // Obtener usuario por ID
  public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = this.validateUserId(req);

      const user = await UserService.getUserById(userId);
      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los usuarios
  public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, users });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar usuario por ID
  public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = this.validateUserId(req);

      await UserService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
  }
  }
}

export default new UserController()
