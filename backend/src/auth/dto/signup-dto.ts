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

  /**
   * A senha do usuário.
   * @example '123123'
   */

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string;
}
