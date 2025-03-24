import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AsignarRolDto {
  @ApiProperty()
  @IsNumber()
  rolId: number;
}
