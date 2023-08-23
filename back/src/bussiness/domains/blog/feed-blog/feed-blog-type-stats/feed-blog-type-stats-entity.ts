import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {TypeFeed} from '@/bussiness/domain-blog/feed-blog/feed_blog/feed-blog.proto';

@Entity({
  name: 'feed_blogs_stats',
})
export class FeedBlogStatsEntity {
  @PrimaryGeneratedColumn({
    name: 'feed_blog_stats_id',
  })
  feedBlogStatsId: number;

  @Column({
    type: 'enum',
    nullable: false,
    enum: TypeFeed,
    default: TypeFeed.AI,
    unique: true,
  })
  type: TypeFeed;

  @Column({
    name: 'source_blog_name',
  })
  sourceBlogName: string;

  @Column({
    name: 'source_blog_image',
  })
  sourceBlogImage: string;

  @Column({
    name: 'nb_blogs',
  })
  nbBlogs: number;
}
