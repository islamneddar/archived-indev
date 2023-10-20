import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import {SourceBlogEntity} from '@/bussiness/domains/blog/source-blog/source_blog.entity';
import {BlogEntity} from '@/bussiness/domains/blog/blog/blog.entity';
import {FeedBlogEntity} from '@/bussiness/domains/blog/feed-blog/feed_blog/feed_blog.entity';
import {TagEntity} from '@/bussiness/domains/blog/tag/tag.entity';
import {NewsletterEmailEntity} from '@/bussiness/email_newsletter/email_newsletter.entity';
import {UserEntity} from '@/bussiness/domains/user/user.entity';
import {EmailValidationEntity} from '@/bussiness/email_validation/email_valdation.entity';
import {SourceBlogToUserEntity} from '@/bussiness/domains/blog/source-blog-user/source-blog-to-user.entity';
import {BlogToUserEntity} from '@/bussiness/domains/blog/blog-user/blog-user.entity';
import {FeedBlogStatsEntity} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats-entity';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {AdminInAiTimesEntity} from '@/bussiness/inaitimer-admin/inaitimer-admin.entity';
import {AiToolCategoryEntity} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.entity';

const DBModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],

  useFactory: () => {
    const listEntities = [
      SourceBlogEntity,
      BlogEntity,
      FeedBlogEntity,
      TagEntity,
      NewsletterEmailEntity,
      UserEntity,
      EmailValidationEntity,
      SourceBlogToUserEntity,
      BlogToUserEntity,
      FeedBlogStatsEntity,
      AiToolEntity,
      AdminInAiTimesEntity,
      AiToolCategoryEntity,
    ];
    if (process.env.NODE_ENV === 'development') {
      const configToReturn: TypeOrmModuleOptions = {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5433,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'indev-local',
        entities: listEntities,
        synchronize: true,
        logging: false,
      };
      return configToReturn;
    }
    const configToReturn: TypeOrmModuleOptions = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5433,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'indev-local',
      entities: listEntities,
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    return configToReturn;
  },
  inject: [ConfigService],
});

export default DBModule;
