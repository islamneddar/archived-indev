import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';

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
}
