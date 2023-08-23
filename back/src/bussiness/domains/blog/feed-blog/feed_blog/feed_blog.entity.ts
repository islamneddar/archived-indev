import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SourceBlogEntity} from '@/bussiness/domains/blog/source-blog/source_blog.entity';
import {BaseTable} from '@/database/base-table.entity';
import {TypeFeed} from '@/bussiness/domains/blog/feed-blog/feed_blog/feed-blog.proto';

@Entity({
  name: 'feed_blogs',
})
export class FeedBlogEntity extends BaseTable {
  @PrimaryGeneratedColumn({
    name: 'feed_blog_id',
  })
  feedBlogId: number;

  // rss feed url
  @Column({unique: true, nullable: false, name: 'url_feed'})
  urlFeed: string;

  @OneToMany(() => SourceBlogEntity, sourceBlog => sourceBlog.feedBlog)
  sourceBlogs: SourceBlogEntity[];

  @Column({
    type: 'enum',
    nullable: false,
    enum: TypeFeed,
    default: TypeFeed.AI,
  })
  type: TypeFeed;
}
