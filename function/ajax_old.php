<?php

require_once("../conf/_DBconf.php");
include("../function/mime_mail.php");
include("phpmailer/class.phpmailer.php");

header('Cache-Control: no-cache, pre-check=0, post-check=0');
header('Expires: 0');
header('Pragma: no-cache');

$conn = mysql_connect($DB_HOST, $DB_USER, $DB_PSW) or die("ERRORE: Impossibile connettersi al db");
$database = mysql_select_db($DB_NAME, $conn) or die("ERRORE: Impossibile selezionare il db" . mysql_error());

function dataEng($dataita) {
    $adata = array();
    $adata = split('/', $dataita);
    $adata[0] = (int) $adata[0];
    $adata[1] = (int) $adata[1];
    if ($adata[0] < 10) {
        $adata[0] = "0" . $adata[0];
    }
    if ($adata[1] < 10) {
        $adata[1] = "0" . $adata[1];
    }
    return ( $adata[2] . '-' . $adata[1] . '-' . $adata[0]);
}

// formatta la data in italiano
function dataIta($dataingl) {
    $out['anno'] = substr($dataingl, 0, 4);
    $out['mese'] = substr($dataingl, 5, 2);
    $out['giorno'] = substr($dataingl, 8, 2);
    if (!empty($dataingl) and $dataingl != '0000-00-00')
        return (sprintf("%02d/%02d/%04d", $out['giorno'], $out['mese'], $out['anno']));
}

// login
if (!empty($_GET['login'])) {
    $username = $_GET['login'];
    $password = $_GET['password'];

    $evento = 1; // evento login = 1
    $datetime = date("Y-m-d H:i:s");
    //$query = "INSERT INTO tb_session_operator (id_operator,evento,date_time) VALUES (".$id_op.",".$evento.",'".$datetime."')";
    $query = "SELECT  * from agenti where username='" . $username . "' AND password = '" . $password . "'";
    //echo($query);
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("ok");
        $_SESSION['login'] = $username;
        $_SESSION['password'] = $password;
    }
}
if (!empty($_GET['aggappu'])) {
    echo("include_once('showappuntamenti.php');");
}

if(!empty($_GET['get_testoemail'])) {
    $query = "SELECT testo_msg FROM email_text WHERE id_testo_email='" .$_GET['get_testoemail'] . "' ";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        while ($row = mysql_fetch_assoc($result)) {
            echo(utf8_encode($row['testo_msg']));
            }


}

}
//
//STORICO CHIAMATA
//


if(!empty($_GET['storico'])) {
    $id_richiesta = $_GET['id_customer'];
    $query       = "";
    $get_data_riapertura = null;
    $data_riapertura = null;

           $query  = "SELECT
chiamata.note_chiamata as note_chiamata,
esiti.descrizione,
chiamata.data_esito
FROM
chiamata
INNER JOIN esiti ON chiamata.esito = esiti.id_esito
WHERE chiamata.esito = esiti.id_esito

                       AND  chiamata.id_richiesta = ".$id_richiesta;





    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if($num_rows > 0) {
        echo("<table cellpadding='0' cellspacing='0'>");
        echo("<tr height='15'><td class='arancio'>Data</td><td class='arancio'>Esito</td><td class='arancio' nowrap>Note Chiamata</td></tr>");
        while($row = mysql_fetch_assoc($result)) {
            $note = $row['note_chiamata']==""?'-':$row['note_chiamata'];
            echo("<tr>");
            echo("<td style='padding-right:10px'  nowrap> ".$row['data_esito']." </td>");
            echo("<td style='padding-right:10px'  nowrap> ".$row['descrizione']." </td>");
            echo("<td style='padding-right:10px'  > ".$note." </td>");
            echo("</tr>");
        }
        echo("</table>");
    }
    else {
        echo("null");
    }
}

