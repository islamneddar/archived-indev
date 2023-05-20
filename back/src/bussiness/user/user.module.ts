import {Module} from '@nestjs/common';
import {UserService} from '@/bussiness/user/user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
