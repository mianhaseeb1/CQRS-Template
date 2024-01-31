import { Module, Provider } from '@nestjs/common';
import { UserLoginHandler } from './application/userLogin/userLoginHandler';
import { UserService } from './application/service/userService';
import { InjectionToken } from './injection.token';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entity/userEntity';
import { UserController } from './interface/controller/userController';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepositoryImplement } from './infrastructure/repository/userRepositoryImplement';

const application = [UserLoginHandler, UserService];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  providers: [...application, ...infrastructure],
  controllers: [UserController],
})
export class UserModule {}
