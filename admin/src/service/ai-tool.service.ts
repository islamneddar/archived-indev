import {KEY_TO_PASS, ROOT_API_URL} from '@/service/config';
import {
  AiToolCategory,
  AiToolPlatform,
  AiToolPricing,
  AiToolWithTotalNumber,
  CreateAiToolRequest,
} from '@/types/api/ai-tool';
import axios from 'axios';

export class AiToolService {
  private endpoint = `${ROOT_API_URL}/ai-tool`;

  private static instance: AiToolService = new AiToolService();

  public static getInstance(): AiToolService {
    return this.instance;
  }

  async create(request: CreateAiToolRequest) {
    const formData = new FormData();
    formData.append('name', request.name);
    formData.append('description', request.description);
    formData.append('url', request.url.toString());
    formData.append('category', request.category);
    formData.append('pricing', request.pricing);
    formData.append('image', request.file);

    const res = await axios.post(`${this.endpoint}/create`, formData, {
      params: {
        'key-to-pass': KEY_TO_PASS,
      },
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    });

    const data = res.data;
    return data as any;
  }

  async getAllInvalidTool(page: number, accessToken: string) {
    const res = await axios.get(`${this.endpoint}/list/not_validated`, {
      params: {
        page,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.data;
    return data as AiToolWithTotalNumber;
  }

  async validateTool(aiToolId: number, accessToken: string) {
    const res = await axios.post(
      `${this.endpoint}/admin/validate`,
      {
        aiToolId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  async deleteTool(aiToolId: number, accessToken: string) {
    const res = await axios.delete(`${this.endpoint}/admin/delete`, {
      params: {
        aiToolId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getAllAiToolCategory(accessToken: string) {
    const res = await axios.get(
      `${ROOT_API_URL}/ai-tool-category/admin/all/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await res.data.data;
    return data as AiToolCategory[];
  }

  async getAllAiToolPricing(accessToken: string) {
    const res = await axios.get(
      `${ROOT_API_URL}/ai-tool-pricing/admin/all/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await res.data.data;
    return data as AiToolPricing[];
  }

  async getAllAiToolPlatform(accessToken: string) {
    const res = await axios.get(
      `${ROOT_API_URL}/ai-tool-platforms/admin/all/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await res.data.data;
    return data as AiToolPlatform[];
  }
}
