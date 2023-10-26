import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AiToolPricingEntity} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing.entity';

@Injectable()
export class AiToolPricingService {
  constructor(
    @InjectRepository(AiToolPricingEntity)
    private aiToolPricingEntityRepository: Repository<AiToolPricingEntity>,
  ) {}

  async getAll() {
    return await this.aiToolPricingEntityRepository.find({
      where: {
        softDelete: false,
      },
      select: {
        aiToolPricingId: true,
        name: true,
        type: true,
      },
    });
  }
}
