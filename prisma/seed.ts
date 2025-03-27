import { PrismaClient } from '@prisma/client';
import { seedPublicaciones } from './seeders/publicacionesSeeder';

const prisma = new PrismaClient();

async function main() {
  await seedPublicaciones();
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
