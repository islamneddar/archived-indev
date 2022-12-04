import {Logger, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SourceBlogModule} from './bussiness/source_blog/source_blog.module';
import {BlogModule} from './bussiness/blog/blog.module';
import {FeedBlogModule} from './bussiness/feed_blog/feed_blog.module';
import {ScheduleModule} from "@nestjs/schedule";
import {BlogPollerModule} from './cron_jobs/blog_poller/blog_poller.module';
import {TagModule} from "./bussiness/tag/tag.module";

import DBModule from "./database/db.config";

const LOG = new Logger("AppModule");

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ScheduleModule.forRoot(),
        DBModule,
        SourceBlogModule,
        BlogModule,
        FeedBlogModule,
        BlogPollerModule,
        TagModule,
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {
}
