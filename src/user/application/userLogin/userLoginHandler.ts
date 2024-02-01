import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createApiResponse } from 'src/user/interface/response/apiResponse';
import { UserService } from '../service/userService';
import { UserLoginCommand } from './userLoginCommand';

@CommandHandler(UserLoginCommand)
export class UserLoginHandler
  implements ICommandHandler<UserLoginCommand, void>
{
  constructor(private readonly userService: UserService) {}
  async execute({
    name,
    email,
    sub,
    provider,
  }: UserLoginCommand): Promise<any> {
    try {
      const user = await this.userService.loginUser({
        name,
        email,
        sub,
        provider,
      });
      return createApiResponse({
        status: 'success',
        message: 'user signIn successfully',
        data: user,
      });
    } catch (error) {
      return createApiResponse({
        status: 'error',
        message: 'Failed to signin',
        error: error.message,
      });
    }
  }
}
