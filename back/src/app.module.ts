import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {AdminModule} from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {APP_GUARD} from '@nestjs/core';
import {SourceBlogModule} from '@/bussiness/source-blog/source_blog.module';
import {BlogModule} from './bussiness/blog/blog.module';
import {FeedBlogModule} from '@/bussiness/feed-blog/feed_blog/feed_blog.module';
import {BlogPollerModule} from '@/jobs/blog_poller/blog_poller.module';
import {TagModule} from './bussiness/tag/tag.module';
import DBModule from './database/db.config';
import {FeedBlogEntity} from '@/bussiness/feed-blog/feed_blog/feed_blog.entity';
import {BlogEntity} from './bussiness/blog/blog.entity';
import {SourceBlogEntity} from '@/bussiness/source-blog/source_blog.entity';
import {TagEntity} from './bussiness/tag/tag.entity';
import {EmailNewsletterModule} from './bussiness/email_newsletter/email_newsletter.module';
import {EmailValidationModule} from '@/bussiness/email_validation/email_validation.module';
import {UserModule} from '@/bussiness/user/user.module';
import {AuthModule} from '@/bussiness/auth/auth.module';
import {MailingModule} from '@/bussiness/mailing/mailing.module';
import {MailingConfig} from '@/bussiness/mailing/mailing.config';
import {SourceBlogToUserModule} from '@/bussiness/source-blog-user/source-blog-use.module';
import {BlogToUserModule} from '@/bussiness/blog-user/blog-user.module';
import {FeedBlogTypeStatsModule} from '@/bussiness/feed-blog/feed-blog-type-stats/feed-blog-type-stats.module';
import {StatsCalculatorModule} from '@/jobs/stats-calculator/stats-calculator.module';
import {UserEntity} from '@/bussiness/user/user.entity';

const DEFAULT_ADMIN = {
  email: 'lemsijoker',
  password: 'joker12345678',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailingConfig,
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            FeedBlogEntity,
            BlogEntity,
            SourceBlogEntity,
            TagEntity,
            UserEntity,
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
          secret: 'secret',
        },
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 25,
    }),
    ScheduleModule.forRoot(),
    DBModule,
    UserModule,
    SourceBlogModule,
    BlogModule,
    FeedBlogModule,
    BlogPollerModule,
    TagModule,
    EmailNewsletterModule,
    EmailValidationModule,
    AuthModule,
    MailingModule,
    SourceBlogToUserModule,
    BlogToUserModule,
    FeedBlogTypeStatsModule,
    StatsCalculatorModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export default class AppModule {}
