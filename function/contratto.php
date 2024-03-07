

<!--  DATI PERSONALI -->
<fieldset class="fieldset_tab">
    <legend class="legend2"> Dati Personali: </legend>
    <form name="formcontract" id="formcontract" accept-charset="ISO-8859-1" >
      
    <table  id="table_tab_1a" align="left" border="0" width="100%">
        <tr><td><?php
$contract="SELECT * from adesione where id_richiesta=".$idrichiesta ." Order by data_contratto DESC";
//echo($contract);
  $result = mysql_query($contract) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        $rowcontract = mysql_fetch_assoc($result) ;



}

?>
              <input name="id_richiesta" id="id_richiesta" value="<?= $idrichiesta ?>" style="width:80px"  readonly="readonly" align="right">
             
                <input type="checkbox" onclick="javascript:copiadapotenziale(this);"><b> Copia da Potenziale</b>
            </td></tr>
         <tr id="azienda">
            <td nowrap>Ragione Sociale:</td>
            <td align="left"><input type="text" name="Ragione_sociale"  alt="campo obbligatorio"  id="Ragione_sociale"  style="width:210px" value="<?=$rowcontract['Ragione_sociale'];?>" /></td>
    <td nowrap>PIVA:</td>
            <td align="left"><input type="text" name="p_iva"   alt="campo obbligatorio"  id="p_iva"  style="width:210px" value="" /></td>

        </tr>
        <tr>
            <td nowrap >Nome: </td>
            <td nowrap style="width:210px" align="left"><input type="text"  name="nome"  id="nome" alt="campo obbligatorio" style="width:210px" value="<?=$rowcontract['nome'];?>" /></td>
            <td nowrap>Cognome: </td>
            <td align="left"><input type="text" name="cognome"   id="cognome" alt="campo obbligatorio" style="width:210px" value="<?=$rowcontract['cognome'];?>" /></td>
        </tr>
        <!--  <tr>
<td nowrap>Provincia di nascita: </td>
<td id="td_prov_nascita" align="left">

<?php
$queryprov = "SELECT distinct(prov) FROM codicicomuni WHERE prov != '' ORDER BY prov";
$selectedprov = $rowcontract['provnascita'];
getSelect("provincia_nascita","provnascita","prov","prov",$queryprov,$selectedprov,"","javascript:getComune(this,'comune_nascita','comunenascita','td_com_nascita');","campo obbligatorio");

?>
</td>
<td nowrap align="left">Comune di nascita: </td>
<td id="td_com_nascita" align="left">
<?php
$querycom = "SELECT distinct(comune) FROM codicicomuni WHERE prov='" .$rowcontract['provnascita']."' ORDER BY comune";
$selectedcom = $rowcontract['comunenascita'];
getSelect("comune_nascita","comunenascita","comune","comune",$querycom,$selectedcom,"","","campo obbligatorio");
?>
</td>
</tr>
        <tr>-->
      
      
     

        <tr>
            <td nowrap>Indirizzo: </td>
            <td align="left"><input type="text"  name="indirizzo" id="indirizzo" alt="campo obbligatorio"  style="width:210px" value="<?=$rowcontract['indirizzo'];?>" /></td>
            <td nowrap>N. Civico: </td>
            <td align="left"><input type="text"  name="civico" id="civico" alt="campo obbligatorio"  style="width:50px" value="<?=$rowcontract['civico'];?>" /></td>
        </tr>
        <tr>
            <td nowrap><i>Localit&agrave;:</i> </td>
            <td align="left"><input type="text" name="localita" id="localita"  style="width:210px" value="<?=$rowcontract['localita'];?>" /></td>
            <td nowrap>CAP: </td>
            <td align="left"><input type="text" maxlength="5" alt="campo obbligatorio" name="cap" id="cap"  style="width:50px" value="<?=$rowcontract['cap'];?>" /></td>
        </tr>
        <tr>
            <td nowrap  >Provincia: </td>
            <td id="td_prov" align="left">
                <?php
                $queryprov = "SELECT distinct(prov) FROM codicicomuni WHERE prov != '' ORDER BY prov";
                $selectedprov = $rowcontract['prov'];
                getSelect("provincia","prov","prov","prov",$queryprov,$selectedprov,"","javascript:getComune(this,'comune','comune','td_com');","campo obbligatorio");
                ?>
            </td>
            <td nowrap  >Comune: </td>
            <td id="td_com" align="left">
                <?php
                $querycom = "SELECT distinct(comune) FROM codicicomuni WHERE prov='" .$rowcontract['prov']."' ORDER BY comune";
                $selectedcom = $rowcontract['comune'];
                getSelect("comune","comune","comune","comune",$querycom,$selectedcom,"","","campo obbligatorio");
                ?>
            </td>
        </tr>
        <tr>
              <td nowrap>Numero Telefono:</td>
            <td align="left"><input type="text" name="codicelinea"   alt="campo obbligatorio"  id="codicelinea"  style="width:210px" value="<?=$rowcontract['codicelinea'];?>" /></td>

            <td nowrap><i>E-mail:</i> </td>
            <td align="left"><input type="text" name="emailal" id="emailal"  style="width:210px" value="<?= $rowcontract['emailal'] ?>" /></td>
        </tr>

     
        
          <tr>
            <td nowrap>File Contratto PDF:</td>
            <td align="left" colspan="2">
                <input type="button" value="Carica" onclick="javascript:window.open('carica_file.php', 'popup', 'height=300,width=400,toolbar=no,scrollbars=no');"><input type="text" readonly name="file_contratto" id="file_contratto">
            </td>

         


        </tr>
      <tr>
        <td>Note</td>
        <td> <textarea name='note_contratto' id="note_contratto" cols='40' rows='6' ></textarea></td>
    </tr>
          
        
    </table><br>      

