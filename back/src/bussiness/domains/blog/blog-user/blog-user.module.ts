import {Module} from '@nestjs/common';
import {BlogToUserService} from '@/bussiness/domain-blog/blog-user/blog-user.service';
import {BlogToUserEntity} from '@/bussiness/domain-blog/blog-user/blog-user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlogToUserEntity])],
  providers: [BlogToUserService],
  controllers: [],
  exports: [BlogToUserService],
})
export class BlogToUserModule {}
