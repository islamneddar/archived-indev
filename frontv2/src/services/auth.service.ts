import {ROOT_API_URL} from '@/services/config';
import axios from 'axios';
import {
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignupRequest,
} from '@/types/api/auth';

export default class AuthService {
  private endpointAuth = `${ROOT_API_URL}/auth`;

  private static instance = new AuthService();

  public static getInstance(): AuthService {
    return this.instance;
  }

  async login(email: string, password: string) {
    const res = await axios.post(`${this.endpointAuth}/login`, {
      email,
      password,
    });
    const data = await res.data;
    return data as LoginResponse;
  }

  async signup(signupRequest: SignupRequest) {
    const res = await axios.post(`${this.endpointAuth}/signup`, signupRequest);
    return await res.data;
  }

  async resetPassword(resetPasswordRequest: ResetPasswordRequest) {
    const res = await axios.post(
      `${this.endpointAuth}/reset-password`,
      resetPasswordRequest,
    );
    const data = await res.data;
    return data as ResetPasswordResponse;
  }

  async validateEmailForForgotPassword(email: string) {
    const res = await axios.post(`${this.endpointAuth}/forgot-password`, {
      email,
    });
    return await res.data;
  }
}
