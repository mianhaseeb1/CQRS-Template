import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { LoggingInterceptor } from 'libs/LoggingInterceptor';
import { HttpExceptionFilter } from 'libs/HttpExceptionFilter';

import { Config } from 'src/config';
import { AppModule } from 'src/appModule';
import helmet from 'helmet';
// import compression from 'compression';
import { DataSource } from 'typeorm';

function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('User Management MicroService')
    .setDescription('Auxee - User MicroService')
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api/user/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('v1');
  setupSwagger(app);
  await app.listen(Config.PORT);
}

bootstrap();
