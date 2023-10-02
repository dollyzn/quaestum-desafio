import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser(process.env.COOKIE_SECRET));

  const config = new DocumentBuilder()
    .setTitle('Documentação da api quaestum Desafio')
    .setDescription('Desafio proposto para demonstração de habilidades')
    .setVersion('1.0')
    .addTag('Autenticação')
    .addTag('Usuários')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
