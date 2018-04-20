"use strict";
exports.__esModule = true;
var Rectangulo = /** @class */ (function () {
    function Rectangulo(v1, v3) {
        this._vertice1 = v1;
        this._vertice2 = new Punto(v1.GetX(), v3.GetY());
        this._vertice3 = v3;
        this._vertice4 = new Punto(v1.GetY(), v3.GetX());
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
exports.Rectangulo = Rectangulo;
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
exports.Punto = Punto;
