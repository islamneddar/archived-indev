import {Injectable} from '@nestjs/common';
import {listAiToolCategory} from '@/bussiness/domain-ai-tool/ai-tool-category/ai-tool-catgory.proto';

@Injectable()
export class AiToolCategoryService {
  async getAll() {
    return listAiToolCategory;
  }
}
