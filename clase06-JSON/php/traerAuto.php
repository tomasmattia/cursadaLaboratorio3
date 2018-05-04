<?php

    $elArchivo=fopen("../archivos/auto.json","r");
    echo fread($elArchivo,filesize("../archivos/auto.json"));
    fclose($elArchivo);

?>