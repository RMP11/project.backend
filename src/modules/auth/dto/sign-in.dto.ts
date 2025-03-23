import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  correo: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  contrasena: string;
}
