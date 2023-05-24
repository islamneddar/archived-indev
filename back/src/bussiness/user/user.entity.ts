import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {SourceBlogToUserEntity} from '@/bussiness/source-blog-user/source-blog-to-user.entity';
import {BlogToUserEntity} from '@/bussiness/blog-user/blog-user.entity';

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

  @OneToMany(
    () => SourceBlogToUserEntity,
    sourceBlogToUser => sourceBlogToUser.user,
  )
  sourceBlogToUsers: SourceBlogToUserEntity[];

  @OneToMany(() => BlogToUserEntity, blogToUser => blogToUser.user)
  blogToUser: BlogToUserEntity[];
}
