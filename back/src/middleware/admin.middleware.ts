import {AdminModule} from '@adminjs/nestjs';
import {FeedBlogEntity} from '@/bussiness/domains/blog/feed-blog/feed_blog/feed_blog.entity';
import {BlogEntity} from '@/bussiness/domains/blog/blog/blog.entity';
import {SourceBlogEntity} from '@/bussiness/domains/blog/source-blog/source_blog.entity';
import {TagEntity} from '@/bussiness/domains/blog/tag/tag.entity';
import {UserEntity} from '@/bussiness/domains/user/user.entity';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {AiToolCategoryEntity} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.entity';
import {AdminInAiTimesEntity} from '@/bussiness/inaitimer-admin/inaitimer-admin.entity';

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

export const adminJsMiddleware = AdminModule.createAdminAsync({
  useFactory: () => ({
    adminJsOptions: {
      rootPath: '/admin',
      resources: [
        FeedBlogEntity,
        BlogEntity,
        SourceBlogEntity,
        TagEntity,
        UserEntity,
        AiToolEntity,
        AdminInAiTimesEntity,
        AiToolCategoryEntity,
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
});
