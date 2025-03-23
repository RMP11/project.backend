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

    const isMatch = await bcrypt.compare(
      signInDto.contrasena,
      usuario?.contrasena ?? '',
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: usuario?.id, correo: signInDto.correo };
    return {
      ...usuario,
      contrasena: undefined,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
