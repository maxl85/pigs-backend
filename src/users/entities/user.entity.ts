import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { FileEntity } from '../../files/entities/file.entity';

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  username: string;
  
  @Column()
  password: string;
  
  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];
  
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  
  // @UpdateDateColumn({type: 'timestamp'})
  // updatedAt: Date;
}
