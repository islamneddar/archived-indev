import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {AdminRoleEnum} from '@/bussiness/inaitimer-admin/inaitimes-admin.proto';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';

@Entity({name: 'inaitimes_admin'})
export class AdminInAiTimesEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'admin',
  })
  username: string;

  @Column({
    enum: AdminRoleEnum,
    default: AdminRoleEnum.GUEST,
    nullable: false,
    type: 'enum',
    name: 'role',
  })
  role: AdminRoleEnum;

  @OneToMany(() => AiToolEntity, aiTool => aiTool.admin)
  aiTools: AdminInAiTimesEntity[];
}
