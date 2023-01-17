import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SourceBlogEntity } from '../source_blog/source_blog.entity';
import { Type } from 'class-transformer';

export enum TypeFeed {
  COMMUNITY = 'community',
  ORIGINAL = 'original',
  NEWS = 'news',
  DESIGN = 'design',
  DATASCIENCE = 'datascience',
  DEVOPS = 'devops',
}

@Entity({
  name: 'feed_blogs',
})
export class FeedBlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'feed_blog_id',
  })
  feedBlogId: number;

  // rss feed url
  @Column({ unique: true, nullable: false, name: 'url_feed' })
  urlFeed: string;

  @DeleteDateColumn({ name: 'delete_date' })
  deleteDate: Date;

  @CreateDateColumn({ name: 'creation_at' })
  creationDate: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateDate: Date;

  @OneToMany(() => SourceBlogEntity, (sourceBlog) => sourceBlog.feedBlog)
  sourceBlogs: SourceBlogEntity[];

  @Column({
    type: 'enum',
    nullable: false,
    enum: TypeFeed,
    default: TypeFeed.ORIGINAL,
  })
  type: TypeFeed;
}
