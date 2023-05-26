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
}

/**
 * get all blog
 */
export interface GetBlogsResponse {
  data: Blog[];
  meta: PageMetaResponse;
}

export interface GetAllBlogRequest {
  paginationRequestMeta: PaginationRequestMetaRequest;
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
