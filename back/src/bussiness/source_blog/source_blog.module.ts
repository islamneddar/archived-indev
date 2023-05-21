import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SourceBlogController} from './source_blog.controller';
import {SourceBlogService} from './source_blog.service';
import {SourceBlogEntity} from './source_blog.entity';
import {UserModule} from '@/bussiness/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SourceBlogEntity]), UserModule],
  controllers: [SourceBlogController],
  providers: [SourceBlogService],
  exports: [SourceBlogService],
})
export class SourceBlogModule {}
