import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getPostgresConfig } from './configs/postgres.config';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { DoorsModule } from './doors/doors.module';
import { AuthModule } from './auth/auth.module';
import { OnlineModule } from './online/online.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    UsersModule,
    FilesModule,
    DoorsModule,
    AuthModule,
    OnlineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
