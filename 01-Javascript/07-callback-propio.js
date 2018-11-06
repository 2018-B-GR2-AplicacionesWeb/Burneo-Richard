// 07-callback-propio.js



const fs = require('fs');



function appendFile(nombreArchivo, contenidoArchivo, callback) {

    // 1. leer archivo

    // 2. concatenar contenido

    // 3. creamos el archivo

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

                        if (err) callback(err);

                        else callback(undefined,contenido)

                    }

                )

            } else {

                const contenido = contenidoLeido + contenidoArchivo;

                fs.writeFile(

                    nombreArchivo,

                    contenido,

                    (err) => {

                        if (err) callback(err);

                        else callback(undefined,contenido)

                    }

                )

            }

        })

}



appendFile(

    '07-texto.txt',

    ' Hola',

    (error, contenidoTexto) => {

        if(error) console.log(error)

        else console.log(contenidoTexto)

    });



// console.log(respuesta);

// ['A', 'B', 'C']





// 0-A.txt 'A'

// 1-B.txt 'B'

// 2-C.txt 'C'