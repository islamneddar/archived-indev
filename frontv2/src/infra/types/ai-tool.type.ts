import {
  CategoryAiToolWithId,
  ListCategoryType,
} from '@/infra/web-services/types/ai-tools/category-ai-tools';
import {AiToolPricingTypeWithId} from '@/infra/web-services/types/ai-tools/pricing-ai-tool';
import {AiToolPlatformWithId} from '@/infra/web-services/types/ai-tools/platform-ai-tool';

// #deprecated
export interface ListCategoryTypeInLocalStorage {
  lastUpdate: Date;
  listCategory: ListCategoryType;
}

export interface InfoAiToolOnLoad {
  lastUpdate: Date;
  aiToolCategories: CategoryAiToolWithId[];
  aiToolsPricing: AiToolPricingTypeWithId[];
  aiToolsPlatform: AiToolPlatformWithId[];
}

export type AiToolCategoryMap = Record<string, CategoryAiToolWithId>;
export type AiToolPricingMap = Record<string, AiToolPricingTypeWithId>;
export type AiToolPlatformMap = Record<string, AiToolPlatformWithId>;
