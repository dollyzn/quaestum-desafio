import { IsEmail, IsNumber, IsString } from 'class-validator';

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
}
