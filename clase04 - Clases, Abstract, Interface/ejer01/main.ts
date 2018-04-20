/// <reference path="./rectangulo.ts" />

namespace ejer01
{
    let p1=new Punto(1,1);
    let p2=new Punto(4,5);
    let r1 = new Rectangulo(p1,p2);
    console.log(r1.ToString());
}
