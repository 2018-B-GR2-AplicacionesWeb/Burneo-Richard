
declare var  require:any;
const inquirer = require('inquirer');
const rxjs = require('rxjs');
import {buscarJuego, crearJuego} from "./Funciones";



declare var Promise:any;

inquirer
    .prompt(opciones1)
    .then((respuestas) => {
        if (respuestas.opciones === 'Crear'){

            inquirer
                .prompt(formularioIngreso)
                .then((respuestasFormulario) => {
                        console.log(respuestasFormulario)
                        crearJuego(respuestasFormulario.nombreDelJuego,JSON.stringify(respuestasFormulario));
                    }
                );
        };

        if(respuestas.opciones === 'Buscar'){

            inquirer
                .prompt(buscar)
                .then((respuestaParaBuscar) => {
                        buscarJuego(respuestaParaBuscar.nombreDelJuego);
                    }
                )

        };

    });

const opcionesMenu = [
    'Crear','Buscar','Salir    ',
];

const tiposDeJuegos = [
    'Estrategia','Deportes','Carreras','Shooter',
];


var opciones1 = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: opcionesMenu },
];

const formularioIngreso= [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: tiposDeJuegos },
];

const buscar= [
    { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego desea buscar' },
    ]