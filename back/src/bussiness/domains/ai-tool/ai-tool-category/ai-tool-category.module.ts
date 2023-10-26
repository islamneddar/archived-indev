import {Module} from '@nestjs/common';
import {AiToolCategoryController} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.controller';
import {AiToolCategoryService} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AiToolCategoryEntity} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.entity';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {InAiTimesAdminModule} from '@/bussiness/inaitimer-admin/inaitimes-admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiToolCategoryEntity, AiToolEntity]),
    InAiTimesAdminModule,
  ],
  controllers: [AiToolCategoryController],
  providers: [AiToolCategoryService],
  exports: [AiToolCategoryService],
})
export class AiToolCategoryModule {}
