/// <reference path="./interface.ts" />
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._marca = marca;
            this._patente = patente;
            this._precio = precio;
        }
        Auto.prototype.ToJson = function () {
            return JSON.parse('{"patente":"' + this._patente + '","marca":"' + this._marca + '","precio":' + this._precio + '}');
        };
        Auto.prototype.GetPrecioConIva = function () {
            return this._precio * 1.21;
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
/// <reference path="./auto.ts" />
var Enlace;
(function (Enlace) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Agregar = function () {
            Enlace.Manejadora.showSpinner(true);
            var patente = document.getElementById("txtPatente").value;
            var marca = document.getElementById("cboMarca").value;
            var precio = Number(document.getElementById("txtPrecio").value);
            var pathFoto = document.getElementById("pathFoto");
            var autito = new Clases.Auto(patente, marca, precio);
            var xmlhttp = new XMLHttpRequest();
            if (document.getElementById("btn-success").value == "Agregar") {
                xmlhttp.open("POST", "./BACKEND/administrar.php", true);
                xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xmlhttp.send("caso=agregar&cadenaJson=" + JSON.stringify(autito.ToJson()));
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var respuesta = JSON.parse(xmlhttp.responseText);
                        if (respuesta.TodoOK) {
                            console.log("Auto agregado");
                        }
                        else {
                            console.log("Error al agregar el auto");
                        }
                        Enlace.Manejadora.showSpinner(false);
                    }
                };
                Enlace.Manejadora.LimpiarForm();
            }
            else {
                xmlhttp.open("POST", "./BACKEND/administrar.php", true);
                xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xmlhttp.send("caso=modificar&cadenaJson=" + JSON.stringify(autito.ToJson()));
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var respuesta = JSON.parse(xmlhttp.responseText);
                        if (respuesta.TodoOK) {
                            Enlace.Manejadora.Mostrar();
                        }
                        else {
                            console.log("Error eliminar el auto");
                        }
                        Enlace.Manejadora.showSpinner(false);
                    }
                };
                Enlace.Manejadora.LimpiarForm();
            }
        };
        Manejadora.Mostrar = function () {
            Enlace.Manejadora.showSpinner(true);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                    var respuesta = JSON.parse(xmlhttp.responseText);
                    var cadenaTabla_1 = "<table border=1 width=100%><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Modificar</th><th>Eliminar</th></tr>";
                    respuesta.forEach(function (auto) {
                        cadenaTabla_1 += "<tr><td>" + auto.patente + "</td><td>" + auto.marca + "</td><td>" + auto.precio + "</td><td><input type='button' value='Modificar' class='btn btn-primary' onclick='Enlace.Manejadora.Modificar(" + JSON.stringify(auto) + ")'></td><td><input type='button' value='Eliminar' class='btn btn-danger' onclick='Enlace.Manejadora.Eliminar(" + JSON.stringify(auto) + ")'></td></tr>";
                    });
                    cadenaTabla_1 += "</table>";
                    document.getElementById("divTabla").innerHTML = cadenaTabla_1;
                    Enlace.Manejadora.showSpinner(false);
                }
            };
        };
        Manejadora.Eliminar = function (objEliminar) {
            Enlace.Manejadora.showSpinner(true);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=eliminar&cadenaJson=" + JSON.stringify(objEliminar));
            var txt;
            var r = confirm("Desea eliminar el auto? " + JSON.stringify(objEliminar));
            if (r == true) {
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var respuesta = JSON.parse(xmlhttp.responseText);
                        if (respuesta.TodoOK) {
                            Enlace.Manejadora.Mostrar();
                        }
                        else {
                            console.log("Error al eliminar el auto");
                        }
                        Enlace.Manejadora.showSpinner(false);
                    }
                };
            }
            else {
                txt = "Cancelaste la eliminacion";
            }
        };
        Manejadora.Modificar = function (objEliminar) {
            Enlace.Manejadora.showSpinner(true);
            document.getElementById("txtPatente").value = objEliminar.patente;
            document.getElementById("cboMarca").value = objEliminar.marca;
            document.getElementById("txtPrecio").value = objEliminar.precio;
            document.getElementById("txtPatente").readOnly = true;
            document.getElementById("btn-success").value = "Modificar";
            Enlace.Manejadora.showSpinner(false);
        };
        Manejadora.CargarMarcas = function () {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=marcas");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var respuesta = JSON.parse(xmlhttp.responseText);
                    document.getElementById("cboMarca").innerHTML = "";
                    respuesta.forEach(function (marca) {
                        document.getElementById("cboMarca").innerHTML += "<option>" + marca.descripcion + "</option>";
                    });
                }
            };
        };
        Manejadora.FiltrarPorMarca = function () {
            Enlace.Manejadora.showSpinner(true);
            var xmlhttp = new XMLHttpRequest();
            var marca = document.getElementById("cboMarca").value;
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                    var respuesta = JSON.parse(xmlhttp.responseText);
                    var cadenaTabla_2 = "<table border=1 width=100%><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Modificar</th><th>Eliminar</th></tr>";
                    respuesta.forEach(function (auto) {
                        if (auto.marca == marca) {
                            cadenaTabla_2 += "<tr><td>" + auto.patente + "</td><td>" + auto.marca + "</td><td>" + auto.precio + "</td><td><input type='button' value='Modificar' class='btn btn-primary' onclick='Enlace.Manejadora.Modificar(" + JSON.stringify(auto) + ")'></td><td><input type='button' value='Eliminar' class='btn btn-danger' onclick='Enlace.Manejadora.Eliminar(" + JSON.stringify(auto) + ")'></td></tr>";
                        }
                    });
                    cadenaTabla_2 += "</table>";
                    document.getElementById("divTabla").innerHTML = cadenaTabla_2;
                    Enlace.Manejadora.showSpinner(false);
                }
            };
        };
        Manejadora.showSpinner = function (mostrar) {
            if (mostrar) {
                document.getElementById("imgSpinner").src = "./BACKEND/gif-load.gif";
            }
            else {
                document.getElementById("imgSpinner").src = "";
            }
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("txtPatente").value = "";
            document.getElementById("cboMarca").value = "";
            document.getElementById("txtPrecio").value = "";
            document.getElementById("btn-success").value = "Agregar";
        };
        return Manejadora;
    }());
    Enlace.Manejadora = Manejadora;
})(Enlace || (Enlace = {}));
