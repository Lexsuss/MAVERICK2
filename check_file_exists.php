<?php
// Recupera i parametri dalla richiesta GET
$tipo = $_GET['tipo'];
$id = $_GET['id'];
$fileName = $_GET['fileName'];
$cartella = "pubblic";
// Costruisci il percorso completo del file
$filePath = "$cartella/$id/$fileName";

// Verifica se il file esiste
$exists = file_exists($filePath);

// Restituisci la risposta in formato JSON
$response = array('exists' => $exists);
echo json_encode($response);
?>