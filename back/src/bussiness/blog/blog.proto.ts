import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {TypeFeed} from '../feed_blog/feed_blog.entity';
import {IsBoolean, IsDate, IsInt, IsNumber, Min} from 'class-validator';
import {Type} from 'class-transformer';

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

export class UpdateBookmarkToBlogRequest {
  @IsNumber()
  blogId: number;

  @IsBoolean()
  isBookmarked: boolean;
}

export class GetAllBookmarksWithPaginationQuery {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;
}
