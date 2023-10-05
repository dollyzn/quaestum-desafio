interface initialState {
  loading: boolean;
  users: User[];
  error: ReduxError | null;
}

interface initialAuthState {
  loading: boolean;
  user: UserData | null;
  error: ReduxError | null;
}
