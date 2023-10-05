interface Errors {
  [key: string]: string;
}

interface FormError {
  name: string;
  age: string;
  email: string;
  password: string;
  profile: string;
}

interface SignUpFormError {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ReduxError {
  message: string;
  code: string;
}
