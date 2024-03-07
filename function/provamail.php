<?
require "phpmailer/class.phpmailer.php";
$messaggio = new PHPmailer();
//$messaggio->IsSMTP();

//settiamo su true il metodo che indica alla classe 
//il formato HTML
$messaggio->IsHTML(true);
//$messaggio->Host='Host SMTP';

//intestazioni e corpo dell'email
$messaggio->From='info@pushit.it';
$messaggio->AddAddress('fabrizio@pushit.it');
$messaggio->AddReplyTo('info@pushit.it'); 
$messaggio->Subject='Prova formato HTML';
$messaggio->AddEmbeddedImage('../images/spacer.gif', 'spacer', '.');
//inseriamo i tag HTML e i CSS per formattare il messaggio
$messaggio->Body = '<html><body><head><style>';
$messaggio->Body .= '.up{background-color:#FF0000;color:#000000;font-size:12px}';
$messaggio->Body .= '.down{color:#FF0000;text-align:left;font-size:15px}';
$messaggio->Body .= '</style></head>';
$messaggio->Body .= '<center><table><tr><td class="up">Ciao!!</td></tr>';
$messaggio->Body .= '<tr><td class="down">ciao!!!</td></tr></table></center>';
$messaggio->Body .= '</body></html>';
$messaggio->AddAttachment('../attaches/Empower_-_Modulo_Iscrizione_Milano.doc', 'Ciao', 'base64', 'application/octet-stream');
//parte relativa all'invio
if(!$messaggio->Send()){ 
  echo $messaggio->ErrorInfo; 
}else{ 
  echo 'Email inviata correttamente!';
}
//$messaggio->SmtpClose();
unset($messaggio);
?>
