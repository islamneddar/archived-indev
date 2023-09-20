import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {InAiTimesAdminService} from '@/bussiness/inaitimer-admin/inaitmes-admin.service';
import {AuthGuard} from '@/bussiness/auth/auth.guard';
import {Request} from 'express';
import {AuthAdminGuard} from '@/bussiness/auth/auth-admin.guard';
import {AdminInAiTimesEntity} from '@/bussiness/inaitimer-admin/inaitimer-admin.entity';

@Controller('inaitimes/admin')
export class InAiTimesAdminController {
  constructor(private readonly inaitimesAdminService: InAiTimesAdminService) {}

  @UseGuards(AuthAdminGuard)
  @Get('/profile')
  async getProfile(@Req() req: Request) {
    const admin = req.admin as AdminInAiTimesEntity;
    return {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    };
  }
}
