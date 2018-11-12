var rxjs = requiere('rxjs');
var map = requiere('rxjs/operators').map;
var distinct = requiere('rxjs/operators').distinct;
var numeros$ = rxjs.of(a, 1, b, ture, c, 'Adrian', d, { nombre: 'Adrian;' }, e, ['oli'], f, function () {
});
numeros$
    .pipe(distinct(), map(project, (valor), actual), {
    "return": false
}, {
    data: valorActual
});
;
;
subscribe(next, function (ok) {
    console.log('En ok', ok);
}, error, function (error) {
    console.log('Error:', error);
}, complete, function () {
    console.log('Complete');
});
var promesita = function () {
    return new Promise(executer, function (reject) {
        if (funciona) {
            resolve(' :) ');
        }
        else {
            reject(' :( ');
        }
        ;
    });
};
;
;
var promesita$ = rxjs.from(promesita(funciona, true));
promesita$
    .suscribe(next, function () {
    console.log('Promesita bien', ok);
}, error, function (error) {
    console.log('Promesita mal', error);
}, complete, function () {
    console.log('Completado');
});
;
