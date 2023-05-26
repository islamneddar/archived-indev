import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {BlogEntity} from './blog.entity';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {PageDto} from '@/common/pagination/page.dto';
import {TypeFeed} from '../feed_blog/feed_blog.entity';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    private dataSource: DataSource,
  ) {}

  async getByTitle(titleFeed: string) {
    return this.blogRepository.findOne({
      where: {
        title: titleFeed,
      },
    });
  }

  async getOrCreate(blog: BlogEntity) {
    const existedBlog = await this.getByTitleAndSourceBlog(
      blog.title,
      blog.sourceBlog.sourceBlogId,
    );
    if (!existedBlog) {
      const blogToAdd = {
        ...blog,
      };
      if (blog.sourceBlog !== undefined) {
        blogToAdd.sourceBlog.sourceBlogId = blog.sourceBlog.sourceBlogId;
      }

      return this.blogRepository.save({
        ...blogToAdd,
      });
    }
    return existedBlog;
  }

  async getByTitleAndSourceBlog(blogTitle: string, sourceBlogId: number) {
    return this.blogRepository.findOne({
      where: {
        title: blogTitle,
        sourceBlog: {
          sourceBlogId,
        },
      },
    });
  }

  async getWithPaginate(pageOptionsDto: PageOptionsDto) {
    const query = this.blogRepository
      .createQueryBuilder('blog')
      .select([
        'blog',
        'sourceBlog.name',
        'sourceBlog.image',
        'tag.tagId',
        'tag.title',
        'blogToUser.isLiked',
      ])
      .leftJoin('blog.sourceBlog', 'sourceBlog')
      .leftJoin('blog.tags', 'tag')
      .leftJoin('blog.blogToUser', 'blogToUser')
      .orderBy('blog.publishDate', 'DESC')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();

    const blogUpdated = entities.map(blog => {
      blog.totalLike = blog.blogToUser.reduce((likes, blogToUser) => {
        if (blogToUser.isLiked) {
          return likes + 1;
        }
        return likes;
      }, 0);
      const returnedBlog = new BlogEntity();
      returnedBlog.blogId = blog.blogId;
      returnedBlog.title = blog.title;
      returnedBlog.createdAt = blog.createdAt;
      returnedBlog.updatedAt = blog.updatedAt;
      returnedBlog.publishDate = blog.publishDate;
      returnedBlog.title = blog.title;
      returnedBlog.thumbnail = blog.thumbnail;
      returnedBlog.permalink = blog.permalink;
      returnedBlog.sourceBlog = blog.sourceBlog;
      returnedBlog.totalLike = blog.totalLike;
      returnedBlog.tags = blog.tags;
      return returnedBlog;
    });

    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});
    return new PageDto(blogUpdated, pageMetaDto);
  }

  async getWithPaginateByFeedType(
    pageOptionsDto: PageOptionsDto,
    feedType: TypeFeed,
  ) {
    const query = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.sourceBlog', 'sourceBlog')
      .leftJoinAndSelect('sourceBlog.feedBlog', 'feedBlog')
      .where('feedBlog.type = :typeFeed', {typeFeed: feedType})
      .andWhere('feedBlog.blackList = :blackList', {blackList: false})
      .select(['blog', 'sourceBlog.name', 'sourceBlog.image'])
      .leftJoinAndSelect('blog.tags', 'tag')
      .orderBy('blog.publishDate', 'DESC')
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();
    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});
    return new PageDto(entities, pageMetaDto);
  }

  getWithPaginateBySearch = async (
    pageOptionsDto: PageOptionsDto,
    search: string,
  ) => {
    const query = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.sourceBlog', 'sourceBlog')
      .leftJoinAndSelect('sourceBlog.feedBlog', 'feedBlog')
      .where('feedBlog.blackList = :blackList', {blackList: false})
      .select(['blog', 'sourceBlog.name', 'sourceBlog.image'])
      .leftJoinAndSelect('blog.tags', 'tag')
      .where(`MATCH(blog.title) AGAINST ('(${search})' IN BOOLEAN MODE)`)
      .orderBy('blog.publishDate', 'DESC')
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();
    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});
    return new PageDto(entities, pageMetaDto);
  };

  async getWithPaginateQuery(param: {pageOptionsDto: PageOptionsDto}) {
    const query = this.dataSource.query(`
      SELECT blogs.blog_id as blogid,
             blogs.title as blogtitle,
             source_blogs.name as sourceblogname, 
             source_blogs.image as sourceblogimage,
             STRING_AGG(t.title, ', ') AS tags,
            likes.totalLikes as totalLikes
      from blogs
      left join source_blogs on blogs.source_blog_id = source_blogs.source_blog_id
      left join blog_tags on blogs.blog_id = blog_tags.blog_id
      left join tags t on blog_tags.tag_id = t.tag_id
      left join (
          select blog_id, SUM(is_liked) as totalLikes from blog_to_user group by blog_id 
      ) likes on blogs.blog_id = likes.blog_id
      group by blogs.blog_id, source_blogs.name, source_blogs.image, totalLikes
    `);

    // TODO adapt the query to be a blog entity

    return query;
  }

  async getAllPaginateWithSearchAndFeedType(
    pageOption: PageOptionsDto,
    search: string,
    feedType: TypeFeed,
  ) {
    this.logger.debug('get all paginate with search and feed type');
    this.logger.debug(pageOption);
    this.logger.debug(pageOption.page);
    this.logger.debug(pageOption.take);
    const query = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.sourceBlog', 'sourceBlog')
      .leftJoinAndSelect('sourceBlog.feedBlog', 'feedBlog')
      .where('feedBlog.type = :typeFeed', {typeFeed: feedType})
      .andWhere('feedBlog.blackList = :blackList', {blackList: false})
      .select(['blog', 'sourceBlog.name', 'sourceBlog.image'])
      .leftJoinAndSelect('blog.tags', 'tag')
      .where('blog.title ILIKE :searchQuery', {searchQuery: `%${search}%`})
      .orderBy('blog.publishDate', 'DESC')
      .skip((pageOption.page - 1) * pageOption.take)
      .take(pageOption.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pageOption,
    });
    return new PageDto(entities, pageMetaDto);
  }

  getById(param: {blogId: number}) {
    return this.blogRepository.findOne({
      where: {
        blogId: param.blogId,
      },
    });
  }
}
