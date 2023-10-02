import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  /**
   * O nome do usuário.
   * @example 'Lara Ester'
   */
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'Lara Ester',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * A idade do usuário.
   * @example 20
   */
  @ApiProperty({
    description: 'A idade do usuário.',
    example: '20',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  age: number;

  /**
   * O endereço de e-mail do usuário.
   * @example 'lara@example.com'
   */
  @ApiProperty({
    description: 'O endereço de e-mail do usuário.',
    example: 'lara@example.com',
  })
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * A senha do usuário.
   * @example '123123'
   */
  @ApiProperty({
    description: 'A senha do usuário.',
    example: '123123',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string;
}
