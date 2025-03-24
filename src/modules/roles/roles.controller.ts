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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AsignarPermisoDto } from './dto/asignar-permiso.dto';

@Controller('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.rolesService.findOneAndThrow({ id });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }

  @Post(':id/permisos')
  @ApiOperation({
    summary: 'asigna o quita permisos de un rol',
  })
  asignarQuitarPermiso(
    @Param('id') id: number,
    @Body() asignarDto: AsignarPermisoDto,
  ) {
    return this.rolesService.asignarQuitarPermiso(id, asignarDto);
  }
}
