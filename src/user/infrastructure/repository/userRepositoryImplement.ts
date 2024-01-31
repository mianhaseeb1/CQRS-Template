import { IUserRepository } from 'src/user/domain/repository/userRepository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/userEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/domain/model/user';

export class UserRepositoryImplement implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
