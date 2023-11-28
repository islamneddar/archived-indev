import {
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/infra/web-services/types/common';
import {CategoryAiToolWithId} from '@/infra/web-services/types/ai-tools/category-ai-tools';
import {AiToolPricingTypeWithId} from '@/infra/web-services/types/ai-tools/pricing-ai-tool';
import {AiToolPlatformWithId} from '@/infra/web-services/types/ai-tools/platform-ai-tool';

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

export interface GetAllAiToolsOnLoadedInfoResponse {
  aiToolsCategory: CategoryAiToolWithId[];
  aiToolsPricing: AiToolPricingTypeWithId[];
  aiToolsPlatform: AiToolPlatformWithId[];
}
