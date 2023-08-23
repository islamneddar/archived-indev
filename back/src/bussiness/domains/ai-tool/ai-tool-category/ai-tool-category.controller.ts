import {Controller, Get, Logger} from '@nestjs/common';
import {AiToolCategoryService} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.service';

@Controller('ai-tool-category')
export class AiToolCategoryController {
  private readonly LOG = new Logger(AiToolCategoryController.name);
  constructor(private aiToolCategoryService: AiToolCategoryService) {}

  @Get('/all')
  async getAll() {
    return {
      data: await this.aiToolCategoryService.getAll(),
    };
  }
}
