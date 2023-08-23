import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import AiToolController from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.controller';
import {AiToolService} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.service';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([AiToolEntity]), ConfigModule],
  controllers: [AiToolController],
  providers: [AiToolService],
  exports: [AiToolService],
})
export class AiToolModule {}
