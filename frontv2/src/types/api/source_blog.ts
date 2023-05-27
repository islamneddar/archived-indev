import {
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';

export enum TypeFeed {
  UNKOWN = 'unkown',
  COMMUNITY = 'community',
  ORIGINAL = 'original',
  NEWS = 'news',
  DESIGN = 'design',
  DATASCIENCE = 'datascience',
  DEVOPS = 'devops',
  ALL = 'all',
}

export interface SourceBlog {
  sourceBlogId: number;
  name: string;
  image: string;
  isFollow: boolean;
}

//Request/Response
export interface GetAllSourceBlogResponse {
  data: SourceBlog[];
  meta: PageMetaResponse;
}

export interface GetAllSourceBlogRequest {
  accessToken: string;
  paginationRequestMeta: PaginationRequestMetaRequest;
}

export interface FollowSourceBlogRequest {
  sourceBlogId: number;
  accessToken: string;
  isFollow: boolean;
}
export interface FollowSourceBlogResponse {
  isFollow: boolean;
  sourceBlogId: number;
}
