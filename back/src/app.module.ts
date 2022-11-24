import {Module} from '@nestjs/common';
import {DatabaseOrm} from './database/db.config';
import {SourceBlogModule} from './bussiness/source_blog/source_blog.module';
import {BlogModule} from './bussiness/blog/blog.module';
import {FeedBlogModule} from './bussiness/feed_blog/feed_blog.module';
import {ScheduleModule} from "@nestjs/schedule";
import {BlogPollerModule} from './cron_jobs/blog_poller/blog_poller.module';

@Module({
    imports: [ScheduleModule.forRoot(),
        DatabaseOrm,
        SourceBlogModule,
        BlogModule,
        FeedBlogModule,
        BlogPollerModule],
    controllers: [],
    providers: [],
    exports: [FeedBlogModule]
})
export class AppModule {
}
