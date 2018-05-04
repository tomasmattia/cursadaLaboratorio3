namespace Test
{
    export function TraerAutoId():void
    {
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

        xmlhttp.open("POST", "./php/traerAuto.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send();

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                let objeto =JSON.parse(xmlhttp.responseText);
                (<HTMLInputElement>document.getElementById("elId")).value=objeto.Id;
                (<HTMLInputElement>document.getElementById("marca")).value=objeto.Marca;
                (<HTMLInputElement>document.getElementById("precio")).value=objeto.Precio;
                (<HTMLInputElement>document.getElementById("color")).value=objeto.Color;
                (<HTMLInputElement>document.getElementById("modelo")).value=objeto.Modelo;
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    
}