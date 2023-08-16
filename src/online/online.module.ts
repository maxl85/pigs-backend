import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OnlineService } from './online.service';
import { OnlineController } from './online.controller';
import { OnlineEntity } from './entities/online.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([OnlineEntity])
  ],
  controllers: [OnlineController],
  providers: [OnlineService]
})
export class OnlineModule {}
