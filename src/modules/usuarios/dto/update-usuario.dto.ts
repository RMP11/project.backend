import { IsString } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty()
  @IsString()
  contrasena?: string;
}
