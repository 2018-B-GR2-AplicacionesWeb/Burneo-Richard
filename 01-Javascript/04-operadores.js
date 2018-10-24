const arreglo = ['A','b','C'];

/* const respuestaForEach = arreglo
     .forEach(
         (valor,indice,arreglo)=> {
             console.log('valor',valor);
             console.log('indice', indice);
             console.log('arreglo', arreglo);
         }
        );*/

const respuestaForEach = arreglo.forEach((v)=> console.log('valor',v));

console.log(respuestaForEach); //

//map

const respuestaMap = arreglo
    .map((v) => v.toUpperCase())
    .forEach ((v)=> console.log(v));

const arregloNumeros = [5, 4, 6, 7, 3, 9, 1, 8, 2, 10];

//Filter
const respuestaFilter = arregloNumeros
    .filter((valorActual) => valorActual % 2 === 0);//Expression

console.log (respuestaFilter)


//console.log(respuestaMap);
//console.log(arreglo);
if (0 === '') {
    console.log('Si');
}else {
    console.log('no');
}

/*const respuestaIndexOf = arregloNumeros.indexOf (
    (valoractual) => {
        return valorActual ===7);
    };

console.log(respuestaIndexOf);
const respuestaFindIndex = arregloNumeros.findIndex((valorActual)=> valorActual.id === 7);//
    }
console.log(respuestaFindIndex);*/

const respuestaFind = arregloNumeros.find (
    (valorActual) => {
        return valorActual ===7//expression
    }
);
console.log(respuestaFind);

//some

const respuestaSome = arregloNumeros // Hay alguno
    .some (
        (valorActual)=>{
            return valorActual>5; //expresion
        }
    );
console.log(respuestaSome);

//every

const respuestaEvery = arregloNumeros // Hay alguno
    .every (
        (valorActual)=>{
            return valorActual > 5; //expresion
        }
    );
console.log(respuestaEvery);

const respuestaReduce = arregloNumeros
    .reduce(
        (valorAcumulado, valorActual) => {
            return valorAcumulado + valorActual
        },
        0 // Valor con el que empieza la operacion
    );
console.log(respuestaReduce);

const respuestaReduce1 = arregloNumeros
    .reduceRight((a, b) => a + b, 0 );
console.log(respuestaReduce1);

const respuestaReduce3 = arregloNumeros
    .reduce(
        (valorAcumulado, valorActual) => {
            return valorAcumulado - valorActual
        },
        100 // Valor con el que empieza la operacion
    );
console.log(respuestaReduce3);


// sort

const arregloNumerosClonado1 = JSON.parse(JSON.stringify(arregloNumeros));
console.log (arregloNumerosClonado1);

const respuestaSort = arregloNumerosClonado1
    .sort (
        (a,b) => b - a
    );
console.log(respuestaSort);
console.log(arregloNumeros);

const respuestaSort1 = arregloNumerosClonado1
    .sort (
        (a,b) => a - b
    );
console.log(respuestaSort1);