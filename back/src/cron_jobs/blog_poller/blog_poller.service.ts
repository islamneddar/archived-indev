import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Parser from 'rss-parser';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { FeedBlogService } from '../../bussiness/feed_blog/feed_blog.service';
import { FeedBlogEntity } from '../../bussiness/feed_blog/feed_blog.entity';
import { SourceBlogEntity } from '../../bussiness/source_blog/source_blog.entity';
import { SourceBlogService } from '../../bussiness/source_blog/source_blog.service';
import { BlogService } from '../../bussiness/blog/blog.service';
import { BlogEntity } from '../../bussiness/blog/blog.entity';
import { TagEntity } from '../../bussiness/tag/tag.entity';
import { TagService } from '../../bussiness/tag/tag.service';

@Injectable()
export default class BlogPollerService {
  private readonly logger = new Logger(BlogPollerService.name);

  private feed: any;

  private currentUrl: string;

  private parser: Parser = new Parser({
    customFields: {
      item: [
        ['content:encoded', 'contentEncoded'],
        ['media:content', 'mediaContent'],
      ],
    },
  });

  constructor(
    private feedBlogService: FeedBlogService,
    private sourceBlogService: SourceBlogService,
    private blogService: BlogService,
    private tagService: TagService,
    private dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    if (process.env.NODE_ENV === 'production') {
      const feedBlogs = await this.feedBlogService.getAll();
      feedBlogs.forEach(async (feedBlog) => {
        try {
          this.logger.debug(`feed blog ${feedBlog.urlFeed}`);
          this.currentUrl = feedBlog.urlFeed;
          await this.readAndCreateBlogs(feedBlog);
        } catch (err) {
          this.logger.error(err);
        }
      });
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronDev() {
    if (process.env.NODE_ENV === 'development') {
      const feedBlogs = await this.feedBlogService.getAll();
      feedBlogs.forEach(async (feedBlog) => {
        try {
          this.logger.debug(`feed blog ${feedBlog.urlFeed}`);
          this.currentUrl = feedBlog.urlFeed;
          await this.readAndCreateBlogs(feedBlog);
        } catch (err) {
          this.logger.error(err);
        }
      });
    }
  }

  async initFeed() {
    this.feed = await this.parser.parseURL(this.currentUrl);
  }

  async initFeedString(feedContent: string) {
    this.feed = await this.parser.parseString(feedContent);
  }

  public async readAndCreateBlogs(feedBlog: FeedBlogEntity) {
    try {
      await this.initFeed();
    } catch (err) {
      const feedContent = await axios.get(feedBlog.urlFeed);
      await this.initFeedString(feedContent.data);
    }
    const sourceBlog = await this.getInfoSourceBlog(feedBlog);
    if (sourceBlog.blackList) {
      this.logger.log(`source blog ${sourceBlog.name} is black listed`);
      return;
    }

    this.feed.items.every(async (item) => {
      const blogCheck: BlogEntity = await this.blogService.getByTitle(
        item.title,
      );
      if (blogCheck !== null) {
        this.logger.debug('blog already all seen');
        return false;
      }
      const blog = new BlogEntity();
      blog.title = item.title;
      blog.publishDate = new Date(item.pubDate);
      blog.thumbnail = BlogPollerService.retrieveImageFromFeed(item);
      blog.permalink = item.link;
      blog.sourceBlog = sourceBlog;
      blog.tags = await this.retrieveBlogTags(item);
      // TODO to enable later but find a way how to save in data base or put content snippet
      // blog.content = "";//item.content
      await this.dataSource.transaction(async () => {
        const blogCreated = await this.blogService.getOrCreate(blog);
        this.logger.debug('blog created : ', blogCreated);
      });
      return true;
    });
  }

  async getInfoSourceBlog(feedBlog: FeedBlogEntity): Promise<SourceBlogEntity> {
    const titleFeed: string = this.feed.title;
    let sourceBlog: SourceBlogEntity | null =
      await this.sourceBlogService.getByTitle(titleFeed);
    if (sourceBlog === null) {
      sourceBlog = new SourceBlogEntity();
      sourceBlog.name = titleFeed;
      sourceBlog.feedBlog = feedBlog;
      if (this.feed.image !== undefined) {
        sourceBlog.image = this.feed.image?.url;
      } else {
        sourceBlog.image = `https://ui-avatars.com/api/?name=${titleFeed}`;
      }
      return this.sourceBlogService.save(sourceBlog);
    }
    return sourceBlog;
  }

  private static retrieveImageFromFeed(itemFeed: any) {
    let imageContent = '';
    if (
      itemFeed.mediaContent !== undefined &&
      itemFeed.mediaContent.$.url !== null
    ) {
      imageContent = itemFeed.mediaContent.$.url;
    } else {
      let retrieveImageFrom = itemFeed.content;
      if (itemFeed.contentEncoded !== undefined) {
        retrieveImageFrom = itemFeed.contentEncoded;
      }
      const re = /<img[^>]+src="?([^"\s]+)"?[^>]*>/g;
      const results = re.exec(retrieveImageFrom);
      if (results) {
        const [imageContentInfo] = results[1];
        imageContent = imageContentInfo;
      }
    }

    return imageContent;
  }

  private async retrieveBlogTags(item: any): Promise<TagEntity[]> {
    const blogTags: TagEntity[] = [];
    if (item.categories !== undefined) {
      item.categories.forEach(async (category) => {
        // eslint-disable-next-line prettier/prettier
        const categoryInfo =
          typeof category === 'object' ? category._ : category;
        const blogTag = await this.tagService.getByTitleOrCreate(categoryInfo);
        blogTags.push(blogTag);
      });
    }
    return blogTags;
  }
}
