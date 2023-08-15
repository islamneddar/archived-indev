import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BlogService} from './blog.service';
import {BlogEntity} from './blog.entity';
import BlogController from './blog.controller';
import {UserModule} from '@/bussiness/user/user.module';
import {BlogToUserModule} from '@/bussiness/domain-blog/blog-user/blog-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntity]),
    UserModule,
    BlogToUserModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
