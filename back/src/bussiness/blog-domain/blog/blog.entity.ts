import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import {SourceBlogEntity} from '@/bussiness/blog-domain/source-blog/source_blog.entity';
import {TagEntity} from '../tag/tag.entity';
import {BaseTable} from '@/database/base-table.entity';
import {BlogToUserEntity} from '@/bussiness/blog-domain/blog-user/blog-user.entity';

@Entity({name: 'blogs'})
export class BlogEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'blog_id'})
  blogId: number;

  @Index({fulltext: true})
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
  @JoinTable({
    name: 'blog_tags',
    joinColumn: {name: 'blog_id'},
    inverseJoinColumn: {name: 'tag_id'},
  })
  tags: TagEntity[];

  @OneToMany(() => BlogToUserEntity, blogToUser => blogToUser.blog)
  blogToUser: BlogToUserEntity[];

  totalLike: number;

  isLiked: boolean;

  isBookmarked: boolean;

  bookmarkTime: string;
}
