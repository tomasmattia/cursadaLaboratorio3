/// <reference path="./interface.ts" />
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._marca = marca;
            this._patente = patente;
            this._precio = precio;
        }
        Auto.prototype.ToJson = function () {
            return JSON.parse('{"_patente":"' + this._patente + '","_marca":"' + this._marca + '","_precio":"' + this._precio + '"}');
        };
        Auto.prototype.GetPrecioConIva = function () {
            return this._precio * 1.21;
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
