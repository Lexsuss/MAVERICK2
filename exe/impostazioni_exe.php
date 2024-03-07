<?php
include('../include/db.php');
include('../session.php'); 
require_once ('../include/htmlpurifier/library/HTMLPurifier.auto.php');
$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);
$operazione = $_POST['operazione'];
$operazione = $purifier->purify($operazione);
$arrayReturn = array();
if($operazione=="crea_azienda") {
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $color=addslashes($_POST['color']);
    $color = $purifier->purify($color);
    $crea_nuovo=mysqli_query($db_connect,"INSERT INTO ragione_sociale (rag_desc, color) VALUES ('$descr', '$color')");
	
}else if($operazione=="modifica_azienda") {
    $id=addslashes($_POST['id']);
    $id = $purifier->purify($id);
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $color=addslashes($_POST['color']);
    $color = $purifier->purify($color);
    $modifica=mysqli_query($db_connect,"update ragione_sociale set rag_desc='$descr', color='$color' where rag_id='$id'");
    $arrayReturn['esito'] = "Modifica effettuata" ;
}else if($operazione=="del_azienda"){
	$id=$_POST[id];
	$modificascheda=mysqli_query($db_connect,"DELETE FROM ragione_sociale  WHERE rag_id='$id'");

}

else if($operazione=="crea_ass") {
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $crea_nuovo=mysqli_query($db_connect,"INSERT INTO tipo_assunzione (ass_desc) VALUES ('$descr')");
	
}else if($operazione=="modifica_ass") {
    $id=addslashes($_POST['id']);
    $id = $purifier->purify($id);
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $modifica=mysqli_query($db_connect,"update tipo_assunzione set ass_desc='$descr'  where ass_id='$id'");
    $arrayReturn['esito'] = "Modifica effettuata" ;
}else if($operazione=="del_ass"){
	$id=$_POST[id];
	$modificascheda=mysqli_query($db_connect,"DELETE FROM tipo_assunzione  WHERE ass_id='$id'");

}
else if($operazione=="crea_liv") {
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $crea_nuovo=mysqli_query($db_connect,"INSERT INTO livello (liv_desc) VALUES ('$descr')");
	
}else if($operazione=="modifica_liv") {
    $id=addslashes($_POST['id']);
    $id = $purifier->purify($id);
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $modifica=mysqli_query($db_connect,"update livello set liv_desc='$descr'  where liv_id='$id'");
    $arrayReturn['esito'] = "Modifica effettuata" ;
}else if($operazione=="del_liv"){
	$id=$_POST[id];
	$modificascheda=mysqli_query($db_connect,"DELETE FROM livello  WHERE liv_id='$id'");
}
else if($operazione=="crea_man") {
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $crea_nuovo=mysqli_query($db_connect,"INSERT INTO mansione (man_desc) VALUES ('$descr')");
	
}else if($operazione=="modifica_man") {
    $id=addslashes($_POST['id']);
    $id = $purifier->purify($id);
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $modifica=mysqli_query($db_connect,"update mansione set man_desc='$descr'  where man_id='$id'");
    $arrayReturn['esito'] = "Modifica effettuata" ;
}else if($operazione=="del_man"){
	$id=$_POST[id];
	$modificascheda=mysqli_query($db_connect,"DELETE FROM mansione  WHERE man_id='$id'");
}else if($operazione=="crea_sog") {
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $crea_nuovo=mysqli_query($db_connect,"INSERT INTO tipo_soggetto (sog_desc) VALUES ('$descr')");
	
}else if($operazione=="modifica_sog") {
    $id=addslashes($_POST['id']);
    $id = $purifier->purify($id);
    $descr=addslashes($_POST['descr']);
    $descr = $purifier->purify($descr);
    $modifica=mysqli_query($db_connect,"update tipo_soggetto set sog_desc='$descr'  where sog_id='$id'");
    $arrayReturn['esito'] = "Modifica effettuata" ;
}else if($operazione=="del_sog"){
	$id=$_POST[id];
	$modificascheda=mysqli_query($db_connect,"DELETE FROM tipo_soggetto  WHERE sog_id='$id'");
}


echo json_encode($arrayReturn);

?>