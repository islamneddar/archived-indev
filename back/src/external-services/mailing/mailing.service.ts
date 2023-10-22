import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPasswordMail(email: string, tokenResetPassword: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Request to reset password',
      template: './reset_password.hbs',
      context: {
        email: email,
        urlResetPassword: `${process.env.FRONT_ROOT_URL}/auth/reset_password?code=${tokenResetPassword}`,
      },
    });
  }

  async sendListNotAddedTools(
    listAiToolNotAdded: any[],
    type: AiToolCategoryEnum,
  ) {
    await this.mailerService.sendMail({
      to: 'islam.neddar@gmail.com',
      subject: 'List of tools not added',
      template: './list_not_added_tools.hbs',
      context: {
        listAiToolNotAdded: JSON.stringify(listAiToolNotAdded),
        type: type,
      },
    });
  }
}
