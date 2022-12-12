import {Logger, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SourceBlogModule} from './bussiness/source_blog/source_blog.module';
import {BlogModule} from './bussiness/blog/blog.module';
import {FeedBlogModule} from './bussiness/feed_blog/feed_blog.module';
import {ScheduleModule} from "@nestjs/schedule";
import {BlogPollerModule} from './cron_jobs/blog_poller/blog_poller.module';
import {TagModule} from "./bussiness/tag/tag.module";

import DBModule from "./database/db.config";
import {AdminModule} from "@adminjs/nestjs";
import AdminJS from "adminjs";
import * as AdminJSTypeorm from '@adminjs/typeorm'
import {FeedBlogEntity} from "./bussiness/feed_blog/feed_blog.entity";
import {BlogEntity} from "./bussiness/blog/blog.entity";
import {SourceBlogEntity} from "./bussiness/source_blog/source_blog.entity";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";

const LOG = new Logger("AppModule");

const DEFAULT_ADMIN = {
    email: 'lemsijoker',
    password: 'joker12345678',
}

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}
AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
})

@Module({
    imports: [
        AdminModule.createAdminAsync({
            useFactory: () => ({
                adminJsOptions: {
                    rootPath: '/admin',
                    resources: [
                        FeedBlogEntity,
                        BlogEntity,
                        SourceBlogEntity
                    ],
                },
                auth: {
                    authenticate,
                    cookieName: 'adminjs',
                    cookiePassword: 'secret',
                },
                sessionOptions: {
                    resave: true,
                    saveUninitialized: true,
                    secret: 'secret'
                },
            }),
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 85,
        }),
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
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        }
    ],
    exports: []
})
export class AppModule {
}
