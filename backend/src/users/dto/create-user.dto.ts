import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  /**
   * O perfil do usuário
   * @example 'user'
   */
  @ApiProperty({
    enum: Profile,
    example: 'user',
    description: 'O perfil do usuário: user, moderator ou admin.',
  })
  @IsString()
  @IsOptional()
  @IsIn(['user', 'moderator', 'admin'], { message: 'invalid profile' })
  profile?: Profile;

  /**
   * O nome do usuário.
   * @example 'Lara Ester'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * A idade do usuário.
   * @example 20
   */
  @IsNumber()
  @IsNotEmpty()
  age: number;

  /**
   * O endereço de e-mail do usuário.
   * @example 'lara@example.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * A senha do usuário.
   * @example '123123'
   */

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string;
}
