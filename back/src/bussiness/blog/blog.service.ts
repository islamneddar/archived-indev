import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {BlogEntity} from './blog.entity';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {PageDto} from '@/common/pagination/page.dto';
import {BlogToUserService} from '@/bussiness/blog-user/blog-user.service';
import {UserEntity} from '@/bussiness/user/user.entity';
import {BlogServiceUtil} from '@/bussiness/blog/blog.service.util';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    private dataSource: DataSource,
    private blogToUserService: BlogToUserService,
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

  async getAllWithPaginate(pageOptionsDto: PageOptionsDto) {
    const query = (await this.dataSource.query(`
      SELECT blogs.blog_id as blogid,
             blogs.title as blogtitle,
              blogs.publish_date as publishdate,
              blogs.thumbnail as thumbnail,
              blogs.permalink as permalink,
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
      order by blogs.publish_date desc
      offset ${pageOptionsDto.skip} 
          limit ${pageOptionsDto.take}
    `)) as any[];

    const listBlog = query.map(blogFromDb => {
      return BlogServiceUtil.fromDbToBlogEntity({
        blogFromDb: blogFromDb,
        user: null,
      });
    });
    const itemCount = await this.blogRepository.count();

    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});
    return new PageDto(listBlog, pageMetaDto);
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

  getById(param: {blogId: number}) {
    return this.blogRepository.findOne({
      where: {
        blogId: param.blogId,
      },
    });
  }

  async getAllWithPaginateWithAuth(param: {
    pageOptionsDto: PageOptionsDto;
    user: UserEntity;
  }) {
    const query = (await this.dataSource.query(`
    SELECT blogs.blog_id as blogid,
             blogs.title as blogtitle,
              blogs.publish_date as publishdate,
              blogs.thumbnail as thumbnail,
              blogs.permalink as permalink,
             source_blogs.name as sourceblogname, 
             source_blogs.image as sourceblogimage,
             STRING_AGG(t.title, ', ') AS tags,
             likes.totalLikes as totalLikes
      ${param.user ? ', blog_to_user.is_liked as isliked' : ''}
      from blogs
      left join source_blogs on blogs.source_blog_id = source_blogs.source_blog_id
      left join blog_tags on blogs.blog_id = blog_tags.blog_id
      left join tags t on blog_tags.tag_id = t.tag_id
      left join (
          select blog_id, SUM(is_liked) as totalLikes from blog_to_user group by blog_id 
      ) likes on blogs.blog_id = likes.blog_id
      ${
        param.user
          ? 'left join blog_to_user on blogs.blog_id = blog_to_user.blog_id and blog_to_user.user_id = ' +
            param.user.userId
          : ''
      }
      group by blogs.blog_id, source_blogs.name, source_blogs.image, totalLikes
      ${param.user ? ', blog_to_user.is_liked' : ''}
      order by blogs.publish_date desc
      offset ${param.pageOptionsDto.skip} 
      limit ${param.pageOptionsDto.take}
    `)) as any[];

    const listBlog = query.map(blogFromDb => {
      return BlogServiceUtil.fromDbToBlogEntity({
        blogFromDb: blogFromDb,
        user: param.user,
      });
    });

    const itemCount = await this.blogRepository.count();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: param.pageOptionsDto,
    });
    return new PageDto(listBlog, pageMetaDto);
  }

  async getBookmarkedBlogWithPaginate(param: {
    page: number;
    user: UserEntity;
    dateBookmarkLastBlog?: string;
  }) {
    const TAKE = 15;
    const pageOptionsDto = new PageOptionsDto();
    pageOptionsDto.page = param.page; // in reality we dont need it
    pageOptionsDto.take = TAKE;
    const queryitems = await BlogServiceUtil.generateQueryForGettingBlogs({
      dataSource: this.dataSource,
      user: param.user,
      typeOfGet: {
        all: false,
        ofUserOnly: true,
      },
      pagination: {
        pageOptionsDto: pageOptionsDto,
        applyPagination: true,
      },
      likes: {
        getIsLiked: true,
        getLikes: true,
      },
      getTags: true,
      bookmarkInfo: {
        dateToCompareInBookmark: param.dateBookmarkLastBlog,
        getIsBookmarked: true,
        isOrderedByBlogBookmarkDate: true,
      },
      isOrderedByBlogPublishDate: false,
    });

    return queryitems.map(blogFromDb => {
      return BlogServiceUtil.fromDbToBlogEntity({
        blogFromDb: blogFromDb,
        user: param.user,
      });
    });
  }
}
