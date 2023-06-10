import {IsBoolean, IsEnum, IsNumber} from 'class-validator';
import {TypeFeed} from '@/bussiness/feed_blog/feed-blog.proto';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';

export class FollowSourceBlogRequest {
  @IsNumber()
  sourceBlogId: number;

  @IsBoolean()
  isFollow: boolean;
}

export class SourceBlogTypeItemTypeResponse {
  value: TypeFeed;
  content: string;
  nbBlogs: number;
  featuredBlog: {
    sourceBlogName: string;
    sourceBlogImage: string;
  };
}

export class GetAllByTypeQueryRequest {
  @IsEnum(TypeFeed)
  typeSource: TypeFeed;
}
