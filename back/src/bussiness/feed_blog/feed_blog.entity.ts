import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SourceBlogEntity} from '@/bussiness/source-blog/source_blog.entity';
import {BaseTable} from '@/database/base-table.entity';

export enum TypeFeed {
  COMMUNITY = 'community',
  ORIGINAL = 'original',
  NEWS = 'news',
  DESIGN = 'design',
  DATA_SCIENCE = 'data_science',
  DEVOPS = 'devops',
  CYBER_SECURITY = 'cyber_security',
  MIXED_REALITY = 'mixed_reality',
  CRYPTO_CURRENCY = 'crypto_currency',
  IOT = 'iot',
  MACHINE_LEARNING = 'machine_learning',
  SOFTWARE_ENGINEERING = 'software_engineering',
}

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
}
