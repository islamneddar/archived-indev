import {BaseTable} from '@/database/base-table.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {SourceBlogEntity} from '@/bussiness/source-blog/source_blog.entity';
import {UserEntity} from '@/bussiness/user/user.entity';

@Entity('source_blog_to_user')
export class SourceBlogToUserEntity extends BaseTable {
  @PrimaryGeneratedColumn({
    name: 'source_blog_to_user_id',
  })
  sourceBlogToUserId: number;

  @ManyToOne(() => SourceBlogEntity, sourceBlog => sourceBlog.sourceBlogToUsers)
  @JoinColumn({name: 'source_blog_id'})
  sourceBlog: SourceBlogEntity;

  @ManyToOne(() => UserEntity, user => user.sourceBlogToUsers)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @Column({name: 'is_follow', default: false})
  isFollow: boolean;
}
