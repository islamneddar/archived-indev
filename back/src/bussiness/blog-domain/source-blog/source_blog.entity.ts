import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BlogEntity} from '../blog/blog.entity';
import {FeedBlogEntity} from '@/bussiness/blog-domain/feed-blog/feed_blog/feed_blog.entity';
import {BaseTable} from '@/database/base-table.entity';
import {SourceBlogToUserEntity} from '@/bussiness/blog-domain/source-blog-user/source-blog-to-user.entity';

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

  @Column({name: 'black_list', default: false})
  blackList: boolean;

  @OneToMany(
    () => SourceBlogToUserEntity,
    sourceBlogToUser => sourceBlogToUser.sourceBlog,
  )
  sourceBlogToUsers: SourceBlogToUserEntity[];
}
