"use strict";
/// <reference path="./Interface.ts" />
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._patente = patente;
            this._marca = marca;
            this._precio = precio;
        }
        Auto.prototype.ToJson = function () {
            var jsonString = '{"patente":"' + this._patente + '","marca":"' + this._marca + '","precio":' + this._precio + '}';
            return JSON.parse(jsonString);
        };
        Auto.prototype.GetPrecioConIVA = function () {
            return this._precio * 1.21;
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
//# sourceMappingURL=Auto.js.map