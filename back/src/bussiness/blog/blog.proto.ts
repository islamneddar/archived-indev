import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {IsBoolean, IsInt, IsNumber, IsOptional, Min} from 'class-validator';
import {Type} from 'class-transformer';
import {IsIsoString} from '@/common/validators/is-iso-string';
import {TypeFeed} from '@/bussiness/feed_blog/feed-blog.proto';

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

  @Type(() => String)
  @IsIsoString()
  @IsOptional()
  dateLastBlogList?: string;
}

export class GetBlogsForSourceBlogRequest {
  @Type(() => PageOptionsDto)
  pageOption: PageOptionsDto;
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sourceBlogId: number;
}

export class GetAllBlogBySearchTitleRequest {
  @Type(() => String)
  text?: string;
}
