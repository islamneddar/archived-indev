export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  accessToken: string | null;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
  code: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface UserProfileResponse {
  id: number;
  email: string;
  username: string;
}
