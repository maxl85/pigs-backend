import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';


@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;
  
  @Column()
  camId: string;

  @Column({ type: 'timestamp' })
  dateTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // @UpdateDateColumn({type: 'timestamp'})
  // updatedAt: Date;
}
