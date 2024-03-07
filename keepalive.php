<?php

include('include/db.php');
include('session.php') ;
$verificaUser = mysqli_fetch_array(mysqli_query($db_connect, "SELECT stato from utenti where user='$user'"));
//controllo lo stato dell'utente, se è stato messo a 0: offline
if($verificaUser['stato']=="0") {//se lo stato è 0, distrugge la session
		session_unset();
        	$_SESSION = array();
    		session_destroy();
                  
                header('Location: login.php');
               
} else {//altrimenti, aggiorna la data del token
    $timestamp="UPDATE utenti SET token=NOW() WHERE user='$user'";
    $doTimestamp=mysqli_query($db_connect, $timestamp);
   
}
?>