import {UserModule} from '@/bussiness/user/user.module';
import {SourceBlogModule} from '@/bussiness/domains/blog/source-blog/source_blog.module';
import {BlogModule} from '@/bussiness/domains/blog/blog/blog.module';
import {FeedBlogModule} from '@/bussiness/domains/blog/feed-blog/feed_blog/feed_blog.module';
import {BlogPollerModule} from '@/jobs/blog_poller/blog_poller.module';
import {TagModule} from '@/bussiness/domains/blog/tag/tag.module';
import {EmailNewsletterModule} from '@/bussiness/email_newsletter/email_newsletter.module';
import {EmailValidationModule} from '@/bussiness/email_validation/email_validation.module';
import {AuthModule} from '@/bussiness/auth/auth.module';
import {MailingModule} from '@/external-services/mailing/mailing.module';
import {SourceBlogToUserModule} from '@/bussiness/domains/blog/source-blog-user/source-blog-use.module';
import {BlogToUserModule} from '@/bussiness/domains/blog/blog-user/blog-user.module';
import {FeedBlogTypeStatsModule} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats.module';
import {StatsCalculatorModule} from '@/jobs/stats-calculator/stats-calculator.module';
import {AiToolCategoryModule} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.module';
import {AiToolModule} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.module';
import {S3AppModule} from '@/external-services/aws-s3/s3-app.module';

export const modules = [
  // domains
  UserModule,
  SourceBlogModule,
  BlogModule,
  FeedBlogModule,
  TagModule,
  EmailNewsletterModule,
  EmailValidationModule,
  SourceBlogToUserModule,
  BlogToUserModule,
  FeedBlogTypeStatsModule,
  AiToolCategoryModule,
  AiToolModule,

  // external services
  S3AppModule,
  MailingModule,

  // auth
  AuthModule,

  // jobs
  BlogPollerModule,
  StatsCalculatorModule,
];
