import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  const configService = app.get(ConfigService);
  console.log("Escuchando en el puerto: " + configService.get('PORT'))
  console.log("Entorno: " + process.env.NODE_ENV)

  /*AGREGAMOS UN PIPE PARA VALIDAR Y TRANSFORMAR LOS DATOS ANTES QUE LLEGUEN AL CONTROLADOR*/
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  app.enableCors(CORS)

  app.setGlobalPrefix('api')

  await app.listen(configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();