import {Module} from '@nestjs/common';
import {DatabaseOrm} from './database/db.config';
import {SourceBlogModule} from './bussiness/source_blog/source_blog.module';
import {BlogModule} from './bussiness/blog/blog.module';
import {FeedBlogModule} from './bussiness/feed_blog/feed_blog.module';
import {ScheduleModule} from "@nestjs/schedule";
import {BlogPollerModule} from './cron_jobs/blog_poller/blog_poller.module';
import {TagModule} from "./bussiness/tag/tag.module";
import {ConfigModule} from "@nestjs/config";
import {getEnvPath} from "./common/env/env.helper";
import { ConfigEnvModule } from './bussiness/config_env/config_env.module';

const envFilePath: string = getEnvPath(`${__dirname}`);

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath,
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        DatabaseOrm,
        SourceBlogModule,
        BlogModule,
        FeedBlogModule,
        BlogPollerModule,
        TagModule,
        ConfigEnvModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {
}
