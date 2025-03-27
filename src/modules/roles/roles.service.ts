import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AsignarPermisoDto } from './dto/asignar-permiso.dto';

@Injectable()
export class RolesService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const rol = await this.findOne({ nombre: createRoleDto.nombre });

    if (rol) throw new BadRequestException('Rol ya existe');

    return await this._prismaService.rol.create({
      data: createRoleDto,
    });
  }

  findAll() {
    return this._prismaService.rol.findMany({
      where: { deletedAt: null },
      include: { rolesPermisos: { include: { permiso: true } } },
    });
  }

  async findOneAndThrow(...where: Parameters<typeof this.findOne>) {
    const usuario = await this.findOne(...where);

    if (!usuario) throw new NotFoundException('Rol no encontrado');

    return usuario;
  }

  async findOne(where?: { id?: number; nombre?: string }) {
    return this._prismaService.rol.findUnique({
      where: { id: where?.id, nombre: where?.nombre, deletedAt: null },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const rol = await this._prismaService.rol.findFirst({
      where: {
        id: { not: id },
        nombre: updateRoleDto.nombre,
      },
    });

    if (rol) throw new BadRequestException('Rol ya existe');

    return await this._prismaService.rol.update({
      data: updateRoleDto,
      where: { id },
    });
  }

  async remove(id: number) {
    await this.findOneAndThrow({ id });

    await this._prismaService.rol.update({
      data: { deletedAt: new Date() },
      where: { id },
    });

    return { id };
  }

  async asignarQuitarPermiso(id: number, asignarPermisoDto: AsignarPermisoDto) {
    const rolPermiso = await this._prismaService.rolPermiso.findUnique({
      where: {
        rolId_permisoId: { permisoId: asignarPermisoDto.permisoId, rolId: id },
      },
    });

    if (rolPermiso) {
      return await this._prismaService.rolPermiso.update({
        where: {
          rolId_permisoId: {
            permisoId: asignarPermisoDto.permisoId,
            rolId: id,
          },
        },

        data: {
          deletedAt: rolPermiso.deletedAt ? null : new Date(),
        },
      });
    }

    await this.findOneAndThrow({ id });

    const permiso = await this._prismaService.permiso.findUnique({
      where: { id: asignarPermisoDto.permisoId, deletedAt: null },
    });

    if (!permiso) {
      throw new BadRequestException('El permiso no existe');
    }

    return await this._prismaService.rolPermiso.create({
      data: { rolId: id, permisoId: asignarPermisoDto.permisoId },
    });
  }
}
