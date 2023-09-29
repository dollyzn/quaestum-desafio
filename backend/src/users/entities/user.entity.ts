import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  /**
   * O ID do usuário.
   * @example 1
   */
  id: number;

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
}
