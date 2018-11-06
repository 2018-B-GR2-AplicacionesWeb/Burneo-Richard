// 01-tipos-variables.ts

//DUCK TYPING -> DUCK
let nombre:any = 'Adrian';
//nombre = '1';
let edad:number | string= 21.2;
edad = '2';
let casado: boolean = false;
casado = true;
casado = undefined;
casado = null;
const arregloNumeros: number[] = [1,2,3];
arregloNumeros.push(6);


const adrian: { //Interface
    nombre: string;
    apellido?: string;
    edad?: number;
    estado?: 'Activo' | 'Inactivo';
    saludar?: (nombre:string)=> string;
} = { // JSON
    nombre: 'Adrian',
    edad: 21,
    //estado = 'Inactivo',
    //casado:false,
    //fechaNacimiento: new Date(),
    saludar: () =>
        {
        return '';
        }
    };




let fecha = new Date ('2018-10-01');


function saludar (
    nombre: string,
    apellido?: string,
    ...otrosNombre: number []
):string {
    return 'hola';
}

let respuestaSaludar = <number> saludar (nombre: 'Adrian', apellido:'Eguez', otrosNombre: 1,2,1,1,2,3);


console.log();

/*const saludarDos= (nombre:string) :string => {

}*/

class UsarioClase{
  public nombre: string;
}

interface UsuarioInterface {
    nombre: string;
}

const usuario: UsuarioInterface = {
    nombre: 'Adrian'
};