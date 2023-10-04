import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';
import { UserFromJWT } from './models/UserFromJWT';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-dto';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async signUp(
    signUpDto: SignUpDto,
    res: Response,
  ): Promise<{
    success: boolean;
    message: string;
    user: { name: string; profile: string };
  }> {
    const user = await this.userService.create(signUpDto);

    try {
      const jwt = this.generateToken(user);

      res.cookie('token', jwt, {
        httpOnly: true,
        signed: true,
      });
    } catch (error) {
      this.logger.error('SignUp user failed: ' + error);
      throw new InternalServerErrorException('An error ocurred while signUp');
    }

    return {
      success: true,
      message: 'User created successfully',
      user: {
        name: user.name,
        profile: user.profile,
      },
    };
  }

  async login(
    user: User,
    res: Response,
    remember: boolean,
  ): Promise<{
    success: boolean;
    message: string;
    user: { name: string; profile: string };
  }> {
    try {
      const jwt = this.generateToken(user, remember);

      res.cookie('token', jwt, {
        httpOnly: true,
        signed: true,
      });
    } catch (error) {
      this.logger.error('SignIn user failed: ' + error);
      throw new InternalServerErrorException(
        'An error ocurred while logging in',
      );
    }

    return {
      success: true,
      message: 'Logged in succesfully',
      user: {
        name: user.name,
        profile: user.profile,
      },
    };
  }

  async signOut(res: Response): Promise<{ success: boolean; message: string }> {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        signed: true,
      });
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      this.logger.error('SignOut user failed: ' + error);
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

  refreshToken(
    currentToken: string,
    res: Response,
  ): {
    success: boolean;
    message: string;
    user: {
      name: string;
      profile: string;
    };
  } {
    try {
      const currentPayload: UserPayload = this.jwtService.verify(currentToken);

      const user: UserFromJWT = {
        id: currentPayload.sub,
        email: currentPayload.email,
        name: currentPayload.name,
        profile: currentPayload.profile,
      };

      const newToken = this.generateToken(user);

      res.cookie('token', newToken, {
        httpOnly: true,
        signed: true,
      });

      return {
        success: true,
        message: 'Refresh token succesfully',
        user: {
          name: user.name,
          profile: user.profile,
        },
      };
    } catch (error) {
      this.logger.error('RefreshToken failed: ' + error);
      throw new UnauthorizedException('Failed to refresh token');
    }
  }

  generateToken(user: User | UserFromJWT, remember?: boolean) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      profile: user.profile,
    };

    return remember
      ? this.jwtService.sign(payload, { expiresIn: '20d' })
      : this.jwtService.sign(payload);
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
