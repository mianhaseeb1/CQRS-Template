import { Config } from 'src/config';
import { UserEntity } from 'src/user/infrastructure/entity/userEntity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: Config.DATABASE_HOST,
  port: Config.DATABASE_PORT,
  username: Config.DATABASE_USER,
  password: Config.DATABASE_PASSWORD,
  database: Config.DATABASE_NAME,
  entities: [UserEntity],
  synchronize: Config.DATABASE_SYNC,
  logging: Config.DATABASE_LOGGING,
  migrations: ['dist/src/database/migrations/*.js'],
  charset: 'utf8mb4_unicode_ci',
  migrationsTableName: 'migrations',
});
