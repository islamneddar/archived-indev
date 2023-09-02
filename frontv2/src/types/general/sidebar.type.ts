import {ListCategoryType} from '@/types/api/ai-tools/category-ai-tools';

export interface NavigationType {
  name: string;
  href: string;
  icon?: any;
  isAuth?: boolean;
}

export interface ListCategoryTypeInLocalStorage {
  lastUpdate: Date;
  listCategory: ListCategoryType;
}
