import {ROOT_API_URL} from '@/infra/web-services/config';

export class AiToolPricingService {
  private endpointPricingAiTool = `${ROOT_API_URL}/ai-tool-pricing`;

  private static _instance = new AiToolPricingService();

  public static getInstance(): AiToolPricingService {
    return this._instance;
  }
}
