import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

@Entity({name: 'doors'})
export class DoorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  doorId: string;
  
  @Column({ type: 'timestamp' })
  openedAt: Date;
  
  @Column({ type: 'timestamp' })
  closedAt: Date;
  
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
  
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  
  // @UpdateDateColumn({type: 'timestamp'})
  // updatedAt: Date;
}
