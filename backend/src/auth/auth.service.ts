import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwt = this.jwtService.sign(payload);
    return {
      token: jwt,
    };
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
