import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  
  const port = process.env.API_PORT || 4000;
  await app.listen(port);
  console.log(`🚀 [API] Running on: http://localhost:${port}/api`);
}
bootstrap();
