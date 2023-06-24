import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';


@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  filename: string;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
  
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  
  // @UpdateDateColumn({type: 'timestamp'})
  // updatedAt: Date;
}
