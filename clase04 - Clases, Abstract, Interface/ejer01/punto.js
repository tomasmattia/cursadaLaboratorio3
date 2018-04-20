var ejer01;
(function (ejer01) {
    var Punto = /** @class */ (function () {
        function Punto(x, y) {
            this._x = x;
            this._y = y;
        }
        Punto.prototype.GetX = function () {
            return this._x;
        };
        Punto.prototype.GetY = function () {
            return this._y;
        };
        return Punto;
    }());
    ejer01.Punto = Punto;
})(ejer01 || (ejer01 = {}));
