var Ajax;
(function (Ajax) {
    function Validacion() {
        var user = document.getElementById("idUsuario").value;
        var pass = document.getElementById("idPass").value;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "validar.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("usuario=" + user + '&pass=' + pass);
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
    }
    Ajax.Validacion = Validacion;
    function TraerTodos() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "listarTodos.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != "") {
                    document.getElementById("Todos").innerHTML = xmlhttp.responseText;
                }
                else {
                    document.body.style.backgroundColor = "red";
                }
            }
        };
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Ajax.TraerTodos = TraerTodos;
    function TraerxNombre() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "listarArgentina.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != "") {
                    document.getElementById("xNombre").innerHTML = xmlhttp.responseText;
                }
                else {
                    document.body.style.backgroundColor = "red";
                }
            }
        };
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Ajax.TraerxNombre = TraerxNombre;
    function TraerArg() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "listarArgentina.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != "") {
                    document.getElementById("Argentina").innerHTML = xmlhttp.responseText;
                }
                else {
                    document.body.style.backgroundColor = "red";
                }
            }
        };
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
    Ajax.TraerArg = TraerArg;
})(Ajax || (Ajax = {}));
