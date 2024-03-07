<?php
include 'include/db.php';

// Ottieni l'ID dell'ultima lead visualizzata (dovresti averlo memorizzato da qualche parte)
$lastSeenLeadID = 100; // Esempio di ID, sostituisci con il valore reale

// Query per ottenere l'ID più grande nella tabella leads
$sql = "SELECT MAX(id) AS max_lead_id FROM leads WHERE BRAND LIKE 'WIND CONSUMER'";
$result = mysqli_query($db_connect, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $maxLeadID = $row['max_lead_id'];
    
    // Confronta l'ID più grande con l'ultimo ID visualizzato
    if ($maxLeadID > $lastSeenLeadID) {
        // Ci sono nuove lead, restituisci il conteggio come JSON
        $sqlNewLeadsCount = "SELECT COUNT(*) AS new_leads FROM leads WHERE id > $lastSeenLeadID AND BRAND LIKE 'WIND CONSUMER'";
        $resultNewLeadsCount = mysqli_query($db_connect, $sqlNewLeadsCount);
        
        if ($resultNewLeadsCount) {
            $rowNewLeadsCount = mysqli_fetch_assoc($resultNewLeadsCount);
            $newLeadsCount = $rowNewLeadsCount['new_leads'];
            echo json_encode(['new_leads' => $newLeadsCount]);
        } else {
            // Errore durante l'esecuzione della query per contare le nuove lead
            echo json_encode(['error' => 'Errore durante il conteggio delle nuove lead']);
        }
    } else {
        // Non ci sono nuove lead rispetto all'ultimo ID visualizzato
        echo json_encode(['new_leads' => 0]);
    }
} else {
    // Errore durante l'esecuzione della query per ottenere l'ID più grande delle lead
    echo json_encode(['error' => 'Errore durante il recupero dell\'ID più grande delle lead']);
}

// Chiudi la connessione al database
mysqli_close($db_connect);
?>

