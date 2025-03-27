import { PrismaClient } from '@prisma/client';
import { seedPublicaciones } from './seeders/publicacionesSeeder';
import { usuarioSeeder } from './seeders/usuarioSeeder';
import { permisosSeeder } from './seeders/permisosSeeder';

const prisma = new PrismaClient();

async function main() {
  await permisosSeeder();
  await usuarioSeeder();
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
