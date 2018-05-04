<?php
    var_dump($_POST['producto']);
    $obj= new stdClass();
    $obj= json_decode($_POST['producto']);
    echo $obj->codigoBarra." ".$obj->nombre." ".$obj->precio;
    $objString= json_encode($obj);
    echo $objString;

?>