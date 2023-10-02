import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { IsEmail, IsIn, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  /**
   * Nome do usuário que será atualizado
   * @example 'Sérgio Freitas'
   */
  @IsString()
  name?: string;

  /**
   * Idade do usuário que será atualizado
   * @example 40
   */
  @IsNumber()
  age?: number;

  /**
   * Email do usuário que será atualizado
   * @example 'sergio@example.com'
   */
  @IsEmail()
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
  @IsIn(['user', 'moderator', 'admin'], { message: 'invalid profile' })
  profile?: Profile;
}
