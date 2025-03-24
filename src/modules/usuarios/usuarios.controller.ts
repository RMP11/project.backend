import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AsignarRolDto } from './dto/asignar-rol.dto';

@Controller('usuarios')
@ApiBearerAuth()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usuario = await this.usuariosService.findOneAndThrow({ id: +id });
    return { usuario, contrasena: undefined };
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @Post(':id/roles')
  @ApiOperation({
    summary: 'asigna rol a un usuario',
  })
  asignarRol(@Param('id') id: number, @Body() asignarDto: AsignarRolDto) {
    return this.usuariosService.asignarRol(id, asignarDto);
  }

  @Delete(':id/roles/:rolId')
  @ApiOperation({
    summary: 'quita rol a un usuario',
  })
  quitarRol(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('rolId', new ParseIntPipe()) rolId: number,
  ) {
    return this.usuariosService.quitarRol(id, rolId);
  }
}
