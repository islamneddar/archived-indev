import {Module} from '@nestjs/common';
import {DatabaseOrm} from './database/db.config';
import {SourceBlogModule} from './bussiness/source_blog/source_blog.module';
import {BlogModule} from './bussiness/blog/blog.module';
import {FeedBlogModule} from './bussiness/feed_blog/feed_blog.module';
import {ScheduleModule} from "@nestjs/schedule";
import {BlogPollerModule} from './cron_jobs/blog_poller/blog_poller.module';
import {TagModule} from "./bussiness/tag/tag.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseOrm,
        SourceBlogModule,
        BlogModule,
        FeedBlogModule,
        BlogPollerModule,
        TagModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {
}
