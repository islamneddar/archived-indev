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
import {TagEntity} from "../../bussiness/tag/tag.entity";
import {TagService} from "../../bussiness/tag/tag.service";
const arrayLodash = require('lodash/array');

@Injectable()
export class BlogPollerService {
    private readonly logger = new Logger(BlogPollerService.name);
    private feed: any;
    private currentUrl: string;

    private readonly listImagesThmubnailsBlogs = [
        "https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg",
        "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/02/20/15/15/check-2082845_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/01/31/20/52/web-3967926_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/05/14/17/07/web-development-4202909_960_720.png",
        "https://cdn.pixabay.com/photo/2018/03/15/10/35/website-3227784_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/09/08/04/12/programmer-1653351_960_720.png",
        "https://cdn.pixabay.com/photo/2018/05/04/20/01/website-3374825_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_960_720.png",
        "https://cdn.pixabay.com/photo/2019/12/12/11/40/engineer-4690505_960_720.jpg",
        "https://cdn.pixabay.com/photo/2020/03/05/16/44/engineer-4904884_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_960_720.png",
        "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/19/14/16/man-1839500_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076533_960_720.jpg",
        "https://cdn.pixabay.com/photo/2014/12/30/05/42/source-code-583537_960_720.jpg",
    ]


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
        private tagService : TagService,
        private dataSource: DataSource
    ) {
    }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async handleCron() {
        if(process.env.NODE_ENV === "production"){
            const feedBlogs = await this.feedBlogService.getAll()
            for (const feedBlog of feedBlogs) {
                try {
                    this.logger.debug("feed blog " + feedBlog.urlFeed)
                    this.currentUrl = feedBlog.urlFeed;
                    await this.readAndCreateBlogs(feedBlog)
                } catch (err) {
                    this.logger.error(err)
                }
            }
        }


    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCronDev() {
        if(process.env.NODE_ENV === "development"){
            const feedBlogs = await this.feedBlogService.getAll()
            for (const feedBlog of feedBlogs) {
                try {
                    this.logger.debug("feed blog " + feedBlog.urlFeed)
                    this.currentUrl = feedBlog.urlFeed;
                    await this.readAndCreateBlogs(feedBlog)
                } catch (err) {
                    this.logger.error(err)
                }
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
        const sourceBlog = await this.getInfoSourceBlog(feedBlog)
        for (const item of this.feed.items) {
            const blogCheck: BlogEntity = await this.blogService.getByTitle(item.title)
            if (blogCheck === null) {
                let blog = new BlogEntity();
                blog.title = item.title;
                blog.publishDate = new Date(item.pubDate)
                blog.thumbnail = this.retrieveImageFromFeed(item)
                blog.permalink = item.link
                blog.sourceBlog = sourceBlog
                blog.tags = await this.retrieveBlogTags(item)
                // TODO to enable later but find a way how to save in data base or put content snippet
                //blog.content = "";//item.content
                await this.dataSource.transaction(async t => {
                    const blogCreated = await this.blogService.getOrCreate(blog);
                    this.logger.debug("blog created : ", blogCreated)
                })
            } else {
                this.logger.debug("blog already all seen")
                break;
            }
        }
    }

    async getInfoSourceBlog(feedBlog: FeedBlogEntity): Promise<SourceBlogEntity> {
        let titleFeed: string = this.feed.title;
        let sourceBlog: SourceBlogEntity | null = await this.sourceBlogService.getByTitle(titleFeed)
        if (sourceBlog === null) {
            sourceBlog = new SourceBlogEntity()
            sourceBlog.name = titleFeed;
            sourceBlog.feedBlog = feedBlog;
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
        if(imageContent.length === 0 ) {
            imageContent = this.listImagesThmubnailsBlogs[Math.floor(Math.random()*this.listImagesThmubnailsBlogs.length)]
        }
        return imageContent
    }

    private async retrieveBlogTags(item: any) : Promise<TagEntity[]> {
        const blogTags: TagEntity[] = []
        if (item.categories !== undefined) {
            for (let category of item.categories) {
                if (typeof category == "object") {
                    category = category._
                }
                const blogTag = await this.tagService.getByTitleOrCreate(category)
                blogTags.push(blogTag)
            }
        }
        return blogTags
    }
}
