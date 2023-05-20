import {Module} from '@nestjs/common';
import {MailingService} from '@/bussiness/mailing/mailing.service';

@Module({
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
