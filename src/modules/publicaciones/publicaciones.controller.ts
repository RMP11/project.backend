import { Controller, Get } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('publicaciones')
@ApiBearerAuth()
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Get()
  findAll() {
    return this.publicacionesService.findAll();
  }
}
