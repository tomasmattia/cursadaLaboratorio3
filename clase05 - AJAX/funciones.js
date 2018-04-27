var Ajax;
(function (Ajax) {
    function Validacion() {
        var user = document.getElementById("idUsuario").value;
        var pass = document.getElementById("idPass").value;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText == "ok") {
                    document.body.style.backgroundColor = "green";
                }
                else {
                    document.body.style.backgroundColor = "red";
                }
            }
        };
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
        xmlhttp.open("POST", "./validar.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("usuario=" + user + '&pass=' + pass);
    }
    Ajax.Validacion = Validacion;
})(Ajax || (Ajax = {}));
