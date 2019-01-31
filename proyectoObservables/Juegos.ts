declare var require: any;

const inquirer = require('inquirer');
const fs = require("fs");
const rxjs = require("rxjs");
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;



function conectarDB(nombreArchivo) {

    // @ts-ignore11111
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoArchivo) => {
                    if (error) {
                        fs.writeFile(
                            nombreArchivo,
                            '{"usuarios":[],"juegos":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error al accerder a la base de datos',
                                        error: 500
                                    })
                                }
                                else {
                                    resolve({
                                        mensaje: 'bd leida',
                                        bdd: JSON.parse('{"usuarios":[],"juegos":[]}')
                                    })
                                }
                            }
                        )

                    } else {

                        resolve({
                            mensaje: 'bd leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })


                    }


                }
            )


        }
    )
}


// @ts-ignore
async function main() {
    // 1) Inicializar bdd -- DONE
    // 2) Preguntas Menu -- DONE
    // 3) Opciones de Respuesta --  DONE
    // 4) ACCCION!!!!  -- DONE
    // 5) Guardar BDD --

    const resultadoConexion$ = rxjs.from(conectarDB('juegosDB.json'))

    resultadoConexion$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        ).subscribe(
        (dato) => {
            console.log(dato)

        },
        (error) => {
            console.log(error)
        },
        () => {
            main()
            console.log('complete')
        }
    )
}


function preguntarOpcionesMenu() {
    return mergeMap(
        (respuestaBD: RespuestaBD) => {
            return rxjs.from(inquirer.prompt(preguntasMenu))
                .pipe(
                    map(
                        (respuesta: OpcionMenu) => {
                            respuestaBD.opcionMenu = respuesta;
                            return respuestaBD;
                        }
                    )
                )
        }
    )
}


function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear Juego':
                    return rxjs
                        .from(inquirer.prompt(preguntaCrear))
                        .pipe(
                            map(
                                (Juego: Juego) => { // resp ant OBS
                                    respuestaBDD.Juego = Juego;
                                    console.log(respuestaBDD.Juego)
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar Juego':
                    return preguntarJuegoBuscar(respuestaBDD);

                case 'Actualizar Juego':
                    return preguntarJuegoActualizar(respuestaBDD);
                    break;

                /* case 'Devolver Juego':
                     return preguntarIdUsuario(respuestaBDD);
                 */
                 case 'Borrar Juego':
                     return preguntarJuegoBorrar(respuestaBDD);
                     break;
            }
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear Juego':
                    const Juego = respuestaBDD.Juego;
                    console.log(Juego)
                   respuestaBDD.bdd.juegos.push(Juego);
                    return respuestaBDD;
                case 'Buscar Juego':
                    const indiced = respuestaBDD.indiceJuego;
                    //console.log(indiced)
                    console.log(respuestaBDD.bdd.juegos[indiced])
                    return respuestaBDD;
                case 'Actualizar Juego':
                    const indice = respuestaBDD.indiceJuego;
                    respuestaBDD.bdd.juegos[indice].nombre = respuestaBDD.Juego.nombre;

                    return respuestaBDD;
                case 'Borrar Juego':

                    const juegoBorrar= respuestaBDD.indiceJuego;
                    respuestaBDD.bdd.juegos.splice(juegoBorrar, 1);
                    return respuestaBDD;
                    break;
                case 'Salir':
                    break;
            }
        }
    )
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}


function guardarBDD(bdd: BDD) {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'juegosDB.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
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
        name: 'creador',
        message: 'Cual es el Creador de este Juego?'
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
    message: '\nProyecto Observables \n Richard Burneo' ,
    choices: ['Crear Juego','Buscar Juego', 'Actualizar Juego', 'Borrar Juego', 'Salir']
}];


interface RespuestaBD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    usuario?: Usuario;
    indiceUsuario?: number;
    Juego?: Juego;
    indiceJuego?: number;

}

interface BDD {
    usuarios: Usuario[] | any;
    juegos: Juego[]|any;
}


interface Usuario {
    id: number;
    nombre: string;
}

interface Juego {
    id: number;
    nombre: string;
    creador: string;
    idUsuario: number;
}

interface OpcionMenu {
    opcionMenu: 'Crear Juego'|'Buscar Juego'|'Actualizar Juego'|'Borrar Juego'| 'Salir';

}

interface BuscarUsuarioPorId {
    idUsuario: string;
}
interface BuscarJuegoPorId {
    idJuego: string;
}


const preguntaEdicionJuego = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre del Juego'
    },
];


function preguntarJuegoBuscar(respuestaBDD: RespuestaBD) {
   return rxjs
        .from(inquirer.prompt(preguntaBuscarB))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarJuegoPorId) => {

                    const indiceJuegoB = respuestaBDD.bdd.juegos.findIndex( // -1
                        (Juego: any) => {
                            return Juego.id === respuesta.idJuego
                        }
                    );
                    if (indiceJuegoB === -1) {
                        console.log('No existe el Juego que busca');
                        return preguntarJuegoBuscar(respuestaBDD);
                    } else {

                        respuestaBDD.indiceJuego = indiceJuegoB;
                        //console.log(respuestaBDD.indiceJuego)
                        return respuestaBDD


                    }
                }
            )
        );
}


function preguntarJuegoActualizar(respuestaBDD: RespuestaBD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscar))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarJuegoPorId) => {
                    console.log(respuesta)
                    const indiceJuego = respuestaBDD.bdd.juegos.findIndex( // -1
                        (Juego: any) => {
                            return Juego.id === respuesta.idJuego
                        }
                    );
                    if (indiceJuego === -1) {
                        console.log('No existe tal Juego');
                        return preguntarJuegoBuscar(respuestaBDD);
                    } else {
                        respuestaBDD.indiceJuego = indiceJuego;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionJuego))
                            .pipe(
                                map(
                                    (nombre:{nombre:string})=>{
                                        respuestaBDD.Juego ={
                                            id:null,
                                            nombre:nombre.nombre,
                                            creador: null,
                                            idUsuario: null
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                }
            )
        );
}

function preguntarJuegoBorrar (respuestaBDD: RespuestaBD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarB))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarJuegoPorId) => {

                    const indiceJuegoB = respuestaBDD.bdd.juegos.findIndex( // -1
                        (Juego: any) => {
                            return Juego.id === respuesta.idJuego
                        }
                    );
                    if (indiceJuegoB === -1) {
                        console.log('No existe el Juego que busca');
                        return preguntarJuegoBorrar(respuestaBDD);
                    } else {

                        respuestaBDD.indiceJuego = indiceJuegoB;
                        //console.log(respuestaBDD.indiceJuego)
                        return respuestaBDD


                    }
                }
            )
        );
}

main()