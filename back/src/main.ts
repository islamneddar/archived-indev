import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import AppModule from './app.module';

declare const module: any;

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(8080);
  logger.debug(process.env.NODE_ENV);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap().then(() => {
  logger.debug('bootstrap started');
});

export default logger;
