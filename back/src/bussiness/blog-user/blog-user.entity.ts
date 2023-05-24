import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {UserEntity} from '@/bussiness/user/user.entity';
import {BlogEntity} from '@/bussiness/blog/blog.entity';

@Entity({name: 'blog_to_user'})
export class BlogToUserEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'blog_to_user_id'})
  blogToUserId;

  @ManyToOne(() => UserEntity, user => user.blogToUser)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @ManyToOne(() => BlogEntity, blog => blog.blogToUser)
  @JoinColumn({name: 'blog_id'})
  blog: BlogEntity;

  @Column({name: 'is_liked'})
  isLiked: boolean;
}
