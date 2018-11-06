// 02-observables.ts
declare var requiere: any;

const rxjs = require('rxjs');

const numeros$ = rxjs.of( a:1, b:2, c:3, d:4, e:5 f:6);


numeros$
    .subscribe(
        next: (ok)=>{
            console.log('En ok',ok);
        },
        error:(error)=>{
            console.log('Error:', error);
        },
        complete: ()=>{
            console.log('Complete');
        }

    );
