import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import AiToolController from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.controller';
import {AiToolService} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.service';
import {ConfigModule} from '@nestjs/config';
import {S3AppModule} from '@/external-services/aws-s3/s3-app.module';
import {InAiTimesAdminService} from '@/bussiness/inaitimer-admin/inaitmes-admin.service';
import {InAiTimesAdminModule} from '@/bussiness/inaitimer-admin/inaitimes-admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiToolEntity]),
    InAiTimesAdminModule,
    ConfigModule,
    S3AppModule,
  ],
  controllers: [AiToolController],
  providers: [AiToolService],
  exports: [AiToolService],
})
export class AiToolModule {}
