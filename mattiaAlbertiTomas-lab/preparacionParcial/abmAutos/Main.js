/// <reference path="./Interface.ts" />
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._patente = patente;
            this._marca = marca;
            this._precio = precio;
        }
        Auto.prototype.ToJson = function () {
            var jsonString = '{"patente":"' + this._patente + '","marca":"' + this._marca + '","precio":' + this._precio + '}';
            return JSON.parse(jsonString);
        };
        Auto.prototype.GetPrecioConIVA = function () {
            return this._precio * 1.21;
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
/// <reference path="./Auto.ts" />
var Enlace;
(function (Enlace) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Agregar = function () {
            var patente = document.getElementById("txtPatente");
            var marca = document.getElementById("cboMarca");
            var precio = document.getElementById("txtPrecio");
            var hiddenModo = document.getElementById("hdnIdModificacion");
            var modo = "agregar";
            if (hiddenModo.value == "modificar") {
                modo = hiddenModo.value;
            }
            var auto = new Clases.Auto(patente.value, marca.value, parseInt(precio.value));
            var jsonAuto = auto.ToJson();
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("cadenaJson=" + JSON.stringify(jsonAuto) + "&caso=" + modo);
        };
        Manejadora.MostrarAutos = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var autosRecuperados = JSON.parse(xhttp.responseText);
                    var tablaMostrar_1 = document.getElementById("tablaMostrar");
                    tablaMostrar_1.innerHTML = "";
                    autosRecuperados.forEach(function (c) {
                        tablaMostrar_1.innerHTML += "<tr>";
                        tablaMostrar_1.innerHTML += "<td>" + c.patente + "</td>\
                                               <td>" + c.marca + "</td>\
                                               <td>" + c.precio + "</td>\
                                               <td>\
                                                   <button onclick='Enlace.Manejadora.ModificarAuto(" + JSON.stringify(c) + ")'>Modificar</button>\
                                               </td>\
                                               <td>\
                                                   <button onclick='Enlace.Manejadora.EliminarAuto(" + JSON.stringify(c) + ")'>Eliminar</button>\
                                               </td>";
                        tablaMostrar_1.innerHTML += "</tr>";
                    });
                }
                else {
                    Manejadora.AdministrarSpinner(true);
                }
            };
            Manejadora.LimpiarForm();
        };
        Manejadora.EliminarAuto = function (auto) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var confirmar = confirm("¿Seguro que desea eliminar el auto de patente " + auto.patente + "?");
            if (confirmar) {
                xhttp.send("cadenaJson=" + JSON.stringify(auto) + "&caso=eliminar");
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        Manejadora.AdministrarSpinner(false);
                        console.log("llegue");
                        Manejadora.MostrarAutos();
                        console.log(xhttp.responseText);
                    }
                    else {
                        Manejadora.AdministrarSpinner(true);
                    }
                };
            }
            Manejadora.LimpiarForm();
        };
        Manejadora.ModificarAuto = function (auto) {
            var patente = document.getElementById("txtPatente");
            var marca = document.getElementById("cboMarca");
            var precio = document.getElementById("txtPrecio");
            var hiddenModo = document.getElementById("hdnIdModificacion");
            patente.value = auto.patente;
            marca.value = auto.marca;
            precio.value = auto.precio;
            hiddenModo.value = "modificar";
            patente.readOnly = true;
        };
        Manejadora.FiltrarAutosPorMarca = function () {
            var marca = document.getElementById("cboMarca");
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=mostrar");
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var autosRecuperados = JSON.parse(xhttp.responseText);
                    var tablaMostrar_2 = document.getElementById("tablaMostrar");
                    tablaMostrar_2.innerHTML = "";
                    autosRecuperados.forEach(function (c) {
                        if (c.marca == marca.value) {
                            tablaMostrar_2.innerHTML += "<tr>";
                            tablaMostrar_2.innerHTML += "<td>" + c.patente + "</td>\
                            <td>" + c.marca + "</td>\
                            <td>" + c.precio + "</td>\
                            <td>\
                                <button onclick='Enlace.Manejadora.ModificarCiudadano(" + JSON.stringify(c) + ")'>Modificar</button>\
                            </td>\
                            <td>\
                                <button onclick='Enlace.Manejadora.EliminarCiudadano(" + JSON.stringify(c) + ")'>Eliminar</button>\
                            </td>";
                            tablaMostrar_2.innerHTML += "</tr>";
                        }
                    });
                }
                else {
                    Manejadora.AdministrarSpinner(true);
                }
            };
        };
        Manejadora.CargarMarcasJSON = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=marcas");
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var marcasArray = JSON.parse(xhttp.responseText);
                    var marcas_1 = document.getElementById("cboMarca");
                    marcas_1.innerHTML = "";
                    marcasArray.forEach(function (p) {
                        marcas_1.innerHTML += "<option>" + p.descripcion + "</option>";
                    });
                }
                else {
                    Manejadora.AdministrarSpinner(true);
                }
            };
            Manejadora.LimpiarForm();
        };
        Manejadora.LimpiarForm = function () {
            var patente = document.getElementById("txtPatente");
            var marca = document.getElementById("cboMarca");
            var precio = document.getElementById("txtPrecio");
            patente.value = "";
            marca.value = "Renault";
            precio.value = "";
        };
        Manejadora.AdministrarSpinner = function (activar) {
            setTimeout(function () {
                if (!activar) {
                    document.getElementById('imgSpinner').setAttribute('src', '');
                }
            }, 1000);
            if (activar) {
                document.getElementById('imgSpinner').setAttribute('src', './BACKEND/gif-load.gif');
            }
        };
        return Manejadora;
    }());
    Enlace.Manejadora = Manejadora;
})(Enlace || (Enlace = {}));
