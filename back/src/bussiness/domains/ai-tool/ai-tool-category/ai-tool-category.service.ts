import {Injectable} from '@nestjs/common';
import {AiToolCategoryEntity} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {listAiToolCategory} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';

@Injectable()
export class AiToolCategoryService {
  constructor(
    @InjectRepository(AiToolCategoryEntity)
    private aiToolCategoryRepository: Repository<AiToolCategoryEntity>,
  ) {}

  async getAll() {
    return listAiToolCategory;
  }

  async getAllV2() {
    return this.aiToolCategoryRepository.find({
      select: ['aiToolCategoryId', 'name', 'type'],
    });
  }
}
