<?php
    $user=$_POST['usuario'];
    $pass=$_POST['pass'];
    $elArchivo=fopen("usuarios.txt","r");
    $banderaEncontrado=false;
    while(!feof($elArchivo))
    {
        $stringUser=fgets($elArchivo);
        if($stringUser)
        {
            $varUser=explode("-",trim($stringUser));
            if($varUser[0]==$user && $varUser[1]==$pass)
            {
                echo "ok";
                $banderaEncontrado=true;
                break;
            }
        }
    }
    if($banderaEncontrado==false)
    {
        echo "no ok";
    }
    
    fclose($elArchivo);
?>