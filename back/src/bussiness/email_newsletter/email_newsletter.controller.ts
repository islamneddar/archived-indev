import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AddEmailNewsletter } from './email_newsletter.proto';
import { EmailNewsletterService } from './email_newsletter.service';

@Controller('email-newsletter')
export class EmailNewsletterController {
  private readonly LOG = new Logger(EmailNewsletterController.name);

  constructor(private emailNewsletterService: EmailNewsletterService) {}

  @Post('/add')
  async addEmail(@Body() addEmailNewsletter: AddEmailNewsletter) {
    this.LOG.log(addEmailNewsletter);
    return {
      message: 'ok',
      email: addEmailNewsletter.email,
    };
  }
}
