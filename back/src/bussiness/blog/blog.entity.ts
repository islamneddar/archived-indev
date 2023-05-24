import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import {SourceBlogEntity} from '@/bussiness/source-blog/source_blog.entity';
import {TagEntity} from '../tag/tag.entity';
import {BaseTable} from '@/database/base-table.entity';

@Entity({name: 'blogs'})
export class BlogEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'blog_id'})
  blogId: number;

  @Column({unique: true})
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  permalink: string;

  @ManyToOne(() => SourceBlogEntity, sourceBlog => sourceBlog.blogs)
  @JoinColumn({name: 'source_blog_id'})
  sourceBlog: SourceBlogEntity;

  @Column({name: 'publish_date'})
  publishDate: Date;

  @ManyToMany(() => TagEntity, tag => tag.blogs)
  @JoinTable({name: 'blog_tags'})
  tags: TagEntity[];
}
