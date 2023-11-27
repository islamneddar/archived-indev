import {ROOT_API_URL} from '@/services/config';
import axios from 'axios';
import {GetAllPricingAiToolResponse} from '@/types/api/ai-tools/pricing-ai-tool';

export class AiToolPricingService {
  private endpointPricingAiTool = `${ROOT_API_URL}/ai-tool-pricing`;

  private static _instance = new AiToolPricingService();

  public static getInstance(): AiToolPricingService {
    return this._instance;
  }

  async getAll() {
    const res = await axios.get(`${this.endpointPricingAiTool}/all`);

    const data = await res.data;
    return data as GetAllPricingAiToolResponse;
  }
}
