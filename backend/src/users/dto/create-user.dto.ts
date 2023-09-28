import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * O nome do usuário.
   * @example 'Natã Santos'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * A idade do usuário.
   * @example 25
   */
  @IsNumber()
  @IsNotEmpty()
  age: number;

  /**
   * O endereço de e-mail do usuário.
   * @example 'nata@example.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
