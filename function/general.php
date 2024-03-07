<?php
require_once("conf/_DBconf.php");

$conn     = mysql_connect($DB_HOST,$DB_USER,$DB_PSW) or die("ERRORE: Impossibile connettersi al db");
$database = mysql_select_db($DB_NAME,$conn) or die("ERRORE: Impossibile selezionare il db".mysql_error());

// formatta la data in inglese
function dataEng($dataita)
{
        $adata = array();
        $adata = split('/',$dataita);
        $adata[0] = (int)$adata[0];
        $adata[1] = (int)$adata[1];
        if($adata[0] < 10){
            $adata[0] = "0".$adata[0];
        }
        if($adata[1] < 10){
            $adata[1] = "0".$adata[1];
        }
	return (  $adata[2].'-'.$adata[1].'-'.$adata[0]);
}
// formatta la data in italiano
function dataIta($dataingl)
{
        $out['anno'] = substr($dataingl,0,4);
	$out['mese'] = substr($dataingl,5,2);
	$out['giorno'] = substr($dataingl,8,2);
	if(!empty($dataingl) and $dataingl!='0000-00-00') return (sprintf("%02d/%02d/%04d",$out['giorno'],$out['mese'],$out['anno']));
}
// -------------------------------------
    function emptyCustomer(){
        $arrayResult = array();
        $query  = "SELECT * FROM tb_customer_data";
        $result = mysql_query($query) or die(mysql_error());
        $row    = mysql_fetch_assoc($result);
        foreach(array_keys($row) as $chiave){
             $arrayResult[$chiave] = "";
        }
        return $arrayResult;
    }

   

function Getinfoagg($id_richiesta){


    $query = "SELECT * FROM `vicidial_call_notes` , vicidial_list WHERE vicidial_call_notes.lead_id = vicidial_list.lead_id and notesid = ".$id_richiesta;
    $result   = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0){
        $row  = mysql_fetch_assoc($result);
        $keys = array_keys($row);
        $cliente = array();
        foreach($keys as $chiave){
             $cliente[$chiave] = $row[$chiave];
        }

        return $cliente;
    }
    else {
        return 0;
    }
}
// ------------------------------



function getCustomerData($id_customer){


    $query = "SELECT * FROM tb_customer_data  WHERE id_customer = ".$id_customer;
    $result   = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0){
        $row  = mysql_fetch_assoc($result);
        $keys = array_keys($row);
        $cliente = array();
        foreach($keys as $chiave){
             $cliente[$chiave] = $row[$chiave];
        }

        return $cliente;
    }
    else {
        return 0;
    }
}
// ------------------------------

function  getContractApp($id_customer){


    $query = "SELECT * FROM tb_sottoscrizione_appuntamento  WHERE idcustomer = ".$id_customer;
echo($query);
    $result   = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0){
        $row  = mysql_fetch_assoc($result);
        $keys = array_keys($row);
        $cliente = array();
        foreach($keys as $chiave){
             $contractapp[$chiave] = $row[$chiave];
        }

        return $contractapp;
    }
    else {
        return 0;
    }
}

function printCallValueparent(){

    $query = "SELECT * FROM  tb_cod_exit WHERE parent_id = 2 ORDER BY descrizione";
    $result = mysql_query($query);
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0){
        echo("<select name='esito_chiamata1'  id='esito_chiamata1' onchange=\"javascript:doContract();\">");
        echo("<option value=''></option>");
        while($row = mysql_fetch_assoc($result)){
            echo("<option value='".$row['id_esito']."' >".$row['descrizione']."</option>");
        }
        echo("</select>");
    }
}


function printCallValue(){

    $query = "SELECT * FROM  esiti WHERE parent_id = 0 and active ='Yes' and dialer_data!='B' ORDER BY descrizione";
    $result = mysql_query($query) or die (mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0){
        echo("<select name='esito_chiamata'  id='esito_chiamata' onchange=\"javascript:doCaseSelect();\">");
        echo("<option value=''></option>");
        while($row = mysql_fetch_assoc($result)){
            echo("<option value='".$row['id_esito']."' >".$row['descrizione']."</option> &nbps;");
        }
        echo("</select>");
    }
}
function printCallValuepaga(){

    $query = "SELECT * FROM  esiti_pag WHERE parent_id = 0 ORDER BY descrizione";
    $result = mysql_query($query) or die (mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0){
        echo("<select name='esito_chiamata'  id='esito_chiamata' onchange=\"javascript:doCaseSelectpag();\">");
        echo("<option value=''></option>");
        while($row = mysql_fetch_assoc($result)){
            echo("<option value='".$row['id_esito']."' >".$row['descrizione']."</option> &nbps;");
        }
        echo("</select>");
    }
}


function printCallValueGlobal(){
    $GLOBAL_HOST = "localhost";
    $GLOBAL_NAME = "global_db";
    $GLOBAL_USER = "root";
    $GLOBAL_PSW  = "4UD0m41n4Dm1n";

    $DB_HOST = $_SESSION['hostname'];
    $DB_NAME = $_SESSION['db'] ;
    $DB_USER = $_SESSION['username'];
    $DB_PSW  = $_SESSION['password'];
    $conn_global  = mysql_connect($GLOBAL_HOST,$GLOBAL_USER,$GLOBAL_PSW) or die("ERRORE: Impossibile connettersi al db");
    $database     = mysql_select_db($GLOBAL_NAME,$conn_global) or die("ERRORE: Impossibile selezionare il db");

    $query = "SELECT * FROM  tb_cod_exit WHERE parent_id = 0 ORDER BY descrizione";
    $result = mysql_query($query,$conn_global) or die (mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0){
        echo("<select name='esito_chiamata'  id='esito_chiamata' onchange=\"javascript:doCaseSelect();\">");
        echo("<option value=''></option>");
        while($row = mysql_fetch_assoc($result)){
            echo("<option value='".$row['id_esito']."' >".$row['descrizione']."</option> &nbps;");
        }
        echo("</select>");
    }
    mysql_close($conn_global);
    $conn     = mysql_connect($DB_HOST,$DB_USER,$DB_PSW) or die("ERRORE: Impossibile connettersi al db");
    $database = mysql_select_db($DB_NAME,$conn) or die("ERRORE: Impossibile selezionare il db".mysql_error());
}


function getSelect($id,$name,$value,$text,$query,$selected="",$disabled="",$event="",$alt=""){

    $result = mysql_query($query) or die (mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0) {
        echo("<select name=\"".$name."\" id=\"".$id."\" ".$disabled." alt=\"".$alt."\"  onchange=\"".$event."\">");
        echo("<option value=\"\"></option>");
        while($row = mysql_fetch_assoc($result)) {
            echo("<option value=\"".$row[$value]."\"");
            if($row[$value] == $selected){
                echo(" selected ");
            }
            echo(" >".$row[$text]."</option>");
        }
        echo("</select>");
    }
}





?>
