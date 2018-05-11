var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this._apellido = apellido;
            this._nombre = nombre;
            this._edad = edad;
        }
        Persona.prototype.personaToString = function () {
            return this._apellido + " " + this._nombre + " " + this._edad;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="./persona.ts" />
var Entidades;
(function (Entidades) {
    var Ciudadano = /** @class */ (function (_super) {
        __extends(Ciudadano, _super);
        function Ciudadano(nombre, apellido, edad, dni, pais) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this._dni = dni;
            _this._pais = pais;
            return _this;
        }
        Ciudadano.prototype.ciudadanoToJson = function () {
            return JSON.parse(this.personaToString() + this._dni + this._pais);
        };
        return Ciudadano;
    }(Entidades.Persona));
    Entidades.Ciudadano = Ciudadano;
})(Entidades || (Entidades = {}));
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
                        stringCiudadano_1 = "<tr><td>" + objeto_1._nombre + "-" + objeto_1._apellido + "-" + objeto_1._edad + "-" + objeto_1._dni + "-" + objeto_1._pais + "</td><td><a href='" + Manejadora.EliminarCiudadano(JSON.stringify(objeto_1)) + "'>Eliminar</a></td><td><a href='" + Manejadora.ModificarCiudadano(JSON.stringify(objeto_1)) + "'>Modificar</a></td></tr>";
                        stringTabla_1 += stringCiudadano_1;
                    });
                }
            };
            this.LimpiarForm();
        };
        Manejadora.prototype.EliminarCiudadano = function (unCiudadano) {
            var elCiudadano = JSON.parse(unCiudadano);
            var xmlhttp = new XMLHttpRequest();
            var txt = "";
            if (confirm("Desea eliminar a " + elCiudadano._apellido + " " + elCiudadano._nombre)) {
                txt = "si";
            }
            else {
                txt = "no";
            }
            if (txt == "si") {
                xmlhttp.open("POST", "./BACKEND/administrar.php", true);
                xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xmlhttp.send("caso=eliminar&cadenaJson=" + JSON.stringify(elCiudadano));
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var objeto_2 = JSON.parse(xmlhttp.responseText);
                        var stringTabla_2 = "<table>";
                        var stringCiudadano_2 = "";
                        objeto_2.forEach(function (ciudadano) {
                            stringCiudadano_2 = "<tr><td>" + objeto_2._nombre + "-" + objeto_2._apellido + "-" + objeto_2._edad + "-" + objeto_2._dni + "-" + objeto_2._pais + "</td><td><a href='" + Manejadora.EliminarCiudadano(JSON.stringify(objeto_2)) + "'>Eliminar</a></td><td><a href='" + Manejadora.ModificarCiudadano(JSON.stringify(objeto_2)) + "'>Modificar</a></td></tr>";
                            stringTabla_2 += stringCiudadano_2;
                        });
                        stringTabla_2 += "</table>";
                        document.getElementById("divTabla").innerHTML = stringTabla_2;
                    }
                };
            }
            this.LimpiarForm();
        };
        Manejadora.prototype.ModificarCiudadano = function (unCiudadano) {
            var elCiudadano = JSON.parse(unCiudadano);
            document.getElementById("txtNombre").value = elCiudadano._nombre;
            document.getElementById("txtApellido").value = elCiudadano._apellido;
            document.getElementById("txtEdad").value = elCiudadano._edad;
            document.getElementById("txtDni").value = elCiudadano.dni;
            document.getElementById("txtDni").readOnly = true;
            document.getElementById("cboPais").value = elCiudadano._pais;
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
                            stringCiudadano_3 = "<tr><td>" + objeto_3._nombre + "-" + objeto_3._apellido + "-" + objeto_3._edad + "-" + objeto_3._dni + "-" + objeto_3._pais + "</td><td><a href='" + Manejadora.EliminarCiudadano(JSON.stringify(objeto_3)) + "'>Eliminar</a></td><td><a href='" + Manejadora.ModificarCiudadano(JSON.stringify(objeto_3)) + "'>Modificar</a></td></tr>";
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
