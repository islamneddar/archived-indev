import {TypeOrmModule} from "@nestjs/typeorm";
import {SourceBlogEntity} from "../bussiness/source_blog/source_blog.entity";
import {BlogEntity} from "../bussiness/blog/blog.entity";
import {FeedBlogEntity} from "../bussiness/feed_blog/feed_blog.entity";
import {TagEntity} from "../bussiness/tag/tag.entity";

export const DatabaseOrm = TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'indev_staging',
    entities: [SourceBlogEntity,
        BlogEntity,
        FeedBlogEntity,
        TagEntity
    ],
    synchronize: false,
    logging : false
})