import { PrismaClient } from '@prisma/client';
import { seedPublicaciones } from './seeders/publicacionesSeeder';
import { usuarioSeeder } from './seeders/usuarioSeeder';

const prisma = new PrismaClient();

async function main() {
  await seedPublicaciones();
  await usuarioSeeder();
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
