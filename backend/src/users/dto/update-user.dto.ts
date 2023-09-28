import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * Nome do usuário que será atualizado
   * @example 'Sérgio Freitas'
   */
  name?: string;

  /**
   * Idade do usuário que será atualizado
   * @example 40
   */
  age?: number;

  /**
   * Email do usuário que será atualizado
   * @example 'sergio@example.com'
   */
  email?: string;
}
