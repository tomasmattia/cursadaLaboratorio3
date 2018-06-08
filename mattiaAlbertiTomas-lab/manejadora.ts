/// <reference path="./auto.ts" />

namespace Enlace
{
    export class Manejadora
    {
        public static Agregar():void
        {
            Enlace.Manejadora.showSpinner(true);
            let patente : string=(<HTMLInputElement>document.getElementById("txtPatente")).value;
            let marca : string=(<HTMLInputElement>document.getElementById("cboMarca")).value;
            let precio : number=Number((<HTMLInputElement>document.getElementById("txtPrecio")).value);
            let pathFoto : any=(<HTMLInputElement>document.getElementById("pathFoto"));

            let autito:Clases.Auto= new Clases.Auto(patente,marca,precio);

            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
            if((<HTMLInputElement>document.getElementById("btn-success")).value=="Agregar")
            {
                let form : FormData = new FormData();
                form.append('caso', "agregar");
                form.append('cadenaJson',JSON.stringify(autito.ToJson()));
                form.append('foto', pathFoto.files[0]);
                

                xmlhttp.open("POST", "./BACKEND/administrar.php", true);
                xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
                xmlhttp.send(form);
                //xmlhttp.send("caso=agregar&cadenaJson="+JSON.stringify(autito.ToJson()));

                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        let respuesta=JSON.parse(xmlhttp.responseText)
                        if(respuesta.TodoOK)
                        {
                            (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/" + respuesta.pathFoto;
                            console.log("Auto agregado");
                        }
                        else
                        {
                            console.log("Error al agregar el auto");
                        }
                        Enlace.Manejadora.showSpinner(false);
                    }
                }
                Enlace.Manejadora.LimpiarForm();
            }
            else
            {
                xmlhttp.open("POST", "./BACKEND/administrar.php", true);
                xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
                xmlhttp.send("caso=modificar&cadenaJson="+JSON.stringify(autito.ToJson()));

                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        
                        let respuesta=JSON.parse(xmlhttp.responseText)
                        if(respuesta.TodoOK)
                        {
                            Enlace.Manejadora.Mostrar();
                        }
                        else
                        {
                            console.log("Error eliminar el auto");
                        }
                        Enlace.Manejadora.showSpinner(false);
                    }
                }
                Enlace.Manejadora.LimpiarForm();
            }
            
        }

        public static Mostrar():void
        {
            Enlace.Manejadora.showSpinner(true);
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");

            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    console.log(xmlhttp.responseText);
                    let respuesta:any[]=JSON.parse(xmlhttp.responseText)
                    let cadenaTabla="<table border=1 width=100%><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Modificar</th><th>Eliminar</th></tr>";
                    respuesta.forEach(auto => 
                    {
                        cadenaTabla+="<tr><td>"+auto.patente+"</td><td>"+auto.marca+"</td><td>"+auto.precio+"</td><td><input type='button' value='Modificar' class='btn btn-primary' onclick='Enlace.Manejadora.Modificar("+JSON.stringify(auto)+")'></td><td><input type='button' value='Eliminar' class='btn btn-danger' onclick='Enlace.Manejadora.Eliminar("+JSON.stringify(auto)+")'></td></tr>";
                    });
                    cadenaTabla+="</table>";
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=cadenaTabla;
                    Enlace.Manejadora.showSpinner(false);
                }
            }
        }

        public static Eliminar(objEliminar:any):void
        {
            Enlace.Manejadora.showSpinner(true);
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=eliminar&cadenaJson="+JSON.stringify(objEliminar));
            let txt;
            let r = confirm("Desea eliminar el auto? "+JSON.stringify(objEliminar));
            if (r == true) 
            {
                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        
                        let respuesta=JSON.parse(xmlhttp.responseText)
                        if(respuesta.TodoOK)
                        {
                            Enlace.Manejadora.Mostrar();
                        }
                        else
                        {
                            console.log("Error al eliminar el auto");
                        }
                        Enlace.Manejadora.showSpinner(false);
                    }
                }
            } 
            else 
            {
                txt = "Cancelaste la eliminacion";
            }
            
        }

        public static Modificar(objEliminar:any):void
        {
            Enlace.Manejadora.showSpinner(true);
            (<HTMLInputElement>document.getElementById("txtPatente")).value=objEliminar.patente;
            (<HTMLInputElement>document.getElementById("cboMarca")).value=objEliminar.marca;
            (<HTMLInputElement>document.getElementById("txtPrecio")).value=objEliminar.precio;
            (<HTMLInputElement>document.getElementById("txtPatente")).readOnly=true;
            (<HTMLInputElement>document.getElementById("btn-success")).value="Modificar";
            Enlace.Manejadora.showSpinner(false);
        }

        public static CargarMarcas():void
        {
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=marcas");

            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    let respuesta:any[]=JSON.parse(xmlhttp.responseText);
                    (<HTMLSelectElement>document.getElementById("cboMarca")).innerHTML="";
                    respuesta.forEach(marca => 
                    {
                        (<HTMLSelectElement>document.getElementById("cboMarca")).innerHTML+="<option>"+marca.descripcion+"</option>";
                    });
                }
            }
        }

        public static FiltrarPorMarca():void
        {
            Enlace.Manejadora.showSpinner(true);
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
            let marca : string=(<HTMLInputElement>document.getElementById("cboMarca")).value;

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");

            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    console.log(xmlhttp.responseText);
                    let respuesta:any[]=JSON.parse(xmlhttp.responseText)
                    let cadenaTabla="<table border=1 width=100%><tr><th>Patente</th><th>Marca</th><th>Precio</th><th>Modificar</th><th>Eliminar</th></tr>";
                    respuesta.forEach(auto => 
                    {
                        if(auto.marca == marca)
                        {
                            cadenaTabla+="<tr><td>"+auto.patente+"</td><td>"+auto.marca+"</td><td>"+auto.precio+"</td><td><input type='button' value='Modificar' class='btn btn-primary' onclick='Enlace.Manejadora.Modificar("+JSON.stringify(auto)+")'></td><td><input type='button' value='Eliminar' class='btn btn-danger' onclick='Enlace.Manejadora.Eliminar("+JSON.stringify(auto)+")'></td></tr>";
                        }
                    });
                    cadenaTabla+="</table>";
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=cadenaTabla;
                    Enlace.Manejadora.showSpinner(false);
                }
            }
        }

        public static showSpinner(mostrar:boolean):void
        {
            if(mostrar)
            {
                (<HTMLImageElement>document.getElementById("imgSpinner")).src="./BACKEND/gif-load.gif";
            }
            else
            {
                (<HTMLImageElement>document.getElementById("imgSpinner")).src="";
            }
        }

        public static LimpiarForm():void
        {
            (<HTMLInputElement>document.getElementById("txtPatente")).value="";
            (<HTMLInputElement>document.getElementById("cboMarca")).value="";
            (<HTMLInputElement>document.getElementById("txtPrecio")).value="";
            
            (<HTMLInputElement>document.getElementById("btn-success")).value="Agregar";
        }

    }
}