import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response): Promise<{ message: string }> {
    try {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const jwt = this.jwtService.sign(payload);

      res.cookie('token', jwt, {
        httpOnly: true,
        signed: true,
      });

      return { message: 'Login bem-sucedido' };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Falha ao fazer login');
    }
  }

  async signOut(req: Request, res: Response): Promise<string> {
    res.clearCookie('token');
    return 'Logged out successfuly';
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const isMatch = await this.comparePasswords({
      password,
      hash: user.password,
    });

    if (!isMatch) {
      throw new UnauthorizedException(
        'The provided email or password is incorrect',
      );
    }

    delete user.password;

    return {
      ...user,
      password: undefined,
    };
  }

  async comparePasswords({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
