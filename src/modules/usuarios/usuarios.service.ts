import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this._prismaService.usuario.findUnique({
      where: { correo: createUsuarioDto.correo },
    });

    if (usuario) throw new BadRequestException('Correo ya existe');

    const dto = {
      ...createUsuarioDto,
      contrasena: await bcrypt.hash(createUsuarioDto.contrasena, 10),
    };

    const resultado = await this._prismaService.usuario.create({
      data: dto,
    });
    return resultado;
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
