import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SourceBlogController} from './source_blog.controller';
import {SourceBlogService} from './source_blog.service';
import {SourceBlogEntity} from './source_blog.entity';
import {UserModule} from '@/bussiness/domains/user/user.module';
import {SourceBlogToUserEntity} from '@/bussiness/domains/blog/source-blog-user/source-blog-to-user.entity';
import {SourceBlogToUserService} from '@/bussiness/domains/blog/source-blog-user/source-blog-user.service';
import {SourceBlogToUserModule} from '@/bussiness/domains/blog/source-blog-user/source-blog-use.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SourceBlogEntity, SourceBlogToUserEntity]),
    UserModule,
    SourceBlogToUserModule,
  ],
  controllers: [SourceBlogController],
  providers: [SourceBlogService],
  exports: [SourceBlogService],
})
export class SourceBlogModule {}
