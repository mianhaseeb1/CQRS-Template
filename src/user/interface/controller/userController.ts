import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginCommand } from 'src/user/application/userLogin/userLoginCommand';
import { UserLoginDto } from '../dto/userLoginDto';

@ApiTags('User')
@Controller('users')
export class UserController {
  @Inject() commandBus: CommandBus;
  @Inject() queryBus: QueryBus;

  @Post('/')
  async loginUser(@Body() userBody: UserLoginDto) {
    return this.commandBus.execute(
      new UserLoginCommand(
        userBody.name,
        userBody.email,
        userBody.sub,
        userBody.provider,
      ),
    );
  }
}
