import {IsBoolean, IsNumber} from 'class-validator';
import {TypeFeed} from '@/bussiness/feed_blog/feed-blog.proto';

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
