export interface GetAllCategoriesAiToolResponse {
  data: ListCategoryType;
}

export interface ListCategoryType {
  [key: string]: CategoryType;
}

export interface CategoryType {
  type: string;
  name: string;
  numberOfTool?: number;
}
