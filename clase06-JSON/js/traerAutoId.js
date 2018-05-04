var Test;
(function (Test) {
    function TraerAutoId() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "./php/traerAuto.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var objeto = JSON.parse(xmlhttp.responseText);
                document.getElementById("elId").value = objeto.Id;
                document.getElementById("marca").value = objeto.Marca;
                document.getElementById("precio").value = objeto.Precio;
                document.getElementById("color").value = objeto.Color;
                document.getElementById("modelo").value = objeto.Modelo;
            }
        };
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Test.TraerAutoId = TraerAutoId;
})(Test || (Test = {}));
