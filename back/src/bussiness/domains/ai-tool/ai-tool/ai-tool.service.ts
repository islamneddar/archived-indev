import {Injectable, Logger} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class AiToolService {
  private readonly logger = new Logger(AiToolService.name);

  constructor(
    @InjectRepository(AiToolEntity)
    private aiToolRepository: Repository<AiToolEntity>,
    private dataSource: DataSource,
  ) {}

  async create(aiTool: AiToolEntity) {
    return await this.aiToolRepository.save(aiTool);
  }

  async findOneBySlugAndWebsite(s: string, website: string) {
    return await this.aiToolRepository.findOne({
      where: {
        slug: s,
        url: website,
      },
    });
  }
}
