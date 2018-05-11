/// <reference path="./ciudadano.ts" />
namespace Test
{
    class Manejadora
    {
        public AgregarCiudadano():void
        {
            let nombre : string= (<HTMLInputElement>document.getElementById("txtNombre")).value;
            let apellido : string=(<HTMLInputElement>document.getElementById("txtApellido")).value;
            let edad : number= (<HTMLInputElement>document.getElementById("txtEdad")).value;
            let dni : number=(<HTMLInputElement>document.getElementById("txtEdad")).value;
            let pais : string=(<HTMLInputElement>document.getElementById("cboPais")).value;

            let unCiudadano =new Ciudadano(nombre,apellido,edad,dni,pais);

            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=agregar&cadenaJson="+JSON.stringify(unCiudadano));
            
                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        console.log("ciudadano cargado");
                    }
                }
            this.LimpiarForm();
        }

        public MostrarCiudadanos():void
        {
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("");
            
                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        let objeto =JSON.parse(xmlhttp.responseText);
                        let stringTabla:string="";
                        let stringCiudadano:string="";
                        objeto.forEach(ciudadano => {
                            stringCiudadano="<tr><td>"+objeto._nombre+"-"+objeto._apellido+"-"+objeto._edad+"-"+objeto._dni+"-"+objeto._pais+"</td><td><a href='"+Manejadora.EliminarCiudadano(JSON.stringify(objeto))+"'>Eliminar</a></td><td><a href='"+Manejadora.ModificarCiudadano(JSON.stringify(objeto))+"'>Modificar</a></td></tr>";
                            stringTabla+=stringCiudadano;
                        });
                    }
                }
            this.LimpiarForm();
        }

        public EliminarCiudadano(unCiudadano:string):void
        {
            let elCiudadano = JSON.parse(unCiudadano);
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
            let txt:string="";
            if (confirm("Desea eliminar a "+elCiudadano._apellido+" "+elCiudadano._nombre)) 
            {
                txt = "si";
            } else {
                txt = "no";
            }
            if(txt=="si")
            {
                xmlhttp.open("POST", "./BACKEND/administrar.php", true);
                xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
                xmlhttp.send("caso=eliminar&cadenaJson="+JSON.stringify(elCiudadano));
            
                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        let objeto =JSON.parse(xmlhttp.responseText);
                        let stringTabla:string="<table>";
                        let stringCiudadano:string="";
                        objeto.forEach(ciudadano => {
                            stringCiudadano="<tr><td>"+objeto._nombre+"-"+objeto._apellido+"-"+objeto._edad+"-"+objeto._dni+"-"+objeto._pais+"</td><td><a href='"+Manejadora.EliminarCiudadano(JSON.stringify(objeto))+"'>Eliminar</a></td><td><a href='"+Manejadora.ModificarCiudadano(JSON.stringify(objeto))+"'>Modificar</a></td></tr>";
                            stringTabla+=stringCiudadano;
                        });
                        stringTabla+="</table>";
                        (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=stringTabla;
                    }
                }
            }
            
                this.LimpiarForm();
        }

        public ModificarCiudadano(unCiudadano:string):void
        {
            let elCiudadano = JSON.parse(unCiudadano);
            (<HTMLInputElement>document.getElementById("txtNombre")).value=elCiudadano._nombre;
            (<HTMLInputElement>document.getElementById("txtApellido")).value=elCiudadano._apellido;
            (<HTMLInputElement>document.getElementById("txtEdad")).value=elCiudadano._edad;
            (<HTMLInputElement>document.getElementById("txtDni")).value=elCiudadano.dni;
            (<HTMLInputElement>document.getElementById("txtDni")).readOnly = true;
            (<HTMLInputElement>document.getElementById("cboPais")).value=elCiudadano._pais;
            (<HTMLInputElement>document.getElementById("btn-success")).value="Modificar"; 
            
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=modificar&cadenaJson="+JSON.stringify());
                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        console.log("empleado modificado")
                    }
                }
                this.LimpiarForm();
        }

        public FiltrarCiudadanosPorPais():void
        {
            let pais:string=(<HTMLInputElement>document.getElementById("cboPais")).value;
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            
                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        let objeto =JSON.parse(xmlhttp.responseText);
                        let stringTabla:string="<table>";
                        let stringCiudadano:string="";
                        objeto.forEach(ciudadano => 
                        {
                            if(objeto._pais==pais)
                            {
                                stringCiudadano="<tr><td>"+objeto._nombre+"-"+objeto._apellido+"-"+objeto._edad+"-"+objeto._dni+"-"+objeto._pais+"</td><td><a href='"+Manejadora.EliminarCiudadano(JSON.stringify(objeto))+"'>Eliminar</a></td><td><a href='"+Manejadora.ModificarCiudadano(JSON.stringify(objeto))+"'>Modificar</a></td></tr>";
                                stringTabla+=stringCiudadano;
                            }
                        });
                        stringTabla+="</table>";
                        (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=stringTabla;

                    }
                }
                this.LimpiarForm();
        }

        public CargarPaisesJson():void
        {
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./BACKEND/administrar.php", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("caso=paises");
            
                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                        let objeto =JSON.parse(xmlhttp.responseText);
                        objeto.forEach(paises => {
                            document.getElementById("cboPais").add(paises.descripcion);
                        });
                    }
                }
                this.LimpiarForm();
        }

        public LimpiarForm():void
        {
            (<HTMLInputElement>document.getElementById("txtNombre")).value="";
            (<HTMLInputElement>document.getElementById("txtApellido")).value="";
            (<HTMLInputElement>document.getElementById("txtEdad")).value="";
            (<HTMLInputElement>document.getElementById("txtDni")).value="";
            (<HTMLInputElement>document.getElementById("cboPais")).value=(<HTMLInputElement>document.getElementById("cboPais")).option[0].text;
        }
    }
}