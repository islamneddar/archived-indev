import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {SourceBlogEntity} from './source_blog.entity';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {PageDto} from '@/common/pagination/page.dto';
import {UserEntity} from '@/bussiness/user/user.entity';
import {
  contentTypeSourceBlog,
  TypeFeed,
} from '@/bussiness/feed_blog/feed-blog.proto';

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
               sourceBlogNumberTable.numberSourceBlogs as numberBlogs, 
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
        ) sourcemaxblogs on sourcemaxblogs.type = fb.type
        left join (
            select count(sb.name) as numberSourceBlogs, fb.type as type from source_blogs sb
            left join feed_blogs fb on sb.feed_blog_id = fb.feed_blog_id
            where sb.black_list = false
            group by fb.type
            
        ) sourceBlogNumberTable on sourceBlogNumberTable.type = fb.type
        where sb.black_list = false
        group by fb.type, numberBlogs, sourcemaxblogs.sourceBlogName, SourceBlogImage
        order by SourceBlogName desc
      `,
    );

    return query2.map((result: any) => {
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

  async findAllByType(param: {
    pagePaginationDto: PageOptionsDto;
    typeSource: TypeFeed;
    user: UserEntity;
  }) {
    const query = await this.dataSource.query(`
      select sb.source_blog_id as sourceBlogId,
              sb.name as sourceblogname,
              sb.image as sourceblogimage,
              ufsb.isFollow as isFollow,
              numberFollowers.numberFollowers as numberFollowers
      from source_blogs sb
      left join (
          select is_follow as isFollow, source_blog_id
          from source_blog_to_user sbtu
          where sbtu.user_id = ${param.user.userId} 
      ) ufsb on ufsb.source_blog_id = sb.source_blog_id
      left join (
          select count(source_blog_to_user_id) as numberFollowers, source_blog_id
          from source_blog_to_user sbtu
          where sbtu.is_follow = true
          group by source_blog_id
      ) numberFollowers on numberFollowers.source_blog_id = sb.source_blog_id
      where sb.black_list = false
      and sb.feed_blog_id in (  
          select fb.feed_blog_id
          from feed_blogs fb
          where fb.type = '${param.typeSource}'
      )
      offset ${param.pagePaginationDto.skip}
      limit ${param.pagePaginationDto.take}
    `);

    const queryCount = await this.dataSource.query(`
      select count(sb.source_blog_id) as numberSourceBlogs
      from source_blogs sb
      where sb.black_list = false
      and sb.feed_blog_id in (
          select fb.feed_blog_id
          from feed_blogs fb
          where fb.type = '${param.typeSource}'
      )
    `);

    const listSourceBlog = query.map((result: any) => {
      return {
        sourceBlogId: result.sourceblogid,
        name: result.sourceblogname,
        image: result.sourceblogimage,
        isFollow: result.isfollow,
        numberFollowers: result.numberfollowers,
      };
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: queryCount[0].numbersourceblogs as number,
      pageOptionsDto: param.pagePaginationDto,
    });
    return new PageDto(listSourceBlog, pageMetaDto);
  }
}
