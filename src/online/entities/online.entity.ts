import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

@Entity({name: 'online'})
export class OnlineEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  rpiId: string;
  
  @Column()
  counter: number;
  
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
  
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
}
