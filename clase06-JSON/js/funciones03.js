var Test;
(function (Test) {
    function RecibirColeccion() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "./php/recibirColeccion.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var objeto = JSON.parse(xmlhttp.responseText);
                objeto.forEach(function (element) {
                    console.log(element.codigoBarra + " " + element.nombre + " " + element.precio);
                    alert(element.codigoBarra + " " + element.nombre + " " + element.precio);
                });
            }
        };
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Test.RecibirColeccion = RecibirColeccion;
    Test.RecibirColeccion();
})(Test || (Test = {}));
