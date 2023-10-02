import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
      throw new BadRequestException('User with this email already exists');
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
          createdAt: true,
          updatedAt: true,
        },
      });

      return users;
    } catch (error) {
      console.error(error.message);
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
      throw new InternalServerErrorException('An error ocurred');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    const userExists = await this.prisma.user.findUnique({
      where: { email: updateUserDto.email },
    });

    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
      updatedAt: new Date(),
    };

    console.log(data);

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
