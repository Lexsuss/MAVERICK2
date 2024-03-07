<?php

include 'include/db.php';
include("../function/mime_mail.php");
require "phpmailer/class.phpmailer.php";

header('Cache-Control: no-cache, pre-check=0, post-check=0');
header('Expires: 0');
header('Pragma: no-cache');

//$conn = mysql_connect($DB_HOST1, $DB_USER1, $DB_PSW1) or die("ERRORE: Impossibile connettersi al db");
//$database = mysql_select_db($DB_NAME1, $conn) or die("ERRORE: Impossibile selezionare il db" . mysql_error());



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
    
    $username = preg_replace('/[^A-Za-z0-9_]/', '', $username);
    $password = preg_replace('/[^A-Za-z0-9_*]/', '', $password);
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

if (!empty($_REQUEST['extra'])) {

    $valueopermobile = "";
    $query = "";
    $queryval = "";
    $querykey = "";
    $stringaoperatore = "";
    $querytelopz = "";
    $query_insert_opzvoce = "";
    $queryopz_bou = "";
    $keys = array_keys($_POST);

    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
        switch ($keynumber) {
            case 'contract' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            case '_utma': break;
            case '_utmb': break;
            case '_utmc': break;
            case '_utmz': break;
            case 'az':break;
            case 'idlogin':break;
            case 'tipo':break;
            default:
                $tmpkey = $keys[$i];
                $tmpval = $_POST[$tmpkey];

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
    $querykey = $querykey . ",data_ora";
    //echo($querykey);
    $queryvarlen = strlen($queryval) - 1;

    $queryval = substr($queryval, 0, $queryvarlen);
    $queryval = $queryval . ",CURRENT_TIMESTAMP";
    $queryinsert = "";
    $queryinsert = "INSERT INTO richiesta (" . $querykey . ") VALUES (" . $queryval . ")";



    mysql_query($queryinsert) or die(mysql_error());
    $new_id_cat = mysql_insert_id();
//echo($new_id_cat);
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        if ($_REQUEST['tipo'] == 1) {
            $insertintoinbox = "INSERT INTO inbox (id_login,data,id_richiesta,deleted,stato) VALUES (" . $_REQUEST['idlogin'] . ",CURRENT_TIMESTAMP," . $new_id_cat . ",'No','Nuovo')";
            // echo($insertintoinbox);
            mysql_query($insertintoinbox) or die(mysql_error());
        }
        echo("ok");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }


    mysql_close($conn);
}


if (!empty($_GET['get_testoemail'])) {
    $query = "SELECT testo_msg FROM email_text WHERE id_testo_email='" . $_GET['get_testoemail'] . "' ";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        while ($row = mysql_fetch_assoc($result)) {
            echo(utf8_encode($row['testo_msg']));
        }
    }
}


if (!empty($_GET['cercanote'])) {
    $query = "SELECT descrizione FROM inbox WHERE id_richiesta='" . $_GET['cercanote'] . "' ";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        while ($row = mysql_fetch_assoc($result)) {
            echo(($row['descrizione']));
        }
    }
    $query = "SELECT note FROM richiesta WHERE idanarichiesta='" . $_GET['cercanote'] . "' ";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        while ($row = mysql_fetch_assoc($result)) {
            echo("----" . ($row['note']));
        }
    }
}

//
//STORICO CHIAMATA
//


