import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
}

export default new UserController();
