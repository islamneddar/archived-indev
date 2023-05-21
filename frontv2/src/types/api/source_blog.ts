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
}

//Request/Response
export interface GetAllSourceBlogResponse {
  data: SourceBlog[];
  meta: PageMetaResponse;
}

export interface GetAllSourceBlogRequest {
  paginationRequestMeta: PaginationRequestMetaRequest;
}
