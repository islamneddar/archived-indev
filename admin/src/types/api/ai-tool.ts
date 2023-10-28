export interface CreateAiToolRequest {
  name: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  file: any;
  accessToken: string;
}

export interface AiTool {
  aiToolId: number;
  name: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  image: string;
  createdAt: string;
  isActive: boolean;
  isConfirmedByAdmin: boolean;
  admin: {
    id: number;
    email: string;
  };
  aiToolCategory: {
    aiToolCategoryId: number;
    name: string;
    type: string;
  } | null;
  aiToolPricing: {
    aiToolPricingId: number;
    name: string;
    type: string;
  } | null;
  aiToolPlatform: {
    aiToolPlatformId: number;
    name: string;
    type: string;
  } | null;
  featuresText: string;
}

export interface AiToolWithTotalNumber {
  data: AiTool[];
  total: number;
}

export interface AiToolCategory {
  aiToolCategoryId: number;
  name: string;
  type: string;
}

export interface AiToolPricing {
  aiToolPricingId: number;
  name: string;
  type: string;
}

export interface AiToolPlatform {
  aiToolPlatformId: number;
  name: string;
  type: string;
}
