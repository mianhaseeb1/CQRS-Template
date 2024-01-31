import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from 'libs/DatabaseModule';
import { RequestStorageMiddleware } from 'libs/RequestStorageMiddleware';

import { AppController } from 'src/appController';
import { AppService } from 'src/appService';
import { UserModule } from './user/userModule';
// import { NotificationModule } from 'src/notification/NotificationModule';

@Module({
  imports: [
    // AccountsModule,
    DatabaseModule,
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot(),
    UserModule,
    // NotificationModule,
    // ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
