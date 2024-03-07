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
$idlogin = $_SESSION['idlogin'];
            $selectAgente="select * from login where idlogin=".$idlogin;
            $resulta = mysql_query($selectAgente) or die (mysql_error());
            $rowag = mysql_fetch_assoc($resulta);
      
$arrayReturn = array();
if($operazione=="ricerca"){
     $tel=addslashes($_POST['tel']);
     $nome=addslashes($_POST['nome']);
     $cognome=addslashes($_POST['cognome']);
     $ragione  =addslashes($_POST['ragione']);      
     $cel=addslashes($_POST['cel']);
     $citta=addslashes($_POST['citta']);
     $indirizzo=addslashes($_POST['indirizzo']);
     $consulente =addslashes($_POST['consulente']);   
     $piva=addslashes($_POST['piva']);  
        $dataappda =$_POST['dataappda'];    
     $dataappa =$_POST['dataappa']; 
       $reg=$_POST['registrazione'];
     $gestore =$_POST['gestore'];  
     $esito=$_POST['esito']; 
     $esitob=$_POST['esitob']; 
     $esitotim=$_POST['esitotim'];
     $gruppo=$_POST['gruppo']; 
     $tipoapp=$_POST['tipoapp'];
     $tipocliente=$_POST['tipocliente'];
     //$arrayReturn['dump'] = var_dump($_POST);
     if($tel!="")
        $sql.= " AND phone_number Like '%".$tel."%'";
     if($cel!="")
        $sql.= " AND alt_phone Like '%".$cel."%'";
     if($gruppo!="")
        $sql.= " AND operatore IN  (select user from vicidial_users where user_group='$gruppo')";
     if($nome!="")
        $sql.= " AND first_name Like '%".$nome."%'";
     if($cognome!="")
        $sql.= " AND last_name Like '%".$cognome."%'";
     if($ragione!="")
        $sql.= " AND middle_initial Like '%".$ragione."%'";
     if($citta!="")
        $sql.= " AND city Like '%".$citta."%'"; 
     if($indirizzo!="")
        $sql.= " AND address1 Like '%".$indirizzo."%'"; 
      if($consulente!="")
        $sql.= " AND id_seller = '".$consulente."'";
       if($dataappda!="")
        $sql.= " AND appointment_date >= '".$dataappda."'";
       if($dataappa!="")
        $sql.= " AND appointment_date <= '".$dataappa."%'";
     if($gestore!="")
        $sql.= " AND operatore = '".$gestore."'";
     if($piva!="")
        $sql.= " AND cod_fiscale = '".$piva."'";
     if($tipoapp!="")
        $sql.= " AND tipoapp = '".$tipoapp."'";
    if($tipocliente!="")
        $sql.= " AND tipocliente = '".$tipocliente."'";

    switch ($reg){
        case 'Si':  $sql.= " AND registrazione = '".$reg."'";
        break;
    case 'No':   $sql.= " AND ( registrazione IS NULL OR registrazione IN ('', 'No') )";
        break;
    }
     if($esito!="")
        $sql.= " AND notesid IN (select id_richiesta from chiamata where esito='$esito' and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
     if(($esitob!="")&&($esitob!="wait")){
         $sql.= " AND notesid IN (select id_richiesta from chiamata where esitob='$esitob' and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
     }else if($esitob=="wait"){
         $sql.= " AND notesid IN (select id_richiesta from chiamata where esitob IS NULL  and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
     }
      if(($esitotim!="")&&($esitotim!="wait")){
         $sql.= " AND notesid IN (select id_richiesta from chiamata where esito_tim='$esitotim' and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
     }   else   if($esitotim=="wait"){
         $sql.= " AND notesid IN (select id_richiesta from chiamata where esito_tim IS NULL and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
     }    
        
    
     
       $i=$_SESSION['ruolo'];
       if (($i==3) || ($i==1))
           $sql.= " AND notesid IN (select id_richiesta from chiamata where esito='31' and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
    
       
     $query="Select * FROM `vicidial_call_notes` , vicidial_list  WHERE vicidial_call_notes.lead_id = vicidial_list.lead_id  $sql $add";
     //$arrayReturn['sql'] = $query;
     if($sql!=""){
     $doquery=mysql_query($query);
    $file="<table id='myTable'   class='table table-bordered table-hover' cellspacing='0' width='100%' border='1'><thead>"
            ."<tr><th>Operatore</th><th>Gestore</th><th>Cliente</th><th>Indirizzo</th><td>Area</td><th>Cod.Fiscale</th><th>Telefono</th><th>Consulente</th><th>Data app</th>";
      if (($i==3) || ($i==1)) {
          
          $file.="<th>Esito BO</th><th>Esito TIM</th><th>Esito Finale</th>";
      }      else{
           $file.="<th>Esito</th>";
          
      }
    
    
    $file.= "<th>#</th></tr></thead>";
    
    $file.="<tbody>";
        while ($row = mysql_fetch_array($doquery)) {
             $querycons="Select * FROM login  WHERE idlogin=$row[id_seller]";
             $cons=mysql_fetch_array(mysql_query($querycons));
             
             
             if (($i==3) || ($i==1)){
               
                        
                        $queryesito="SELECT esiti.descrizione, chiamata.esitob, chiamata.data_esitob, chiamata.data_attivazione FROM chiamata left join esiti on esiti.id_esito=chiamata.esitob where id_richiesta=$row[notesid]  order by id_chiamata desc limit 0,1";
                        $esito=mysql_fetch_array(mysql_query($queryesito));
                        if($esito[esitob] =="35"){
                            $e= "<span class='label label-success'>Ok inserito</span><br><br><small class='label label-default'>$esito[data_esitob]</small>"; 
                        }
                        if($esito[esitob] =="36"){
                            $e= "<span class='label label-danger'>KO inserimento</span><br><br><small class='label label-default'>$esito[data_esitob]</small>"; 
                        }

                        if($esito[esitob] ==""){
                            $e= "<span class='label label-warning'>In attesa</span>"; 
                        }
                
                        
                        $queryesito="SELECT esiti.descrizione, chiamata.esito_tim, chiamata.data_attivazione  FROM chiamata left join esiti on esiti.id_esito=chiamata.esito_tim where id_richiesta=$row[notesid]  order by id_chiamata desc limit 0,1";
                        $esito=mysql_fetch_array(mysql_query($queryesito));
                        if($esito[esito_tim] =="37"){
                            $tim= "<span class='label label-success'>Validato OK</span><br><br><small class='label label-default'>$esito[data_attivazione]</small>"; 
                        }
                        if($esito[esito_tim] =="38"){
                            $tim= "<span class='label label-danger'>Validato KO</span><br><br><small class='label label-default'>$esito[data_attivazione]</small>"; 
                        }

                        if($esito[esito_tim] ==""){
                            $tim= "<span class='label label-warning'>In attesa</span>"; 
                        }
                        $queryesito="SELECT esiti.descrizione, chiamata.esito_f, chiamata.data_esito_f FROM chiamata left join esiti on esiti.id_esito=chiamata.esito_tim where id_richiesta=$row[notesid]  order by id_chiamata desc limit 0,1";
                        $esito=mysql_fetch_array(mysql_query($queryesito));
                        if($esito[esito_f] =="39"){
                            $finale= "<span class='label label-success'>Evaso</span><br><br><small class='label label-default'>$esito[data_esito_f]</small>"; 
                        }
                        if($esito[esito_f] =="40"){
                            $finale= "<span class='label label-danger'>Annullato</span><br><br><small class='label label-default'>$esito[data_esito_f]</small>"; 
                        }

                        if($esito[esito_f] ==""){
                            $finale= "<span class='label label-warning'>In attesa</span>"; 
                        }
                  
                   
              }else {
                  $queryesito="SELECT esiti.descrizione, chiamata.esito_tim, chiamata.data_attivazione  FROM chiamata left join esiti on esiti.id_esito=chiamata.esito_tim where id_richiesta=$row[notesid]  order by id_chiamata desc limit 0,1";
                        $esito=mysql_fetch_array(mysql_query($queryesito));
                        if($esito[esito_tim] =="37"){
                            $tim= "<span class='label label-success'>Validato OK</span>"; 
                        }
                        if($esito[esito_tim] =="38"){
                            $tim= "<span class='label label-danger'>Validato KO</span>"; 
                        }

                        if($esito[esito_tim] ==""){
                            $tim= "<span class='label label-warning'>In attesa</span>"; 
                        }
                        
                        
                  $queryesito="SELECT esiti.descrizione, chiamata.esito FROM chiamata left join esiti on esiti.id_esito=chiamata.esito where id_richiesta=$row[notesid]  order by id_chiamata desc limit 0,1";
             
             $esito=mysql_fetch_array(mysql_query($queryesito));
                    if($esito[esito]!="Recall KO"){
                      $e=$esito[descrizione];  
                     }else  {
                         $e="Recall KO";
              }
              }
             
               $cliente= $row['first_name'] . " " . $row['last_name']; 
             if($row[tipoapp]=="TIM"){
                 $g="class='label bg-navy-active color-palette'";
             }
             if($row[tipoapp]=="WIND"){
                 $g="class='label bg-orange-active color-palette'";
             }
               
            $file.= "<tr><td><span class='label label-primary'>$row[operatore]</span></td><td><span $g >$row[tipoapp]</span></td><td>$cliente</td><td>$row[address1] - $row[city]</td><td>$row[agenda]</td><td>$row[cod_fiscale]</td><td>$row[phone_number]</td><td>$cons[nominativo]</td>"
                    . "<td>$row[appointment_date] $row[appointment_time]</td>";
            
             if (($i==3) || ($i==1)){
                 $file.="<td>$e</td><td>$tim</td><td>$finale</td>";
                  $file.= "<td><a href='CVcustomerdetcont.php?richiesta=$row[notesid]' class='btn bg-primary margin '><span class='fa fa-info-circle'></span></a></td></tr>";
             }else{
                 $file.="<td>$e $tim</td>";
                  $file.= "<td><a href='CVcustomerdetadmin.php?richiesta=$row[notesid]' class='btn bg-primary margin '><span class='fa fa-info-circle'></span></a></td></tr>";
             }
                
            
        }
    $file.= "</tbody></table>";
     $arrayReturn['esito'] = $file ;
     
        }
     else{
         $arrayReturn['esito'] = "<h3 class='alert alert-info alert-dismissible'>Attezione! Compila almeno un campo di ricerca </h3>";
         
     }
}else if($operazione=="ricercawind"){
    
    $tel=addslashes($_POST['tel']);
     $nome=addslashes($_POST['nome']);
     $cognome=addslashes($_POST['cognome']);
     $ragione  =addslashes($_POST['ragione']);      
     $cel=addslashes($_POST['cel']);
     $citta=addslashes($_POST['citta']);
     $indirizzo=addslashes($_POST['indirizzo']);
     $consulente =addslashes($_POST['consulente']);   
     $piva=addslashes($_POST['piva']);  
        $dataappda =$_POST['dataappda'];    
     $dataappa =$_POST['dataappa']; 
       $reg=$_POST['registrazione'];
     $gestore =$_POST['gestore'];  
     $esito=$_POST['esito']; 
     $esitob=$_POST['esitob']; 
     $esitotim=$_POST['esitotim']; 
       $gruppo=$_POST['gruppo']; 
       $tipoapp=$_POST['tipoapp'];
       $tipocliente=$_POST['tipocliente'];
     if($tel!="")
        $sql.= " AND phone_number Like '%".$tel."%'";
     if($cel!="")
        $sql.= " AND alt_phone Like '%".$cel."%'";
     if($gruppo!="")
        $sql.= " AND operatore IN  (select user from vicidial_users where user_group='$gruppo')";
     if($nome!="")
        $sql.= " AND first_name Like '%".$nome."%'";
     if($cognome!="")
        $sql.= " AND last_name Like '%".$cognome."%'";
     if($ragione!="")
        $sql.= " AND middle_initial Like '%".$ragione."%'";
     if($citta!="")
        $sql.= " AND city Like '%".$citta."%'"; 
     if($indirizzo!="")
        $sql.= " AND address1 Like '%".$indirizzo."%'"; 
      if($consulente!="")
        $sql.= " AND id_seller = '".$consulente."'";
       if($dataappda!="")
        $sql.= " AND appointment_date >= '".$dataappda."'";
       if($dataappa!="")
        $sql.= " AND appointment_date <= '".$dataappa."%'";
     if($gestore!="")
        $sql.= " AND operatore = '".$gestore."'";
     if($piva!="")
        $sql.= " AND cod_fiscale = '".$piva."'";
     if($tipoapp!="")
        $sql.= " AND tipoapp = '".$tipoapp."'";
    if($tipocliente!="")
        $sql.= " AND tipocliente = '".$tipocliente."'";
    switch ($reg){
        case 'Si':  $sql.= " AND registrazione = '".$reg."'";
        break;
    case 'No':   $sql.= " AND ( registrazione IS NULL OR registrazione IN ('', 'No') )";
        break;
    }
      if(($esitob!="")&&($esitob!="wait")){
         $sql.= " AND notesid IN (select id_richiesta from chiamata where esito_wind='$esitob' and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
     }else if($esitob=="wait"){
         $sql.= " AND notesid IN (select id_richiesta from chiamata where (esito_wind IS NULL or esito_wind='' )and id_chiamata in (select max(id_chiamata) from chiamata GROUP BY id_richiesta) )";
     }
      
     
     $query="Select * FROM `vicidial_call_notes` , vicidial_list  WHERE vicidial_call_notes.lead_id = vicidial_list.lead_id  $sql $add and tipoapp='WIND' AND notesid  IN (SELECT id_richiesta FROM chiamata WHERE esito = '31')";
     if($sql!=""){
     $doquery=mysql_query($query);
    $file="<table id='myTable'   class='table table-bordered table-hover' cellspacing='0' width='100%' border='1'><thead>"
            ."<tr><th>Operatore</th><th>Gestore</th><th>Cliente</th><th>Indirizzo</th><td>Area</td><th>Cod.Fiscale</th><th>Telefono</th><th>Consulente</th><th>Data app</th>";
    $file.="<th>Esito</th>";
        $file.= "<th>#</th></tr></thead>";
    
    $file.="<tbody>";
        while ($row = mysql_fetch_array($doquery)) {
               $cliente= $row['first_name'] . " " . $row['last_name']; 
             $querycons="Select * FROM login  WHERE idlogin=$row[id_seller]";
             $cons=mysql_fetch_array(mysql_query($querycons));
             $queryesito="SELECT esiti.descrizione, chiamata.esitob, chiamata.data_esitob, chiamata.data_attivazione FROM chiamata left join esiti on esiti.id_esito=chiamata.esitob where id_richiesta=$row[notesid]  order by id_chiamata desc limit 0,1";
             $esito=mysql_fetch_array(mysql_query($queryesito));
              if($esito[esito_wind] =="42"){
                            $e= "<span class='label label-warning'>Inserito</span><br><br><small class='label label-default'>$esito[data_wind]</small>"; 
                        }
                        if($esito[esitob] =="43"){
                            $e= "<span class='label label-success'>Attivato</span><br><br><small class='label label-default'>$esito[data_wind]</small>"; 
                        }
                        if($esito[esitob] =="44"){
                            $e= "<span class='label label-danger'>KO</span><br><br><small class='label label-default'>$esito[data_wind]</small>"; 
                        }
                        if($esito[esitob] ==""){
                            $e= "<span class='label label-info'>In lavorazione</span>"; 
                        }
                        
            $file.= "<tr><td><span class='label label-primary'>$row[operatore]</span></td><td><span $g >$row[tipoapp]</span></td><td>$cliente</td><td>$row[address1] - $row[city]</td><td>$row[agenda]</td><td>$row[cod_fiscale]</td><td>$row[phone_number]</td><td>$cons[nominativo]</td>"
                    . "<td>$row[appointment_date] $row[appointment_time]</td>";
              $file.="<td>$e</td>";    
              $file.= "<td><a href='CVcustomerdetcontwind.php?richiesta=$row[notesid]' class='btn bg-primary margin '><span class='fa fa-info-circle'></span></a></td></tr>";
              
                  
   
          
                        
                        
     }
      $file.= "</tbody></table>";
       $arrayReturn['esito'] = $file ;
    }  else{
         $arrayReturn['esito'] = "<h3 class='alert alert-info alert-dismissible'>Attezione! Compila almeno un campo di ricerca </h3>";
         
     }
     
}
echo json_encode($arrayReturn);	
?>