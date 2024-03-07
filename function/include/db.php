<?php
   
$db_name="Sql1622227_5";
$db_user="Sql1622227";
$db_pass="261260Gw11@";
$db_host="31.11.39.87";
$db_connect=mysqli_connect($db_host,$db_user,$db_pass,$db_name) or die ("Connessione al DB non riuscita");

mysqli_set_charset($db_connect, "utf8" ) ;

// Genero la data in formato SQL Timestamp
  $data = date('Y-m-d G:i:s');
  // La converto in data pura
  $timestamp=strtotime($data);
  // Ci tolgo 3600 secondi ( ATTUALMENTE 1 H )
  $timestamp=$timestamp-1800;
  // Genero la data a partire dalla data meno mezzora
  $dataUltima = date("Y-m-d H:i:s",$timestamp);
  
$scremaPgInattivi = mysqli_query($db_connect, "UPDATE utenti_DIPENTENTI SET stato=0 where token<'$dataUltima'");
 // echo $data. "<br> " .$dataUltima;

?>
