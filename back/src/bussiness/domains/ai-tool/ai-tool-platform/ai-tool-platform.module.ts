import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AiToolPlatformEntity} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.entity';
import {AiToolPlatformController} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.controller';
import {AiToolPlatformService} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.service';
import {InAiTimesAdminModule} from '@/bussiness/inaitimer-admin/inaitimes-admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiToolPlatformEntity]),
    InAiTimesAdminModule,
  ],
  controllers: [AiToolPlatformController],
  providers: [AiToolPlatformService],
  exports: [AiToolPlatformService],
})
export class AiToolPlatformModule {}
