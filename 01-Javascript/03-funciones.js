function sumarDosNumeros(numUno,numDos) {
    //validaciones
    var numeroUnoEsNumber = typeof numUno == "number"; // true
    var numeroDosEsNumber = typeof  numDos == "number"; //true
    if (numeroUnoEsNumber && numeroDosEsNumber){
        return numUno+numDos;
    }else{
        return 0;
    }
}
// envio otros parametros
console.log(sumarDosNumeros('a',null));
// no envio parametros
console.log(sumarDosNumeros());
// envio parametros extra
console.log(sumarDosNumeros(1,2,3,4,5));
// envio parametros correctos
console.log(sumarDosNumeros(1,2));

function sumarNumeros(...parametros) {
    console.log(parametros);
    console.log(parametros.length);
    total=0;
    for (i=0;i<parametros.length;i++){
        total=total+parametros[i];
    }
    return total;
}
console.log(sumarNumeros(1,2,3,4));

//Templates strings
function saludar(nombre, funcionMensajeria) {
    var saludo = `Hola ${nombre.toUpperCase()}`;
    funcionMensajeria(saludo);
    return saludo;
}


saludar('andres',console.log);

function imprimirEnConsola(texto) {
    console.log(texto);
}

saludar('andres',imprimirEnConsola);

//var

var varialbe = 'valor'; //Nunca Mas

let edad =29; //Mutar objeto = ...
edad = 30;

const casado = false; // Inmutable
// casdo = true;

const edadV2 = 30; //Inmutable
//edadV2 = 31;

const nombre = 'Adrian'; //Inmutable
//nombre= richard;

const hijos = null ;
//hijos = 1;

const mascotas = {};
//mascotas = 1;
mascotas.cachetes = 'Cachetes'; //metodos
mascotas.numero= '1';
delete mascotas.numero;


const carros= [];
//carros= [];
carros.push('FINAL'); //metodos
carros.pop();
carros [0] = 123;


// Anonymous Functions
//Asignar variables
const saludarV2 = function () {
    // implementacion
}
//Asignar a variables
const usuario = [
    nombre: 'Richard',
    saludar: function () {
        retur this.nombre
    }
]
//  enviar como parametros
saludar ("Adrian", function (texto) {
    console.log(texto);
} );

// fat arrow functions -> =>

const saludarV3 = () => {
  // implementacion
};
saludarV3();

const usuarioV2 = {
    nombre: 'Richard',
    saludar: () => {

    }
};

saludar ("Richard", (texto) => {
    console.log(texto);
});

const sumarDosNumerosV2 = function (numeroUno, NumeroDos){
    return numeroUno + numeroDos;
}
const sumarDosNumerosV2 = (numeroUno, NumeroDos)=> numeroUno + numeroDos;

const saludarV5 = saludo => console.log(saludo);

const saludarV6 = saludo => {
    return console.log(saludo)
};




