import {Module} from '@nestjs/common';
import {UserService} from '@/bussiness/user/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '@/bussiness/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
