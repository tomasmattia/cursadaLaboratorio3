<?php
    $user=$_POST['usuario'];
    $pass=$_POST['pass'];
    $elArchivo=fopen("./usuarios.txt","r")
    $banderaEncontrado=false;
    while(!feof($elArchivo))
    {
        $stringUser=explode("-",fgets($elArchivo));
        if($stringUser[0]!="")
        {
            if($stringUser[0]==$user && $stringUser[1]==$pass)
            {
                echo "ok";
                $banderaEncontrado=true;
            }
        }
    }
    if($banderaEncontrado==false)
    {
        echo "no ok";
    }
?>