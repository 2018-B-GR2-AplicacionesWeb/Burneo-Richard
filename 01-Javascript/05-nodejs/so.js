//so.js

module.exports = {
    tipo: 'privado',
    acivo: true,
    version: 'Windows7',
    imprimir: ()=>{
        console.log(this.version);
    },
    archivos: [1,2,3],
    programas: [
        {
            nombre:'excel',
            version: 2017
        }
    ]
}