if (!empty($_GET['storico'])) {
    $id_richiesta = $_GET['id_customer'];
    $query = "";
    $get_data_riapertura = null;
    $data_riapertura = null;

    $query = "SELECT
chiamata.note_chiamata as note_chiamata,
esiti.descrizione,
chiamata.data_esito,esito
FROM
chiamata
INNER JOIN esiti ON chiamata.esito = esiti.id_esito

                       AND  chiamata.id_richiesta = " . $id_richiesta;





    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("<table cellpadding='0' cellspacing='0'>");
        echo("<tr height='15'><td class='arancio'>Data</td><td class='arancio'>Esito</td><td class='arancio' nowrap>Note Chiamata</td></tr>");
        while ($row = mysql_fetch_assoc($result)) {
            $note = $row['note_chiamata'] == "" ? '-' : $row['note_chiamata'];
            echo("<tr>");
            echo("<td style='padding-right:10px'  nowrap> " . $row['data_esito'] . " </td>");
            if (is_numeric($row['esito'])){
                   echo("<td style='padding-right:10px'  nowrap> " . $row['descrizione'] . " </td>");
            }
            else    echo("<td style='padding-right:10px'  nowrap> " . $row['esito'] . " </td>");
            echo("<td style='padding-right:10px'  > " . $note . " </td>");
            echo("</tr>");
        }
        echo("</table>");
    } else {
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

if (!empty($_GET['salvatel'])) {
    //echo($_SESSION['idlogin']);
    $telefono = $_GET['telefono'];
    $id_richiesta = $_GET['idrichiesta'];
    if (!empty($telefono)) {

        $query_session = "UPDATE richiesta SET telefono='" . $telefono . "' WHERE idanarichiesta=" . $id_richiesta . "";
        // echo($query_session);
        mysql_query($query_session) or die("Query UPDATE telefono fallita! " . mysql_error());

        // Chiusura connessione DB
        mysql_close();
        echo("TELEFONO AGGIORNATO");
    } else {
        echo("ATTENZIONE TELEFONO VUOTO");
    }
    // $session_out = session_destroy();
}
if (!empty($_GET['salvatelconta'])) {
    //echo($_SESSION['idlogin']);
    $telefono = $_GET['telefono'];
    $id_richiesta = $_GET['idrichiesta'];
    if (!empty($telefono)) {

        $query_session = "UPDATE adesione SET codicelinea='" . $telefono . "' WHERE id_adesione=" . $id_richiesta . "";
        // echo($query_session);
        mysql_query($query_session) or die("Query UPDATE telefono fallita! " . mysql_error());

        // Chiusura connessione DB
        mysql_close();
        echo("TELEFONO AGGIORNATO");
    } else {
        echo("ATTENZIONE TELEFONO VUOTO");
    }
    // $session_out = session_destroy();
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

if (!empty($_GET['getpianosim'])) {
    $id_parent = $_GET['idparent'];

    $query = "SELECT * from opz_mobile where parent_id=".$id_parent." and tipologia in ('p','n')";
    //echo($query);
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("<select id='pianogenesim' name='pianogenesim' onchange='javascript:findpianoforsim(this.value);'>");
        echo("<option value=\"\"></option>");
        while ($row = mysql_fetch_assoc($result)) {
            echo("<option value=\"" . $row['id_opz_mobile'] . "\">" . $row['descrizione'] . "</option>");
        }
        echo("</select>");
    }
}
if (!empty($_GET['getpianoforsim'])) {
    $id_parent = $_GET['idparent'];
echo("<td colspan=4><table><tr>");
    $query = "SELECT * from opz_mobile where id_opz_mobile=".$id_parent;
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
   
    $row = mysql_fetch_assoc($result);
    $query2 = "SELECT * from opz_mobile where parent_id=".$row['parent_id']." and n_sim=0";
    //echo($query2);
    $result2 = mysql_query($query2) or die(mysql_error());
    $num_rows2 = mysql_num_rows($result2);
 $var.=("<option value=\"\"></option>");
        while ($row2 = mysql_fetch_assoc($result2)) {
            $var.=("<option value=\"" . $row2['id_opz_mobile'] . "\">" . $row2['descrizione'] . "</option>");
        }
      
    if ($num_rows > 0) {
        for ($i = 0; $i < $row['n_sim']; $i++) {
            $j=$i+1;
           
           switch ($j) {
    case 6:
         echo("</tr><tr>");
        break;
    case 11:
          echo("</tr><tr>");
        break;
    case 16:
          echo("</tr><tr>");
        break;
     case 21:
       echo("</tr><tr>");
        break;
    case 26:
       echo("</tr><tr>");
        break;
   
}
            
          
        echo("<td>".$j."<select id='pianogensim~$j' name='pianogensim~$j'>");
        echo($var);  
        echo("</select></td>");
    }
    
    }
    echo("</tr></table></td>");
}







if (!empty($_GET['dettagliocorso'])) {
    $id_corso = $_GET['idcorso'];
//echo("ciaoooo".$id_corso);
    $query = "SELECT dettagli_corsi.codice_corso as dettaglio FROM corsi Inner Join dettagli_corsi ON corsi.id_corso = dettagli_corsi.id_corso and nome_corso='" . $id_corso . "'";
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

if (!empty($_GET['getprezzo'])) {
    $id_corso = $_GET['idcorso'];
    $quantita = $_GET['quantita'];
    // echo($quantita);
//echo("ciaoooo".$id_corso);
    $query = "SELECT prezzo FROM corsi where nome_corso='" . $id_corso . "'";
    //   echo($query2);
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        $row = mysql_fetch_assoc($result);
        $prezzo = $row['prezzo'] * $quantita;

        echo($prezzo);
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
if (!empty($_GET['esito_chiamatapag'])) {
    $id_esito = $_GET['esito_chiamatapag'];
    $query = "Select * from esiti_pag where parent_id = " . $id_esito . " AND active = 'Yes' ORDER BY descrizione";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        echo("Esito: <select name='esito_chiamata2'  id='esito_chiamata2' onchange=\"javascript:doExitpag(this);\">");
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
    $priorita = $_GET['priorita'];
    $data_bonifico = $_GET['data_bonifico'];
    $cro = $_GET['cro'];
    $iban = $_GET['iban'];
//$note_chiamata="";
    $note_chiamata = addslashes($_GET['note_chiamata']);
    //echo($note_chiamata);
    $queryinsert = "INSERT into chiamata (id_richiesta,esito,data_esito,agente,note_chiamata) VALUES (" . $id_richiesta . "," . $id_esito . ",'" . date("Y-m-d H:i:s") . "'," . $idlogin . ",'" . $note_chiamata . "')";
   echo($queryinsert);
   
   
    // $query = "Select * from esiti where parent_id = " .$id_esito." AND active = 'Yes' and campagne like '%".$_SESSION['id_campagna']."-%' ORDER BY descrizione";
    $result = mysql_query($queryinsert) or die(mysql_error());
    //$queryselectdesc = "SELECT Descrizione from combo_esito where esito='" . $dialer_data . "'";
    //$result2 = mysql_query($queryselectdesc) or die(mysql_error());
    //$num_rows2 = mysql_num_rows($result2);
    //if ($num_rows2 > 0) {
      //  $rowdes = mysql_fetch_assoc($result2);
    //}
    
    //echo($queryupdate);

 
    
    
    
}



if (!empty($_REQUEST['cruscotto'])) {
    echo('1');
    $_SESSION['include'] = 1;
}
if (!empty($_REQUEST['cruscottono'])) {
    //echo('1');
    $_SESSION['include'] = 0;
}


if (!empty($_REQUEST['inviaemail'])) {
    $alleg = ($_REQUEST['alleg'] != "") ? $_REQUEST['alleg'] : "space.gif";
    $email = $_REQUEST['email'];
    $subject = $_REQUEST['oggetto'];
    $body = stripslashes($_REQUEST['inviaemail']);
    //$regexp = "<input.*(type=\"image\".*)(src=\")(\/crm)(.*\/{1})(\w*\.{1}.*)(\").*>";
    $regexp = "(<img.*src=\")(\/crm)(\/userfiles\/image\/)(.*)(\" alt=\"\" \/>)";
    $newBody = preg_replace("/$regexp/siU", '$1cid:$4$5', $body);

    // echo("qui");
    $querylen = strlen($alleg) - 1;
    // echo ($querykey);
    $querykey = substr($alleg, 0, $querylen);
    $selectallegati = "SELECT * from allegati_email where id_allegati_email in (" . $querykey . ")";
    if ($alleg != "space.gif") {
        $result = mysql_query($selectallegati) or die(mysql_error());
        $num_rows = mysql_num_rows($result);
    }
    $messaggio = new PHPmailer();
    //echo("mail".$messaggio);
    $messaggio->IsHTML(true);
    $messaggio->From = $_SESSION['email'];
    $messaggio->FromName = $_SESSION['nominativo'];
    $messaggio->AddAddress($email);
    $messaggio->AddBCC($_SESSION['email']);
    $messaggio->AddBCC('arianna.gullifa@lavoce.net');
    $messaggio->AddReplyTo($_SESSION['email']);
    $messaggio->Subject = $subject;
    $messaggio->Body = $newBody;
    if ($num_rows > 0) {
        while ($row = mysql_fetch_assoc($result)) {
            $FILE2 = "../attaches/" . $row['nome_file'];
            $messaggio->AddAttachment($FILE2);
        }
    } else
        $messaggio->AddAttachment("../attaches/space.gif");

    preg_match_all("/$regexp/siU", $body, $matches, PREG_SET_ORDER);
    foreach ($matches as $val) {
        $emb1 = "../" . $val[3] . $val[4];
        $cid = $val[4];
        $messaggio->AddEmbeddedImage($emb1, $cid, $cid);
    }
    $messaggio->Send();
    unset($messaggio);
}

if (!empty($_REQUEST['contractsim'])) {
    $valueopermobile = "";
    $query = "";
    $queryval = "";
    $querykey = "";
    $stringaoperatore = "";
    $querytelopz = "";
    $query_insert_opzvoce = "";
    $queryopz_bou = "";
    $keys = array_keys($_POST);
   $conteggio=0;
    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
       // $tmpkey = $keys[$i];
        if (substr($keynumber,0,11)=='pianogensim'){
                   // $simkey=split('~',$tmpkey[$i]);
                    $conteggio+=1;
                    echo("questa");
                }
                
        // echo($keynumber);
        switch ($keynumber) {
            case 'contractsim' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            case '_utma': break;
            case '_utmb': break;
            case '_utmc': break;
            case '_utmz': break;
            case 'az':break;
            case 'pianogensim~1':break;
            case 'pianogensim~2':break;
                        case 'pianogensim~3':break;
            case 'pianogensim~4':break;
            case 'pianogensim~5':break;
            case 'pianogensim~6':break;
            case 'pianogensim~7':break;
            case 'pianogensim~8':break;
            case 'pianogensim~9':break;
            case 'pianogensim~10':break;
            case 'pianogensim~11':break;
            case 'pianogensim~12':break;
            case 'pianogensim~13':break;
            case 'pianogensim~14':break;
            case 'pianogensim~15':break;
            case 'pianogensim~16':break;
            case 'pianogensim~17':break;
            case 'pianogensim~18':break;
            case 'pianogensim~19':break;
            case 'pianogensim~20':break;
            case 'pianogensim~21':break;
            case 'pianogensim~22':break;
            case 'pianogensim~23':break;
            case 'pianogensim~24':break;
            case 'pianogensim~25':break;
            case 'pianogensim~26':break;
            case 'pianogensim~27':break;
            case 'pianogensim~28':break;
 case 'pianogensim~29':break;
            case 'pianogensim~30':break;
          
                    
            case 'id_esito': $idesito = $_REQUEST['id_esito'];
                break;
            default:
              
              
                $tmpkey = $keys[$i];
                $tmpval = $_POST[$tmpkey];
               // echo(substr($tmpkey,0,10));
             
                

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
    
echo("conteggio=".$conteggio);
 for ($j=1;$j<=$conteggio;$j++){
     $querykey1 = $querykey . "pianogensim";
     $z=$j;
     $variabile="pianogensim~".$z;
     echo("var=".$variabile);
     $queryval1 = $queryval . "".$_POST[$variabile];
        $queryinsert = "INSERT INTO sim_mobile(" . $querykey1 . ") VALUES (" . $queryval1 . ")";
    echo $queryinsert;
}
    //$querylen = strlen($querykey) - 1;
    // echo ($querykey);
    //$querykey = substr($querykey, 0, $querylen);
    //$querykey = $querykey . ",data_contratto,stato";
    //echo($querykey);
    //$queryvarlen = strlen($queryval) - 1;

    //$queryval = substr($queryval, 0, $queryvarlen);
    if ($id_esito == 26) {
        //$queryval = $queryval . ",CURRENT_TIMESTAMP,'In Attesa di Acconto'";
    } else {

      //  $queryval = $queryval . ",CURRENT_TIMESTAMP,'Chiuso'";
    }
    //$queryinsert = "";
  //  $selectcontract = "SELECT * FROM adesione where id_richiesta" . $_POST['id_anarichiesta'];
  //  $result = mysql_query($selectcontract) or die(mysql_error($selectcontract));
    //$num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
 //       $deleteex = "DELETE FROM adesione where id_richiesta=" . $_POST['id_richiesta'];
 //       mysql_query($deleteex) or die(mysql_error());
    }
   
  
    mysql_query($queryinsert) or die(mysql_error());
    //$queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("ok");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }


    mysql_close($conn);
    //echo ($queryopz_bou);
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
    $keys = array_keys($_POST);

    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
        // echo($keynumber);
        switch ($keynumber) {
            case 'contract' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            case '_utma': break;
            case '_utmb': break;
            case '_utmc': break;
            case '_utmz': break;
            case 'az':break;
            case 'id_esito': $idesito = $_REQUEST['id_esito'];
                break;
            default:
                $tmpkey = $keys[$i];
                $tmpval = $_POST[$tmpkey];

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
    if ($id_esito == 26) {
        $queryval = $queryval . ",CURRENT_TIMESTAMP,'In Attesa di Acconto'";
    } else {

        $queryval = $queryval . ",CURRENT_TIMESTAMP,'Chiuso'";
    }
    $queryinsert = "";
    $selectcontract = "SELECT * FROM adesione where id_richiesta" . $_POST['id_anarichiesta'];
    $result = mysql_query($selectcontract) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        $deleteex = "DELETE FROM adesione where id_richiesta=" . $_POST['id_richiesta'];
        mysql_query($deleteex) or die(mysql_error());
    }
    $queryinsert = "INSERT INTO adesione (" . $querykey . ") VALUES (" . $queryval . ")";
    //echo $queryinsert;
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


if (!empty($_REQUEST['contractpag'])) {
    $valueopermobile = "";
    $query = "";
    $queryval = "";
    $querykey = "";
    $stringaoperatore = "";
    $querytelopz = "";
    $query_insert_opzvoce = "";
    $queryopz_bou = "";
    $keys = array_keys($_POST);

    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
        //   echo($keynumber);
        switch ($keynumber) {
            case 'contractpag' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            case '_utma': break;
            case '_utmb': break;
            case '_utmc': break;
            case '_utmz': break;
            case 'agentevt':break;
            case 'az':break;
            case 'id_richiesta':break;
            case 'id_esito': $idesito = $_REQUEST['id_esito'];
                break;
            default:
                $tmpkey = $keys[$i];
                $tmpval = $_POST[$tmpkey];

                if ($tmpval <> "") {

                    //$querykey.=$tmpkey . ",";
                    //else{
                    if (is_numeric($tmpval)) {
                        if (substr($tmpval, 0, 1) == 0) {
                            $queryup.=$tmpkey . "='" . $tmpval . "', ";
                            //$queryval.="'" . ($tmpval) . "',";
                        } else {
                            //  $queryval.=$tmpval . ",";
                            $queryup.=$tmpkey . "=" . $tmpval . ", ";
                        }
                    } else {
                        if ($keynumber == "data_di_nascita" || $keynumber == "data_doc") {
                            //$queryval.="'" . dataEng($tmpval) . "',";
                            $queryup.=$tmpkey . "='" . dataEng($tmpval) . "', ";
                        } else {
                            //  if ($keynumber=="comunenascita"){
                            //$queryval.="'" . addslashes($tmpval) . "',";
                            $queryup.=$tmpkey . "='" . addslashes($tmpval) . "',";

                            //    echo $tmpval;
                            // }
                        }

                        //}
                    }
                }
                break;
        }
    }


    $querylen = strlen($queryup) - 1;
    // echo ($querykey);
    $queryup = substr($queryup, 0, $querylen);
    //$querykey = $querykey . ",data_contratto,stato";
    //  echo($queryup);
    $queryvarlen = strlen($queryup) - 1;

    $queryval = substr($queryval, 0, $queryvarlen);
    //if ($id_esito==33){
    //$queryval = $queryval . ",CURRENT_TIMESTAMP,'Saldo OK'";
    //}
    // else {
    //$queryval = $queryval . ",CURRENT_TIMESTAMP,'Chiuso'";
    //}
    $queryinsert = "";
    //$selectcontract="SELECT * FROM adesione where id_richiesta".$_POST['id_anarichiesta'];
    //  $result = mysql_query($selectcontract) or die(mysql_error());
    //$num_rows = mysql_num_rows($result);
    //if ($num_rows > 0) {
    //  $deleteex="DELETE FROM adesione where id_richiesta=".$_POST['id_richiesta'];
    //     mysql_query($deleteex) or die(mysql_error());
    // }
    $queryinsert = "update adesione SET " . $queryup . " WHERE id_richiesta=" . $_POST['id_richiesta'];
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

//FATTURA

if (!empty($_REQUEST['contractfatt'])) {
    $valueopermobile = "";
    $query = "";
    $queryval = "";
    $querykey = "";
    $stringaoperatore = "";
    $querytelopz = "";
    $query_insert_opzvoce = "";
    $queryopz_bou = "";
    $keys = array_keys($_POST);

    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
        //   echo($keynumber);
        switch ($keynumber) {
            case 'contractfatt' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            case '_utma': break;
            case '_utmb': break;
            case '_utmc': break;
            case '_utmz': break;
            case 'agentevt':break;
            case 'az':break;
            case 'id_richiesta':break;
            case 'phonenome':break;
            case 'phonecognome':break;
            case 'phonetelefono':break;

            case 'corso':break;
            case 'dcorso':break;
            case 'prezzov':break;

            default:
                $tmpkey = $keys[$i];
                $tmpval = $_POST[$tmpkey];

                if ($tmpval <> "") {

                    //$querykey.=$tmpkey . ",";
                    //else{
                    if (is_numeric($tmpval)) {
                        if (substr($tmpval, 0, 1) == 0) {
                            $queryup.=$tmpkey . "='" . $tmpval . "', ";
                            //$queryval.="'" . ($tmpval) . "',";
                        } else {
                            //  $queryval.=$tmpval . ",";
                            $queryup.=$tmpkey . "=" . $tmpval . ", ";
                        }
                    } else {
                        if ($keynumber == "data_di_nascita" || $keynumber == "data_doc") {
                            //$queryval.="'" . dataEng($tmpval) . "',";
                            $queryup.=$tmpkey . "='" . dataEng($tmpval) . "', ";
                        } else {
                            //  if ($keynumber=="comunenascita"){
                            //$queryval.="'" . addslashes($tmpval) . "',";
                            $queryup.=$tmpkey . "='" . addslashes($tmpval) . "',";

                            //    echo $tmpval;
                            // }
                        }

                        //}
                    }
                }
                break;
        }
    }


    $querylen = strlen($queryup) - 1;
    // echo ($querykey);
    $queryup = substr($queryup, 0, $querylen);
    //$querykey = $querykey . ",data_contratto,stato";
    //  echo($queryup);
    $queryvarlen = strlen($queryup) - 1;

    $queryval = substr($queryval, 0, $queryvarlen);
    //if ($id_esito==33){
    //$queryval = $queryval . ",CURRENT_TIMESTAMP,'Saldo OK'";
    //}
    // else {
    //$queryval = $queryval . ",CURRENT_TIMESTAMP,'Chiuso'";
    //}
    $queryinsert = "";
    $selectcontract = "SELECT * FROM fatture where id_adesione=" . $_POST['id_adesione'];
    $result = mysql_query($selectcontract) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    //if ($num_rows > 0) {
    //   $deleteex="DELETE FROM adesione where id_adesione=".$_POST['id_adesione'];
    //     mysql_query($deleteex) or die(mysql_error());
    // }
    $queryinsert = "insert into fatture (n_fattura,data_fattura,id_adesione) VALUES (" . $_POST['n_fattura'] . ",'" . $_POST['data_fattura'] . "'," . $_POST['id_adesione'] . ")";
    //  echo $queryinsert;
    mysql_query($queryinsert) or die(mysql_error());
    $queryok = mysql_affected_rows();
    $updatead = "Update adesione set codicefiscale='" . $_POST['cfiscale'] . "', p_iva='" . $_POST['p_iva'] . "',cap='" .$_POST['cap']."',indirizzo='".$_POST['indirizzo']. "', comune='".$_POST['comune']. "',prov='".$_POST['provincia']. "' WHERE id_adesione=" . $_POST['id_adesione'];
echo($updatead);
    mysql_query($updatead) or die(mysql_error());

    if ($queryok != -1) {
        echo("ok");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }


    mysql_close($conn);
    //echo ($queryopz_bou);
}
if (!empty($_REQUEST['stampa'])) {
    $id_adesione = $_REQUEST['id_adesione'];
    $fatturan = $_REQUEST['n_fattura'];
    $dtfattura = dataIta($_REQUEST['data_fattura']);

    $select = "select * from adesione where id_adesione=" . $id_adesione;
   // echo($select);
    $result = mysql_query($select) or die(mysql_error());

    $num_rows = mysql_num_rows($result);
    $rowres = mysql_fetch_assoc($result);
    $cognome = $rowres['cognome'] . " " . $rowres['nome'];


    $residenza = $rowres['indirizzo'];
    $codicefiscale = $rowres['codicefiscale'];
    $p_iva = $rowres['p_iva'];
    $cap = (string)$rowres['cap'];
    $comune = $rowres['comune'];
    $provincia = $rowres['prov'];
    $descrizione = $rowres['corsopreso'];
    $prezzo = $_REQUEST['prezzov'];
    $iva=($prezzo*21)/100;
    $netto=$prezzo+$iva;
    chmod("../attaches/Template_2_Fattura_La_Voce_.png", 0777);
    $var = "-pointsize 40 -weight bold -draw 'text 1255,462 \"$cognome \"'";
    $var.="-pointsize 40 -weight bold -draw 'text 1255,555  \"$residenza \"'";
    $var.="-pointsize 40 -weight bold -draw 'text 1255,660  \"$cap \"'";
     $var.="-pointsize 40 -weight bold -draw 'text 1520,660  \"$comune \"'";
    $var.="-pointsize 40 -weight bold -draw 'text 1336,710  \"$codicefiscale \"'";
    $var.="-pointsize 40 -weight bold -draw 'text 1395,760  \"$p_iva \"'";
   
    $var.="-pointsize 50 -draw 'text 1606,968  \"$fatturan \"'";
    $var.="-pointsize 50 -draw 'text 1633,1017  \"$dtfattura \"'";
    $var.="-pointsize 45 -weight bold -draw 'text 39,1367  \"$descrizione \"'";
    $var.="-pointsize 45 -draw 'text 1263,1590  \"$prezzo \"'";
    $var.="-pointsize 45 -draw 'text 1263,1688  \"$iva \"'";
      $var.="-pointsize 60 -draw 'text 1263,1848  \"$netto \"'";
       $var.="-pointsize 60 -draw 'text 1263,1848  \"$netto \"'";
       $var.="-pointsize 60 -draw 'text 880,2297  \"$netto \"'";
//error_reporting(E_ALL);
//echo($var);

//echo(system("/usr/bin/convert ../attaches/Template_2_Fattura_La_Voce_.png" . $var . " ../attaches/" . $_REQUEST['n_fattura'] . "_2011.pdf"));
    system("/usr/bin/convert ../attaches/Template_2_Fattura_La_Voce_.png ".$var. " ../attaches/" . $_REQUEST['n_fattura'] . "_2011.pdf");
    //system("/usr/bin/convert ../attaches/Template_2_Fattura_La_Voce_.png ../attaches/Template_2_Fattura_La_Voce_.jpg");
    echo($_REQUEST['n_fattura'] . "_2011.pdf");
}
//MOD NEWS
if (!empty($_REQUEST['postnews'])) {
    $idnews = $_REQUEST['id_news'];
    $titolo = $_REQUEST['Titolo_News'];
    $descrizione = $_REQUEST['descrizione'];
    $active = $_REQUEST['active'];
    $select = "update news set descrizione = '" . $descrizione . "' , Titolo_News ='" . $titolo . "', active='" . $active . "' where id_news=" . $idnews;
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("News Aggiornata");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}
if (!empty($_REQUEST['postuser'])) {
    $iduser = $_REQUEST['idlogin'];
    $nominativo = $_REQUEST['nominativo'];
    $username = $_REQUEST['username'];
    //md5($tmpval)
    $password = md5($_REQUEST['password']);
    $active = $_REQUEST['active'];
    $ruolo = $_REQUEST['idruolo'];
    $select = "update login set nominativo = '" . $nominativo . "' , username ='" . $username . "', active='" . $active . "', password='" . $password . "', idruolo=" . $ruolo . " where idlogin=" . $iduser;
    //echo($select);
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Utente Modificato");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}

if (!empty($_REQUEST['postnewsins'])) {
    //$idnews=$_REQUEST['id_news'];
    $titolo = $_REQUEST['Titolo_News'];
    $descrizione = $_REQUEST['descrizione'];
    $active = $_REQUEST['active'];
    $select = "insert into news (descrizione,Titolo_News,active,data_ora_inserimento) VALUES ('" . $descrizione . "' ,'" . $titolo . "','" . $active . "',now())";
//echo($select);
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("News Aggiornata");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}
if (!empty($_REQUEST['postuserins'])) {
    //$idnews=$_REQUEST['id_news'];
    // $iduser=$_REQUEST['iduser'];
    $nominativo = $_REQUEST['nominativo'];
    $username = $_REQUEST['username'];
    //md5($tmpval)
    $password = md5($_REQUEST['password']);
    $active = $_REQUEST['active'];
    $ruolo = $_REQUEST['idruolo'];

    $select = "insert into login (nominativo,username,password,active,idruolo) VALUES ('" . $nominativo . "','" . $username . "','" . $password . "','" . $active . "'," . $ruolo . ")";
//echo($select);
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Utente Inserito");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}
//CORSI
if (!empty($_REQUEST['postcorsoins'])) {
    //$idnews=$_REQUEST['id_news'];
    // $iduser=$_REQUEST['iduser'];
    $nome_corso = $_REQUEST['nome_corso'];
    $active = $_REQUEST['active'];
    //md5($tmpval)
    $prezzo = $_REQUEST['prezzo'];
    $stato = $_REQUEST['stato'];
    // $ruolo=$_REQUEST['idruolo'];

    $select = "insert into corsi (nome_corso,active,prezzo,stato) VALUES ('" . $nome_corso . "','" . $active . "','" . $prezzo . "','" . $stato . "')";
//echo($select);
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Corso Inserito");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}
if (!empty($_REQUEST['postcorso'])) {
    $id_corso = $_REQUEST['idcorso'];
    $nome_corso = $_REQUEST['nome_corso'];
    $active = $_REQUEST['active'];
    //md5($tmpval)
    $prezzo = $_REQUEST['prezzo'];
    $stato = $_REQUEST['stato'];
    $select = "update corsi set nome_corso = '" . $nome_corso . "' , active ='" . $active . "', prezzo='" . $prezzo . "', stato='" . $stato . "' where id_corso=" . $id_corso;
    //echo($select);
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Corso Modificato");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}

if (!empty($_REQUEST['postcorsodett'])) {
    $id_dettaglio_corso = $_REQUEST['id_dettaglio_corso'];
    $codice_corso = $_REQUEST['codice_corso'];
    $citta = $_REQUEST['citta'];
    //md5($tmpval)
    $data_inizio = $_REQUEST['data_inizio'];
    //$stato=$_REQUEST['stato'];
    $select = "update dettagli_corsi set codice_corso = '" . $codice_corso . "' , citta ='" . $citta . "', data_inizio='" . $data_inizio . "' where id_dettaglio_corso=" . $id_dettaglio_corso;
    //echo($select);
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Corso Modificato");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}





if (!empty($_REQUEST['postdettcorsoins'])) {
    //$idnews=$_REQUEST['id_news'];
    // $iduser=$_REQUEST['iduser'];
    $nominativo = $_REQUEST['codice_corso'];
    $username = $_REQUEST['citta'];
    //md5($tmpval)
    $password = $_REQUEST['data_inizio'];
    $active = $_REQUEST['id_corso'];
    // $ruolo=$_REQUEST['idruolo'];

    $select = "insert into dettagli_corsi (codice_corso,citta,id_corso,data_inizio) VALUES ('" . $nominativo . "','" . $username . "','" . $active . "','" . dataEng($password) . "')";
//echo($select);
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Dettaglio Corso Inserito");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}



// DEL NEWS

if (!empty($_REQUEST['delnews'])) {
    $idnews = $_REQUEST['id_news'];
    $select = "delete  from news where id_news=" . $idnews;
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("News Eliminata");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}
if (!empty($_REQUEST['deluser'])) {
    $iduser = $_REQUEST['idlogin'];
    $select = "delete  from login where idlogin=" . $iduser;
    mysql_query($select) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Utente Eliminato");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }
}

//LOGIN

if (!empty($_REQUEST['salvalogin'])) {
    $valueopermobile = "";
    $query = "";
    $queryval = "";
    $querykey = "";
    $stringaoperatore = "";
    $querytelopz = "";
    $query_insert_opzvoce = "";
    $queryopz_bou = "";
    $keys = array_keys($_POST);

    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for ($i = 0; $i < count($keys); $i++) {
        $keynumber = $keys[$i];
        //   echo($keynumber);
        switch ($keynumber) {
            case 'salvalogin' : break;
            case 'btnInvia': break;
            case 'PHPSESSID': break;
            case 'undefined': break;
            case '_utma': break;
            case '_utmb': break;
            case '_utmc': break;
            case '_utmz': break;
            case 'agentevt':break;
            case 'az':break;
            case 'id_richiesta':break;
            case 'id_esito': $idesito = $_REQUEST['id_esito'];
                break;
            default:
                $tmpkey = $keys[$i];
                $tmpval = $_POST[$tmpkey];

                if ($tmpval <> "") {

                    //$querykey.=$tmpkey . ",";
                    //else{
                    if (is_numeric($tmpval)) {
                        if (substr($tmpval, 0, 1) == 0) {
                             if ($keynumber == "password") {
                                     $queryup.=$tmpkey . "='" . md5($tmpval) . "', ";
                             } else {
                             $queryup.=$tmpkey . "='" . $tmpval . "', ";}
                            //$queryval.="'" . ($tmpval) . "',";
                        } else {
                              if ($keynumber == "password") {
                                     $queryup.=$tmpkey . "='" . md5($tmpval) . "', ";
                             } else {
                            //  $queryval.=$tmpval . ",";
                            $queryup.=$tmpkey . "=" . $tmpval . ", ";
                        }
                        
                             }
                    } else {
                        if ($keynumber == "password") {
                            //$queryval.="'" . dataEng($tmpval) . "',";
                            $queryup.=$tmpkey . "='" . md5($tmpval) . "', ";
                        } else {
                            //  if ($keynumber=="comunenascita"){
                            //$queryval.="'" . addslashes($tmpval) . "',";
                            $queryup.=$tmpkey . "='" . addslashes($tmpval) . "',";

                            //    echo $tmpval;
                            // }
                        }

                        //}
                    }
                }
                break;
        }
    }


    $querylen = strlen($queryup) - 1;
    // echo ($querykey);
    $queryup = substr($queryup, 0, $querylen);
    //$querykey = $querykey . ",data_contratto,stato";
    //  echo($queryup);
    $queryvarlen = strlen($queryup) - 1;

    $queryval = substr($queryval, 0, $queryvarlen);

    $queryinsert = "";

    $queryinsert = "update login SET " . $queryup . " WHERE idlogin=" . $_POST['agentevt'];
    echo $queryinsert;
    mysql_query($queryinsert) or die(mysql_error());
    $queryok = mysql_affected_rows();

    if ($queryok != -1) {
        echo("Dati Aggiornati");
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
            case '__utma': break;
            case '__utmz': break;
            case '__utmb': break;
            case '__utmc': break;
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
        echo("1");
    } else {
        echo("problemi con la query.");
        // mysql_close($conn);
    }


    mysql_close($conn);
    //echo ($queryopz_bou);
}
if (!empty($_REQUEST['assegnaoperatore'])) {
    $idop = $_REQUEST['assegnaoperatore'];
    $idanaric = $_REQUEST['id_ana'];
    $idanarichiesta = split('__', $idanaric);
    $insertrich="UPDATE vicidial_call_notes set id_seller=".$idop.",data_assegnazione=now() Where notesid=".$idanarichiesta[1];
    //$insertrich = "INSERT into inbox(id_login,data,id_richiesta,last_update,deleted,nchiamata,stato) VALUES (" . $idop . ",'" . date('Y-m-d H:i:s') . "'," . $idanarichiesta[1] . ",'" . date('Y-m-d H:i:s') . "','No',0,'Nuovo')";
    //echo($insertrich);
    
    $result = mysql_query($insertrich) or die(mysql_error());
    
   $sel="SELECT * from chiamata where id_richiesta='$idanarichiesta[1]' ORDER by  id_chiamata desc LIMIT 0,1";
    $resultsel = mysql_query($sel) or die(mysql_error());
   $rowdes = mysql_fetch_assoc($resultsel);
   
    $insertrich="UPDATE chiamata set agente=".$idop.",data_esito=now() Where id_chiamata=".$rowdes[id_chiamata];
    $result = mysql_query($insertrich) or die(mysql_error());
  $id_login=$_SESSION['login'] ;

   $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUE (".$idanarichiesta[1].",'Assegnazione agente', now(),'$id_login','Assegnazione appuntamento $idop')";
                //echo($insertrich);
 $result = mysql_query($insertrich) or die(mysql_error());
 
    
}
if (!empty($_REQUEST['assegnaesitorecall'])) {
    $idop = $_REQUEST['assegnaesitorecall'];
    $idanaric = $_REQUEST['id_ana'];
    $data_app=$_REQUEST['data_app'];
	//$note=mysql_real_escape_string($_REQUEST['note']);
	$note=$_REQUEST['note'];
    $idanarichiesta = split('__', $idanaric);
    $queryselect="select max(called_count),list_id,campaign_id,phone_code,phone_number from vicidial_log where lead_id=".$idanarichiesta[1]." group by lead_id ";
   
    $result2 = mysql_query($queryselect) or die(mysql_error());
    $rowdes = mysql_fetch_assoc($result2);

//    $insertrich="UPDATE vicidial_call_notes set id_seller=".$idop." Where notesid=".$idanarichiesta[1];
    //$insertrich = "INSERT into inbox(id_login,data,id_richiesta,last_update,deleted,nchiamata,stato) VALUES (" . $idop . ",'" . date('Y-m-d H:i:s') . "'," . $idanarichiesta[1] . ",'" . date('Y-m-d H:i:s') . "','No',0,'Nuovo')";
   // $insertrich="INSERT into vicidial_log (lead_id,list_id,campaign_id,call_date,status,phone_code,phone_number) value(".$idanarichiesta[1].",".$rowdes['list_id'].",".$rowdes['campaign_id'].",'now()','".$idop."',39,'".$rowdes['phone_number']."')";
    $insertrich="INSERT INTO chiamata (id_richiesta,esito,data_esito,agente,note_chiamata,lastupdate,data_ora_app,note_recall) 
                              VALUE (".$idanarichiesta[1].",'".$idop."',now(),'','',now(),'".$data_app."','".$note."')";
    echo($insertrich);
      $id_login=$_SESSION['login'] ;
    $query = mysql_fetch_assoc(mysql_query("SELECT  * from login where username='" . $id_login));
    $id_login=$query[id_login];  
    $result = mysql_query($insertrich) or die(mysql_error());
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUE (".$idanarichiesta[1].",'$idop', now(),'$id_login', Assegna esito Recall')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
 
 
}

if (!empty($_REQUEST['cambiadataapp'])) {
    $idop = $_REQUEST['cambiadataapp'];
    $idanaric = $_REQUEST['id_ana'];
    $idanarichiesta = split('__', $idanaric);
    $oraapp=$_REQUEST['oraapp'];
  //  $queryselect="select max(called_count),list_id,campaign_id,phone_code,phone_number from vicidial_log where lead_id=".$idanarichiesta[1]." group by lead_id ";
   // $result2 = mysql_query($queryselect) or die(mysql_error());
  //  $rowdes = mysql_fetch_assoc($result2);

    $insertrich="UPDATE vicidial_call_notes set appointment_date='".$idop.' '.$oraapp."' Where notesid=".$idanarichiesta[1];
    //$insertrich = "INSERT into inbox(id_login,data,id_richiesta,last_update,deleted,nchiamata,stato) VALUES (" . $idop . ",'" . date('Y-m-d H:i:s') . "'," . $idanarichiesta[1] . ",'" . date('Y-m-d H:i:s') . "','No',0,'Nuovo')";
   // $insertrich="INSERT into vicidial_log (lead_id,list_id,campaign_id,call_date,status,phone_code,phone_number) value(".$idanarichiesta[1].",".$rowdes['list_id'].",".$rowdes['campaign_id'].",'now()','".$idop."',39,'".$rowdes['phone_number']."')";
    //$insertrich="INSERT INTO chiamata (id_richiesta,esito,data_esito,agente,note_chiamata,lastupdate) VALUE (".$idanarichiesta[1].",'".$idop."',now(),'','',now())";
    echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
          $id_login=$_SESSION['login'] ;
    $query = mysql_fetch_assoc(mysql_query("SELECT  * from login where username='" . $id_login));
    $id_login=$query[id_login];  
    $result = mysql_query($insertrich) or die(mysql_error());
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUE (".$idanarichiesta[1].",".$idop.' '.$oraapp.", now(),'$id_login', 'Cambia data app')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
 
}
if (!empty($_REQUEST['cambiadataappag'])) {
    $idop = $_REQUEST['cambiadataappag'];
    $idanaric = $_REQUEST['id_ana'];
    $idanarichiesta = split('__', $idanaric);
   // $oraapp=$_REQUEST['oraapp'];
  //  $queryselect="select max(called_count),list_id,campaign_id,phone_code,phone_number from vicidial_log where lead_id=".$idanarichiesta[1]." group by lead_id ";
   // $result2 = mysql_query($queryselect) or die(mysql_error());
  //  $rowdes = mysql_fetch_assoc($result2);

    $insertrich="UPDATE vicidial_call_notes set appointment_date='".$idop."' Where notesid=".$idanarichiesta[1];
    //$insertrich = "INSERT into inbox(id_login,data,id_richiesta,last_update,deleted,nchiamata,stato) VALUES (" . $idop . ",'" . date('Y-m-d H:i:s') . "'," . $idanarichiesta[1] . ",'" . date('Y-m-d H:i:s') . "','No',0,'Nuovo')";
   // $insertrich="INSERT into vicidial_log (lead_id,list_id,campaign_id,call_date,status,phone_code,phone_number) value(".$idanarichiesta[1].",".$rowdes['list_id'].",".$rowdes['campaign_id'].",'now()','".$idop."',39,'".$rowdes['phone_number']."')";
    //$insertrich="INSERT INTO chiamata (id_richiesta,esito,data_esito,agente,note_chiamata,lastupdate) VALUE (".$idanarichiesta[1].",'".$idop."',now(),'','',now())";
    //echo($insertrich);
   // echo $idanarichiesta[1];
   $result = mysql_query($insertrich) or die(mysql_error());
}
if (!empty($_REQUEST['cambiaoraapp'])) {
    $idop = $_REQUEST['cambiaoraapp'];
    $idanaric = $_REQUEST['id_ana'];
    $idanarichiesta = split('__', $idanaric);
    $oraapp=$_REQUEST['oraapp'];
  //  $queryselect="select max(called_count),list_id,campaign_id,phone_code,phone_number from vicidial_log where lead_id=".$idanarichiesta[1]." group by lead_id ";
   // $result2 = mysql_query($queryselect) or die(mysql_error());
  //  $rowdes = mysql_fetch_assoc($result2);

    $insertrich="UPDATE vicidial_call_notes set appointment_time='".$idop."' Where notesid=".$idanarichiesta[1];
    //$insertrich = "INSERT into inbox(id_login,data,id_richiesta,last_update,deleted,nchiamata,stato) VALUES (" . $idop . ",'" . date('Y-m-d H:i:s') . "'," . $idanarichiesta[1] . ",'" . date('Y-m-d H:i:s') . "','No',0,'Nuovo')";
   // $insertrich="INSERT into vicidial_log (lead_id,list_id,campaign_id,call_date,status,phone_code,phone_number) value(".$idanarichiesta[1].",".$rowdes['list_id'].",".$rowdes['campaign_id'].",'now()','".$idop."',39,'".$rowdes['phone_number']."')";
    //$insertrich="INSERT INTO chiamata (id_richiesta,esito,data_esito,agente,note_chiamata,lastupdate) VALUE (".$idanarichiesta[1].",'".$idop."',now(),'','',now())";
    echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
}
if (!empty($_REQUEST['delass'])) {
  
    $id_richiesta = $_REQUEST['delass'];
$id_login = $_REQUEST['id_login'];
//echo $id_login;
$insertrich="UPDATE vicidial_call_notes set id_seller='0', data_assegnazione='' Where notesid=".$id_richiesta;


$result = mysql_query($insertrich) or die(mysql_error());
    
 //  $sel="SELECT * from chiamata where id_richiesta='$id_richiesta' ORDER by  id_chiamata desc LIMIT 0,1";
   //$resultsel = mysql_query($sel) or die(mysql_error());
  // $rowdes = mysql_fetch_assoc($resultsel);
   
   
//  $deleterichprec = "DELETE from chiamata where id_richiesta=$id_richiesta";
 // $result = mysql_query($deleterichprec) or die(mysql_error());

  $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUE (".$id_richiesta.",'Riassegnazione', now(),'$id_login','Riassegnazione appuntamento')";
                //echo($insertrich);
 $result = mysql_query($insertrich) or die(mysql_error());
 

    
}

//modifica del profilo utente
if (!empty($_REQUEST['getNotifica'])) {
// Cross validation if the request method is POST else it will return "Not Acceptable" status
if($this->get_request_method() != "POST"){
$this->response('',406);
}

$id = $this->_request['id'];



mysql_query("SET character SET utf8");	 

$res=mysql_query("select * from notifiche join utenti on utenti.ut_id=notifiche.id_mittente where id_notifica=".$id, $this->db);
if(mysql_num_rows($res)){
    $row=mysql_fetch_array($res);
$row['status']="Ok";
$this->response($this->json($row), 200);		
die();
}
else
{
$result = array('status' => "Errore", "msg" => "Nessuna notifica");
$this->response($this->json($result), 200);		
die();
}

}


require_once ('htmlpurifier/library/HTMLPurifier.auto.php');

$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);

$operazione = $_POST['operazione'];

$arrayReturn = array();

if($operazione=="salvarecall")
{
            $recall=$_POST[recall];
            $consulente=$_POST[consulente];
            $note=$_POST[note];
            //$note = $purifier->purify($note);
            $id=$_POST[id];
             $idlogin = $_SESSION['idlogin'];
 
            $iduser = $_POST['idlogin'];
            if($consulente=="agente"){
                $selquery="SELECT * from vicidial_call_notes where notesid=$id ";
                 $ragente = mysql_query($selquery);
                 $row3 = mysql_fetch_assoc($ragente);
                 $consulente=$row3[id_seller_agente];

            }
            if($recall!="Recall OK")$consulente=0;
            $insertrich="UPDATE vicidial_call_notes set id_seller='$consulente',data_assegnazione=now() Where notesid=$id";
            $result = mysql_query($insertrich) or die(mysql_error());
            $queryselect="select * from vicidial_call_notes where notesid=$id";

                $result2 = mysql_query($queryselect) or die(mysql_error());
                $rowdes = mysql_fetch_assoc($result2);

                $data_app=$rowdes[appointment_date]." ".$rowdes[appointment_time];

                $insertrich="INSERT INTO chiamata (id_richiesta,esito,data_esito,agente,lastupdate,data_ora_app,note_recall) 
                                            VALUE (".$id.",'".$recall."',now(),'$consulente',now(),'".$data_app."','".$note."')";
                //echo($insertrich);
                $result = mysql_query($insertrich) or die(mysql_error());
                $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUE ('$id','$recall',now(),'$idlogin','Recall effettuata')";
                //echo($insertrich);
                $result = mysql_query($insertrich) or die(mysql_error());

                  $arrayReturn['esito'] ="Modifiche effettuate";



    
}
else if($operazione=="salvaprodotto")
{
    $nome=$_POST['nomecorso'];
    $prezzo1=$_POST['prezzo1'];
    $prezzo2=$_POST['prezzo2'];
    $insertrich="INSERT INTO corsi (nome_corso,prezzo1,prezzo2) VALUE ('$nome','$prezzo1', '$prezzo2')";
    //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
    $arrayReturn['esito'] ="Prodotto inserito";
}
else  if($operazione=="delprodotto")
{
  
    $id = $_POST['id'];
    
    $insertrich="DELETE FROM corsi  WHERE id_corso='$id'";
    //   echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
    $arrayReturn['esito'] ="Prodotto cancellato";
}
elseif($operazione=="modprodotto")
{
    $id=$_POST['id'];
    $nome=$_POST['nomecorso'];
    $prezzo1=$_POST['prezzo1'];
    $prezzo2=$_POST['prezzo2'];

    $insertrich="UPDATE corsi SET nome_corso='$nome', prezzo1='$prezzo1', prezzo2='$prezzo2' WHERE id_corso='$id'";
    //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
    $arrayReturn['esito'] ="Prodotto modificato";
}
elseif($operazione=="salvacontratto")
{
    $id=$_POST['id'];
    $contratto=$_POST['contratto'];
    $pagamento=$_POST['rid'];
    $extra=$_POST['contratto2'];
    $modem=$_POST['modem'];
    $mobile=$_POST['mobile'];
    $voce=$_POST['voce'];
    $international=$_POST['international'];
    $uperField=$_POST['super1'];
    $super2=$_POST['super2'];
     $tipodoc=$_POST['tipodoc'];
      $numerodoc=$_POST['numerodoc'];
      $newopz=$_POST['newopz'];
    
    if($super2!="")
        $superField.=";".$super2;

    if(($extra!="")){$contratto=$contratto." + ".$extra; }

    $insertrich="UPDATE vicidial_call_notes SET contratto='$contratto', pagamento='$pagamento', international='$international', modem='$modem', mobile='$mobile', voce='$voce',super='$superField',tipo_documento=$tipodoc,numero_documento='$numerodoc' WHERE notesid='$id'";
        //echo($insertrich);
    $deteterich="delete from opzionicttnew where id_notes =".$id;
      $resultd = mysql_query($deteterich) or die(mysql_error());
    
    if($newopz!=""){
        $opzioni=explode(",", $newopz);
       // var_dump($opzioni);
         for ($i = 0; $i < count($opzioni); $i++) {
        
            $query="INSERT INTO opzionicttnew (valore,id_notes) VALUES ('".$opzioni[$i]. "',$id)";  
            mysql_query($query) or die(mysql_error());  
    }
    
        }
    
    $result = mysql_query($insertrich) or die(mysql_error());

    $arrayReturn['esito'] ="Contratto aggiornato";
}
elseif($operazione=="delcontratto")
{
    $path=$_POST['path'];
    unlink('../'.$path);
    $arrayReturn['esito'] ="Contratto cancellato";
}
elseif ($operazione == "delpda") {
    $path = $_POST['path'];
    $tipo = $_POST['tipo']; // Nuovo parametro per il tipo di file

    // Aggiungi un prefisso al percorso in base al tipo di file, se necessario
    $pathCompleto = '../' . $path;

    // Esegui l'operazione di cancellazione
    unlink($pathCompleto);

    $arrayReturn['esito'] = "Cancellato";
}
elseif($operazione=="salvaesitb"){
    $esitob=$_POST[esitob];
    $id=$_POST[id];
    $note_esitob=$_POST[note_esitob];
    $iduser = $_POST[idlogin];
    $sel="SELECT * from chiamata where id_richiesta='$id' ORDER by  id_chiamata desc LIMIT 0,1";
    $resultsel = mysql_query($sel) or die(mysql_error());
    $rowdes = mysql_fetch_assoc($resultsel);
    $insertrich="UPDATE chiamata set esitob=".$esitob.",data_esitob=now(),  note_esitob='$note_esitob', lastupdate=now() Where id_chiamata=".$rowdes[id_chiamata];
    $result = mysql_query($insertrich) or die(mysql_error()); 
   
   
//$insertrich="INSERT INTO chiamata (id_richiesta,esitob,data_esitob,note_esitob,lastupdate)
//                             VALUE ('$id','$esitob',now(),'$note_esitob',now())";
  
//$result = mysql_query($insertrich) or die(mysql_error());



$insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note) 
                              VALUE (".$id.",'".$esitob."',now(),'$iduser','".$note_esitob."')";
                //echo($insertrich);
               $result = mysql_query($insertrich) or die(mysql_error());

$arrayReturn['esito'] ="Modifiche effettuate $note_esitob ";
      
      
      
    
}
elseif($operazione=="modifica_esito")
{
    $data="";
    $id=$_POST[id];
    $esito_agente=$_POST[esito_agente];
    $lead_id=$_POST[lead_id];
    $agente=$_POST[agente]; 
    if($esito_agente!="")
    {
        if($id=="")
        {
            $queryselect="select * from vicidial_call_notes where notesid='$lead_id'";

            $result2 = mysql_query($queryselect) or die(mysql_error());
            $rowdes = mysql_fetch_assoc($result2);

            $data_app=$rowdes[appointment_date]." ".$rowdes[appointment_time];
            $insertrich="INSERT INTO chiamata (id_richiesta,esito,data_esito,lastupdate,data_ora_app) 
                VALUES (".$lead_id.",'Recall OK',now(),now(),'".$data_app."')";
            //$data.=$insertrich;
            $result = mysql_query($insertrich) or die(mysql_error());
            $insertrich="INSERT INTO chiamata (id_richiesta,esito,data_esito,lastupdate,data_ora_app, data_mod_manuale, agente) 
                VALUES (".$lead_id.",".$esito_agente.",now(),now(),'".$data_app."', now(), '".$agente."')";
            //$data.=$insertrich;
            $result = mysql_query($insertrich) or die(mysql_error());
        }
        else
        {
            $insertrich="UPDATE chiamata SET esito='$esito_agente', data_mod_manuale=now(), agente='".$agente."' where id_chiamata='$id'";
            //$data.=$insertrich;
            $result = mysql_query($insertrich) or die(mysql_error());
        }
    }

    $insertrich="UPDATE vicidial_call_notes SET id_seller='$agente' where notesid='$lead_id'";
    //$data.=$insertrich;
    $result = mysql_query($insertrich) or die(mysql_error()); 
    $idlogin = $_SESSION['idlogin'];
    $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  
    VALUES ('".$richiesta."','Modifica Esito', now(),'$idlogin', 'Modifica esito')";
    //$data.=$insertrich;
    $result = mysql_query($insertrich) or die(mysql_error());
    $arrayReturn['esito'] ="Esito Modificato";
    //$arrayReturn['esito']=$data;
}

else if($operazione=="tim"){
    
    $id=$_POST[id];
    $esito=$_POST[esito];
    $note=addslashes($_POST[note]);
    $insertrich="UPDATE chiamata SET esito_tim='$esito', note_tim='$note', data_attivazione=NOW() where id_chiamata='$id'";
    //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error()); 
    $idlogin = $_SESSION['idlogin'];
 
   
     
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$richiesta."','Modifica Esito TIM', now(),'$idlogin', 'Modifica Esito TIM')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
      $arrayReturn['esito'] ="$esito";
}else if($operazione=="wind"){
    
      $id=$_POST[id];
    $esito=$_POST[esito];
    $note=addslashes($_POST[note]);
      $insertrich="UPDATE chiamata SET esito_wind='$esito', note_wind='$note', data_wind=NOW() where id_chiamata='$id'";
                                //echo($insertrich);
     $result = mysql_query($insertrich) or die(mysql_error()); 
     $idlogin = $_SESSION['idlogin'];
 
   
     
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$richiesta."','Modifica Esito TIM', now(),'$idlogin', 'Modifica Esito TIM')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
      $arrayReturn['esito'] ="$esito";
}

else if($operazione=="modifica_note"){
    
      $id=$_POST[id];
            
    $note=addslashes($_POST[note]);
      $insertrich="UPDATE chiamata SET  note_tim='$note' where id_chiamata='$id'";
                                //echo($insertrich);
     $result = mysql_query($insertrich) or die(mysql_error()); 
     $idlogin = $_SESSION['idlogin'];
 
   
     
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$richiesta."','Modifica Esito TIM', now(),'$idlogin', 'Modifica Esito TIM')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
            
}
else if($operazione=="modifica_note2"){
    
      $id=$_POST[id];
            
    $note=addslashes($_POST[note]);
      $insertrich="UPDATE chiamata SET  note_esito_f='$note' where id_chiamata='$id'";
                                //echo($insertrich);
     $result = mysql_query($insertrich) or die(mysql_error()); 
     $idlogin = $_SESSION['idlogin'];
 
   
     
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$richiesta."','Modifica Esito TIM', now(),'$idlogin', 'Modifica Esito TIM')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
            
}
else if($operazione=="finale"){
    
      $id=$_POST[id];
    $esito=$_POST[esito];
    $note=addslashes($_POST[note]);
      $insertrich="UPDATE chiamata SET esito_f='$esito', note_esito_f='$note', data_esito_f=NOW() where id_chiamata='$id'";
                                //echo($insertrich);
     $result = mysql_query($insertrich) or die(mysql_error()); 
     $idlogin = $_SESSION['idlogin'];
 
   
     
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$richiesta."','Modifica Esito Finale', now(),'$idlogin', 'Modifica Esito Finale')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
      $arrayReturn['esito'] ="$esito";
}
else if ($operazione=="recal"){
      $id=$_POST[id];
    $esito=$_POST[esito];
    $note=addslashes($_POST[note]);
    if ($esito!=''){
    $insertrich="UPDATE chiamata SET esito_recall='$esito',note_recall='$note', data_esito_recall=NOW() where id_chiamata='$id'";}
    else $insertrich="UPDATE chiamata SET note_recall='$note', data_esito_recall=NOW() where id_chiamata='$id'";
        //   echo($insertrich);                     //echo($insertrich);
     $result = mysql_query($insertrich) or die(mysql_error()); 
     $idlogin = $_SESSION['idlogin'];
 
   
     
     $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUES ('".$richiesta."','Modifica Esito recall', now(),'$idlogin', 'Modifica Esito recall')";
                //echo($insertrich);
    $result = mysql_query($insertrich) or die(mysql_error());
      $arrayReturn['esito'] ="$esito";
}
else if($operazione=="salvaproattivita"){
        $nome=addslashes($_POST['nome']);
        $cognome=addslashes($_POST['cognome']);
        $telefono=$_POST['telefono'];
        $telefonoalt=$_POST['cell'];
        $citta=addslashes($_POST['citta']);
        $ragione_sociale=addslashes($_POST['ragione']);
        $data_richiesta=$_POST['data'];
        $ora_app=$_POST['ora'];
        $indirizzo=addslashes($_POST['indirizzo']);
        $note=addslashes($_POST['note']);
        $cod_fiscale=addslashes($_POST['cod_fiscale']);
        $user='1-Proattivita';
        $idlogin = $_SESSION['idlogin'];
        
            $query="INSERT INTO vicidial_list (middle_initial,status, first_name, last_name,phone_number,city,address1,list_id, user)"
                    . " VALUES ('$ragione_sociale','SALE', '$nome', '$cognome','$telefono','$citta','$indirizzo','000000', '$user');";
            mysql_query($query);
            $id_cliente= mysql_insert_id();
            $query2="INSERT INTO vicidial_call_notes (lead_id, call_date, appointment_date,appointment_time,dt_first_date, cod_fiscale, operatore, id_seller) VALUES (".$id_cliente.", NOW(), '$data_richiesta','$ora_app', NOW(), '$cod_fiscale', '$user', '$idlogin');";
            mysql_query($query2);
            $richiesta= mysql_insert_id(); 
            $query3="INSERT INTO chiamata (id_richiesta, esito, data_esito, lastupdate,data_ora_app, agente) VALUES 
                                        ($richiesta,'Recall OK', NOW(),NOW(),'$data_richiesta', '$idlogin');";
            mysql_query($query3);
            $query4="INSERT INTO chiamata (id_richiesta, esito, data_esito, lastupdate,data_ora_app, note_chiamata, agente) VALUES 
                                        ($richiesta,'31', NOW(),NOW(),'$data_richiesta', '$note', '$idlogin');";
            mysql_query($query4);
            $insertrich="INSERT INTO log_eventi (id_richiesta,esito,data,utente,note)  VALUE (".$richiesta.",'Inserimento Proattivita', now(),'$idlogin', 'Inserimento Proattivita')";
                //echo($insertrich);
            $result = mysql_query($insertrich) or die(mysql_error());
      
   
            $arrayReturn['notesid'] ="$richiesta";
            $arrayReturn['esito'] ="Proattivita' inserita";
}


echo json_encode($arrayReturn);
    