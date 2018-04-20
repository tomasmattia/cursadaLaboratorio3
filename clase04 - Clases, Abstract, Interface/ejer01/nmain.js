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
/// <reference path="./punto.ts" />
var ejer01;
(function (ejer01) {
    var Rectangulo = /** @class */ (function () {
        function Rectangulo(v1, v3) {
            this._vertice1 = v1;
            this._vertice2 = new ejer01.Punto(v1.GetX(), v3.GetY());
            this._vertice3 = v3;
            this._vertice4 = new ejer01.Punto(v1.GetY(), v3.GetX());
            this._ladoUno = Math.abs(this._vertice1.GetY() - this._vertice2.GetY());
            this._ladoDos = Math.abs(this._vertice3.GetX() - this._vertice4.GetX());
            this._area = this.GetArea();
            this._perimetro = this.GetPerimetro();
        }
        Rectangulo.prototype.GetArea = function () {
            return this._ladoUno * this._ladoDos;
        };
        Rectangulo.prototype.GetPerimetro = function () {
            return (this._ladoUno * 2) + (this._ladoDos * 2);
        };
        Rectangulo.prototype.ToString = function () {
            return this._ladoUno + " " + this._ladoDos + " " + this._area + " " + this._perimetro;
        };
        return Rectangulo;
    }());
    ejer01.Rectangulo = Rectangulo;
})(ejer01 || (ejer01 = {}));
/// <reference path="./rectangulo.ts" />
var ejer01;
(function (ejer01) {
    var p1 = new ejer01.Punto(1, 1);
    var p2 = new ejer01.Punto(4, 5);
    var r1 = new ejer01.Rectangulo(p1, p2);
    console.log(r1.ToString());
})(ejer01 || (ejer01 = {}));
