const fs = require ('fs');
declare var Promise:any;
declare var  require:any;

export const crearJuego = (nombreDelArchivo,respuestasDeLasPreguntas)=>{
    fs.writeFile(nombreDelArchivo,respuestasDeLasPreguntas,
        (error)=> {
            return new Promise(
                (resolve,reject)=>{
                    if(error){
                        reject({
                            mensaje:'Error al crear el archivo',
                        })
                    }else {
                        resolve ({
                            mensaje: 'Se Creo BIen'
                        })
                    }
                }
            )
        });
};



export const buscarJuego = (nombreDelArchivo)=>{
    fs.readFile(nombreDelArchivo,'utf-8',
        (error,contenidoArchivo)=>{
            return new Promise(
                (resolve,reject)=>{
                    if(error){
                        reject({
                            mensaje:'Error al buscar el archivo',
                        })
                    }else {
                        resolve (
                            console.log(contenidoArchivo);
                        )
                    }
                }
            )

        }
    );
};
