namespace Ajax
{
    export function Validacion():void
    {
        let user : string= (<HTMLInputElement> document.getElementById("idUsuario")).value;
        let pass : string= (<HTMLInputElement> document.getElementById("idPass")).value;
        
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        
        xmlhttp.open("POST", "validar.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send("usuario="+user+'&pass='+pass);

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                if(xmlhttp.responseText=="ok")
                {
                    document.body.style.backgroundColor="green";
                }
                else
                {
                    document.body.style.backgroundColor="red";
                }
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }

    export function TraerTodos():void
    {        
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        
        xmlhttp.open("POST", "listarTodos.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send();

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                if(xmlhttp.responseText!="")
                {
                    (<HTMLDivElement>document.getElementById("Todos")).innerHTML=xmlhttp.responseText;
                }
                else
                {
                    document.body.style.backgroundColor="red";
                }
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }

    export function TraerxNombre():void
    {   
        
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        
        xmlhttp.open("POST", "listarArgentina.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send();

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                if(xmlhttp.responseText!="")
                {
                    (<HTMLDivElement>document.getElementById("xNombre")).innerHTML=xmlhttp.responseText;
                }
                else
                {
                    document.body.style.backgroundColor="red";
                }
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }

    export function TraerArg():void
    {        
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        
        xmlhttp.open("POST", "listarArgentina.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send();

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                if(xmlhttp.responseText!="")
                {
                    (<HTMLDivElement>document.getElementById("Argentina")).innerHTML=xmlhttp.responseText;
                }
                else
                {
                    document.body.style.backgroundColor="red";
                }
            }
        }
        // xmlhttp.open("GET", "./validar.php?usuario="+user+"&pass="+pass, true);
        // xmlhttp.send();
    }
}