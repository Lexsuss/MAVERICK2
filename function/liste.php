<?php
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
$campagna=$_POST['campagna'];


if($operazione=="attivalista"){
    $id=$_POST[id];
    
    
    $insertrich="UPDATE vicidial_lists set active='Y' Where list_id='$id'";
    $result = mysql_query($insertrich) or die(mysql_error()); 
    $arrayReturn['esito'] ="Lista attivata";
}
else if($operazione=="disattivalista"){
    $id=$_POST[id];
    
    
    $insertrich="UPDATE vicidial_lists set active='N' Where list_id='$id'";
    $result = mysql_query($insertrich) or die(mysql_error()); 
    $arrayReturn['esito'] ="Lista disattivata";
}
else if($operazione=="chiudi_tutte_liste"){
    $id=$_POST[id];
    
    
    $insertrich="UPDATE vicidial_lists set active='N'  where campaign_id='$campagna'  ";
    $result = mysql_query($insertrich) or die(mysql_error()); 
    $arrayReturn['esito'] ="Liste disattivate";
}
else if($operazione=="apri_tutte_liste"){
    $id=$_POST[id];
    
    
    $insertrich="UPDATE vicidial_lists set active='Y' where campaign_id='$campagna' ";
    $result = mysql_query($insertrich) or die(mysql_error()); 
    $arrayReturn['esito'] ="Liste attivate";
}
else if($operazione=="attivacitta"){
    $id=$_POST[id];
    $citta=$_POST[citta];
    $insertrich="UPDATE vicidial_list set status='NEW',gmt_offset_now='99' Where list_id='$id' AND city='$citta' and status='CHIUSO'";
    $result = mysql_query($insertrich) or die(mysql_error());
 
    $arrayReturn['esito'] ="Citta attivata";
}
else if($operazione=="attivalast"){
    $id=$_POST[id];
    $citta=$_POST[citta];
    $insertrich="UPDATE vicidial_list set status='NEW',gmt_offset_now='99' Where list_id='$id' AND last_name='$citta' and status='CHIUSO'";
    $result = mysql_query($insertrich) or die(mysql_error());
 
    $arrayReturn['esito'] ="Offerta attivata";
}
else if($operazione=="disattivacitta"){
    $id=$_POST[id];
    $citta=$_POST[citta];
    $insertrich="UPDATE vicidial_list set status='CHIUSO' Where list_id='$id' AND city='$citta' and status='NEW'";
    $result = mysql_query($insertrich) or die(mysql_error());
  
    $arrayReturn['esito'] ="Citta disattivata";
}
else if($operazione=="disattivalast"){
    $id=$_POST[id];
    $citta=$_POST[citta];
    $insertrich="UPDATE vicidial_list set status='CHIUSO' Where list_id='$id' AND last_name='$citta' and status='NEW'";
    $result = mysql_query($insertrich) or die(mysql_error());
  
    $arrayReturn['esito'] ="Offerta disattivata $citta";
}
else if($operazione=="attivaallcitta"){
    $id=$_POST[id];
   
    $insertrich="UPDATE vicidial_list set status='NEW',gmt_offset_now='99' Where list_id='$id' and status='CHIUSO'";
    $result = mysql_query($insertrich) or die(mysql_error());
   
    $arrayReturn['esito'] ="Tutti i numeri sono aperti";
}
else if($operazione=="attivaalllast"){
    $id=$_POST[id];
   
    $insertrich="UPDATE vicidial_list set status='NEW',gmt_offset_now='99' Where list_id='$id' and status='CHIUSO'";
    $result = mysql_query($insertrich) or die(mysql_error());
   
    $arrayReturn['esito'] ="Tutti i numeri sono aperti";
}
else if($operazione=="disattivaallcitta"){
    $id=$_POST[id];
  
    $insertrich="UPDATE vicidial_list set status='CHIUSO' Where list_id='$id'  and status='NEW'";
    $result = mysql_query($insertrich) or die(mysql_error());
   
    $arrayReturn['esito'] ="Tutti i numeri sono chiusi";
}

