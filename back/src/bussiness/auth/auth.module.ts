import {Module} from '@nestjs/common';
import {UserModule} from '@/bussiness/domains/user/user.module';
import {MailingModule} from '@/external-services/mailing/mailing.module';
import {EmailValidationModule} from '@/bussiness/email_validation/email_validation.module';
import {JwtModule} from '@nestjs/jwt';
import {JWT_SECRET} from '@/config';
import {AuthController} from '@/bussiness/auth/auth.controller';
import {AuthService} from '@/bussiness/auth/auth.service';
import {PassportModule} from '@nestjs/passport';
import {InAiTimesAdminModule} from '@/bussiness/inaitimer-admin/inaitimes-admin.module';

@Module({
  imports: [
    InAiTimesAdminModule,
    UserModule,
    MailingModule,
    EmailValidationModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
