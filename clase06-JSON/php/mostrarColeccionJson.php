<?php
    var_dump($_POST['listado']);
    $obj= new stdClass();
    $obj= json_decode($_POST['listado']);
    foreach($obj as $p)
    {
        echo $p->codigoBarra." ".$p->nombre." ".$p->precio."\r\n";
    }
       

?>