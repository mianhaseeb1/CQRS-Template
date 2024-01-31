import { User } from '../model/user';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
