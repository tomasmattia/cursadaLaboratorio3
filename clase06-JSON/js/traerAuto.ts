namespace Test
{
    export function TraerAuto():void
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
                console.log(objeto.Id+" "+objeto.Marca+" "+objeto.Precio+" "+objeto.Color+" "+objeto.Modelo);
                alert(JSON.stringify(objeto));
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    
}