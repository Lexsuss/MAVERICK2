<?php
require_once("./function/general.php");
//session_start();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="./js/function.js?ver=2" language="javascript" ></script>
        <link rel="stylesheet" href="css/style.css" type="text/css" />
        <script type="text/javascript" src="./script/jquery-1.4.min.js"></script>
        <script type="text/javascript" src="./script/common.js"></script>
        <link rel="stylesheet" href="./style/screen.css" type="text/css" media="all" />
 <!--  SCRIPT E CSS PER CALENDARIO  -->
       <link rel="stylesheet" href="calendar/skins/aqua/theme.css" type="text/css" />
       <!-- <style type="text/css">@import url(calendar/calendar-win2k-1.css);</style> -->
        <script type="text/javascript" src="calendar/calendar.js"></script>
        <script type="text/javascript" src="calendar/lang/calendar-en.js"></script>
        <script type="text/javascript" src="calendar/calendar-setup.js"></script>
   
</head>
<body>
<?php  require_once("FOappuntamento.php");
 require_once("FOnote.php");
  //require_once("FOemail.php");
 ?>
  <div align="center">
  
<table border="0" style="border: 1px solid #C0C0C0" cellspacing="0" cellpadding="0" align="center">
<tr>
    <td colspan="2">
    <img border="0" src="images/header_page.jpg" ></td>
</tr>
<tr>
    <td colspan="2" height="60" bgcolor="#dce6f2">
     <font face="verdana" color="#17375e" size="4">
        <div id="wrap">
            <div id="head" class="block">

            </div>

            <div id="content" class="block2">

                <div id="info" class="block">
                    <ul id="ticker">
                        <?php



                        $Selectnews="Select
                                                news.Titolo_News,
                                                news.Descrizione,
                                                news.active,
                                                DATE_FORMAT(news.data_ora_inserimento,'%d/%c/%Y %H:%i:%s') as dataora_inserimento
                                                 from news where active='Si'";
                        //echo($Selectnews);
                        $resultnews = mysql_query($Selectnews,$conn) or die (mysql_error());
                        $num_rowsnews = mysql_num_rows($resultnews);
                        if($num_rowsnews > 0) {
                            while ($rownews = mysql_fetch_assoc($resultnews)) {
                                ?>
                        <li>
                            <span><?echo($rownews['Titolo_News']." del ".$rownews['dataora_inserimento']);?></span>
                            <a href="#">
                                <?echo($rownews['Descrizione']);?>
                            </a>
                        </li>
                        <?php
                    }

                }


                ?>




                    </ul>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript">
            try {
                var pageTracker = _gat._getTracker("UA-8632327-1");
                pageTracker._trackPageview();
            } catch(err) {}</script>
            </td>
</tr>
<tr>
    <td bgcolor="#fdb839"><div align="left">
    <font face="verdana" color="#17375e" size="2">Utente:<b>
    <?php echo($_SESSION['nominativo'])?></font></b>
</div><div align="right">

    <b>
        <?php
        $giorno = date("j");
        $mese =  date("n");
        $anno = date("Y");
        $ora = date("H:i");
        $internettime = date("B");
        $settimana = date("w");
        $giornosettimana = array ("Domenica", "Lunedi", "Martedi", "Mercoledi",
                "Giovedi", "Venerdi", "Sabato");
        $nomemese = array (1 => "gennaio", "febbraio", "marzo", "aprile",
                "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre");
        echo ("$giornosettimana[$settimana]" . "," . " " . "$giorno" . " " . "$nomemese[$mese]" . " " . "$anno");
        echo " ore $ora";
        ?></b></div>

</td>
</tr>


<?php
//$inmodifica=false;
$idrichiesta=$_GET['richiesta'];
if ($idrichiesta!="") {
 $query="Select * FROM `vicidial_call_notes` , vicidial_list WHERE vicidial_call_notes.lead_id = vicidial_list.lead_id and  notesid=".$idrichiesta;
  echo($query);
 $result = mysql_query($query) or die (mysql_error());
 $num_rows = mysql_num_rows($result);
 if($num_rows > 0) {
     //   echo("ok");
     $row = mysql_fetch_assoc($result);


 }

}
 // GET INFO AGGIUNTIVE
                         //$id_richiesta = $idrichiesta;
                         $infoagg     = Getinfoagg($idrichiesta);
?>
<tr><td>
        <img src="./images/left_arrow.png" width="40" id="tornaindietro" onMouseOver="style.cursor='pointer'" onclick="javascript:showpagechiamataadmin(<?=$_REQUEST['pag']?>);">
        <div id="user_appointment"> <BR>

        <fieldset style="width:800">
        <legend><b>Dati Richiesta</b></legend>

        <table style="font-size:12px">
            <tr>
                <td align="left">
                  
                    <input type="hidden" id="idlogin" value="<?=$_SESSION['idlogin']?>">
                    <input name="CodCli" type="hidden" id="CodCli" value="<?= $idrichiesta ?>" style="width:80px"  readonly="readonly" align="right">
                </td>
                <td align="left">Nome:<br>
                    <input readonly type="text" name="phonenome" id="phonenome" style="width:200px" value="<?= $row['first_name'] ?>"/>
                </td>
                <td align="left">Cognome:<br>
                    <input readonly type="text" name="phonecognome" id="phonecognome" style="width:200px" value="<?= $row['last_name'] ?>">
                </td>

                <td align="left">Telefono:<br>
                    <input name="phonetelefono" type="text" id="phonetelefono" value="<?= $row['phone_number'] ?>" style="width:120px"  readonly >
                </td>
                <td align="left" id="td_num_alt" >Fax.:<br>
                <input name="phone_num_alt" type="text" id="phone_num_alt" value="<?=$row['fax']?>">
            </tr>
        </table>


        <table>
            <tr>
                <td align="left" nowrap>Email:<br>
                    <input name="email" type="text" id="email" style="width:200px" value="<?= $row['email'] ?>"   readonly >
                </td>

                <td align="left">Ragione_Sociale:<br>
                    <input name="ragionesociale" type="text" id="ragionesociale" style="width:300px" value="<?= $row['rag_sociale'] ?>"  readonly >
                </td>
              <!--  <td align="left">Area Interesse:<br>
                    <input name="stato" type="text" id="stato" style="width:300px" value="<?= $row2['stato'] ?>"  readonly >
                </td>-->


            </tr>
            <tr>
                <td align="left" nowrap colspan="4">Area Interesse:<br>
                   <textarea rows="2" cols="60"><?=$row['areainteresse']?>
</textarea>
                </td>



            </tr>
            <tr>
                <td align="left" colspan="4" nowrap>Note:<br>
                   <textarea rows="2" cols="60"><?=$row['note']?>
</textarea>
                </td>



            </tr>
        </table>


</fieldset>
        

</div>
</body>
</html>
