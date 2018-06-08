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
            return JSON.parse('{"patente":"'+this._patente+'","marca":"'+this._marca+'","precio":'+this._precio+'}');
        }

        public GetPrecioConIva():number
        {
            return this._precio*1.21;
        }
    }
}