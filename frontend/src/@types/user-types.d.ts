type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

type UserData = Omit<User, "id">;