// logout
if (!empty($_GET['logout'])) {
    echo($_SESSION['idlogin']);
    if (!empty($_SESSION['login'])) {

        $query_session = "UPDATE session SET logout='" . date("Y-m-d H:i:s") . "' WHERE id_session=" . $_SESSION['id_sessione'] . "";
        echo($query_session);
        mysql_query($query_session) or die("Query UPDATE tb_sessione_operatore fallita! " . mysql_error());

        // Chiusura connessione DB
        mysql_close();
    }
    $session_out = session_destroy();
}
if (!empty($_GET['get_comuni'])) {
    $provincia = $_GET['provincia'];
    $id_sel = $_GET['id_select'];
    $name_sel = $_GET['name_select'];
    $query = "SELECT distinct(comune) FROM codicicomuni WHERE prov='" . $provincia . "' ORDER BY comune";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("<select id='" . $id_sel . "' name='" . $name_sel . "' >");
        echo("<option value=\"\"></option>");
        while ($row = mysql_fetch_assoc($result)) {
            echo("<option value=\"" . $row['comune'] . "\">" . $row['comune'] . "</option>");
        }
        echo("</select>");
    }
}

if (!empty($_GET['getsconto'])) {
    $id_corso = $_GET['idcorso'];

    $query = "SELECT
sconto.id_sconto,
sconto.id_corso,
sconto.sconto,
sconto.nome_sconto,
sconto.active,
corsi.nome_corso
FROM
sconto
Inner Join corsi ON corsi.id_corso = sconto.id_corso WHERE sconto.active='Si' and nome_corso='" . $id_corso . "' ORDER BY nome_sconto";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("<select id='sconto' name='sconto' >");
        echo("<option value=\"\"></option>");
        while ($row = mysql_fetch_assoc($result)) {
            echo("<option value=\"" . $row['nome_sconto'] . "\">" . $row['nome_sconto'] . "</option>");
        }
        echo("</select>");
    }
}

if (!empty($_GET['dettagliocorso'])) {
    $id_corso = $_GET['idcorso'];
//echo("ciaoooo".$id_corso);
    $query = "SELECT concat(dettagli_corsi.codice_corso,'_' ,dettagli_corsi.citta) as dettaglio FROM corsi Inner Join dettagli_corsi ON corsi.id_corso = dettagli_corsi.id_corso and nome_corso='" . $id_corso . "'";
    //  echo($query2);
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("<select id='dettaglio_corso' name='dettaglio_corso' >");
        echo("<option value=\"\"></option>");
        while ($row = mysql_fetch_assoc($result)) {
            echo("<option value=\"" . $row['dettaglio'] . "\">" . $row['dettaglio'] . "</option>");
        }
        echo("</select>");
    }
}


if (!empty($_GET['esito_chiamata'])) {
    $id_esito = $_GET['esito_chiamata'];
    $query = "Select * from esiti where parent_id = " . $id_esito . " AND active = 'Yes' ORDER BY descrizione";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("Esito: <select name='esito_chiamata2'  id='esito_chiamata2' onchange=\"javascript:doExit(this);\">");
        echo("<option value=''></option>");
        while ($row = mysql_fetch_assoc($result)) {
            echo("<option value=\"" . $row['dialer_data'] . ":" . $row['id_esito'] . "\" >" . $row['descrizione'] . "</option> &nbps;");
        }
        echo("</select>");

        //  mysql_close($conn_global);
    }
}

