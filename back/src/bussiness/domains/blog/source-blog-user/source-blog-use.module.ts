import {Module} from '@nestjs/common';
import {SourceBlogToUserService} from '@/bussiness/domain-blog/source-blog-user/source-blog-user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SourceBlogToUserEntity} from '@/bussiness/domain-blog/source-blog-user/source-blog-to-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SourceBlogToUserEntity])],
  controllers: [],
  providers: [SourceBlogToUserService],
  exports: [SourceBlogToUserService],
})
export class SourceBlogToUserModule {}
