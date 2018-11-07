// 01-tipos-variables.ts
//DUCK TYPING -> DUCK
var nombre = 'Adrian';
//nombre = '1';
var edad = 21.2;
edad = '2';
var casado = false;
casado = true;
casado = undefined;
casado = null;
var arregloNumeros = [1, 2, 3];
arregloNumeros.push(6);
var adrian = {
    nombre: 'Adrian',
    edad: 21,
    //estado = 'Inactivo',
    //casado:false,
    //fechaNacimiento: new Date(),
    saludar: function () {
        return '';
    }
};
var fecha = new Date('2018-10-01');
function saludar(nombre, apellido) {
    var otrosNombre = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otrosNombre[_i - 2] = arguments[_i];
    }
    return 'hola';
}
var respuestaSaludar = saludar(nombre, 'Adrian', apellido, 'Eguez', otrosNombre, 1, 2, 1, 1, 2, 3);
console.log();
/*const saludarDos= (nombre:string) :string => {

}*/
var UsarioClase = /** @class */ (function () {
    function UsarioClase() {
    }
    return UsarioClase;
}());
var usuario = {
    nombre: 'Adrian'
};
