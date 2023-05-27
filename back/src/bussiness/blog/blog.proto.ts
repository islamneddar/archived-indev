import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {TypeFeed} from '../feed_blog/feed_blog.entity';
import {IsBoolean, IsNumber} from 'class-validator';

export interface BlogByFeedTypeRequest {
  pageOption: PageOptionsDto;
  feedType: TypeFeed;
}

export interface GetBlogBySearchRequest {
  pageOption: PageOptionsDto;
  search: string;
}

export interface GetBlogBySearchAndFeedTypeRequest {
  pageOption: PageOptionsDto;
  feedType: TypeFeed;
  search: string;
}

export class UpdateLikeToBlogRequest {
  @IsNumber()
  blogId: number;

  @IsBoolean()
  isLiked: boolean;
}
