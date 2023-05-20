import {Module} from '@nestjs/common';
import {UserModule} from '@/bussiness/user/user.module';
import {MailingModule} from '@/bussiness/mailing/mailing.module';

@Module({
  imports: [UserModule, MailingModule],
})
export class AuthModule {}
