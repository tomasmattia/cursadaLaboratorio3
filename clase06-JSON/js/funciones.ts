namespace Test
{
    export function EnviarProducto():void
    {
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        let obj={"codigoBarra":100,"nombre":"productito","precio":123};

        xmlhttp.open("POST", "./php/mostrarJson.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send("producto="+JSON.stringify(obj));

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                console.log(xmlhttp.responseText);
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Test.EnviarProducto();
}