/// <reference path="./punto.ts" />
namespace ejer01
{
    export class Rectangulo
    {
        private _area : number;
        private _ladoUno : number;
        private _ladoDos : number;
        private _perimetro : number;
        private _vertice1 : Punto;
        private _vertice2 : Punto;
        private _vertice3 : Punto;
        private _vertice4 : Punto;

        public constructor(v1 : Punto,v3 : Punto)
        {
            this._vertice1=v1;
            this._vertice2= new Punto(v1.GetX(),v3.GetY());
            this._vertice3=v3;
            this._vertice4= new Punto(v1.GetY(),v3.GetX());
            this._ladoUno= Math.abs(this._vertice1.GetY()-this._vertice2.GetY());
            this._ladoDos= Math.abs(this._vertice3.GetX()-this._vertice4.GetX());
            this._area=this.GetArea();
            this._perimetro=this.GetPerimetro();
        }

        public GetArea():number
        {
            return this._ladoUno*this._ladoDos;
        }

        public GetPerimetro():number
        {
            return (this._ladoUno*2)+(this._ladoDos*2);
        }

        public ToString():string
        {
            return this._ladoUno+" "+this._ladoDos+" "+this._area+" "+this._perimetro;
        }
    }
}