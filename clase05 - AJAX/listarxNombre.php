<?php
    $elArchivo=fopen("usuarios.txt","r");
    $listaArgentina="";
    while(!feof($elArchivo))
    {
        $stringUser=fgets($elArchivo);
        if($stringUser)
        {
            $varUser=explode("-",trim($stringUser));
            if($varUser[5]=="Argentina")
            {
                $listaArgentina.=$stringUser."<br>";
            }
        }
    }
    echo $listaArgentina;
    fclose($elArchivo);
?>