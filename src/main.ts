import { NestFactory } from '@nestjs/core';
import { AppModule } from '@adapters/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Project Olympus')
    .setDescription('A Fintech Backend System Implementation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger.html', app, document);

  await app.listen(3000);
}

bootstrap();
