import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceBlogEntity } from '../bussiness/source_blog/source_blog.entity';
import { BlogEntity } from '../bussiness/blog/blog.entity';
import { FeedBlogEntity } from '../bussiness/feed_blog/feed_blog.entity';
import { TagEntity } from '../bussiness/tag/tag.entity';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { NewsletterEmailEntity } from '../bussiness/email_newsletter/email_newsletter.entity';

const LOG = new Logger('db.config');

//const rdsCa = fs.readFileSync(`${__dirname}/../../ca-certificate.crt`);

const DBModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: () => {
    const listEntities = [
      SourceBlogEntity,
      BlogEntity,
      FeedBlogEntity,
      TagEntity,
      NewsletterEmailEntity,
    ];
    LOG.log(process.env.DB_PORT);
    LOG.log(process.env.DB_USERNAME);
    LOG.log(process.env.DB_PASSWORD);
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
    } else {
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
    }
  },
  inject: [ConfigService],
});

export default DBModule;
