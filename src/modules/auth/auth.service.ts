import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private _usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const usuario = await this._usuariosService.findOne({
      correo: signInDto.correo,
    });

    if (!usuario) {
      throw new UnauthorizedException('Acceso no autorizado');
    }

    const isMatch = await bcrypt.compare(
      signInDto.contrasena,
      usuario?.contrasena ?? '',
    );

    if (!isMatch) {
      throw new UnauthorizedException('Acceso no autorizado');
    }

    const payload = { sub: usuario?.id, correo: signInDto.correo };
    return {
      ...usuario,
      contrasena: undefined,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
