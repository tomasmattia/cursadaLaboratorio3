var Test;
(function (Test) {
    function RecibirColeccion() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "./php/traerAuto.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var objeto = JSON.parse(xmlhttp.responseText);
                console.log(objeto.Id + " " + objeto.Marca + " " + objeto.Precio + " " + objeto.Color + " " + objeto.Modelo);
                alert(JSON.stringify(objeto));
            }
        };
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Test.RecibirColeccion = RecibirColeccion;
    Test.RecibirColeccion();
})(Test || (Test = {}));
