import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('APP_PORT');

  await app.listen(port ?? 5000, '0.0.0.0').then(async () => {
    logger.log(`Server running on ${await app.getUrl()}`);
    logger.log(`Server running on ${(await app.getUrl()) + '/api'}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
});
