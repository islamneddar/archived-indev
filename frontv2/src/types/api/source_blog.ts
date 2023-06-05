import {
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';

export enum TypeFeed {
  COMMUNITY = 'community',
  ORIGINAL = 'original',
  NEWS = 'news',
  DESIGN = 'design',
  DATA_SCIENCE = 'data_science',
  DEVOPS = 'devops',
  CYBER_SECURITY = 'cyber_security',
  MIXED_REALITY = 'mixed_reality',
  CRYPTO_CURRENCY = 'crypto_currency',
  IOT = 'iot',
  MACHINE_LEARNING = 'machine_learning',
  SOFTWARE_ENGINEERING = 'software_engineering',
  FRONT_END_DEVELOPMENT = 'front_end_development',
  BACK_END_DEVELOPMENT = 'back_end_development',
  MOBILE_DEVELOPMENT = 'mobile_development',
}

export interface SourceBlogTypeItemType {
  value: TypeFeed;
  content: string;
  nbBlogs: number;
  featuredBlog: {
    sourceBlogName: string;
    sourceBlogImage: string;
  };
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
