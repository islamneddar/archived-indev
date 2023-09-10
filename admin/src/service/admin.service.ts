import {ROOT_API_URL} from '@/service/config';
import axios from 'axios';
import {AdminProfileResponse} from '@/types/api/auth';

export default class AdminService {
  private endpointAuth = `${ROOT_API_URL}/admin-auth`;

  private static instance = new AdminService();

  public static getInstance(): AdminService {
    return this.instance;
  }

  async getAdminProfile(accessToken: string) {
    const res = await axios.get(`${this.endpointAuth}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.data;
    return data as AdminProfileResponse;
  }
}
