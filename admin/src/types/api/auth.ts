export interface LoginResponse {
  userId: number;
  accessToken: string | null;
}

export interface AdminProfileResponse {
  id: number;
  email: string;
  username: string;
}
