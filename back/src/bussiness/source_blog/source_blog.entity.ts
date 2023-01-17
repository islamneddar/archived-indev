import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';
import { FeedBlogEntity } from '../feed_blog/feed_blog.entity';

@Entity({
  name: 'source_blogs',
})
export class SourceBlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'source_blog_id' })
  sourceBlogId: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  image: string;

  @DeleteDateColumn({ name: 'delete_date' })
  deleteDate: Date;

  @CreateDateColumn({ name: 'creation_at' })
  creationDate: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateDate: Date;

  @OneToMany(() => BlogEntity, (blog) => blog.sourceBlog)
  blogs: BlogEntity[];

  @ManyToOne(() => FeedBlogEntity, (feedBlog) => feedBlog.sourceBlogs)
  @JoinColumn({ name: 'feed_blog_id' })
  feedBlog: FeedBlogEntity;

  @Column({ name: 'blackList', default: false })
  blackList: boolean;
}
