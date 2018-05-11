/// <reference path="./ciudadano.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.prototype.AgregarCiudadano = function () {
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = document.getElementById("txtEdad").value;
            var dni = document.getElementById("txtEdad").value;
            var pais = document.getElementById("cboPais").value;
            var unCiudadano = new Ciudadano(nombre, apellido, edad, dni, pais);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=agregar&cadenaJson=" + JSON.stringify(unCiudadano));
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log("ciudadano cargado");
                }
            };
            this.LimpiarForm();
        };
        Manejadora.prototype.MostrarCiudadanos = function () {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var objeto_1 = JSON.parse(xmlhttp.responseText);
                    var stringTabla_1 = "";
                    var stringCiudadano_1 = "";
                    objeto_1.forEach(function (ciudadano) {
                        stringCiudadano_1 = "<tr><td>" + objeto_1._nombre + "-" + objeto_1._apellido + "-" + objeto_1._edad + "-" + objeto_1._dni + "-" + objeto_1._pais + "</td><td><a href=''>Eliminar</a></td><td><a href=''>Modificar</a></td></tr>";
                        stringTabla_1 += stringCiudadano_1;
                    });
                }
            };
            this.LimpiarForm();
        };
        Manejadora.prototype.EliminarCiudadano = function (unCiudadano) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=eliminar&cadenaJson=" + JSON.stringify(unCiudadano));
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var objeto_2 = JSON.parse(xmlhttp.responseText);
                    var stringTabla_2 = "<table>";
                    var stringCiudadano_2 = "";
                    objeto_2.forEach(function (ciudadano) {
                        stringCiudadano_2 = "<tr><td>" + objeto_2._nombre + "-" + objeto_2._apellido + "-" + objeto_2._edad + "-" + objeto_2._dni + "-" + objeto_2._pais + "</td><td><a href=''>Eliminar</a></td><td><a href=''>Modificar</a></td></tr>";
                        stringTabla_2 += stringCiudadano_2;
                    });
                    stringTabla_2 += "</table>";
                    document.getElementById("divTabla").innerHTML = stringTabla_2;
                }
            };
            this.LimpiarForm();
        };
        Manejadora.prototype.ModificarCiudadano = function (unCiudadano) {
            document.getElementById("txtNombre").value = unCiudadano._nombre;
            document.getElementById("txtApellido").value = unCiudadano._apellido;
            document.getElementById("txtEdad").value = unCiudadano._edad;
            document.getElementById("txtDni").value = unCiudadano.dni;
            document.getElementById("txtDni").readOnly = true;
            document.getElementById("cboPais").value = unCiudadano._pais;
            document.getElementById("btn-success").value = "Modificar";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=modificar&cadenaJson=" + JSON.stringify());
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log("empleado modificado");
                }
            };
            this.LimpiarForm();
        };
        Manejadora.prototype.FiltrarCiudadanosPorPais = function () {
            var pais = document.getElementById("cboPais").value;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var objeto_3 = JSON.parse(xmlhttp.responseText);
                    var stringTabla_3 = "<table>";
                    var stringCiudadano_3 = "";
                    objeto_3.forEach(function (ciudadano) {
                        if (objeto_3._pais == pais) {
                            stringCiudadano_3 = "<tr><td>" + objeto_3._nombre + "-" + objeto_3._apellido + "-" + objeto_3._edad + "-" + objeto_3._dni + "-" + objeto_3._pais + "</td><td><a href=''>Eliminar</a></td><td><a href=''>Modificar</a></td></tr>";
                            stringTabla_3 += stringCiudadano_3;
                        }
                    });
                    stringTabla_3 += "</table>";
                    document.getElementById("divTabla").innerHTML = stringTabla_3;
                }
            };
            this.LimpiarForm();
        };
        Manejadora.prototype.CargarPaisesJson = function () {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=paises");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var objeto = JSON.parse(xmlhttp.responseText);
                    objeto.forEach(function (paises) {
                        document.getElementById("cboPais").add(paises.descripcion);
                    });
                }
            };
            this.LimpiarForm();
        };
        Manejadora.prototype.LimpiarForm = function () {
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtApellido").value = "";
            document.getElementById("txtEdad").value = "";
            document.getElementById("txtDni").value = "";
            document.getElementById("cboPais").value = document.getElementById("cboPais").option[0].text;
        };
        return Manejadora;
    }());
})(Test || (Test = {}));
