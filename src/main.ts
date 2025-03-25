import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:4000',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('API REST')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get<number>('APP_PORT');

  await app.listen(port ?? 5000, '0.0.0.0').then(async () => {
    logger.verbose(`Server running on ${await app.getUrl()}`);
    logger.verbose(`Api running on ${await app.getUrl()}` + '/api');
    logger.verbose(`Swagger running on ${(await app.getUrl()) + '/apidoc'}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
});
