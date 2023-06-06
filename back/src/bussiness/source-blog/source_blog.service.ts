import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {SourceBlogEntity} from './source_blog.entity';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {PageDto} from '@/common/pagination/page.dto';
import {UserEntity} from '@/bussiness/user/user.entity';
import {contentTypeSourceBlog} from '@/bussiness/feed_blog/feed-blog.proto';

@Injectable()
export class SourceBlogService {
  constructor(
    @InjectRepository(SourceBlogEntity)
    private sourceBlogRepository: Repository<SourceBlogEntity>,
    private dataSource: DataSource,
  ) {}

  async save(sourceBlog: SourceBlogEntity): Promise<SourceBlogEntity> {
    return this.sourceBlogRepository.save(sourceBlog);
  }

  findAll(): Promise<SourceBlogEntity[]> {
    return this.sourceBlogRepository.find();
  }

  async getByTitle(titleFeed: string) {
    return this.sourceBlogRepository.findOne({
      where: {
        name: titleFeed,
      },
    });
  }
  async findAllWithPagination(param: {
    paginationDto: PageOptionsDto;
    user: UserEntity;
  }) {
    const query = this.sourceBlogRepository
      .createQueryBuilder('sourceBlog')
      .leftJoin('sourceBlog.sourceBlogToUsers', 'sourceBlogToUsers')
      .leftJoin('sourceBlogToUsers.user', 'user', 'user.userId = :userId', {
        userId: param.user.userId,
      })
      .select('sourceBlog.name')
      .addSelect('sourceBlog.sourceBlogId')
      .addSelect('sourceBlog.image')
      .addSelect('sourceBlogToUsers.isFollow')
      .orderBy('sourceBlog.name', 'ASC')
      .where('sourceBlog.blackList = false')
      .skip(param.paginationDto.skip)
      .take(param.paginationDto.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();
    const entitiesToReturn = entities.map(sourceBlog => {
      if (sourceBlog.sourceBlogToUsers.length === 0) {
        return {
          sourceBlogId: sourceBlog.sourceBlogId,
          name: sourceBlog.name,
          image: sourceBlog.image,
          isFollow: false,
        };
      } else {
        return {
          sourceBlogId: sourceBlog.sourceBlogId,
          name: sourceBlog.name,
          image: sourceBlog.image,
          isFollow: sourceBlog.sourceBlogToUsers[0].isFollow,
        };
      }
    });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: param.paginationDto,
    });
    return new PageDto(entitiesToReturn, pageMetaDto);
  }

  findById(sourceBlogId: number) {
    return this.sourceBlogRepository.findOne({
      where: {
        sourceBlogId,
      },
    });
  }

  async findAllTypes() {
    const query2 = await this.dataSource.query(
      `
        select fb.type, 
               count(fb.type) as numberFeedInType, 
               sourcemaxblogs.number_blogs as numberBlogs, 
               sourcemaxblogs.sourceBlogName  as SourceBlogName,
               sourcemaxblogs.sourceBlogImage as SourceBlogImage
        from source_blogs sb
        left join feed_blogs fb on sb.feed_blog_id = fb.feed_blog_id
        left join (
            select sb.name as sourceBlogName, sb.image as sourceBlogImage, count(b.blog_id) as number_blogs, fb.type as type from blogs b
            left join source_blogs sb on b.source_blog_id = sb.source_blog_id
            left join feed_blogs fb on sb.feed_blog_id = fb.feed_blog_id
            where sb.black_list = false
            group by fb.type, sb.name, sourceBlogImage
            order by number_blogs desc
            limit 1
        ) sourcemaxblogs on sourcemaxblogs.type = fb.type
        where sb.black_list = false
        group by fb.type, numberBlogs, sourcemaxblogs.sourceBlogName, SourceBlogImage
      `,
    );

    return query2.map((result: any) => {
      console.log(result);
      return {
        value: result.type,
        content: contentTypeSourceBlog[result.type],
        nbBlogs: result.numberblogs,
        featuredBlog: {
          sourceBlogName: result.sourceblogname,
          sourceBlogImage: result.sourceblogimage,
        },
      };
    });
  }
}
