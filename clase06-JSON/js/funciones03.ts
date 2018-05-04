namespace Test
{
    export function RecibirColeccion():void
    {
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

        xmlhttp.open("POST", "./php/recibirColeccion.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send();

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                let objeto =JSON.parse(xmlhttp.responseText);
                objeto.forEach(element => {
                    console.log(element.codigoBarra+" "+element.nombre+" "+element.precio)
                    alert(element.codigoBarra+" "+element.nombre+" "+element.precio)
                });
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Test.RecibirColeccion();
}