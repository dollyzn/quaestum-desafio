import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  /**
   * O ID do usuário.
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  id: string;

  /**
   * O nome do usuário.
   * @example 'Natã Santos'
   */
  name: string;

  /**
   * A idade do usuário.
   * @example 25
   */
  age: number;

  /**
   * O endereço de e-mail do usuário.
   * @example 'nata@example.com'
   */
  email: string;

  /**
   * A senha do usuário
   * @example '123123'
   */
  password: string;

  /**
   * A senha do usuário
   * @example '2023-10-01 14:30:00'
   */
  createdAt: Date;

  /**
   * A senha do usuário
   * @example '2023-10-01 15:30:00'
   */
  updatedAt: Date;
}
