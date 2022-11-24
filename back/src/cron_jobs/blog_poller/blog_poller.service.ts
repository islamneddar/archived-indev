import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {FeedBlogService} from "../../bussiness/feed_blog/feed_blog.service";
import Parser from "rss-parser";
import axios from "axios";
import {FeedBlogEntity} from "../../bussiness/feed_blog/feed_blog.entity";
import {SourceBlogEntity} from "../../bussiness/source_blog/source_blog.entity";
import {SourceBlogService} from "../../bussiness/source_blog/source_blog.service";
import {BlogService} from "../../bussiness/blog/blog.service";
import {BlogEntity} from "../../bussiness/blog/blog.entity";
import {DataSource} from "typeorm";

@Injectable()
export class BlogPollerService {
    private readonly logger = new Logger(BlogPollerService.name);
    private feed: any;
    private currentUrl: string;
    private parser: Parser = new Parser({
        customFields: {
            item: [
                ['content:encoded', 'contentEncoded'],
                ['media:content', 'mediaContent']
            ]
        }
    });

    constructor(
        private feedBlogService: FeedBlogService,
        private sourceBlogService: SourceBlogService,
        private blogService: BlogService,
        private dataSource: DataSource
    ) {
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        const feedBlogs = await this.feedBlogService.getAll()
        for (const feedBlog of feedBlogs) {
            try {
                this.logger.debug(feedBlog.urlFeed)
                this.currentUrl = feedBlog.urlFeed;
                await this.readAndCreateBlogs(feedBlog)
            } catch (err) {
                this.logger.error(err)
            }
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
            await this.initFeed()
        } catch (err) {
            const feedContent = await axios.get(feedBlog.urlFeed);
            await this.initFeedString(feedContent.data)
        }
        const sourceBlog = await this.getInfoSourceBlog(feedBlog.urlFeed)
        for (const item of this.feed.items) {
            const blogCheck: BlogEntity = await this.blogService.getByTitle(item.title)
            if (blogCheck === null) {
                let blog = new BlogEntity();
                blog.title = item.title;
                blog.publishDate = item.pubDate
                blog.thumbnail = this.retrieveImageFromFeed(item)
                blog.permalink = item.link
                blog.sourceBlog = sourceBlog
                //blog.tags = await this.retrieveBlogTags(item)
                // TODO to enable later but find a way how to save in data base or put content snippet
                //blog.content = "";//item.content
                await this.dataSource.transaction(async t => {
                    const blogCreated = await this.blogService.getOrCreate(blog);
                    this.logger.debug(blogCreated)
                    /*const blogTags = blog.tags
                                        if (blogTags !== undefined) {
                                            for (const blogTag of blogTags) {
                                                blogTag.blogId = blogSaved.blogId;
                                                await BlogTagRepositories.getInstance().getOrCreate(blogTag)
                                            }
                                        }*/
                })
            } else {
                break;
            }
        }
    }

    async getInfoSourceBlog(feedBlog: string): Promise<SourceBlogEntity> {
        let titleFeed: string = this.feed.title;
        let sourceBlog: SourceBlogEntity | null = await this.sourceBlogService.getByTitle(titleFeed)
        if (sourceBlog === null) {
            sourceBlog = new SourceBlogEntity()
            sourceBlog.name = titleFeed;
            if (this.feed.image !== undefined) {
                sourceBlog.image = this.feed.image?.url
            } else {
                sourceBlog.image = "https://ui-avatars.com/api/?name=" + titleFeed
            }
            return await this.sourceBlogService.save(sourceBlog)
        }
        return sourceBlog
    }

    private retrieveImageFromFeed(itemFeed: any) {
        let imageContent = ""
        if (itemFeed.mediaContent !== undefined && itemFeed.mediaContent['$'].url !== null) {
            imageContent = itemFeed.mediaContent['$'].url
        } else {
            let retreiveImageFrom = itemFeed.content
            if (itemFeed.contentEncoded !== undefined) {
                retreiveImageFrom = itemFeed.contentEncoded
            }
            const re = /<img[^>]+src="?([^"\s]+)"?[^>]*>/g;
            const results = re.exec(retreiveImageFrom);
            if (results) imageContent = results[1];
        }
        return imageContent
    }

}
