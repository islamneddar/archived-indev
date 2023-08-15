import {Module} from '@nestjs/common';
import {AiToolCategoryController} from '@/bussiness/domain-ai-tool/ai-tool-category/ai-tool-category.controller';
import {AiToolCategoryService} from '@/bussiness/domain-ai-tool/ai-tool-category/ai-tool-category.service';

@Module({
  imports: [],
  controllers: [AiToolCategoryController],
  providers: [AiToolCategoryService],
  exports: [AiToolCategoryService],
})
export class AiToolCategoryModule {}
