namespace Test
{
    export function RecibirProducto():void
    {
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

        xmlhttp.open("POST", "./php/recibirJson.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send();

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                let objeto =JSON.parse(xmlhttp.responseText);
                console.log(objeto.codigoBarras+" "+objeto.nombre+" "+objeto.precio);
                alert(JSON.stringify(objeto));
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Test.RecibirProducto();
}