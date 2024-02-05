require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infrastructure/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Project Olympus')
    .setDescription('A Fintech Backend System Implementation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger.html', app, document);

  await app.listen(3000);
}

bootstrap();
