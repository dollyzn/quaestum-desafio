import {
  Injectable,
  HttpException,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
    };

    if ('id' in data) {
      delete data.id;
    }

    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
    };
  }

  async readAll() {
    let users: User[];
    try {
      users = await this.prisma.user.findMany();
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('An error ocurred');
    }

    return users;
  }

  async read(id: number) {
    let user: User;
    try {
      user = await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('An error occurred');
    }

    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }

    return { ...user };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    if ('id' in data) {
      delete data.id;
    }

    let user: User;
    try {
      user = await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('An error occurred');
    }

    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }

    if (updateUserDto.email) {
      const userExists = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (
        userExists &&
        userExists.id !== id &&
        userExists.email === updateUserDto.email
      ) {
        throw new ConflictException('User with this email already exists');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      ...updatedUser,
    };
  }

  async delete(id: number) {
    let user: User;

    try {
      user = await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('An error occurred');
    }

    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return { ...deletedUser };
  }
}
