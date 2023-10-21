import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import AiToolController from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.controller';
import {AiToolService} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.service';
import {ConfigModule} from '@nestjs/config';
import {S3AppModule} from '@/external-services/aws-s3/s3-app.module';
import {InAiTimesAdminModule} from '@/bussiness/inaitimer-admin/inaitimes-admin.module';
import {ScreenshotModule} from '@/external-services/screenshot-service/screenshot.module';
import {AiToolCategoryModule} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiToolEntity]),
    InAiTimesAdminModule,
    ConfigModule,
    S3AppModule,
    ScreenshotModule,
    AiToolCategoryModule,
  ],
  controllers: [AiToolController],
  providers: [AiToolService],
  exports: [AiToolService],
})
export class AiToolModule {}
