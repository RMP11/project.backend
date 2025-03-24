import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AsignarPermisoDto {
  @ApiProperty()
  @IsNumber()
  permisoId: number;
}
