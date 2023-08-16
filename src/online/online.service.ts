import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOnlineDto } from './dto/create-online.dto';
import { OnlineEntity } from './entities/online.entity';

@Injectable()
export class OnlineService {
  constructor(
    @InjectRepository(OnlineEntity)
    private repository: Repository<OnlineEntity>,
  ) { }
  
  create(dto: CreateOnlineDto, userId: number) {
    return this.repository.save({
      user: { id: userId },
      ...dto
    });
  }

  findLast(rpiId: string, last: number) {
    return this.repository.createQueryBuilder('online')
      .where('online.rpiId = :rpiId', { rpiId })
      .orderBy("online.id", "DESC")
      .limit(last)
      .getMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} online`;
  // }

}
