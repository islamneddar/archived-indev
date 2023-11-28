import {ROOT_API_URL} from '@/infra/web-services/config';
import {
  GetAllAiToolRequest,
  GetAllAiToolResponse,
  GetAllAiToolsOnLoadedInfoResponse,
} from '@/infra/web-services/types/ai-tools/ai-tool';
import axios from 'axios';

export class AiToolService {
  private endpoint = `${ROOT_API_URL}/ai-tool`;

  private static instance: AiToolService = new AiToolService();

  public static getInstance(): AiToolService {
    return this.instance;
  }

  public async findAll(
    request: GetAllAiToolRequest,
  ): Promise<GetAllAiToolResponse> {
    const paramsToSend: any = {
      pageOption: {
        page: request.pageOption.page,
        take: request.pageOption.take,
      },
    };
    if (request.category) {
      paramsToSend['category'] = request.category;
    }
    if (request.pricing) {
      paramsToSend['pricing'] = request.pricing;
    }

    if (request.searchText) {
      paramsToSend['searchText'] = request.searchText;
    }

    const response = await axios.get(`${this.endpoint}/list`, {
      params: {
        ...paramsToSend,
      },
    });

    const data = await response.data;
    return data as GetAllAiToolResponse;
  }

  public async getAllOnLoadedData() {
    const response = await axios.get(`${this.endpoint}/info-on-loaded`);

    const data = await response.data;
    return data as GetAllAiToolsOnLoadedInfoResponse;
  }
}
