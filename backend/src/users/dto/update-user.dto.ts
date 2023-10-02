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

export class UpdateUserDto {
  /**
   * Nome do usuário que será atualizado
   * @example 'Anna Luisa'
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * Idade do usuário que será atualizado
   * @example 25
   */
  @IsNumber()
  @IsOptional()
  age?: number;

  /**
   * Email do usuário que será atualizado
   * @example 'anna@example.com'
   */
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * A senha do usuário.
   * @example '123123'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  @IsOptional()
  password?: string;

  /**
   * O perfil do usuário
   * @example 'moderator'
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
}
