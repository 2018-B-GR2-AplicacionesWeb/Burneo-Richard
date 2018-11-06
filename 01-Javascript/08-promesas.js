// 08-promesas.js

const fs = require('fs');



const promesa = (nombreArchivo) => {

    return new Promise(

        (resolve, reject) => {

            fs.readFile(

                nombreArchivo,

                'utf-8',

                (error, contenidoLeido) => {

                    if (error) {

                        reject(error);

                    } else {

                        resolve(contenidoLeido);

                    }

                }

            );

        }

    );

};



const promesaEscritura = (

    nombreArchivo,

    contenidoArchivo) => {

    return new Promise(

        (resolve, reject) => {

            fs.writeFile(

                nombreArchivo,

                contenidoArchivo,

                (error) => {

                    if (error) {

                        reject(error);

                    } else {

                        resolve(contenidoArchivo);

                    }

                }

            );

        }

    );

};



console.log(promesa);

promesa('07-texto.txt')

    .then(

        (contenido) => {

            console.log('Ok', contenido);

            return promesaEscritura(

                '07-texto.txt',

                contenido + 'Nuevo Contenido');

            // Promesa

        }

    )

    .then(

        (contenidoCompleto) => {

            console.log(contenidoCompleto);

        }

    )

    .catch(

        (error) => {

            console.log('Mal', error);

        }

    );
z


//Ejercicio AppendFile en promesa



const PromesaAppend = (nombreArchivo, contenidoArchivo) => {

    // 1. leer archivo

    // 2. concatenar contenido

    // 3. creamos el archivo

    return new Promise(

        (resolve, reject) => {

            fs.readFile(

                nombreArchivo,

                'utf-8',

                (error, contenidoLeido) => {

                    if (error) {

                        const contenido = contenidoArchivo;

                        fs.writeFile(

                            nombreArchivo,

                            contenido,

                            (err) => {

                                if (err) reject(err);

                                else resolve(contenido)

                            }

                        )

                    } else {

                        const contenido = contenidoLeido + contenidoArchivo;

                        fs.writeFile(

                            nombreArchivo,

                            contenido,

                            (err) => {

                                if (err) reject(err);

                                else resolve(contenido);

                            }

                        )

                    }

                });

        })

};





PromesaAppend('07-ejemplo2.txt', ' Saludos')

    .then(

        (contenidoArchivo) => {

            console.log(contenidoArchivo)

        }

    )

    .catch(

        (error) => {

            console.log('Mal', error)

        }

    );



// Deber ejercicio



// console.log(respuesta);

// ['A', 'B', 'C']





// 0-A.txt 'A'

// 1-B.txt 'B'

// 2-C.txt 'C'



const respuesta = {

    nombreArchivo: '0-A.txt',

    contenidoArchivo: 'A',

    error: undefined

};



// [respuesta, respuesta, ...]



const promesaEjercicio = (arregloStrings) => {

    return new Promise(

        (resolve) => {

            const arregloRespuestas = [];

            arregloStrings

                .forEach(

                    (string, indice) => {

                        const nombreArchivo = `${indice}-${string}.txt`;

                        const contenidoArchio = string;



                        fs.writeFile(

                            nombreArchivo,

                            contenidoArchio,

                            (err) => {

                                const respuesta = {

                                    nombreArchivo: nombreArchivo,

                                    contenidoArchivo: contenidoArchio,

                                    error: err

                                };

                                arregloRespuestas.push(respuesta);

                                const terminoElArreglo = arregloStrings.length === arregloRespuestas.length;

                                if (terminoElArreglo) {

                                    resolve(arregloRespuestas);

                                }



                            }

                        )



                    }

                );

        }

    );



};





promesaEjercicio(['A', 'B', 'C'])

    .then(

        (respuestas)=>{

            console.log(respuestas)

        }

    );