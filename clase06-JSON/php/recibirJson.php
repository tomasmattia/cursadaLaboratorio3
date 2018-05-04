<?php

    $producto = new stdClass();
    $producto->codigoBarras = 500;
    $producto->nombre = "pasta";
    $producto->precio = 66;

    $objJson = json_encode($producto);
    echo $objJson;

?>