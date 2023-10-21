import {Injectable} from '@nestjs/common';
import {AiToolCategoryEntity} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {
  AiToolCategoryEnum,
  listAiToolCategory,
} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import LOG from '@/utils/logger';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';

@Injectable()
export class AiToolCategoryService {
  constructor(
    @InjectRepository(AiToolCategoryEntity)
    private aiToolCategoryRepository: Repository<AiToolCategoryEntity>,
    @InjectRepository(AiToolEntity)
    private aiToolRepository: Repository<AiToolEntity>,
  ) {}

  async getAll() {
    return listAiToolCategory;
  }

  async calculateNumberOfToolByCategory() {
    LOG.debug('start to calculateNumberOfToolByCategory');
    const categories = await this.aiToolCategoryRepository.find();
    for (const category of categories) {
      category.numberOfTool = await this.aiToolRepository.count({
        where: {
          aiToolCategory: {
            aiToolCategoryId: category.aiToolCategoryId,
          },
        },
      });
      LOG.debug(`category ${category.name} has ${category.numberOfTool} tools`);
      await this.aiToolCategoryRepository.save(category);
    }
  }

  async getAllV2() {
    return this.aiToolCategoryRepository.find({
      select: ['aiToolCategoryId', 'name', 'type'],
    });
  }

  async findBytype(category: AiToolCategoryEnum) {
    return this.aiToolCategoryRepository.findOne({
      where: {
        type: category,
      },
    });
  }
}
