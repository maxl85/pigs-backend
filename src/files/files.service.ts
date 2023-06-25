import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}
  
  findAll(userId: number) {
    const qb = this.repository.createQueryBuilder('file');
    qb.where('file.userId = :userId', { userId });
    return qb.getMany();
  }
  
  saveFiles(file: Express.Multer.File, userId: number) {
    const dateArray = file.filename.split('-').map((item)=>parseInt(item));
    dateArray[1] = dateArray[1] - 1;
    const dateTime = new Date(...(dateArray as []));
    
    return this.repository.save({
      filename: file.filename,
      dateTime: dateTime,
      user: { id: userId },
    });
  }
}
