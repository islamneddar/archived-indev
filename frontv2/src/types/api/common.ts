export interface PageMetaResponse {
  page: number;
  //take: number;
  //itemCount: number;
  //pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationRequestMetaRequest {
  page: number;
  take: number;
  order?: Order;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
