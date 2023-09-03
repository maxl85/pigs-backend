import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Db, Repository } from 'typeorm';

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
  
  // findAllDates(cam1: string, cam2: string) {
  //   return this.repository
  //     .createQueryBuilder('file')
  //     // .select('DISTINCT file."dateTime"::date', 'dateTime')
  //     // .select('DISTINCT ("dateTime"::date)')
  //     // .select('COUNT(DISTINCT("dateTime"::date))')
  //     .select('DISTINCT("dateTime"::date)')
  //     // .select('"dateTime"')
  //     // .select('"dateTime"::date')
  //     // .distinct(true)
  //     .where('"camId" = :cam1', { cam1 })
  //     .orWhere('"camId" = :cam2', { cam2 })
  //     .orderBy('"dateTime"', 'DESC')
  //     // .getMany();
  //     .getRawMany();
  // }
  
  async findAllDates(cam1: string, cam2: string) {
    const qb = this.repository.createQueryBuilder('files');
    qb.select('DISTINCT "dateTime"::date');
    qb.where('"camId" = :cam1', { cam1 });
    qb.orWhere('"camId" = :cam2', { cam2 });
    qb.orderBy('"dateTime"', 'DESC');
    
    // console.log(qb.getQueryAndParameters())
    return qb.getRawMany();
  }
  
  async findBetweenDates(cam1: string, cam2: string, date1: string, date2: string) {
    const qb = this.repository.createQueryBuilder('files');
    qb.where('"dateTime" >= :date1::date', { date1 });
    qb.andWhere('"dateTime" < (:date2::date + \'1 day\'::interval)', { date2 });
    qb.andWhere('("camId" = :cam1 OR "camId" = :cam2)', { cam1, cam2 });
    qb.orderBy('"dateTime"', 'DESC');
    
    // console.log(qb.getQueryAndParameters())
    return qb.getMany();
  }
  
  
  saveFiles(camId: string, dateTime: Date, file: Express.Multer.File, userId: number) {
    // const dateArray = file.filename.split('-').map((item)=>parseInt(item));
    // dateArray[1] = dateArray[1] - 1;
    // const dateTime = new Date(...(dateArray as []));
    
    // return this.repository.save({
    //   camId,
    //   filename: file.filename,
    //   dateTime: dateTime,
    //   user: { id: userId },
    // });
    
    return this.repository.save({
      camId: camId,
      filename: file.filename,
      dateTime: dateTime,
      user: { id: userId },
    });
  }
}
