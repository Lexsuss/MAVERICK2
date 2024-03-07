<?php
$id = $_GET['id'];
$tipo = $_GET['tipo'];
$cartella = $_GET['cartella'];

if ($cartella == "") {
    $cartella = "pubblic";
}

$output_dir = "$cartella/$id/";

if (!is_dir($output_dir)) {
    mkdir($cartella . '/' . $id, 0777, true);
    echo 'Cartella creata!';
}

// Aggiungi questo blocco di debug
error_log("Tipo: " . $tipo);
error_log("ID: " . $id);
error_log("Nuovo Nome File: " . $_POST['newFileName']);
error_log("Percorso Output: " . $output_dir);

if (isset($_FILES["myfile"])) {
    $ret = array();

    // Aggiunta del nuovo parametro newFileName
    $newFileName = $_POST['newFileName'];

    $error = $_FILES["myfile"]["error"];
	
	error_log("Percorso Completo: " . $output_dir . $newFileName);
    if (!is_array($_FILES["myfile"]["name"])) // Single file
    {
        // Utilizza il nuovo nome del file
        if (move_uploaded_file($_FILES["myfile"]["tmp_name"], $output_dir . $newFileName)) {
    $ret[] = $newFileName;
} else {
    $ret[] = "Errore durante il caricamento del file";
}
    } else // Multiple files, file[]
    {
        $fileCount = count($_FILES["myfile"]["name"]);
        for ($i = 0; $i < $fileCount; $i++) {
            $fileName = $_FILES["myfile"]["name"][$i];
            // Utilizza il nuovo nome del file
            move_uploaded_file($_FILES["myfile"]["tmp_name"][$i], $output_dir . $newFileName);
            $ret[] = $newFileName;
        }
    }

    echo json_encode($ret);
}else {
    echo json_encode(array('error' => 'Nessun file ricevuto.'));
}
?>