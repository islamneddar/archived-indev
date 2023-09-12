import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AdminInAiTimesEntity} from '@/bussiness/inaitimer-admin/inaitimer-admin.entity';
import {InAiTimesAdminController} from '@/bussiness/inaitimer-admin/inaitimer-admin.controller';
import {InAiTimesAdminService} from '@/bussiness/inaitimer-admin/inaitmes-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminInAiTimesEntity])],
  controllers: [InAiTimesAdminController],
  providers: [InAiTimesAdminService],
  exports: [InAiTimesAdminService],
})
export class InAiTimesAdminModule {}
