export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  profile: string;
  iat?: number;
  exp?: number;
}
