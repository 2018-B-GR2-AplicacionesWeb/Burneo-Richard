import {Get, Controller, HttpCode, HttpException, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

@Controller('Usuario')
export class AppController {
  constructor(private readonly appService: AppService) {}



  @Get('Saludar')
  @HttpCode(201)
  saludar(
      nombre: string,
      apellido: string,


  ): string { //metodo
    return this.appService.root();
  }

  @Get('despedirse')
  @HttpCode(201)
  despedirse (): Promise <string> {
    return new Promise<string>(
        (resolve, reject) =>{
          reject('Adios!');

          throw new HttpException ({
              mensaje: 'Error en despedirse',
            },
              400);
      }
    )

  }
  @Get('inicio')
  inicio(){
    //header 1
      return '<h1>Saludo</h1>'
  }



  @Get('SaludarOBservable')
  saludarObservable(): Observable <string>{
      return of(a:'Hola mundo');
  }

  @Get('segmentUnos/:idUsuario/SegmentoDos')
  ruta(
        @Param() todosparametrosRuta,
        @Param('idUsuario') idUsuario
    ): string {
        return idUsuario}

}
