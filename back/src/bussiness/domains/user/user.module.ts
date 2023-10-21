import {Module} from '@nestjs/common';
import {UserService} from '@/bussiness/domains/user/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '@/bussiness/domains/user/user.entity';
import {UserController} from '@/bussiness/domains/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
