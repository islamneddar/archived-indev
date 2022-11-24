import {Module} from '@nestjs/common';
import { DatabaseOrm } from './database/db.config';
import { SourceBlogModule } from './bussiness/source_blog/source_blog.module';
import { BlogController } from './bussiness/blog/blog.controller';
import { BlogService } from './bussiness/blog/blog.service';
import { BlogModule } from './bussiness/blog/blog.module';
import { FeedBlogController } from './bussiness/feed_blog/feed_blog.controller';
import { FeedBlogService } from './bussiness/feed_blog/feed_blog.service';
import { FeedBlogModule } from './bussiness/feed_blog/feed_blog.module';

@Module({
    imports: [DatabaseOrm, SourceBlogModule, BlogModule, FeedBlogModule],
    controllers: [],
    providers: []
})
export class AppModule {
}
