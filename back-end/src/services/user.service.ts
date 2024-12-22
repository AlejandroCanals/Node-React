import User from '../models/user.model';

class UserService {
  public async createUser(data: { name: string; email: string; password: string }) {
    return await User.create(data);
  }

  public async getUserById(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  public async getAllUsers() {
    return await User.findAll();
  }

  public async deleteUser(id: number) {
    const user = await this.getUserById(id);
    await user.destroy();
  }

  public async updateUser(id: number, data: Partial<{ name: string; email: string; password: string }>) {
    const user = await this.getUserById(id);
    Object.assign(user, data);
    await user.save();
    return user;
  }
}

export default new UserService();
