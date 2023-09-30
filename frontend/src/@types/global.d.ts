type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

type initialState = {
  loading: boolean;
  users: User[];
  error: string;
};
