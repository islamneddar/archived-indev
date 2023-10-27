import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AiToolPricingEntity} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing.entity';
import {AiToolPricingController} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing.controller';
import {AiToolPricingService} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing.service';
import {InAiTimesAdminModule} from '@/bussiness/inaitimer-admin/inaitimes-admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiToolPricingEntity]),
    InAiTimesAdminModule,
  ],
  controllers: [AiToolPricingController],
  providers: [AiToolPricingService],
  exports: [AiToolPricingService],
})
export class AiToolPricingModule {}
