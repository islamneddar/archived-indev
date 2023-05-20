import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import {AuthService} from '@/bussiness/auth/auth.service';
import {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SignupRequest,
} from '@/bussiness/auth/auth.type';
import {JwtService} from '@nestjs/jwt';
import {JWT_SECRET} from '@/config';
import {UserService} from '@/bussiness/user/user.service';
import {EmailValidationEntity} from '@/bussiness/email_validation/email_valdation.entity';
import {EmailValidationService} from '@/bussiness/email_validation/email_validation.service';
import {MailingService} from '@/bussiness/mailing/mailing.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
    private emailValidationService: EmailValidationService,
    private mailService: MailingService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginRequest) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new HttpException('wrong email or password', HttpStatus.NOT_FOUND);
    }

    const userToken = await this.jwtService.signAsync(
      {
        id: user.userId,
        email: user.email,
      },
      {
        secret: JWT_SECRET,
      },
    );

    return {
      userId: user.userId,
      accessToken: userToken,
    };
  }

  @Post('/singup')
  async signup(@Body() body: SignupRequest, @Res() res: Response) {
    const user = await this.userService.findOneByEmail(body.email);
    if (user) {
      throw new HttpException('user already exist', HttpStatus.CONFLICT);
    }
    await this.userService.createUser(body);
    return {};
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordRequest) {
    const user = await this.userService.findOneByEmail(body.email);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const emailCodeValidator: EmailValidationEntity =
      await this.emailValidationService.createNewCodeForResetPassword(user);

    this.mailService.sendForgotPasswordMail(
      emailCodeValidator.email,
      emailCodeValidator.code,
    );
    return {
      message: 'email sent',
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordRequest) {
    const emailValidationEntity =
      await this.emailValidationService.getValidByCode(body.code);
    if (!emailValidationEntity) {
      throw new HttpException(
        'the password cant be changed',
        HttpStatus.BAD_REQUEST,
      );
    }
    //get user and update password
    // update valid of code
    await this.authService.updatePassword(
      emailValidationEntity,
      body.newPassword,
    );
    return {
      message: 'reset password',
    };
  }
}
