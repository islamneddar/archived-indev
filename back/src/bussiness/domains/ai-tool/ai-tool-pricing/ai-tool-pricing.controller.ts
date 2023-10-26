import {Controller, Get, UseGuards} from '@nestjs/common';
import {AiToolPricingService} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing.service';
import {AuthAdminGuard} from '@/bussiness/auth/auth-admin.guard';
@Controller('ai-tool-pricing')
export class AiToolPricingController {
  constructor(private aiToolPricingService: AiToolPricingService) {}

  @UseGuards(AuthAdminGuard)
  @Get('/admin/all/list')
  async getAll() {
    return {
      data: await this.aiToolPricingService.getAll(),
    };
  }
}
