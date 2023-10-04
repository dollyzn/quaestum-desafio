interface initialState {
  loading: boolean;
  users: User[];
  error: string;
}

interface initialAuthState {
  loading: boolean;
  user: AuthUser | null;
  error: string;
}
