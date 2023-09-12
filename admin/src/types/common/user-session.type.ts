export interface UserSession {
  email: string;
  username: string;
  accessToken: string;
  id: number;
}

export interface AdminSession {
  email: string;
  username: string;
  accessToken: string;
  id: number;
  role: string;
}
