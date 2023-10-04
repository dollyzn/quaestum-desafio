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

interface UserData {
  name: string;
  profile: string;
}
