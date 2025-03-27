import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicacionesService {
  constructor(private readonly _prismaService: PrismaService) {}

  findAll() {
    return this._prismaService.publicaciones.findMany({
      where: { deletedAt: null },
    });
  }
}
