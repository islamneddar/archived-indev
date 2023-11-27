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
import {MailingModule} from '@/external-services/mailing/mailing.module';
import {AiToolPricingModule} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing.module';
import {AiToolPlatformModule} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.module';
import {InMemoryCachingProvider} from '@/external-services/caching-service/caching-providers';
import {CachingService} from '@/external-services/caching-service/caching.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiToolEntity]),
    InAiTimesAdminModule,
    ConfigModule,
    S3AppModule,
    ScreenshotModule,
    AiToolCategoryModule,
    AiToolPricingModule,
    AiToolPlatformModule,
    MailingModule,
  ],
  controllers: [AiToolController],
  providers: [AiToolService, CachingService, InMemoryCachingProvider],
  exports: [AiToolService],
})
export class AiToolModule {}
