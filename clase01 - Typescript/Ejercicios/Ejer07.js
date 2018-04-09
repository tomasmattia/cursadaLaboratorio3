"use strict";
function primos() {
    var contadorPrimos = 0;
    for (var i = 2; contadorPrimos < 21; i++) {
        for (var k = 2; k < i / 2; k++) {
            if (i % k == 0) {
                break;
            }
        }
        if (i % k != 0 || i == 2) {
            contadorPrimos++;
            console.log(i);
        }
    }
}
primos();
//# sourceMappingURL=Ejer07.js.map