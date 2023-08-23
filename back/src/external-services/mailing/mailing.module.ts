import {Module} from '@nestjs/common';
import {MailingService} from '@/external-services/mailing/mailing.service';

@Module({
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
