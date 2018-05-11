namespace Entidades
{
    export class Persona
    {
        protected _nombre : string;
        protected _apellido : string;
        protected _edad : number;

        public constructor(nombre:string,apellido:string,edad:number)
        {
            this._apellido=apellido;
            this._nombre=nombre;
            this._edad=edad;
        }

        protected personaToString():string
        {
            return this._apellido+" "+this._nombre+" "+this._edad;
        }
    }
}