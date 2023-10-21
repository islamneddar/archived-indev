import {
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';

export interface GetAllAiToolRequest {
  pageOption: PaginationRequestMetaRequest;
  category?: string;
  isAll: boolean;
  pricing?: string;
  searchText?: string;
}

export interface GetAllAiToolResponse {
  data: AiTool[];
  meta: PageMetaResponse;
}

export interface AiTool {
  aiToolId: number;
  name: string;
  description: string;
  url: string;
  image: string;
  category: string;
  pricing: string;
  createdAt: string;
  slug: string;
}
