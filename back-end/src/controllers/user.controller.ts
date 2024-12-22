import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {

  constructor() {
    // Enlaza los métodos para preservar el contexto de `this`
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  
  // Método auxiliar para manejar errores
  private handleError(res: Response, error: unknown, statusCode = 500): void {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    res.status(statusCode).json({ error: errorMessage });
  }

  // Método auxiliar para validar ID de usuario
  private validateUserId(req: Request, res: Response): number | null {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID.' });
      return null;
    }
    return userId;
  }

  // Crear un nuevo usuario
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ error: 'Name, email, and password are required.' });
        return;
      }

      const user = await UserService.createUser({ name, email, password });
      res.status(201).json({ success: true, user });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Obtener usuario por ID
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUserId(req, res);
      if (userId === null) return;

      const user = await UserService.getUserById(userId);
      res.status(200).json({ success: true, user });
    } catch (error) {
      this.handleError(res, error, 404);
    }
  }

  // Obtener todos los usuarios
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, users });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Eliminar usuario por ID
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUserId(req, res);
      if (userId === null) return;

      await UserService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

export default new UserController();
