import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPublicaciones() {
  console.log('Seeding permisos...');

  const data = [{ nombre: 'Super Admin' }, { nombre: 'admin' }];

  await prisma.permiso.createMany({
    data,
  });

  console.log('Seeding de permisos terminado.');
}
