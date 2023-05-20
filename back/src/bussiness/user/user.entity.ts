import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'user_id'})
  userId: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;
}
