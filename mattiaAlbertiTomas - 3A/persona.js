var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this._apellido = apellido;
            this._nombre = nombre;
            this._edad = edad;
        }
        Persona.prototype.personaToString = function () {
            return this._apellido + " " + this._nombre + " " + this._edad;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