else if($operazione=="disattivaalllast"){
    $id=$_POST[id];
  
    $insertrich="UPDATE vicidial_list set status='CHIUSO' Where list_id='$id'  and status='NEW'";
    $result = mysql_query($insertrich) or die(mysql_error());
   
    $arrayReturn['esito'] ="Tutti i numeri sono chiusi";
}
else if($operazione=="sbloccastato"){
    $id=$_POST[id];
    $stato=$_POST[stato];
    $insertrich="UPDATE vicidial_list set status='NEW', user='', called_since_last_reset='N', called_count=0, gmt_offset_now='99' Where list_id='$id'  and status='$stato'  ";
    $result = mysql_query($insertrich) or die(mysql_error());
  
    $arrayReturn['esito'] ="Numeri Sbloccati";
}else if($operazione=="sbloccastatoall"){
    
    $stato=$_POST[stato];
    if($stato=='ALL'){
            $insertrich="UPDATE vicidial_list set status='NEW', user='', called_since_last_reset='N', called_count=0, gmt_offset_now='99' Where list_id IN (Select list_id from vicidial_lists WHERE campaign_id='$campagna' and active='Y') and status IN ( 'N', 'B')";

        
    }else{
        if($stato=="NA")
        {
       		$insertrich="UPDATE vicidial_list set status='NEW', user='', called_since_last_reset='N', called_count=0, gmt_offset_now='99' WHERE  list_id IN (SELECT list_id FROM vicidial_lists WHERE campaign_id='$campagna' and active='Y') AND STATUS ='NA' ORDER BY last_local_call_time LIMIT 1000;";
        }
        else if($stato=="ADC")
        {
            $insertrich="UPDATE vicidial_list set status='NEW', user='', called_since_last_reset='N', called_count=0, gmt_offset_now='99' Where list_id IN (Select list_id from vicidial_lists where campaign_id='$campagna' and active='Y')  and status='ADC' ORDER BY last_local_call_time LIMIT 1000";
        }
        else
        {
    		$insertrich="UPDATE vicidial_list set status='NEW', user='', called_since_last_reset='N', called_count=0, gmt_offset_now='99' Where list_id IN (Select list_id from vicidial_lists WHERE campaign_id='$campagna' and active='Y') and status='$stato'";
        }
    
    }
    $result = mysql_query($insertrich) or die(mysql_error());
  
    $arrayReturn['esito'] = "Numeri Sbloccati";
}
else if($operazione=="cercaliste"){
    $citta=$_POST[citta];
    $content_file = "<table id='table'  class='table table-bordered table-hover' style='width:100%'>";
    $content_file .= "<thead><tr><th>Lista</th><th>Attiva</th><th>Numeri disponibili</th><th>Totale numeri</th><th></th></tr></thead><tbody>";
    $query="select count(vicidial_list.lead_id) as conta,   vicidial_list.list_id, vicidial_lists.list_name, vicidial_lists.active
            from vicidial_list 
            LEFT JOIN vicidial_lists ON vicidial_lists.list_id=vicidial_list.list_id
            where city LIKE '%$citta%' group by vicidial_list.list_id";
    $statement = mysql_query($query);
    while ($row = mysql_fetch_array($statement)) {
        if($row[active]=="Y") $attivo= "<span class='label label-success'>Si</span>";
        if($row[active]=="N") $attivo=  "<span class='label label-danger'>No</span>";
            $query2="select count(lead_id) as conta
            from vicidial_list 
            where city LIKE '%$citta%' and status IN ('NEW', 'CHIUSO') and list_id='$row[list_id]'
            group by list_id";
            $result2 = mysql_query($query2);
            $row2 = mysql_fetch_assoc($result2);
        $content_file .= "<tr><td>$row[list_id] - $row[list_name]</td><td>$attivo</td><td>$row2[conta]</td><td>$row[conta]</td>";
         $content_file .= "<td><a href='dettagliolista.php?id=$row[list_id]' type='button' class='btn btn-primary'>Vai alla lista</a></div></td></tr>";
        
    }
    
    $content_file .="</tbody></table>";
    $arrayReturn['esito'] = $content_file;
  
}
else if($operazione=="sbloccaliste"){
    $query="select count(lead_id) as conta
            from vicidial_list 
            
            where gmt_offset_now!=99 and  status='new'";
    $statement = mysql_query($query);
    $row2 = mysql_fetch_assoc($statement);
    
    $insertrich="update vicidial_list set gmt_offset_now='99' where gmt_offset_now!='99' and status='new'";
    $result = mysql_query($insertrich) or die(mysql_error());
   
    $arrayReturn['esito'] ="Liste sbloccate, $row2[conta] numeri erano bloccati";
}else if($operazione=="velocita"){
     $v=$_POST[v];
    
    
    
    $insertrich="update vicidial_campaigns set auto_dial_level='$v' where active='Y' and campaign_id='$campagna'  ";
    $result = mysql_query($insertrich) or die(mysql_error());
   
    $arrayReturn['esito'] ="Velocita' modificata";
    
    
    
}
else if($operazione=="reset_hopper"){
    
						$stmt="DELETE from vicidial_hopper where   campaign_id='$campagna'  and status IN('READY','QUEUE','DONE');";
						$rslt=mysql_query($stmt)  or die(mysql_error());;
                                                $arrayReturn['esito'] ="Attendere circa 1 minuto";
    
}


echo json_encode($arrayReturn);
    
?>