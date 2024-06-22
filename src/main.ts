import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  /*AGREGAMOS UN PIPE PARA VALIDAR Y TRANSFORMAR LOS DATOS ANTES QUE LLEGUEN AL CONTROLADOR*/
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  const reflector = app.get(Reflector); //ocultamos la passwrod
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);
  console.log("Escuchando en el puerto: " + configService.get('PORT'))
  console.log("Entorno: " + process.env.NODE_ENV)

  app.enableCors(CORS)

  app.setGlobalPrefix('api')

  await app.listen(configService.get('PORT'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();