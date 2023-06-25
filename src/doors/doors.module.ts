import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { DoorEntity } from './entities/door.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DoorEntity])
  ],
  controllers: [DoorsController],
  providers: [DoorsService]
})
export class DoorsModule {}
