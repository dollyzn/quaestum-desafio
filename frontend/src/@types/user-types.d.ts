interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password?: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

interface SignUpData {
  name: string;
  age: number;
  email: string;
  password: string;
}

interface AuthData {
  success: boolean;
  message: string;
  user: UserData;
}

interface Logout extends Omit<AuthData, "user"> {}

interface UserData {
  name: string;
  profile: string;
}

interface CreateUser {
  email: string;
  name: string;
  age: number;
  profile?: string;
  password: string;
}

interface UpdateUser {
  email?: string;
  name?: string;
  age?: number;
  profile?: string;
  password?: string;
}
