<?php
include 'include/db.php';

// Query per ottenere l'ultima lead
$sqlLastLead = "SELECT * FROM leads WHERE BRAND LIKE 'WIND BUSINESS' ORDER BY id DESC LIMIT 1";
$resultLastLead = mysqli_query($db_connect, $sqlLastLead);

if ($resultLastLead && mysqli_num_rows($resultLastLead) > 0) {
    $rowLastLead = mysqli_fetch_assoc($resultLastLead);
    $lastLeadID = $rowLastLead['id'];
    $newLeadValue = $rowLastLead['new_lead'];

    // Controlla se il campo "new_lead" contiene un certo valore
    if ($newLeadValue == 1) {
        // Mostra il popup di avviso
        echo json_encode(['new_leads' => 1]);
    } else {
        // Effettua un aggiornamento sull'ultima lead e mostra il popup
        $sqlUpdateLastLead = "UPDATE leads SET new_lead = '1' WHERE id = $lastLeadID";
        $resultUpdateLastLead = mysqli_query($db_connect, $sqlUpdateLastLead);

        if ($resultUpdateLastLead) {
            // Mostra il popup di avviso
            echo json_encode(['new_leads' => 1]);
        } else {
            // Errore durante l'aggiornamento dell'ultima lead
            echo json_encode(['error' => 'Errore durante l\'aggiornamento dell\'ultima lead']);
        }
    }
} else {
    // Errore durante l'esecuzione della query per ottenere l'ultima lead
    echo json_encode(['error' => 'Errore durante il recupero dell\'ultima lead']);
}

// Chiudi la connessione al database
mysqli_close($db_connect);
?>
