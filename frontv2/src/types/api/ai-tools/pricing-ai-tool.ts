export interface GetAllPricingAiToolResponse {
  data: ListPricingType;
}

export interface ListPricingType {
  [key: string]: PricingType;
}

export interface PricingType {
  type: string;
  name: string;
}
