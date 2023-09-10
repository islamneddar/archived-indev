import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {SourceBlogToUserEntity} from '@/bussiness/domains/blog/source-blog-user/source-blog-to-user.entity';
import {BlogToUserEntity} from '@/bussiness/domains/blog/blog-user/blog-user.entity';
import {AdminRoleEnum} from '@/bussiness/inaitimer-admin/inaitimes-admin.proto';

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
}
