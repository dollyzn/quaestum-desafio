import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(UsersService.name);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 15;
    return bcrypt.hash(password, saltRounds);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      this.logger.log('Create user: User already exists');
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: hashedPassword,
    };

    const createdUser = await this.prisma.user.create({ data });

    delete createdUser.password;

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async readAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          age: true,
          email: true,
          profile: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return users;
    } catch (error) {
      this.logger.error('An error ocurred while findMany users', error);
      throw new InternalServerErrorException('An error ocurred');
    }
  }

  async findByEmail(email: string): Promise<User> {
    let user: User;
    try {
      user = await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      this.logger.error('An error ocurred while find by email users', error);
      throw new InternalServerErrorException('An error ocurred');
    }

    if (!user) {
      this.logger.log('FindByEmail: User not found');
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    const userExists = await this.prisma.user.findUnique({
      where: { email: updateUserDto.email },
    });

    if (userExists && userExists.email != existingUser.email) {
      this.logger.log('Update: User with this email exists');
      throw new ConflictException('User with this email already exists');
    }

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const hashPassword = updateUserDto.password
      ? await this.hashPassword(updateUserDto.password)
      : existingUser.password;

    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
      password: hashPassword,
      updatedAt: new Date(),
    };

    if (user.profile !== 'admin') {
      delete data.profile;
      delete data.password;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    delete updatedUser.password;

    return { ...updatedUser, password: undefined };
  }

  async delete(id: string): Promise<User> {
    let user: User;

    try {
      user = await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error('Delete service error searching for the user');
      throw new InternalServerErrorException('An error ocurred');
    }

    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    delete deletedUser.password;

    return { ...deletedUser, password: undefined };
  }
}
