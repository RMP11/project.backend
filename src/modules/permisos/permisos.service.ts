import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermisosService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(createPermisoDto: CreatePermisoDto) {
    const rol = await this.findOne({ nombre: createPermisoDto.nombre });

    if (rol) throw new BadRequestException('Permiso ya existe');

    return await this._prismaService.permiso.create({
      data: createPermisoDto,
    });
  }

  findAll() {
    return this._prismaService.permiso.findMany({
      where: { deletedAt: null },
    });
  }

  async findOneAndThrow(...where: Parameters<typeof this.findOne>) {
    const permiso = await this.findOne(...where);

    if (!permiso) throw new NotFoundException('Permiso no encontrado');

    return permiso;
  }

  findOne(where?: { id?: number; nombre?: string }) {
    return this._prismaService.permiso.findUnique({
      where: { id: where?.id, nombre: where?.nombre, deletedAt: null },
    });
  }

  async update(id: number, updatePermisoDto: UpdatePermisoDto) {
    await this.findOneAndThrow({ id });

    const permiso = await this._prismaService.permiso.findFirst({
      where: {
        id: { not: id },
        nombre: updatePermisoDto.nombre,
      },
    });

    if (permiso) {
      throw new BadRequestException('Permiso ya existe');
    }

    return await this._prismaService.permiso.update({
      data: updatePermisoDto,
      where: { id },
    });
  }

  async remove(id: number) {
    await this.findOneAndThrow({ id });

    await this._prismaService.permiso.update({
      data: { deletedAt: new Date() },
      where: { id },
    });

    return { id };
  }
}
