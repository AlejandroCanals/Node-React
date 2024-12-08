import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  // Método para crear un usuario
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  // Método para obtener un usuario por su ID
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(404).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  // Método para obtener todos los usuarios
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  // Método para eliminar un usuario por su ID
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(404).json({ error: 'An unknown error occurred.' });
      }
    }
  }
}

export default new UserController();