if (!empty($_GET['esita_contatto'])) {
    $id_esito = $_GET['esita_contatto'];
    $dialer_data = $_GET['dialer_data'];
    $id_richiesta = $_GET['id_richiesta'];
    $idlogin = $_GET['idlogin'];
    $stato = $_GET['stato'];
    $priorita=$_GET['priorita'];
//$note_chiamata="";
$note_chiamata=$_GET['note_chiamata'];
     echo($note_chiamata);
    $queryinsert = "INSERT into chiamata (id_richiesta,esito,data_esito,agente,note_chiamata) VALUES (" . $id_richiesta . "," . $id_esito . ",'" . date("Y-m-d H:i:s") . "'," . $idlogin . ",'".$note_chiamata."')";
     echo($queryinsert);
    // $query = "Select * from esiti where parent_id = " .$id_esito." AND active = 'Yes' and campagne like '%".$_SESSION['id_campagna']."-%' ORDER BY descrizione";
    $result = mysql_query($queryinsert) or die(mysql_error());
    $queryselectdesc = "SELECT Descrizione from combo_esito where esito='" . $dialer_data . "'";
    $result2 = mysql_query($queryselectdesc) or die(mysql_error());
    $num_rows2 = mysql_num_rows($result2);
    if ($num_rows2 > 0) {
        $rowdes = mysql_fetch_assoc($result2);
    }
    if ($dialer_data != "C") {
        if (($stato == 'Nuovo') || ($stato == 'In Lavorazione')) {
            if (($id_esito == 5) || ($id_esito == 7)) {
                //      $queryinsert="INSERT into chiamata (id_richiesta,esito,data_esito,agente) VALUES (".$id_richiesta.",".$id_esito.",'".date ("Y-m-d H:i:s")."',".$idlogin.")";
                $data = $_GET['data'];
                $ora = $_GET['ora'];
                $minuti = $_GET['minuti'];
                $note = $_GET['text'];
                $queryupdate = "update inbox set priorita='".$priorita."', esito=" . $id_esito . ", stato='" . $rowdes['Descrizione'] . "', data='" . $data . " " . $ora . ":" . $minuti . ":00' ,nchiamata=nchiamata+1, descrizione='" . $note . "' WHERE id_richiesta=" . $id_richiesta;
            } else {
                $queryupdate = "update inbox set priorita='".$priorita."', esito=" . $id_esito . ", stato='" . $rowdes['Descrizione'] . "', data='" . date("Y-m-d H:i:s") . "',nchiamata=" . +1 . " WHERE id_richiesta=" . $id_richiesta;
            }
        } else {
            if (($id_esito == 5) || ($id_esito == 7)) {
                //      $queryinsert="INSERT into chiamata (id_richiesta,esito,data_esito,agente) VALUES (".$id_richiesta.",".$id_esito.",'".date ("Y-m-d H:i:s")."',".$idlogin.")";
                $data = $_GET['data'];
                $ora = $_GET['ora'];
                $minuti = $_GET['minuti'];
                $note = $_GET['text'];
                $queryupdate = "update inbox set priorita='".$priorita."', esito=" . $id_esito . ", stato='" . $rowdes['Descrizione'] . "', data='" . $data . " " . $ora . ":" . $minuti . ":00' ,nchiamata=nchiamata+1, descrizione='" . $note . "' WHERE id_richiesta=" . $id_richiesta;
            } else {
                $queryupdate = "update inbox set priorita='".$priorita."', esito=" . $id_esito . ", data='" . date("Y-m-d H:i:s") . "',nchiamata=" . +1 . " WHERE id_richiesta=" . $id_richiesta;
            }
        }
    } else {
        $queryupdate = "update inbox set esito=" . $id_esito . ", stato='" . $rowdes['Descrizione'] . "', data='" . date("Y-m-d H:i:s") . "', deleted='Si'" . ",nchiamata=" . +1 . " WHERE id_richiesta=" . $id_richiesta;
    }
  echo($queryupdate);
    $result = mysql_query($queryupdate) or die(mysql_error());
}



if (!empty($_REQUEST['cruscotto'])) {
    echo('1');
    $_SESSION['include'] = 1;
}
if (!empty($_REQUEST['cruscottono'])) {
    echo('1');
    $_SESSION['include'] = 0;
}

if(!empty($_REQUEST['inviaemail'])){
    $alleg=$_REQUEST['alleg'];
    $email=$_REQUEST['email'];
    $body = $_REQUEST['inviaemail'];
   // echo("qui");
       $querylen = strlen($alleg) - 1;
    // echo ($querykey);
    $querykey = substr($alleg, 0, $querylen);
    $mail = new mime_mail;
    //echo("mail".$mail);
	$mail->from     = "info@pushit.it";
	$mail->bcc	= "fabrizio@pushit.it";
	$mail->to     	= $email;
	$mail->subject  = "Invio Informazioni";       

	$mail->body     = $body;
            $selectallegati="SELECT * from allegati_email where id_allegati_email in (".$querykey.")";
              $result = mysql_query($selectallegati) or die(mysql_error());
  //  echo($selectallegati);
              $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
         while ($row = mysql_fetch_assoc($result)) {

             $FILE2="../attaches/".$row['nome_file'];
             $filename2=$row['nome_file'];
             $content_type2 = "application/pdf";
             $fd2 = fopen($FILE2, "r");
             $data2 = fread($fd2, filesize($FILE2));
             fclose($fd2);
            $mail->add_attachment($data2, $filename2, $content_type2);
        
        }

        }
       // echo("file".$FILE2);
        echo("sto Mandando");
	$mail->send();
        
}

