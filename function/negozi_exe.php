<?
require_once("../conf/_DBconf.php");
include("../function/mime_mail.php");
require "phpmailer/class.phpmailer.php";

header('Cache-Control: no-cache, pre-check=0, post-check=0');
header('Expires: 0');
header('Pragma: no-cache');

$conn = mysql_connect($DB_HOST1, $DB_USER1, $DB_PSW1) or die("ERRORE: Impossibile connettersi al db");
$database = mysql_select_db($DB_NAME1, $conn) or die("ERRORE: Impossibile selezionare il db" . mysql_error());
$operazione = $_POST['operazione'];

$arrayReturn = array();



if($operazione=="tim"){
    
      $id=$_POST[id];
    $esito=$_POST[esito];
    $note=addslashes($_POST[note]);
      $insertrich="UPDATE negozi SET esito_tim='$esito', note_tim='$note' where id='$id'";
                                //echo($insertrich);
     $result = mysql_query($insertrich) or die(mysql_error()); 
     $idlogin = $_SESSION['idlogin'];
 
   
     
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$richiesta."','Modifica App', now(),'$idlogin', 'Modifica appuntamento')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
    
    
      $arrayReturn['esito'] ="$esito";
}else if($operazione=="salvacontratto") {
	
       
        $protocollo=addslashes($_POST['protocollo']);
        if($protocollo=="") {
				 $arrayReturn['esito'] ="Il protocollo non può essere vuoto!";
				 
		  }else{
		  		$query2="Select count(*) as conta FROM `negozi`  WHERE protocollo='$protocollo'";
  				$result2 = mysql_fetch_assoc(mysql_query($query2));
 		
      		if($result2[conta]==0){
					$cliente=addslashes($_POST['cliente']);
       			$telefono=$_POST['telefono'];
        			$citta=addslashes($_POST['citta']);
        			$indirizzo=addslashes($_POST['indirizzo']);
        			$note=addslashes($_POST['note']);
        			$cod_fiscale=addslashes($_POST['cod_fiscale']);
        			$firma=$_POST[firma];
        			$linea=$_POST[linea];
        			$offerta=$_POST[offerta];
        			$attivazione=$_POST[attivazione];
        			$opzioni=$_POST[opzioni];    
        			$query="INSERT INTO  negozi (cliente, telefono, citta, indirizzo, linea, offerta, opzioni, cod_fiscale, note, protocollo, data_firma, data_att) 
      		 VALUES ('$cliente','$telefono','$citta','$indirizzo', '$linea', '$offerta','$opzioni', '$cod_fiscale', '$note', '$protocollo', '$firma', '$attivazione')";  			
      			$result = mysql_query($query) or die (mysql_error());
      			$query3="Select id FROM `negozi`  WHERE protocollo='$protocollo'";
  					$result3 = mysql_fetch_assoc(mysql_query($query3));
 					
 					   	
      			$idlogin = $_SESSION['idlogin'];
      			$insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$result3[id]."','Aggiunta Negozio', now(),'$idlogin', 'Aggiunta anagrafica cliente')";
               
   				$result = mysql_query($insertrich) or die(mysql_error());
   				$arrayReturn['esito'] ="$result3[id]";  
     		}else {
     			$arrayReturn['esito'] ="Protocollo già presente";     	
     		}
		  
		  
		  }

		  
       
	  
	
}else if($operazione=="visualizza_negozi") {
		   $mese=$_POST[mese];
$anno=$_POST[anno];
$d=mysql_fetch_array(mysql_query("SELECT * from mesi where mese='$mese' ")); //periodo del canvas selezionato
$data1 = $anno."-".$d[inizio];    
$data2=$anno."-".$d[fine]; 
		 
		
		$file= "<h1>".$mese."</h1><br><div class='row'><div class='col-xs-6'><table id='myTable'   class='table table-bordered table-hover ' cellspacing='0' width='100%' border='1'><thead>"
            . "<tr><th>Negozio</th><th>Tot contratti</th><th>OK</th><th>KO</th><th>In attesa</th></thead><tbody>";
    
    $contratti=mysql_query("select  count(*) as conta, negozio from negozi

                            where protocollo LIKE '$d[mm]%' group by negozio"); 
    
     while ($row = mysql_fetch_array($contratti)) {	
         
        // $pr=" Select * FROM prodotti where contratto='$row[contr]' ";
       //  echo $pr;
         
        $ok=mysql_fetch_array(mysql_query("Select count(*) as conta
                        from negozi 
                        where
                        ( protocollo LIKE '$d[mm]%' ) and negozio='$row[negozio]'  and esito_tim='37'"));
                        
         $ko=mysql_fetch_array(mysql_query("Select count(*) as conta
                        from negozi 
                        where
                        ( protocollo LIKE '$d[mm]%' ) and negozio='$row[negozio]'  and esito_tim='38'"));               
                         $wait=mysql_fetch_array(mysql_query("Select count(*) as conta
                        from negozi 
                        where
                        ( protocollo LIKE '$d[mm]%' ) and negozio='$row[negozio]'  and (esito_tim IS NULL or esito_tim ='')"));   
                                    
         $file.= "<tr><td>".$row[negozio]."</td><td>".$row[conta]."</td><td style='background:#b3ffb3'>$ok[conta]</td><td style='background:#ff9999'>$ko[conta]</td>
         <td style='background:#ffffcc'>$wait[conta]</td></tr>";
        
         
     }
    $file .="</tbody></table></div>";

     $arrayReturn['esito'] = $file; 
}



echo json_encode($arrayReturn);



?>
