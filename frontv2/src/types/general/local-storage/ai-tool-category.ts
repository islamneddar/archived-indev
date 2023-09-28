import {ListCategoryType} from '@/types/api/ai-tools/category-ai-tools';

export interface ListCategoryTypeInLocalStorage {
  lastUpdate: Date;
  listCategory: ListCategoryType;
}
