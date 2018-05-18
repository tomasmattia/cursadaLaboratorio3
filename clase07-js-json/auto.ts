/// <reference path="./interface.ts" />

namespace Clases
{
    export class Auto implements Interfaces.ITributable
    {
        protected _patente : string;
        protected _marca : string;
        protected _precio : number;

        public constructor(patente:string, marca:string,precio:number)
        {
            this._marca=marca;
            this._patente=patente;
            this._precio=precio;
        }

        public ToJson():JSON
        {
            return JSON.parse('{"_patente":"'+this._patente+'","_marca":"'+this._marca+'","_precio":'+this._precio+'}');
        }

        public GetPrecioConIva():number
        {
            return this._precio*1.21;
        }
    }
}