import {ROOT_API_URL} from '@/services/config';
import axios from 'axios';
import {UserProfileResponse} from '@/types/api/auth';

export default class UserService {
  private endpointAuth = `${ROOT_API_URL}/user`;

  private static instance = new UserService();

  public static getInstance(): UserService {
    return this.instance;
  }

  async getProfileUser(accessToken: string) {
    const res = await axios.get(`${this.endpointAuth}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.data;
    return data as UserProfileResponse;
  }
}
