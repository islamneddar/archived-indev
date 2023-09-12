import {ROOT_API_URL} from '@/service/config';
import axios from 'axios';
import {LoginResponse} from '@/types/api/auth';

export default class AuthService {
  private endpointAuth = `${ROOT_API_URL}/auth/admin`;

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
}
