import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {FeedBlogStatsEntity} from '@/bussiness/feed-blog/feed-blog-type-stats/feed-blog-type-stats-entity';
import {
  contentTypeSourceBlog,
  TypeFeed,
} from '@/bussiness/feed-blog/feed_blog/feed-blog.proto';

@Injectable()
export class FeedBlogTypeStatsService {
  constructor(
    @InjectRepository(FeedBlogStatsEntity)
    private feedBlogTypeStatsRepository: Repository<FeedBlogStatsEntity>,
    private dataSource: DataSource,
  ) {}

  async createOrUpdate(feedBlogStats: FeedBlogStatsEntity) {
    const feedBlogStatsFound = await this.feedBlogTypeStatsRepository.findOne({
      where: {
        type: feedBlogStats.type,
      },
    });

    if (feedBlogStatsFound) {
      feedBlogStatsFound.sourceBlogImage = feedBlogStats.sourceBlogImage;
      feedBlogStatsFound.sourceBlogName = feedBlogStats.sourceBlogName;
      feedBlogStatsFound.nbBlogs = feedBlogStats.nbBlogs;
      return this.feedBlogTypeStatsRepository.save(feedBlogStatsFound);
    } else {
      return this.feedBlogTypeStatsRepository.save(feedBlogStats);
    }
  }

  async findByMaxBlogNumber() {
    const sourceBlogsByType = [];
    for (const type of Object.values(TypeFeed)) {
      const query = await this.dataSource.query(`
      select
            fb.type as feedType,
            sb.name as sourceName,
            sb.image as sourceImage,
            count(b.blog_id) as blogsCount
          from blogs b
                 left join source_blogs sb on b.source_blog_id = sb.source_blog_id
                 left join feed_blogs fb on sb.feed_blog_id = fb.feed_blog_id
          where fb.type = '${type}'
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
    `);
      if (query.length !== 0) {
        const sourceBlogWithMostBlogsArray = query.map((result: any) => {
          console.log(result);
          return {
            type: result.feedtype,
            content: contentTypeSourceBlog[result.feedtype],
            nbBlogs: result.blogscount,
            featuredBlog: {
              sourceBlogName: result.sourcename,
              sourceBlogImage: result.sourceimage,
            },
          };
        });
        const sourceBlogWithMostBlogs = sourceBlogWithMostBlogsArray[0];
        console.log(sourceBlogWithMostBlogs);
        const feedBlogStats = new FeedBlogStatsEntity();
        feedBlogStats.type = sourceBlogWithMostBlogs.type;
        feedBlogStats.sourceBlogImage =
          sourceBlogWithMostBlogs.featuredBlog.sourceBlogImage;
        feedBlogStats.sourceBlogName =
          sourceBlogWithMostBlogs.featuredBlog.sourceBlogName;
        feedBlogStats.nbBlogs = sourceBlogWithMostBlogs.nbBlogs;

        await this.createOrUpdate(feedBlogStats);

        sourceBlogsByType.push(sourceBlogWithMostBlogs);
      }
    }
    return sourceBlogsByType;
  }
}
