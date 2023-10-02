import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ success: boolean; message: string; data: { user?: User } }> {
    const user = await this.userService.create(signUpDto);

    return {
      success: true,
      message: 'User created successfully',
      data: { user },
    };
  }

  async login(
    user: User,
    req: Request,
    res: Response,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const cookieToken = req.signedCookies.token;

      const jwt = cookieToken
        ? this.refreshToken(cookieToken)
        : this.generateToken(user);

      res.cookie('token', jwt, {
        httpOnly: true,
        signed: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error ocurred while logging in',
      );
    }

    return { success: true, message: 'Logged in succesfully' };
  }

  async signOut(res: Response): Promise<{ success: boolean; message: string }> {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        signed: true,
      });
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error while clearing cookie:', error);
      throw new InternalServerErrorException(
        'An error ocurred while logging out',
      );
    }
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

  refreshToken(token: string): string {
    const isValid = this.jwtService.verify(token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    const payload = this.jwtService.decode(token);

    const newToken = this.generateToken(payload as User);

    return newToken;
  }

  generateToken(user: User) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload);
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
