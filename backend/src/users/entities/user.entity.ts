import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  /**
   * O ID do usuário.
   */
  id: number;

  /**
   * O nome do usuário.
   */
  name: string;

  /**
   * A idade do usuário.
   */
  age: number;

  /**
   * O endereço de e-mail do usuário.
   */
  email: string;
}