if (!empty($_REQUEST['contract'])) {
    $valueopermobile = "";
    $query = "";
    $queryval = "";
    $querykey = "";
    $stringaoperatore = "";
    $querytelopz = "";
    $query_insert_opzvoce = "";
    $queryopz_bou = "";
    $keys = array_keys($_REQUEST);

    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
        switch ($keynumber) {
            case 'contract' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            default:
                $tmpkey = $keys[$i];
                $tmpval = $_REQUEST[$tmpkey];

                if ($tmpval <> "") {

                    $querykey.=$tmpkey . ",";

                    //else{
                    if (is_numeric($tmpval)) {
                        if (substr($tmpval, 0, 1) == 0) {
                            $queryval.="'" . ($tmpval) . "',";
                        } else {
                            $queryval.=$tmpval . ",";
                        }
                    } else {
                        if ($keynumber == "data_di_nascita" || $keynumber == "data_doc") {
                            $queryval.="'" . dataEng($tmpval) . "',";
                        } else {
                            //  if ($keynumber=="comunenascita"){

                            $queryval.="'" . addslashes($tmpval) . "',";
                            //    echo $tmpval;
                            // }
                        }

                        //}
                    }
                }
                break;
        }
    }


    $querylen = strlen($querykey) - 1;
    // echo ($querykey);
    $querykey = substr($querykey, 0, $querylen);
    $querykey = $querykey . ",data_contratto,stato";
    //echo($querykey);
    $queryvarlen = strlen($queryval) - 1;

    $queryval = substr($queryval, 0, $queryvarlen);
    $queryval = $queryval . ",CURRENT_TIMESTAMP,'In Attesa di Acconto'";
    $queryinsert = "";
    $queryinsert = "INSERT INTO adesione (" . $querykey . ") VALUES (" . $queryval . ")";
    // echo $queryinsert;
    mysql_query($queryinsert) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("ok");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }


    mysql_close($conn);
    //echo ($queryopz_bou);
}

//INSERIMENTO INFO AGGIUNTIVE
if (!empty($_REQUEST['infoagg'])) {
    $valueopermobile = "";
    $query = "";
    $queryval = "";
    $querykey = "";
    $stringaoperatore = "";
    $querytelopz = "";
    $query_insert_opzvoce = "";
    $queryopz_bou = "";
    $keys = array_keys($_REQUEST);
    $id_richiesta = $_REQUEST['id_richiesta'];
    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
        switch ($keynumber) {
            case 'infoagg' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            case 'id_contratto': break;
            default:
                $tmpkey = $keys[$i];

                $tmpval = $_REQUEST[$tmpkey];
//echo($tmpval);
                if (($tmpval != "")) {
//if ($tmpval!=0){
                    $querykey.=$tmpkey . ",";

                    //else{
                    if (is_numeric($tmpval)) {
                        if (substr($tmpval, 0, 1) == 0) {
                            $queryval.="'" . ($tmpval) . "',";
                        } else {
                            $queryval.=$tmpval . ",";
                        }
                    } else {
                        if ($keynumber == "data_di_nascita" || $keynumber == "data_doc") {
                            $queryval.="'" . dataEng($tmpval) . "',";
                        } else {
                            //  if ($keynumber=="comunenascita"){

                            $queryval.="'" . addslashes($tmpval) . "',";
                            //    echo $tmpval;
                            // }
                        }

                        //}
                        //   }
                    }
                }
                break;
        }
    }


    $querylen = strlen($querykey) - 1;
    // echo ($querykey);
    $querykey = substr($querykey, 0, $querylen);
    $querykey = $querykey;
    //echo($querykey);
    $queryvarlen = strlen($queryval) - 1;

    $queryval = substr($queryval, 0, $queryvarlen);
    $queryval = $queryval;
    $queryinsert = "";
    $deleterichprec = "DELETE from info_aggiuntive where id_richiesta=" . $id_richiesta;
    //     echo($deleterichprec);
    mysql_query($deleterichprec) or die(mysql_error());
    $queryinsert = "INSERT INTO info_aggiuntive (" . $querykey . ") VALUES (" . $queryval . ")";
    //  echo $queryinsert;
    mysql_query($queryinsert) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("ok");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }


    mysql_close($conn);
    //echo ($queryopz_bou);
}
