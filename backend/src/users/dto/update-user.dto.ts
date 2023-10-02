import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { IsEmail, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  /**
   * Nome do usuário que será atualizado
   * @example 'Sérgio Freitas'
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * Idade do usuário que será atualizado
   * @example 40
   */
  @IsNumber()
  @IsOptional()
  age?: number;

  /**
   * Email do usuário que será atualizado
   * @example 'sergio@example.com'
   */
  @IsEmail()
  @IsOptional()
  email?: string;

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
}
