import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as httpserver from 'http-server';
import {Options} from 'http-server';
//console.log(http-server);

async function bootstrap() {
  //console.log(a);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}


bootstrap();
