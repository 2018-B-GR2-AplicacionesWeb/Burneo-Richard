var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inquirer = require('inquirer');
const fs = require("fs");
const rxjs = require("rxjs");
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;
function conectarDB(nombreArchivo) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                fs.writeFile(nombreArchivo, '{"usuarios":[],"juego":[]}', (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error al accerder a la base de datos',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'bd leida',
                            bdd: JSON.parse('{"usuarios":[],"juego":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'bd leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
// @ts-ignore
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1) Inicializar bdd -- DONE
        // 2) Preguntas Menu -- DONE
        // 3) Opciones de Respuesta --  DONE
        // 4) ACCCION!!!!  -- DONE
        // 5) Guardar BDD --
        const resultadoConexion$ = rxjs.from(conectarDB('juegosDB.json'));
        resultadoConexion$
            .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos()).subscribe((dato) => {
            console.log(dato);
        }, (error) => {
            console.log(error);
        }, () => {
            main();
            console.log('complete');
        });
    });
}
function preguntarOpcionesMenu() {
    return mergeMap((respuestaBD) => {
        return rxjs.from(inquirer.prompt(preguntasMenu))
            .pipe(map((respuesta) => {
            respuestaBD.opcionMenu = respuesta;
            return respuestaBD;
        }));
    });
}
function opcionesRespuesta() {
    return mergeMap((respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear Juego':
                return rxjs
                    .from(inquirer.prompt(preguntaCrear))
                    .pipe(map((Juego) => {
                    respuestaBDD.Juego = Juego;
                    console.log(respuestaBDD.Juego);
                    return respuestaBDD;
                }));
            case 'Buscar Juego':
                return preguntarJuegoB(respuestaBDD);
            case 'Actualizar Juego':
                return preguntarJuegoA(respuestaBDD);
                break;
            /* case 'Devolver Juego':
                 return preguntarIdUsuario(respuestaBDD);
             case 'Borrar':
                 break;*/
        }
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    (respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear Juego':
                const Juego = respuestaBDD.Juego;
                console.log(Juego);
                respuestaBDD.bdd.juego.push(Juego);
                return respuestaBDD;
            case 'Buscar Juego':
                const indiced = respuestaBDD.indiceJuego;
                //console.log(indiced)
                console.log(respuestaBDD.bdd.juego[indiced]);
                return respuestaBDD;
            case 'Actualizar Juego':
                const indice = respuestaBDD.indiceJuego;
                respuestaBDD.bdd.juego[indice].nombre = respuestaBDD.Juego.nombre;
                return respuestaBDD;
            case 'Borrar Juego':
                break;
            case 'Salir':
                break;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    (respuestaBDD) => {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function guardarBDD(bdd) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.writeFile('juegosDB.json', JSON.stringify(bdd), (error) => {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
const preguntaCrear = [
    {
        type: 'input',
        name: 'id',
        message: 'ingrese el id del Juego;'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nombre del Juego?'
    },
    {
        type: 'input',
        name: 'autor',
        message: 'Cual es el Autor de este Juego?'
    },
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Cual es el id del usuario que posee este Juego?'
    }
];
const preguntaBuscar = [
    {
        type: 'input',
        name: 'idJuego',
        message: 'Ingrese el  id  del Juego que desea Actualizar',
    }
];
const preguntaBuscarB = [
    {
        type: 'input',
        name: 'idJuego',
        message: 'Ingrese el  id  del Juego que desea Buscar',
    }
];
const preguntasMenu = [{
        type: 'list',
        name: 'opcionMenu',
        message: '\nProyecto Observables \n Richard Burneo',
        choices: ['Crear Juego', 'Buscar Juego', 'Actualizar Juego', 'Borrar Juego', 'Salir']
    }];
const preguntaEdicionJuego = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre del Juego'
    },
];
function preguntarJuegoB(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarB))
        .pipe(map(// RESP ANT OBS
    (respuesta) => {
        const indiceJuegoB = respuestaBDD.bdd.juego.findIndex(// -1
        (Juego) => {
            return Juego.id === respuesta.idJuego;
        });
        if (indiceJuegoB === -1) {
            console.log('No existe el Juego que busca');
            return preguntarJuegoB(respuestaBDD);
        }
        else {
            respuestaBDD.indiceJuego = indiceJuegoB;
            //console.log(respuestaBDD.indiceJuego)
            return respuestaBDD;
        }
    }));
}
function preguntarJuegoA(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscar))
        .pipe(mergeMap(// RESP ANT OBS
    (respuesta) => {
        console.log(respuesta);
        const indiceJuego = respuestaBDD.bdd.juego.findIndex(// -1
        (Juego) => {
            return Juego.id === respuesta.idJuego;
        });
        if (indiceJuego === -1) {
            console.log('No existe tal Juego');
            return preguntarJuegoB(respuestaBDD);
        }
        else {
            respuestaBDD.indiceJuego = indiceJuego;
            return rxjs
                .from(inquirer.prompt(preguntaEdicionJuego))
                .pipe(map((nombre) => {
                respuestaBDD.Juego = {
                    id: null,
                    nombre: nombre.nombre,
                    autor: null,
                    idUsuario: null
                };
                return respuestaBDD;
            }));
        }
    }));
}
main();
