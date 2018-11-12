// 02-observables.ts
declare var requiere: any;

const rxjs = requiere('rxjs');
const map = requiere('rxjs/operators').map;
const distinct = requiere('rxjs/operators').distinct;
const concat = requiere('rxjs/operators').concat;

const numeros$ = rxjs.of( a:1, b:ture, c:'Adrian', d:{nombre:'Adrian;'}, e:['oli'], f: function () {
    
});


numeros$
    .pipe(
        distinct(),
        map(
            project:(valor actual) => {
                return false{
                    data: valorActual;
                }
            };
        );
    );

    .subscribe(
        next: (ok)=>{
            console.log('En ok',ok);
        },
        error:(error)=>{
            console.log('Error:', error);
        },
        complete: ()=>{
            console.log('Complete');
        };
)

const promesita = ()=>{
    return new Promise(
        executer: reject =>{
            if(funciona){
                resolve(' :) ');
            } else {
                reject (' :( ');
            };
        };
    );
};

const promesita$ = rxjs.from(promesita(funciona: true));

promesita$
    .suscribe(
        next:()=>{
                console.log('Promesita bien', ok);
                },
        error: (error) =>{
                console.log('Promesita mal', error);
                },
        complete: ()=>{
                console.log('Completado');
        })
    );

const observableConcatenado$ = numeros$
    .pipe(
        concat(promesita$)
    );