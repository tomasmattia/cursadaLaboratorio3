namespace Test
{
    export function EnviarListado():void
    {
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        let obj=[
                {"codigoBarra":100,"nombre":"productito1","precio":123},
                {"codigoBarra":101,"nombre":"productito2","precio":231},
                {"codigoBarra":102,"nombre":"productito3","precio":321}
            ]

        xmlhttp.open("POST", "./php/mostrarColeccionJson.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send("listado="+JSON.stringify(obj));

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
    Test.EnviarListado();
}