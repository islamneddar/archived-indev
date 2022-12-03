import {TypeOrmModule} from "@nestjs/typeorm";
import {SourceBlogEntity} from "../bussiness/source_blog/source_blog.entity";
import {BlogEntity} from "../bussiness/blog/blog.entity";
import {FeedBlogEntity} from "../bussiness/feed_blog/feed_blog.entity";
import {TagEntity} from "../bussiness/tag/tag.entity";
import {Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as path from 'path';
const fs = require('fs');

const rdsCa = fs.readFileSync(`${__dirname}/../../ca-certificate.crt`);
const logger = new Logger("config")

const baseDir = path.join(__dirname, '../');

const configService = new ConfigService()

logger.debug(process.env.DB_PORT)
logger.debug(process.env.DB_NAME)
logger.debug(process.env.DB_USERNAME)
logger.debug(process.env.DB_PASSWORD)
logger.debug(process.env.DB_HOST)


export const DatabaseOrm = TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl : {
        ca : [rdsCa],
        rejectUnauthorized : true,
        require: true,
    },
    entities: [
        SourceBlogEntity,
        BlogEntity,
        FeedBlogEntity,
        TagEntity
    ],
    synchronize: false,
    logging : false
})