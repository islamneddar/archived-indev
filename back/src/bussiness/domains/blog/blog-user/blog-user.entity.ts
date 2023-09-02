import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {UserEntity} from '@/bussiness/user/user.entity';
import {BlogEntity} from '@/bussiness/domains/blog/blog/blog.entity';
import {TinyIntEnum} from '@/database/db.types';

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

  @Column({name: 'is_liked', enum: TinyIntEnum, default: TinyIntEnum.FALSE})
  isLiked: TinyIntEnum;

  @Column({
    name: 'is_bookmarked',
    enum: TinyIntEnum,
    default: TinyIntEnum.FALSE,
  })
  isBookmarked: TinyIntEnum;

  @Column({
    name: 'bookmark_time',
    default: null,
    nullable: true,
  })
  bookmarkTime: string;
}
