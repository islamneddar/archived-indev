import {ROOT_API_URL} from '../config';
import axios from 'axios';
import {GetAllCategoriesAiToolResponse} from '@/types/api/ai-tools/category-ai-tools';

export default class AiToolCategoryService {
  private endpointCategoriesAiTool = `${ROOT_API_URL}/ai-tool-category`;

  private static instance = new AiToolCategoryService();

  public static getInstance(): AiToolCategoryService {
    return this.instance;
  }

  async getAll() {
    const res = await axios.get(`${this.endpointCategoriesAiTool}/all`);

    const data = await res.data;
    return data as GetAllCategoriesAiToolResponse;
  }

  async getAllV2() {
    const res = await axios.get(`${this.endpointCategoriesAiTool}/all-v2`);

    const data = await res.data;
    return data as GetAllCategoriesAiToolResponse;
  }
}
