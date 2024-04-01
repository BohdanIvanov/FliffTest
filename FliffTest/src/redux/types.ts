export interface RegisterResponse {
  id: number;
  token: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}
