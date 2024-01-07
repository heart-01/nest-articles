import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  setupSwagger(app);

  app.setGlobalPrefix('api/v1');

  await app.listen(port);
}
bootstrap();
