class Cliente{
    nombre:string;
    email:string;
}


class Juego{
    tipo:string;
    size:string;
    precio=0.00;
    constructor(tipo:string,size:string,precio){
        this.precio = precio;
        this.size = size;
        this.tipo = tipo;
    }
}

class Orden{
    juego:Juego;
    valor_detalle=0.0;
    constructor(juego:Juego) {

        this.valor_detalle=this.juego.precio;
    }
    public toString = () : string => {
        let espacios:string = "            ";
        return `${this.juego.tipo}${espacios.substring(this.juego.tipo.length)}${this.juego.size}${espacios.substring(this.juego.size.length)}${this.juego.precio}`;
    }
}

class Pedido{
    cliente:Cliente;
    ordenes:Orden[]=[];
    mostrar_ordenes(){
        this.ordenes.forEach(

            (orden)=>{

                console.log(orden.toString())


            }
        );
    };
    calcular_total(){
        let precio_unitarios=this.ordenes.map(
            (valor)=>{
                return valor.valor_detalle
            }

        )
        return precio_unitarios.reduce(
            (a,b)=>{
                return a+b;
            },0
        )
    }
}
