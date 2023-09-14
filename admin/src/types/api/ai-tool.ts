export interface CreateAiToolRequest {
  name: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  file: any;
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
  admin: {
    id: number;
    email: string;
  };
}

export interface AiToolWithTotalNumber {
  data: AiTool[];
  total: number;
}
