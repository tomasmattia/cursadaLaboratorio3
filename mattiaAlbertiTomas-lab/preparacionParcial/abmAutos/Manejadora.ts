/// <reference path="./Auto.ts" />

namespace Enlace {

    export class Manejadora {

        public static Agregar() : void {

            let patente : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtPatente"));
            let marca : HTMLSelectElement = (<HTMLSelectElement> document.getElementById("cboMarca"));
            let precio : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtPrecio"));

            let hiddenModo : HTMLInputElement = (<HTMLInputElement> document.getElementById("hdnIdModificacion"));
            let modo : string = "agregar";

            if (hiddenModo.value == "modificar") {

                modo = hiddenModo.value;

            } 

            let auto = new Clases.Auto(patente.value, marca.value, parseInt(precio.value));
            let jsonAuto : JSON = auto.ToJson();

            let xhttp : XMLHttpRequest = new XMLHttpRequest();

            xhttp.open("POST", "./BACKEND/administrar.php", true);

            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhttp.send("cadenaJson="+JSON.stringify(jsonAuto)+"&caso="+modo)
            

        }

        public static MostrarAutos() : void {

            let xhttp : XMLHttpRequest = new XMLHttpRequest();

            xhttp.open("POST", "./BACKEND/administrar.php", true);

            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhttp.send("caso=mostrar");

            xhttp.onreadystatechange = function () {

                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    Manejadora.AdministrarSpinner(false);

                    let autosRecuperados : any[] = JSON.parse(xhttp.responseText);

                    let tablaMostrar : HTMLTableElement = (<HTMLTableElement> document.getElementById("tablaMostrar"));
                   
                    tablaMostrar.innerHTML = "";

                    autosRecuperados.forEach(c => {

                        tablaMostrar.innerHTML += "<tr>";

                        tablaMostrar.innerHTML += "<td>" + c.patente + "</td>\
                                               <td>" + c.marca + "</td>\
                                               <td>" + c.precio + "</td>\
                                               <td>\
                                                   <button onclick='Enlace.Manejadora.ModificarAuto("+JSON.stringify(c)+")'>Modificar</button>\
                                               </td>\
                                               <td>\
                                                   <button onclick='Enlace.Manejadora.EliminarAuto("+JSON.stringify(c)+")'>Eliminar</button>\
                                               </td>";

                        tablaMostrar.innerHTML += "</tr>";

                    });

                } else {

                    Manejadora.AdministrarSpinner(true);

                }   

            };
                
            Manejadora.LimpiarForm();

        }

        public static EliminarAuto(auto : any) {

            let xhttp : XMLHttpRequest = new XMLHttpRequest();

            xhttp.open("POST", "./BACKEND/administrar.php", true);

            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            let confirmar = confirm("¿Seguro que desea eliminar el auto de patente " + auto.patente + "?");

            if (confirmar) {

                xhttp.send("cadenaJson="+JSON.stringify(auto)+"&caso=eliminar");

                xhttp.onreadystatechange = function () {

                    if (xhttp.readyState == 4 && xhttp.status == 200) {

                        Manejadora.AdministrarSpinner(false);

                        console.log("llegue");
                        Manejadora.MostrarAutos();
                        console.log(xhttp.responseText);

                    } else {

                        Manejadora.AdministrarSpinner(true);

                    }

                }

            } 

            Manejadora.LimpiarForm();

        }

        public static ModificarAuto(auto : any) {

            let patente : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtPatente"));
            let marca : HTMLInputElement = (<HTMLInputElement> document.getElementById("cboMarca"));
            let precio : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtPrecio"));

            let hiddenModo : HTMLInputElement = (<HTMLInputElement> document.getElementById("hdnIdModificacion"));

            patente.value = auto.patente;
            marca.value = auto.marca;
            precio.value = auto.precio;

            hiddenModo.value = "modificar";

            patente.readOnly = true;

        }

        public static FiltrarAutosPorMarca() : void {

            let marca : HTMLSelectElement = (<HTMLSelectElement> document.getElementById("cboMarca"));

            let xhttp : XMLHttpRequest = new XMLHttpRequest();

            xhttp.open("POST", "./BACKEND/administrar.php", true);

            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhttp.send("caso=mostrar");

            xhttp.onreadystatechange = function () {

                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    Manejadora.AdministrarSpinner(false);

                    let autosRecuperados : any[] = JSON.parse(xhttp.responseText);

                    let tablaMostrar : HTMLTableElement = (<HTMLTableElement> document.getElementById("tablaMostrar"));
                   
                    tablaMostrar.innerHTML = "";

                    autosRecuperados.forEach(c => {

                        if (c.marca == marca.value) {

                            tablaMostrar.innerHTML += "<tr>";

                            tablaMostrar.innerHTML += "<td>" + c.patente + "</td>\
                            <td>" + c.marca + "</td>\
                            <td>" + c.precio + "</td>\
                            <td>\
                                <button onclick='Enlace.Manejadora.ModificarCiudadano("+JSON.stringify(c)+")'>Modificar</button>\
                            </td>\
                            <td>\
                                <button onclick='Enlace.Manejadora.EliminarCiudadano("+JSON.stringify(c)+")'>Eliminar</button>\
                            </td>";

                            tablaMostrar.innerHTML += "</tr>";

                        }    

                    });

                } else {

                    Manejadora.AdministrarSpinner(true);

                }   

            };

        }

        public static CargarMarcasJSON() {

            let xhttp : XMLHttpRequest = new XMLHttpRequest();

            xhttp.open("POST", "./BACKEND/administrar.php", true);

            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhttp.send("caso=marcas");

            xhttp.onreadystatechange = function () {

                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    Manejadora.AdministrarSpinner(false);

                    let marcasArray : any[] = JSON.parse(xhttp.responseText);
                    let marcas : HTMLSelectElement = (<HTMLSelectElement> document.getElementById("cboMarca"));

                    marcas.innerHTML = "";

                    marcasArray.forEach(p => {
                        
                        marcas.innerHTML += "<option>"+p.descripcion+"</option>";

                    });

                } else {

                    Manejadora.AdministrarSpinner(true);

                }

            }

            Manejadora.LimpiarForm();

        }

        public static LimpiarForm() {

            let patente : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtPatente"));
            let marca : HTMLInputElement = (<HTMLInputElement> document.getElementById("cboMarca"));
            let precio : HTMLInputElement = (<HTMLInputElement> document.getElementById("txtPrecio"));

            patente.value = "";
            marca.value = "Renault";
            precio.value = "";
            
        }

        public static AdministrarSpinner(activar: Boolean) {

            setTimeout(()=> {

                if(!activar){

                    (<HTMLImageElement>document.getElementById('imgSpinner')).setAttribute('src', '');

                }

            }, 1000);

            if (activar) {

                (<HTMLImageElement>document.getElementById('imgSpinner')).setAttribute('src', './BACKEND/gif-load.gif');

            }
                
        }

    }

}