import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/model/user';
import { IUserRepository } from 'src/user/domain/repository/userRepository';
import { InjectionToken } from 'src/user/injection.token';
import { UserLoginDto } from 'src/user/interface/dto/userLoginDto';

@Injectable()
export class UserService {
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: IUserRepository;

  async loginUser(userLoginDto: UserLoginDto): Promise<User> {
    let user = await this.userRepository.findByEmail(userLoginDto.email);
    if (!user) {
      const userDetails = {
        name: userLoginDto.name,
        email: userLoginDto.email,
        provider: userLoginDto.provider,
        sub: userLoginDto.sub,
      };
      user = User.createUser(userDetails);
      const createdUser = await this.userRepository.createUser(user);
      return createdUser;
    }

    return user;
  }
}
