interface Errors {
  [key: string]: string;
}

interface FormError {
  name: string;
  age: string;
  email: string;
}

interface SignUpFormError {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
}
