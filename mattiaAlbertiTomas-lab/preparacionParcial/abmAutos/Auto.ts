/// <reference path="./Interface.ts" />

namespace Clases {

    export class Auto implements Interfaces.Itributable {

        protected _patente : string;
        protected _marca : string;
        protected _precio : number;

        public constructor (patente : string, marca : string, precio : number) {

            this._patente = patente;
            this._marca = marca;
            this._precio = precio;

        }

        public ToJson() : JSON {

            let jsonString : string = '{"patente":"' + this._patente + '","marca":"' + this._marca + '","precio":' + this._precio + '}';

            return JSON.parse(jsonString);

        }

        public GetPrecioConIVA() {

            return this._precio * 1.21;

        }

    }

}