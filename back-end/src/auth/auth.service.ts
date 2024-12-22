import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

class AuthService {
  public async register(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw { statusCode: 400, message: 'Email already in use' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ name, email, password: hashedPassword, role: 'admin' });
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    return token;
  }
}

export default new AuthService();
