import {PageMetaResponse, PaginationRequestMetaRequest} from './common';
import {SourceBlog} from './source_blog';
import {Tag} from './tag';

/**
 * types
 */
export interface Blog {
  blogId: number;
  title: string;
  thumbnail: string;
  permalink: string;
  publishDate: string;
  sourceBlog: SourceBlog;
  tags: Tag[];
  isLiked: boolean;
  totalLike: number;
  isBookmarked: boolean;
  bookmarkTime: string;
}

/**
 * get all blog-section
 */
export interface GetBlogsResponse {
  data: Blog[];
  meta: PageMetaResponse;
}

export interface GetAllBlogRequest {
  paginationRequestMeta: PaginationRequestMetaRequest;
  accessToken: string | null;
}

export interface LikeBlogRequest {
  blogId: number;
  isLiked: boolean;
  accessToken: string;
}

export interface LikeBlogResponse {
  isLiked: boolean;
  blogId: number;
}

export interface BookmarkBlogRequest {
  blogId: number;
  isBookmarked: boolean;
  accessToken: string;
}

export interface BookmarkBlogResponse {
  isBookmarked: boolean;
  blogId: number;
}

export interface GetBookmarksParams {
  dateLastBlogList?: string;
  page: number;
  accessToken: string;
}

export interface GetBookmarksResponse {
  data: Blog[];
}
