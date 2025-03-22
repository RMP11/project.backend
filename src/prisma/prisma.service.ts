import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('PrismaService');
  async onModuleInit() {
    await this.$connect(); // Conectar automáticamente con la base de datos
    this.logger.log('Prisma Service Initialized');
  }

  // Método que se ejecuta cuando el módulo se destruye
  async onModuleDestroy() {
    await this.$disconnect(); // Desconectar la base de datos
  }
}
