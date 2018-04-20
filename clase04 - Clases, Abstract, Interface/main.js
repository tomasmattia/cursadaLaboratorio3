"use strict";
exports.__esModule = true;
var ejer01_1 = require("./ejer01");
var p1 = new ejer01_1.Punto(1, 1);
var p2 = new ejer01_1.Punto(4, 5);
var r1 = new ejer01_1.Rectangulo(p1, p2);
console.log(r1.ToString());
