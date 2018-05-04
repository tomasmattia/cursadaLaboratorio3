<?php

    $listado=array();
    $p1=new stdClass();
    $p2=new stdClass();
    $p1->codigoBarra=400;
    $p1->nombre="pesta";
    $p1->precio=10;
    $p2->codigoBarra=401;
    $p2->nombre="pestax";
    $p2->precio=10;
    
    array_push($listado,$p1,$p2);

    $objJson = json_encode($listado);
    echo $objJson;

?>