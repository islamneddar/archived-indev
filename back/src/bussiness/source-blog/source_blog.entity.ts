/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {BlogEntity} from '../blog/blog.entity';
import {FeedBlogEntity, TypeFeed} from '../feed_blog/feed_blog.entity';
import {BaseTable} from '../../database/base-table.entity';
import {SourceBlogToUserEntity} from '@/bussiness/source_blog/source-blog-to-user.entity';

@Entity({
  name: 'source_blogs',
})
export class SourceBlogEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'source_blog_id'})
  sourceBlogId: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  image: string;

  @OneToMany(() => BlogEntity, blog => blog.sourceBlog)
  blogs: BlogEntity[];

  @ManyToOne(() => FeedBlogEntity, feedBlog => feedBlog.sourceBlogs)
  @JoinColumn({name: 'feed_blog_id'})
  feedBlog: FeedBlogEntity;

  @Column({name: 'blackList', default: false})
  blackList: boolean;

  @OneToMany(
    () => SourceBlogToUserEntity,
    sourceBlogToUser => sourceBlogToUser.sourceBlog,
  )
  sourceBlogToUsers: SourceBlogToUserEntity[];
}
