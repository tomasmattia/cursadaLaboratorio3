/// <reference path="./auto.ts" />
var Enlace;
(function (Enlace) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.prototype.Agregar = function () {
            var patente = document.getElementById("txtPatente").value;
            var marca = document.getElementById("cboMarca").value;
            var precio = Number(document.getElementById("txtPrecio").value);
            var autito = new Clases.Auto(patente, marca, precio);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=agregar&cadenaJson" + JSON.stringify(autito.ToJson()));
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                }
            };
        };
        return Manejadora;
    }());
})(Enlace || (Enlace = {}));
