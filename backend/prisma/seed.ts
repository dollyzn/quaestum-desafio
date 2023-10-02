import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 15;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  const hashedPassword = await hashPassword('admin123');
  const nata = await prisma.user.upsert({
    where: { email: 'nata@example.com' },
    update: {},
    create: {
      email: 'nata@example.com',
      name: 'Natã Santos',
      age: 20,
      password: hashedPassword,
      profile: 'admin',
    },
  });

  console.log({ nata });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
