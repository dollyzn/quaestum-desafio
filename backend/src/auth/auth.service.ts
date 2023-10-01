import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(email: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  login() {
    throw new Error('Method not implemented.');
  }
}
