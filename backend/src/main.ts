import * as dotenv from 'dotenv';
dotenv.config(); // Loading env vars
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seed } from '../prisma/seed';

async function bootstrap() {
  await seed();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
