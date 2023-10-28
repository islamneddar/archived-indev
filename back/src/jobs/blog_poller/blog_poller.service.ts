import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import Parser from 'rss-parser';
import axios from 'axios';
import {DataSource} from 'typeorm';
import {FeedBlogService} from '@/bussiness/domains/blog/feed-blog/feed_blog/feed_blog.service';
import {FeedBlogEntity} from '@/bussiness/domains/blog/feed-blog/feed_blog/feed_blog.entity';
import {SourceBlogEntity} from '@/bussiness/domains/blog/source-blog/source_blog.entity';
import {SourceBlogService} from '@/bussiness/domains/blog/source-blog/source_blog.service';
import {BlogService} from '@/bussiness/domains/blog/blog/blog.service';
import {BlogEntity} from '@/bussiness/domains/blog/blog/blog.entity';
import {TagEntity} from '@/bussiness/domains/blog/tag/tag.entity';
import {TagService} from '@/bussiness/domains/blog/tag/tag.service';
import LOG from '@/utils/logger';

@Injectable()
export default class BlogPollerService {
  private readonly LOG = new Logger(BlogPollerService.name);

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

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    LOG.debug(
      '---------------------- new period of scrapping ----------------------',
    );
    if (process.env.NODE_ENV === 'production') {
      const feedBlogs = await this.feedBlogService.getAll();
      for (const feedBlog of feedBlogs) {
        LOG.debug(`start to read feed ${feedBlog.urlFeed}`);
        try {
          this.currentUrl = feedBlog.urlFeed;
          await this.readAndCreateBlogs(feedBlog);
        } catch (err) {
          this.LOG.error(err);
        }
      }
    }
    LOG.debug('---------------------- end of scrapping ----------------------');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronDev() {
    if (process.env.NODE_ENV === 'development') {
      const feedBlogs = await this.feedBlogService.getAll();
      for (const feedBlog of feedBlogs) {
        try {
          this.currentUrl = feedBlog.urlFeed;
          await this.readAndCreateBlogs(feedBlog);
        } catch (err) {
          this.LOG.error(err);
        }
      }
    }
  }

  async initFeed() {
    LOG.debug('init feed ' + this.currentUrl);
    this.feed = await this.parser.parseURL(this.currentUrl);
  }

  async initFeedString(feedContent: string) {
    LOG.debug('init feed string');
    this.feed = await this.parser.parseString(feedContent);
  }

  public async readAndCreateBlogs(feedBlog: FeedBlogEntity) {
    LOG.info('readAndCreateBlogs');
    try {
      await this.initFeed();
    } catch (err) {
      const feedContent = await axios.get(feedBlog.urlFeed);
      await this.initFeedString(feedContent.data);
    }
    const sourceBlog = await this.getInfoSourceBlog(feedBlog);
    if (sourceBlog.blackList) {
      return;
    }

    LOG.debug('source blog already getting');

    for (const item of this.feed.items) {
      const blogCheck: BlogEntity = await this.blogService.getByTitle(
        item.title,
      );
      LOG.debug('getting blog = ' + item.title);
      if (blogCheck !== null) {
        continue;
      }
      LOG.debug(`start to create blog ${item.title}`);
      const blog = new BlogEntity();
      blog.title = item.title;
      blog.publishDate = new Date(item.pubDate);
      blog.thumbnail = BlogPollerService.retrieveImageFromFeed(item);
      blog.permalink = item.link;
      blog.sourceBlog = sourceBlog;
      blog.tags = await this.retrieveBlogTags(item);
      // TODO to enable later but find a way how to save in data base or put content snippet
      // blog-section.content = "";//item.content
      await this.dataSource.transaction(async () => {
        await this.blogService.getOrCreate(blog);
      });
    }
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
        imageContent = results[1];
      }
    }
    return imageContent;
  }

  private async retrieveBlogTags(item: any): Promise<TagEntity[]> {
    const blogTags: TagEntity[] = [];
    if (item.categories !== undefined) {
      for (const category of item.categories) {
        // eslint-disable-next-line prettier/prettier
        const categoryInfo =
          typeof category === 'object' ? category._ : category;
        try {
          const blogTag = await this.tagService.getByTitleOrCreate(
            categoryInfo,
          );
          if (blogTag !== null) {
            blogTags.push(blogTag);
          }
        } catch (err) {
          this.LOG.error(`error to create tag ${categoryInfo}`);
          this.LOG.error(err);
        }
      }
    }
    return blogTags;
  }
}
