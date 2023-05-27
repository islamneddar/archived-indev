import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {UserEntity} from '@/bussiness/user/user.entity';
import {EmailValidationEnum} from '@/bussiness/email_validation/email_validation.types';

@Entity({name: 'email_validations'})
export class EmailValidationEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'email_validation_id'})
  emailValidationId: number;

  @Column()
  email: string;

  @Column()
  valid: boolean;

  @Column({
    type: 'enum',
    enum: EmailValidationEnum,
    default: EmailValidationEnum.PASSWORD_RESET,
  })
  type: EmailValidationEnum;

  @Column({unique: true})
  code: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
