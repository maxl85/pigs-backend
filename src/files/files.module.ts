import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileEntity } from './entities/file.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([FileEntity])
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