</fieldset>


<fieldset class="fieldset_tab">
<legend class="legend2"> Dettagli Contratto: </legend>
<table id=""><b>FISSO<br><br><br></b>
    <tr>
        <td>NLINEEAIB</td>
        <td>
           <input type="text" name="nlineefissoaib"   id="nlineefissoaib"  style="width:100px" value="" />
    
        </td> <td>&nbsp&nbspCONV AIB</td>
        <td>   <input type="checkbox" name="convaib"   id="convaib"  style="width:100px" value="" />
     </td>
         <td>N LineeAIA</td>
        <td>
         <input type="text" name="nlineefissoaia"   id="nlineefissoaia"  style="width:100px" value="" />
        </td>
        <td>&nbsp&nbspCONVERGENZA AIA</td>
        <td>   <input type="checkbox" name="convaia"   id="convaia"  style="width:100px" value="" />
     </td>
    </tr>
    <tr>
          <td>NLINEEWSO</td>
        <td>
           <input type="text" name="nlineefissowso"   id="nlineefissowso"  style="width:100px" value="" />
    
        </td>
        <td>&nbsp&nbspCONVERGENZA WSO</td>
        <td>   <input type="checkbox" name="convwso"   id="convwso"  style="width:100px" value="" />
     </td>
        <td>
         </td>
    </tr>
      
</table>
  <img id="imgpostcontract"  border="0" src="./images/inserisci_contratto.png"  onclick="javascript:lastCheckContract();" onMouseOver="style.cursor='hand'" align="middle"> Inserisci il contratto<BR><br>

<hr>
  </form>
<div id="persim" style="display:none">
       <form name="formcontract" id="formcontractsim" accept-charset="ISO-8859-1" >
 
<table align="center" id="mobile" visibility="hidden"><b>MOBILE<br><br><br></b>

    <td>
    <table id="table_tab_1c" align="center" width="800">
        <input type="hidden" id="numerodisimv">
    <!--    <tr>
            <td>Quantita</td>
            <td>
                <select name="simtot" id="simtot" onchange="">
                <option value=""></option>
                <option value="1">1</option>
                 <option value="2">2</option>
                  <option value="3">3</option>
                   <option value="4">4</option>
                    <option value="5">5</option>
                     <option value="6">6</option>
                      <option value="7">7</option>
               <option value="8">8</option>

                </select>
            </td>
        </tr>-->
        <tr id="line">
            <td nowrap >Piano Sim: </td>
               <td nowrap style="width:210px" align="left">
                    <?php  
             $queryprov =  "SELECT *  FROM opz_mobile where parent_id=0";
             //$selectdtcorso = $rowcontract['tipologiasim'];
            getSelect("nome_piano","nome_piano","id_opz_mobile","descrizione",$queryprov,$selectdtcorso,"","javascript:getnsim(this);","campo obbligatorio");
      ?>
               
                   
               </td>
            <td nowrap>Nome Piano </td>
            <td align="left" id="getpianogenericosim">
               </td>
  
        </tr>
        <tr id="getpianoforsim">
           
        </tr>
        
        
   
    <tr><td colspan="4" align="center"> <br><br>
             <input name="id_richiesta" id="id_richiesta" value="<?= $idrichiesta ?>" style="width:80px"  readonly="readonly" align="right">
            
            <img id="imgpostcontract"  border="0" src="./images/inserisci_contratto.png"  onclick="javascript:postContractsim();" onMouseOver="style.cursor='hand'" align="middle"> Inserisci +<BR><br>
            <br>  <img id="imgpostcontract"  border="0" src="./images/inserisci_contratto.png"  onclick="javascript:lastCheckContractclose();" onMouseOver="style.cursor='hand'" align="middle"> INSERISCI E CHIUDI<BR><br>

    </td></tr>


  
    </table>
    </td>
    </tr>
</table></div><br>
</fieldset>
<!-- FINE ESTREMI DEL DOCUMENTO DI IDENTITA' -->