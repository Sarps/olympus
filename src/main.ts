import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infrastructure/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { KAFKA_BROKER } from '@infrastructure/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_BROKER],
      },
      consumer: {
        groupId: 'olympus',
      },
    },
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Project Olympus')
    .setDescription('A Fintech Backend System Implementation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger.html', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
