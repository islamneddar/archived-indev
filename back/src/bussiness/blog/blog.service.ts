import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BlogEntity} from './blog.entity';
import {PageOptionsDto} from '../../common/pagination/page_option.dto';
import {PageMetaDto} from '../../common/pagination/page_meta.dto';
import {PageDto} from '../../common/pagination/page.dto';
import {TypeFeed} from '../feed_blog/feed_blog.entity';
import logger from '@/utils/logger';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
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
      .leftJoinAndSelect('blog.sourceBlog', 'sourceBlog')
      .select(['blog', 'sourceBlog.name', 'sourceBlog.image'])
      .leftJoinAndSelect('blog.tags', 'tag')
      .orderBy('blog.publishDate', 'DESC')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();
    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});
    this.logger.debug('meta dto' + JSON.stringify(pageMetaDto));
    return new PageDto(entities, pageMetaDto);
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
}
