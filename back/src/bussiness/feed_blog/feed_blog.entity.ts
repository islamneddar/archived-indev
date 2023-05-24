/* eslint-disable import/no-cycle */
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SourceBlogEntity} from '@/bussiness/source-blog/source_blog.entity';
import {BaseTable} from '@/database/base-table.entity';

export enum TypeFeed {
  COMMUNITY = 'community',
  ORIGINAL = 'original',
  NEWS = 'news',
  DESIGN = 'design',
  DATA_SCIENCE = 'data science',
  DEVOPS = 'devops',
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

  /*@Column({
    type: 'enum',
    nullable: false,
    enum: TypeFeed,
    default: TypeFeed.ORIGINAL,
  })
  type: TypeFeed;*/
}
