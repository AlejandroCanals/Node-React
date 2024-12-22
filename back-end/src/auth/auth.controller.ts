import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.register(name, email, password);
      res.status(201).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ success: true, token });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
