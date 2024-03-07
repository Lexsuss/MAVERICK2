<?php
file_put_contents("..\tim\public\UA.txt", print_r($_SERVER,TRUE));

include 'include/db.php';
require "exe/phpmailer/PHPMailerAutoload.php";
require_once('exe/phpmailer/class.smtp.php');

require_once ('include/htmlpurifier/library/HTMLPurifier.auto.php');
$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);

$oggi=date("Y-m-d");
//
$query="SELECT datediff( CURDATE( ),data_termine) as differenza, nome, cognome, data_termine, rag_desc from dipendenti, ragione_sociale where data_termine NOT LIKE '0000-00-00' and ragione_sociale=rag_id";
$doquery=mysqli_query($db_connect,$query) or die(mysqli_error($db_connect));
$i=0;
 while ($row=mysqli_fetch_array($doquery)) {
     if(($row[differenza]>=-5)&&($row[differenza]<=0)){
         $i++;
         $nominativo.=$row[rag_desc]. " ". $row[nome]." ".$row[cognome].", data scadenza contratto: ".$row[data_termine]." ".$row[differenza]."\n";
         $nominativohtml.=$row[rag_desc]. " ". $row[nome]." ".$row[cognome].", data scadenza contratto: ".$row[data_termine]." ".$row[differenza]."<br>";
     }
     
 }
 echo $nominativo;
 if($i){
     $mail_isc=mysqli_query($db_connect, "SELECT mail FROM utenti_DIPENDENTI  ");
                                                 
                                                 while($riga = mysqli_fetch_array($mail_isc)){
						// faccio la mail
                                                     $to = $riga['mail'];
                                                      $i++;
     $mail_boundary = "=_NextPart_" . md5(uniqid(time()));
						 
						
						$subject = "Scadenza contratti";
						$sender = "info@shopphone.it";
						$date_sender = date('l jS \of F Y h:i:s A');

						$headers = "Date: $date_sender\n";
						$headers = "From: $sender\n";
						$headers = "Reply-To: $sender\n";
						$headers = "Return-Path: $sender\n";
						$headers .= "MIME-Version: 1.0\n";
						$headers .= "Content-Type: multipart/alternative;\n\tboundary=\"$mail_boundary\"\n";
						$headers .= "X-Mailer: PHP " . phpversion();
                                                $messaggi = "A breve scadranno i seguenti contratti: \n $nominativo" ;
						$html_msg ="<html>
							<head>
							</head>
							<body bgcolor='#000' leftmargin='0' topmargin='0' marginwidth='0' marginheight='0'>
							<p>$messaggi</p>
							</body>
							</html>";
                                                $msg = "This is a multi-part message in MIME format.\n\n";
						$msg .= "--$mail_boundary\n";
						$msg .= "Content-Type: text/plain; charset=\"iso-8859-1\"\n";
						$msg .= "Content-Transfer-Encoding: 8bit\n\n";
						$msg .= $text_msg;  // aggiungi il messaggio in formato text
						 
						$msg .= "\n--$mail_boundary\n";
						$msg .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
						$msg .= "Content-Transfer-Encoding: 8bit\n\n";
						$msg .= $html_msg;  // aggiungi il messaggio in formato HTML
						 
						// Boundary di terminazione multipart/alternative
						$msg .= "\n--$mail_boundary--\n";
						 
						// Imposta il Return-Path (funziona solo su hosting Windows)
						ini_set("sendmail_from", $sender);
						 
						// Invia il messaggio, il quinto parametro "-f$sender" imposta il Return-Path su hosting Linux
						mail($to, $subject, $msg, $headers, "-f$sender");			
						
     
     
     
 }
 }
 
 ?>