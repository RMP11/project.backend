import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../env.validation';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermisosModule } from './modules/permisos/permisos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    UsuariosModule,
    AuthModule,
    RolesModule,
    PermisosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
