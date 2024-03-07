<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);

require_once 'PHPMailer-master/src/PHPMailer.php';
require_once 'PHPMailer-master/src/SMTP.php';
require_once 'PHPMailer-master/src/Exception.php';
// Imposta il percorso del file di log
$logFile = 'error_log.txt';

// Apri o crea il file di log
$logHandle = fopen($logFile, 'a');

// Configura PHP per inviare gli errori al file di log
ini_set('log_errors', 1);
ini_set('error_log', $logFile);


// Ricevi i dati da JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $destinatario = $_POST['destinatario'];
    $bustaPagaPath = $_POST['bustaPagaPath'];

    inviaEmail($destinatario, $bustaPagaPath);
}

// Funzione per inviare l'email
function inviaEmail($destinatario, $bustaPagaPath) {
    $mail = new PHPMailer(true);

    try {
        // Configura il server di posta
        $mail->isSMTP();
        $mail->Host = 'smtp.aruba.it'; // Sostituisci con il tuo server SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'giulia.consoli@miatim.it'; // Sostituisci con il tuo nome utente SMTP
        $mail->Password = 'XZaTo21To32H!'; // Sostituisci con la tua password SMTP
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Configura il mittente e il destinatario
        $mail->setFrom('giulia.consoli@miatim.it', 'GIULIA CONSOLI');
        $mail->addAddress($destinatario);

        // Aggiunge il file PDF come allegato
        $mail->addAttachment($bustaPagaPath);

        // Configura il contenuto dell'email
        $mail->isHTML(true);
        $mail->Subject = 'Busta Paga';
        $mail->Body = 'Gentile candidato, ecco la sua busta paga in allegato.';

        // Invia l'email
        $mail->send();
        
        // Puoi anche impostare un messaggio di successo o reindirizzare l'utente dopo l'invio
        echo 'Email inviata con successo a ' . $destinatario;
    } catch (Exception $e) {
        error_log('Errore nell\'invio dell\'email: ' . $mail->ErrorInfo);
    	echo 'Errore nell\'invio dell\'email. Si prega di contattare l\'amministratore.';
    }
}
?>