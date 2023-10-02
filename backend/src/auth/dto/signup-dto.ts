import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class SignUpDto {
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
