import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {abortOnError : false});

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(8080);
}
bootstrap();
