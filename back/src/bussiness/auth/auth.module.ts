import {Module} from '@nestjs/common';
import {UserModule} from '@/bussiness/user/user.module';
import {MailingModule} from '@/external-services/mailing/mailing.module';
import {EmailValidationModule} from '@/bussiness/email_validation/email_validation.module';
import {JwtModule} from '@nestjs/jwt';
import {JWT_SECRET} from '@/config';
import {AuthController} from '@/bussiness/auth/auth.controller';
import {AuthService} from '@/bussiness/auth/auth.service';
import {PassportModule} from '@nestjs/passport';

@Module({
  imports: [
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
