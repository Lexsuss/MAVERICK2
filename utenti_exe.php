<?php
include('../include/db.php');
include('../session.php'); 
require_once ('../include/htmlpurifier/library/HTMLPurifier.auto.php');


$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);

$operazione = $_POST['operazione'];
$operazione = $purifier->purify($operazione);

$nick=$_POST['user'];
$nick = $purifier->purify($nick);
        
$pass=md5($_POST['password']);
$pass = $purifier->purify($pass);
    
$query=mysqli_fetch_array(mysqli_query($db_connect, "SELECT user, password, tipologia FROM utenti WHERE user='$nick' AND password='$pass'"));
$arrayReturn = array();

if($operazione=="login") {
	
	if(($query['user']=="$nick") &&($query['password']=="$pass") ){
   		session_start();
		$_SESSION['user'] = $query['user'];
        $_SESSION['tipologia'] = $query['tipologia'];

		$user=$_SESSION['user'];
        $tipologia=$_SESSION['tipologia'];
            
        	$locationUpdate="UPDATE  utenti SET stato='1', token=now() WHERE user='".$query['user']."'";
       		$location=mysqli_query($db_connect, $locationUpdate);
            $arrayReturn['tipologia'] = $tipologia ;
     		$arrayReturn['errore'] = "ok" ;
		
		
               
     } else{
    	$arrayReturn['esito'] = "Nome utente o password errati" ;
		$arrayReturn['query'] = $query ;
    }


}
else if($operazione=="logout") 
{	
        $locationUpdate="UPDATE  utenti SET stato='0', token=now() WHERE user='".$query['user']."'";
        $location=mysqli_query($db_connect, $locationUpdate);
   	    $arrayReturn['query'] = $locationUpdate;	
        session_destroy(); 
}
else if($operazione=="crea_nuovo")
{
        
	$utente=mysqli_real_escape_string($db_connect,$_POST['utente']);
    	$checkSelect="SELECT user FROM utenti_DIPENDENTI WHERE user='$utente'";
   	$check=mysqli_fetch_array(mysqli_query($db_connect, $checkSelect));
	if($check[user]!="$utente"){
                $nome=mysqli_real_escape_string($db_connect,$_POST['nome']);
                $cognome=mysqli_real_escape_string($db_connect,$_POST['cognome']);
                $pass=mysqli_real_escape_string($db_connect,$_POST['password']);
                $mail=mysqli_real_escape_string($db_connect,$_POST['mail']);
                $tipologia=mysqli_real_escape_string($db_connect,$_POST['tipologia']);
                $password = md5($pass);
	    	$crea_nuovo2="INSERT INTO utenti (user, mail, password, tipologia, nome, cognome) VALUES ('$utente', '$mail', '$password', '$tipologia', '$nome', '$cognome')";
			$crea_nuovo=mysqli_query($db_connect, $crea_nuovo2);
		$arrayReturn['esito'] = "Utente aggiunto con successo!" ;
		$arrayReturn['errore'] = "ok";
		$arrayReturn['query'] = "$crea_nuovo2";
	}else {
	
	   	$arrayReturn['esito'] = "Utente gia presente! " ;
		$arrayReturn['errore'] = "ko";
	}

}else if($operazione=="modifica_utente"){
	$id=$_POST[id];
	$mail=mysqli_real_escape_string($db_connect,$_POST['mail']);
	$nome=mysqli_real_escape_string($db_connect,$_POST['nome']);
	$cognome=mysqli_real_escape_string($db_connect,$_POST['cognome']);
	$utente=mysqli_real_escape_string($db_connect,$_POST['utente']);
	$pass=mysqli_real_escape_string($db_connect,$_POST['password']);
    $tipologia=mysqli_real_escape_string($db_connect,$_POST['tipologia']);
	
        if($pass!=""){
            $password = md5($pass);
            $add= "password='$password',";
        }
        $modificascheda=mysqli_query($db_connect,"UPDATE utenti SET $add mail='$mail', nome='$nome',cognome='$cognome', user='$utente', tipologia='$tipologia' WHERE id_utente='$id'");
}else if($operazione=="del_utente"){
	$id=$_POST[id];
	$modificascheda=mysqli_query($db_connect,"DELETE FROM utenti  WHERE id_utente='$id'");

}
echo json_encode($arrayReturn);

?>