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
} from '@/bussiness/blog-domain/feed-blog/feed_blog/feed-blog.proto';

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

  /**
   * @deprecated remove after the migraiton
   */
  async findAllTypes() {
    const query2 = await this.dataSource.query(
      `
        select distinct (fb.type), 
               count(fb.type) as numberblogs, 
               featuredBlog.sourceName as sourceBlogName,
                featuredBlog.sourceImage as sourceBlogImage
        from source_blogs sb
        left join feed_blogs fb on sb.feed_blog_id = fb.feed_blog_id
        left join (
          select
            fb.type as feedType,
            sb.name as sourceName,
            sb.image as sourceImage,
            count(b.blog_id) as blogsCount
          from blogs b
                 left join source_blogs sb on b.source_blog_id = sb.source_blog_id
                 left join feed_blogs fb on sb.feed_blog_id = fb.feed_blog_id
          group by
            fb.type,
            sb.name,
            sb.image
          HAVING COUNT(b.blog_id) = (
            SELECT MAX(blog_count)
            FROM (
                   SELECT COUNT(b2.blog_id) AS blog_count, fb2.type
                   FROM blogs b2
                          LEFT JOIN source_blogs sb2 ON b2.source_blog_id = sb2.source_blog_id
                          LEFT JOIN feed_blogs fb2 ON sb2.feed_blog_id = fb2.feed_blog_id
                   GROUP BY fb2.type, sb2.source_blog_id
                 ) AS blog_counts
            WHERE blog_counts.type = fb.type
          )
        ) as featuredBlog on featuredBlog.feedType = fb.type
        
        where sb.black_list = false
        group by fb.type, sourceBlogName, sourceBlogImage
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

  async findAllTypesV2() {
    const query2 = await this.dataSource.query(
      `
        select distinct (fb.type), 
               count(fb.type) as numberblogs, 
               fbs.source_blog_name as sourceBlogName,
                fbs.source_blog_image as sourceBlogImage
        from source_blogs sb
        left join feed_blogs fb on sb.feed_blog_id = fb.feed_blog_id
        left join feed_blogs_stats fbs on fbs.type::text = fb.type::text
        where sb.black_list = false
        group by fb.type, sourceBlogName, sourceBlogImage
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
