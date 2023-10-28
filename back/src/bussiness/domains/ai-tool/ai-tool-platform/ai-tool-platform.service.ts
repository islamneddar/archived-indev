import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AiToolPlatformEntity} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.entity';

@Injectable()
export class AiToolPlatformService {
  constructor(
    @InjectRepository(AiToolPlatformEntity)
    private aiToolPlatformEntityRepository: Repository<AiToolPlatformEntity>,
  ) {}

  async getAll() {
    return await this.aiToolPlatformEntityRepository.find({
      where: {
        softDelete: false,
      },
      select: {
        aiToolPlatformId: true,
        name: true,
        type: true,
      },
    });
  }

  async findById(aiToolPlatformId: number) {
    return await this.aiToolPlatformEntityRepository.findOne({
      where: {
        aiToolPlatformId,
        softDelete: false,
      },
    });
  }
}
