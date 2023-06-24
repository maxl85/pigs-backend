import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'doors'})
export class DoorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  username: string;
  
  @Column()
  sensor: string;
  
  @Column()
  password: string;
  
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  
  // @UpdateDateColumn({type: 'timestamp'})
  // updatedAt: Date;
}
