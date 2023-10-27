import {Controller, Get, UseGuards} from '@nestjs/common';
import {AiToolPlatformService} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.service';
import {AuthAdminGuard} from '@/bussiness/auth/auth-admin.guard';
@Controller('ai-tool-platforms')
export class AiToolPlatformController {
  constructor(private aiToolPlatformService: AiToolPlatformService) {}

  @UseGuards(AuthAdminGuard)
  @Get('/admin/all/list')
  async getAll() {
    return {
      data: await this.aiToolPlatformService.getAll(),
    };
  }
}
