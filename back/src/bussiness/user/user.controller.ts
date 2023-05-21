import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {UserService} from '@/bussiness/user/user.service';
import {AuthGuard} from '@/bussiness/auth/auth.guard';
import {UserEntity} from '@/bussiness/user/user.entity';
import {Request} from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = req.user as UserEntity;
    return {
      id: user.userId,
      email: user.email,
      username: user.username,
    };
  }
}
