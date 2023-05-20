import {
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export interface UserFromRequest {
  userId: number;
  email: string;
}

// Request/Response types
export class SignupRequest {
  @IsEmail({}, {message: 'Invalid email'})
  email: string;

  @IsString()
  @MinLength(4)
  /*@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
  })*/
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export class LoginRequest {
  @IsEmail({}, {message: 'Invalid email'})
  email: string;

  @IsString()
  @MinLength(4)
  /*@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    })*/
  password: string;
}

export class ForgotPasswordRequest {
  @IsEmail({}, {message: 'Invalid email'})
  email: string;
}

export class ResetPasswordRequest {
  @IsString()
  @MinLength(4)
  /*@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    })*/
  newPassword: string;

  @IsString({message: 'Token must be a string'})
  @Length(10, 100, {
    message: 'Token length must be between 10 and 100 characters',
  })
  code: string;
}
