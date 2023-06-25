import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDoorDto } from './dto/create-door.dto';
import { DoorEntity } from './entities/door.entity';


@Injectable()
export class DoorsService {
  constructor(
    @InjectRepository(DoorEntity)
    private repository: Repository<DoorEntity>,
  ) { }

  create(dto: CreateDoorDto, userId: number) {
    return this.repository.save({
      user: { id: userId },
      ...dto
    });
  }

  findAll(userId: number) {
    const qb = this.repository.createQueryBuilder('door');
    qb.where('door.userId = :userId', { userId });
    return qb.getMany();
  }
  
}
