import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {FeedBlogService} from "../../bussiness/feed_blog/feed_blog.service";

@Injectable()
export class BlogPollerService {
    private readonly logger = new Logger(BlogPollerService.name);

    constructor(private feedBlogService : FeedBlogService) {
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        const feedBlog = await this.feedBlogService.getAll()
        this.logger.debug(feedBlog)
    }
}
