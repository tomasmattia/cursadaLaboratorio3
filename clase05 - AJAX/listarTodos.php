<?php
    $elArchivo=fopen("usuarios.txt","r");
    echo "<pre>".fread($elArchivo,filesize("usuarios.txt"))."</pre>";
    fclose($elArchivo);
?>