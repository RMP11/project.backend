import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this._prismaService.usuario.findUnique({
      where: { correo: createUsuarioDto.correo, deletedAt: null },
    });

    if (usuario) throw new BadRequestException('Correo ya existe');

    const dto = {
      ...createUsuarioDto,
      contrasena: await bcrypt.hash(createUsuarioDto.contrasena, 10),
    };

    const resultado = await this._prismaService.usuario.create({
      data: dto,
    });

    return { ...resultado, contrasena: undefined };
  }

  findAll() {
    return this._prismaService.usuario.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        correo: true,
        nombre: true,
        createdAt: true,
      },
    });
  }

  async findOneAndThrow(...where: Parameters<typeof this.findOne>) {
    const usuario = await this.findOne(...where);

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    return usuario;
  }

  async findOne(where?: { id?: number; correo?: string }) {
    return await this._prismaService.usuario.findUnique({
      where: { id: where?.id, correo: where?.correo, deletedAt: null },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this._prismaService.usuario.findFirst({
      where: {
        id: { not: id },
        correo: updateUsuarioDto.correo,
        deletedAt: null,
      },
    });

    if (usuario) throw new BadRequestException('Correo ya existe');

    const dto = {
      ...updateUsuarioDto,
    };

    if (dto.contrasena) {
      dto.contrasena = await bcrypt.hash(dto.contrasena, 10);
    } else {
      delete dto.contrasena;
    }

    const resultado = await this._prismaService.usuario.update({
      data: dto,
      where: { id },
    });

    return { ...resultado, contrasena: undefined };
  }

  async remove(id: number) {
    await this.findOneAndThrow({ id });

    await this._prismaService.usuario.update({
      data: { deletedAt: new Date() },
      where: { id },
    });

    return { id };
  }
}
