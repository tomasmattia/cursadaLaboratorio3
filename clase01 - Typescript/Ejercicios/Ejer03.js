"use strict";
var numero = 5;
var letras;
function checker(numero, frase) {
    if (frase != undefined && numero > 0) {
        for (var i = 0; i < numero; i++) {
            console.log(frase);
        }
    }
    else {
        console.log(-numero);
    }
}
checker(numero, letras);
//# sourceMappingURL=Ejer03.js.map