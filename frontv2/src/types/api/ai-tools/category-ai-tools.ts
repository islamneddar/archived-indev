export interface GetAllCategoriesAiToolResponse {
  data: ListCategoryType;
}

export interface ListCategoryType {
  [key: string]: {
    type: string;
    name: string;
    numberOfTool?: number;
  };
}
