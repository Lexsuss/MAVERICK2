<?php
   
$db_name="Sql1690590_2";
$db_user="Sql1690590";
$db_pass="Milan1130!!";
$db_host="89.46.111.170";
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
  
$scremaPgInattivi = mysqli_query($db_connect, "UPDATE utenti SET stato=0 where token<'$dataUltima'");
 // echo $data. "<br> " .$dataUltima;

?>
