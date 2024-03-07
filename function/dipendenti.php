<?php
include 'header.php';
include 'menu.php';
include 'include/db.php';
include 'session.php';
include 'keepalive.php';
require_once ('include/htmlpurifier/library/HTMLPurifier.auto.php');

$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);
$azienda=$_REQUEST['azienda'];;
if($user!=""){
    
?>
<style>
.nascosta {
	display:none;
	border:1px dashed #fff;
	background-color: #5c3d3a;
	color:#FFF;
	padding-left: 10px;
	padding-right: 10px;
	margin-left:20px;
}
</style>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
		<? $query_ragione_sociale="SELECT * from ragione_sociale where rag_id=$azienda ";
           $qrs=mysqli_query($db_connect,$query_ragione_sociale) or die(mysqli_error($db_connect));
           $mrs=mysqli_fetch_array($qrs); 
       	   $azienda1=$mrs['rag_desc'];?>
		
      <h1>Gestione dipendenti <? print $azienda1?>
       
      </h1>
     <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a class="active">Dipendenti</a></li>
       
      </ol>
    </section>

    <section class="content">
    
     
      <div class="row">
          <div class="col-sm-12">
              <a href="#my-modal" role="button" class="btn btn-sm btn-default" data-toggle="modal"><i class="fa fa-plus"></i>Nuovo Dipendente</a>
              <div class="box">
                  
                            <div id="my-modal" class="modal fade" tabindex="-1">
									<div class="modal-dialog modal-lg">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												 <h3 class="smaller lighter blue no-margin">Inserimento nuovo dipendente</h3>
											</div>

											<div class="modal-body">
                                                                                            	
																								<div class="col-sm-6"><label>Ragione Sociale*</label>
                                                                                            	<select id="nuovo_ragione_sociale" class="form-control">
                                                                                                    <option value="">----</option>
                                                                                                    <?php
                                                                                                        $queryMan="SELECT * from ragione_sociale order by rag_id";
                                                                                                        $man=mysqli_query($db_connect,$queryMan) or die(mysqli_error($db_connect));
                                                                                                        while ($m=mysqli_fetch_array($man)) {
                                                                                                          echo "<option value='$m[rag_id]'>$m[rag_desc]</option>";
                                                                                                        }
                                                                                                    ?>
                                                                                                </select>
                                                                                            	</div>
																								<div class="col-sm-6">
                                                                                                <label>Matricola*</label>
                                                                                                <input type="text" id="nuovo_matricola" class="form-control"></div>
																								<div class="col-sm-6">
                                                                                                <label>Nome*</label>
                                                                                                <input type="text" id="nuovo_nome" class="form-control"></div>
                                                                                                <div class="col-sm-6"><label>Cognome*</label>
                                                                                                <input type="text" id="nuovo_cognome" class="form-control"></div>
																								<div class="col-sm-6"><label>Codice Fiscale*</label>
                                                                                                <input type="text" id="nuovo_cod_fiscale" class="form-control"></div>
                                                                                            	<div class="col-sm-6"><label>Indirizzo*</label>
                                                                                                <input type="text" id="nuovo_indirizzo" class="form-control"></div>
																								<div class="col-sm-6"><label>Citta*</label>
                                                                                                <input type="text" id="nuovo_citta" class="form-control"></div>
																								<div class="col-sm-6"><label>Telefono*</label>
                                                                                                <input type="text" id="nuovo_telefono" class="form-control"></div>
																								<div class="col-sm-6"><label>Email*</label>
                                                                                                <input type="text" id="nuovo_email" class="form-control"></div>
																								<div class="col-sm-6"><label>Data Nascita*</label>
                                                                                                <input type="date" id="nuovo_data_nascita" class="form-control"></div>
																								<div class="col-sm-6"><label>Comune Nascita*</label>
                                                                                                <input type="text" id="nuovo_comune_nascita" class="form-control"></div>
																								<div class="col-sm-6"><label>Sede Operativa*</label>
                                                                                                <input type="text" id="nuovo_sede_operativa" class="form-control"></div>
																								<div class="col-sm-6"><label>Brand*</label>
                                                                                                <input type="text" id="nuovo_brand" class="form-control"></div>
																								<div class="col-sm-6"><label>IBAN*</label>
                                                                                                <input type="text" id="nuovo_iban" class="form-control"></div>
											
                                                                             					
                                                                                            <!--
                                                                                            <div class="col-sm-6"><label>Inquadramento*</label>
                                                                                                <select id="nuovo_tipo_soggetto" class="form-control">
                                                                                                    <option value="">----</option>
                                                                                                    <?php
                                                                                                        $querySogg="SELECT * from tipo_soggetto order by sog_desc";
                                                                                                        $sogg=mysqli_query($db_connect,$querySogg) or die(mysqli_error($db_connect));
                                                                                                        while ($s=mysqli_fetch_array($sogg)) {
                                                                                                          echo "<option value='$s[sog_id]'>$s[sog_desc]</option>";
                                                                                                        }
                                                                                                    ?>
                                                                                                </select>
                                                                                           </div>
                                                                                            
                                                                                            <div class="col-sm-6"><label>Data assunzione*</label>
                                                                                            <input type="date" id="nuovo_data_assunzione" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>Data Cessazione</label>
                                                                                            <input type="date" id="nuovo_data_cessazione" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>Data termine contratto</label>
                                                                                            <input type="date" id="nuovo_data_termine" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>Livello*</label>
                                                                                            <select id="nuovo_livello" class="form-control">
                                                                                                    <option value="">----</option>
                                                                                                    <?php
                                                                                                        $queryLiv="SELECT * from livello order by liv_desc";
                                                                                                        $liv=mysqli_query($db_connect,$queryLiv) or die(mysqli_error($db_connect));
                                                                                                        while ($l=mysqli_fetch_array($liv)) {
                                                                                                          echo "<option value='$l[liv_id]'>$l[liv_desc]</option>";
                                                                                                        }
                                                                                                    ?>
                                                                                                </select></div>
                                                                                            <div class="col-sm-6"><label>Mansione*</label>
                                                                                            <select id="nuovo_mansione" class="form-control">
                                                                                                    <option value="">----</option>
                                                                                                    <?php
                                                                                                        $queryMan="SELECT * from mansione order by man_desc";
                                                                                                        $man=mysqli_query($db_connect,$queryMan) or die(mysqli_error($db_connect));
                                                                                                        while ($m=mysqli_fetch_array($man)) {
                                                                                                          echo "<option value='$m[man_id]'>$m[man_desc]</option>";
                                                                                                        }
                                                                                                    ?>
                                                                                                </select>
                                                                                            </div>
																							<div class="col-sm-6"><label>Centro di Costo</label>
                                                                                                <input type="text" id="nuovo_centro_di_costo" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>Ore settimanali</label>
                                                                                                <input type="number" id="nuovo_ore" class="form-control"></div>-->
											
                                                                                      
											</div>
											<div class="modal-footer">  
                                                                                            <a href="#" class="btn btn-sm btn-primary pull-left" onclick="nuovo_dipendente()">Inserisci</a>
												 
											</div>
										</div><!-- /.modal-content -->
									</div><!-- /.modal-dialog -->
								</div>
                  	<table id="example" class="table table-bordered table-hover">
                      <thead><tr><th>Matricola</th><th>Nome</th><th>Cognome</th><th>Codice Fiscale</th><th>Telefono</th><th>Email</th><th>Sede Operativa</th><th>Iban</th><th>Cessato</th><th>Modifica</th><th>Carica Proroga</th><th>Carica Rinnovo</th><th>Carica Busta Paga</th></tr></thead>
                        <tbody>
                            <?php 
                           /* $queryUtenti="select * from dipendenti
										  left join livello on dipendenti.livello=livello.liv_id
										  left join mansione on dipendenti.mansione=mansione.man_id 
										  left join tipo_assunzione on dipendenti.tipo_assunzione=tipo_assunzione.ass_id
                            			  left join tipo_soggetto on dipendenti.tipo_soggetto=tipo_soggetto.sog_id "; */
	
							$queryUtenti="select * from dipendenti where ragione_sociale=$azienda"; 
                            $utenti=mysqli_query($db_connect,$queryUtenti) or die(mysqli_error($db_connect)); 
                            while ($row=mysqli_fetch_array($utenti)) {
                                $id=$row['id_dipendente'];
                                $id = $purifier->purify($id);
                                //$ragione_sociale=$row['rag_desc'];
                                //$ragione_sociale = $purifier->purify($ragione_sociale);
                                //$ragione=$row['ragione_sociale'];
                                $matricola=$row['matricola'];
                                $matricola = $purifier->purify($matricola);
                                $nome=$row['nome'];
                                $nome = $purifier->purify($nome);
                                $cognome=$row['cognome'];
                                $cognome = $purifier->purify($cognome);
								$cod_fiscale=$row['cod_fiscale'];
                                $cod_fiscale = $purifier->purify($cod_fiscale);
								$indirizzo=$row['indirizzo'];
                                $indirizzo = $purifier->purify($indirizzo);
								$citta=$row['citta'];
                                $citta = $purifier->purify($citta);
								$telefono=$row['telefono'];
                                $telefono = $purifier->purify($telefono);
								$email=$row['email'];
                                $email = $purifier->purify($email);
								$sede_operativa=$row['sede_operativa'];
                                $sede_operativa = $purifier->purify($sede_operativa);
                                /*$tipo_soggetto=$row['sog_desc'];
                                $sogg=$row['tipo_soggetto'];
                                $tipo_soggetto = $purifier->purify($tipo_soggetto);
                                //$tipo_assunzione=$row['ass_desc'];
                                //$ass=$row['tipo_assunzione'];
                               // $tipo_assunzione = $purifier->purify($tipo_assunzione);
                                $data_assunzione=$row['data_assunzione'];
                                $data_assunzione = $purifier->purify($data_assunzione);
                                $data_cessazione=$row['data_cessazione'];
                                $data_cessazione = $purifier->purify($data_cessazione);
                                $data_termine=$row['data_termine'];
                                $data_termine = $purifier->purify($data_termine);
                                //$data_trasformazione=$row['data_trasformazione'];
                                //$data_trasformazione = $purifier->purify($data_trasformazione);
                                $livello=$row['liv_desc'];
                                $liv=$row['livello'];
                                $livello = $purifier->purify($livello);
                                $mansione=$row['man_desc'];
                                $man=$row['mansione'] ;
                                $mansione = $purifier->purify($mansione);
								$centro_di_costo=$row['centro_di_costo'];
                                $centro_di_costo = $purifier->purify($centro_di_costo);
                                $ore=$row['ore'];
                                $ore = $purifier->purify($ore);*/
                                $iban=$row['iban'];
                                $iban = $purifier->purify($iban);
								
								$queryCessazione="select * from dipendenti_rinnovi where id_dipendente=$id"; 
                            	$utentiCessazione=mysqli_query($db_connect,$queryCessazione) or die(mysqli_error($db_connect));
								$num_rowsCessazione = mysqli_num_rows($utentiCessazione);
								if($num_rowsCessazione>0)
								{
									
									$rowCessazione=mysqli_fetch_array($utentiCessazione);	
									$dataCess = $rowCessazione['data_cessazione'];
									if($dataCess>"0001-01-01")
										$dataCessazione = $rowCessazione['data_cessazione'];
								}
								else
								$dataCessazione="";
								
								$queryCessazione1="select * from dipendenti_rinnovi1 where id_dipendente=$id"; 
                            	$utentiCessazione1=mysqli_query($db_connect,$queryCessazione1) or die(mysqli_error($db_connect));
								$num_rowsCessazione1 = mysql_num_rows($utentiCessazione1);
								if($num_rowsCessazione1>0)
								{
									$rowCessazione1=mysqli_fetch_array($utentiCessazione1);	
									$dataCess1 = $rowCessazione1['data_cessazione'];
									if($dataCess1>"0001-01-01")
										$dataCessazione1 = $rowCessazione1['data_cessazione'];
								}
								else
								$dataCessazione1="";
								
								$queryCessazione2="select * from dipendenti_rinnovi2 where id_dipendente=$id"; 
                            	$utentiCessazione2=mysqli_query($db_connect,$queryCessazione2) or die(mysqli_error($db_connect));
								$num_rowsCessazione2 = mysql_num_rows($utentiCessazione2);
								if($num_rowsCessazione2>0)
								{
									$rowCessazione2=mysqli_fetch_array($utentiCessazione2);	
									$dataCess2 = $rowCessazione2['data_cessazione'];
									if($dataCess2>"0001-01-01")
										$dataCessazione2 = $rowCessazione2['data_cessazione'];
								
								}
								else
								$dataCessazione2="";
								
								$queryCessazione3="select * from dipendenti_rinnovi3 where id_dipendente=$id"; 
                            	$utentiCessazione3=mysqli_query($db_connect,$queryCessazione3) or die(mysqli_error($db_connect));
								$num_rowsCessazione3 = mysql_num_rows($utentiCessazione3);
								if($num_rowsCessazione3>0)
								{
									$rowCessazione3=mysqli_fetch_array($utentiCessazione3);	
									$dataCess3 = $rowCessazione3['data_cessazione'];
									if($dataCess3>"0001-01-01")
										$dataCessazione3 = $rowCessazione3['data_cessazione'];
								}
								else
								$dataCessazione3="";
								
								$queryCessazione4="select * from dipendenti_rinnovi4 where id_dipendente=$id"; 
                            	$utentiCessazione4=mysqli_query($db_connect,$queryCessazione4) or die(mysqli_error($db_connect));
								$num_rowsCessazione4 = mysql_num_rows($utentiCessazione4);
								if($num_rowsCessazione4>0)
								{
									$rowCessazione4=mysqli_fetch_array($utentiCessazione4);	
									$dataCess4 = $rowCessazione4['data_cessazione'];
									if($dataCess4>"0001-01-01")
										$dataCessazione4 = $rowCessazione4['data_cessazione'];
								}
								else
								$dataCessazione4="";
								
								$queryCessazione5="select * from dipendenti_rinnovi5 where id_dipendente=$id"; 
                            	$utentiCessazione5=mysqli_query($db_connect,$queryCessazione5) or die(mysqli_error($db_connect));
								$num_rowsCessazione5 = mysql_num_rows($utentiCessazione5);
								if($num_rowsCessazione5>0)
								{
									$rowCessazione5=mysqli_fetch_array($utentiCessazione5);	
									$dataCess5 = $rowCessazione5['data_cessazione'];
									if($dataCess5>"0001-01-01")
										$dataCessazione5 = $rowCessazione5['data_cessazione'];
								}
								else
								$dataCessazione5="";
								
								$queryCessazione6="select * from dipendenti_rinnovi6 where id_dipendente=$id"; 
                            	$utentiCessazione6=mysqli_query($db_connect,$queryCessazione6) or die(mysqli_error($db_connect));
								$num_rowsCessazione6 = mysql_num_rows($utentiCessazione6);
								if($num_rowsCessazione6>0)
								{
									$rowCessazione6=mysqli_fetch_array($utentiCessazione6);	
									$dataCess6 = $rowCessazione6['data_cessazione'];
									if($dataCess6>"0001-01-01")
										$dataCessazione6 = $rowCessazione6['data_cessazione'];
								}
								else
								$dataCessazione6="";
								
								$queryCessazione7="select * from dipendenti_rinnovi7 where id_dipendente=$id"; 
                            	$utentiCessazione7=mysqli_query($db_connect,$queryCessazione7) or die(mysqli_error($db_connect));
								$num_rowsCessazione7 = mysql_num_rows($utentiCessazione7);
								if($num_rowsCessazione7>0)
								{
									$rowCessazione7=mysqli_fetch_array($utentiCessazione7);	
									$dataCess7 = $rowCessazione7['data_cessazione'];
									if($dataCess7>"0001-01-01")
										$dataCessazione7 = $rowCessazione7['data_cessazione'];
								}
								else
								$dataCessazione7="";
								
								$queryCessazione8="select * from dipendenti_rinnovi8 where id_dipendente=$id"; 
                            	$utentiCessazione8=mysqli_query($db_connect,$queryCessazione8) or die(mysqli_error($db_connect));
								$num_rowsCessazione8 = mysql_num_rows($utentiCessazione8);
								if($num_rowsCessazione8>0)
								{
									$rowCessazione8=mysqli_fetch_array($utentiCessazione8);	
									$dataCess8 = $rowCessazione8['data_cessazione'];
									if($dataCess8>"0001-01-01")
										$dataCessazione8 = $rowCessazione8['data_cessazione'];
								}
								else
								$dataCessazione8="";
								
								$queryCessazione9="select * from dipendenti_rinnovi9 where id_dipendente=$id"; 
                            	$utentiCessazione9=mysqli_query($db_connect,$queryCessazione9) or die(mysqli_error($db_connect));
								$num_rowsCessazione9 = mysql_num_rows($utentiCessazione9);
								if($num_rowsCessazione9>0)
								{
									$rowCessazione9=mysqli_fetch_array($utentiCessazione9);	
									$dataCess9 = $rowCessazione9['data_cessazione'];
									if($dataCess9>"0001-01-01")
										$dataCessazione9 = $rowCessazione9['data_cessazione'];
								}
								else
								$dataCessazione9="";
								
								$queryCessazione10="select * from dipendenti_rinnovi10 where id_dipendente=$id"; 
                            	$utentiCessazione10=mysqli_query($db_connect,$queryCessazione10) or die(mysqli_error($db_connect));
								$num_rowsCessazione10 = mysql_num_rows($utentiCessazione10);
								if($num_rowsCessazione10>0)
								{
									$rowCessazione10=mysqli_fetch_array($utentiCessazione10);	
									$dataCess10 = $rowCessazione10['data_cessazione'];
									if($dataCess10>"0001-01-01")
										$dataCessazione10 = $rowCessazione10['data_cessazione'];
								}
								else
								$dataCessazione10="";
								
								$queryCessazione11="select * from dipendenti_rinnovi11 where id_dipendente=$id"; 
                            	$utentiCessazione11=mysqli_query($db_connect,$queryCessazione11) or die(mysqli_error($db_connect));
								$num_rowsCessazione11 = mysql_num_rows($utentiCessazione11);
								if($num_rowsCessazione11>0)
								{
									$rowCessazione11=mysqli_fetch_array($utentiCessazione11);	
									$dataCess11 = $rowCessazione11['data_cessazione'];
									if($dataCess11>"0001-01-01")
										$dataCessazione11 = $rowCessazione11['data_cessazione'];
								}
								else
								$dataCessazione11="";
                                ?>
                            <tr id="id_<?php echo $id;?>">
                                <!--<td ><?php //echo $ragione_sociale; ?>
                                    <input type="text" hidden id="ragione_<?php //echo $id;?>" value="<?php //echo $ragione; ?>">
                                </td>-->
                                                          
                                <td><?php echo $matricola; ?>
                                    <input type="text" hidden id="matricola_<?php echo $id;?>" value="<?php echo $matricola; ?>">
                                </td>
								<td><?php echo $nome; ?>
                                    <input type="text" hidden id="nome_<?php echo $id;?>" value="<?php echo $nome; ?>">
                                </td>
                                <td><?php echo $cognome; ?>
                                    <input type="text" hidden id="cognome_<?php echo $id;?>" value="<?php echo $cognome; ?>">
                                </td>
								<td><?php echo $cod_fiscale; ?>
                                    <input type="text" hidden id="cod_fiscale_<?php echo $id;?>" value="<?php echo $cod_fiscale; ?>">
                                </td>
								<!--<td><?php //echo $indirizzo; ?>
                                    <input type="text" hidden id="indirizzo_<?php //echo $id;?>" value="<?php //echo $indirizzo; ?>">
                                </td>-->
								
								<!--<td><?php //echo $citta; ?>
                                    <input type="text" hidden id="citta_<?php //echo $id;?>" value="<?php // $citta; ?>">
                                </td>-->
								<td><?php echo $telefono; ?>
                                    <input type="text" hidden id="telefono_<?php echo $id;?>" value="<?php echo $telefono; ?>">
                                </td>
								<td><?php echo $email; ?>
                                    <input type="text" hidden id="email_<?php echo $id;?>" value="<?php echo $email; ?>">
                                </td>
								<td><?php echo $sede_operativa; ?>
                                    <input type="text" hidden id="sede_operativa_<?php echo $id;?>" value="<?php echo $sede_operativa; ?>">
                                </td>
                                 <td><?php echo $iban; ?>
                                    <input type="text" hidden id="iban<?php echo $id;?>" value="<?php echo $iban; ?>">
                                </td>
								<td><?php
								if(($dataCessazione>"0001-01-01")||($dataCessazione1>"0001-01-01")||($dataCessazione2>"0001-01-01")||($dataCessazione3>"0001-01-01")||($dataCessazione4>"0001-01-01")||($dataCessazione5>"0001-01-01")||($dataCessazione6>"0001-01-01")||($dataCessazione7>"0001-01-01")||($dataCessazione8>"0001-01-01")||($dataCessazione9>"0001-01-01")||($dataCessazione10>"0001-01-01")||($dataCessazione11>"0001-01-01")){ 
										echo '<span style="color:#F00">'."SI".'</span>' ;
										echo " ".$dataCessazione." ".$dataCessazione1." ".$dataCessazione2." ".$dataCessazione3." ".$dataCessazione4." ".$dataCessazione5." ".$dataCessazione6." ".$dataCessazione7." ".$dataCessazione8." ".$dataCessazione9." ".$dataCessazione10." ".$dataCessazione11;
										
									
						
											}
									else
									{
										echo '<span style="color:#2E8627">'."NO".'</span>'; 
									
									}
									?>
                                   
                                </td>
								
                                <!--<td><?php// echo $tipo_soggetto;?>
                                <input type="text" hidden id="tipo_soggetto_<?php //echo $id;?>" value="<?php //echo $sogg; ?>"></td>
                                <td><?php //echo $tipo_assunzione;?>
                                <input type="text" hidden id="tipo_assunzione_<?php //echo $id;?>" value="<?php //echo $ass; ?>"></td>
                                <td><?php// echo $data_assunzione;?>
                                <input type="text" hidden id="data_assunzione_<?php //echo $id;?>" value="<?php //echo $data_assunzione; ?>"></td>
                                <td><?php// echo $data_cessazione;?>
                                <input type="text" hidden id="data_cessazione_<?php //echo $id;?>" value="<?php //echo $data_cessazione; ?>"></td>
                                <td><?php //echo $data_termine;?>
                                <input type="text" hidden id="data_termine_<?php// echo $id;?>" value="<?php //echo $data_termine; ?>"></td>
                                <!--<td><?php //echo $data_trasformazione; ?>
                                    <input type="text" hidden id="data_trasformazione_<?php// echo $id;?>" value="<?php// echo $data_trasformazione; ?>">
                                </td>
                                <td><?php //echo $livello; ?>
                                    <input type="text" hidden id="livello_<?php //echo $id;?>" value="<?php //echo $liv; ?>">
                                </td>
                                <td><?php //echo $mansione; ?>
                                    <input type="text" hidden id="mansione_<?php //echo $id;?>" value="<?php //echo $man; ?>">
                                </td>
								<td><?php //echo $centro_di_costo; ?>
                                    <input type="text" hidden id="centro_di_costo_<?php //echo $id;?>" value="<?php //echo $centro_di_costo; ?>">
                                </td>
                                <td><?php //echo $ore; ?>
                                    <input type="text" hidden id="ore_<?php //echo $id;?>" value="<?php //echo $ore; ?>">
                                </td>-->
                                <td>
                                    <?php if($admin==1)
									{?>
                                    <div class="btn-group">
                                        <a href="#" role="button" class="btn btn-sm btn-default" onclick="open_dipendente(<?php echo $id;?>)"><i class="fa fa-pencil" title="Modifica"></i></a>
										<a href="#" role="button" class="btn btn-sm btn-default" onclick="rinnova_dipendente(<?php echo $id;?>)"><i class="fa fa-plus" title="Rinnovi"></i></a>
                                    	<a href="#" role="button" class="btn btn-sm btn-default" onclick="del_dipendente(<?php echo $id;?>)"><i class="fa fa-trash" title="Elimina"></i></a></div>
                                <?php }?>
                                </td>
							 	<td>
                                    <?php if($admin==1)
									{?>
                                    <div class="btn-group">
                                       <? $path = "pubblic/".$id."/proroga.pdf";
                           				if (is_file($path)) {?>
                              			
										<a href="<?=$path?>" target="_blank" class="btn btn-sm btn-default">Proroga</a>
                              			<a href="#" onclick="delpda('<?=$path?>')" class="btn btn-app"><span class="fa fa-trash"></span>Cancella</a><br><br>
                       					 <? 
										}else{?>
                              				<label>Proroga:</label> <div id="fileuploader">Upload</div>
                       					<? } ?>
									</div>
                                <?php }?>
                                </td>
								<td>
                                    <?php if($admin==1)
									{?>
                                    <div class="btn-group">
                                    	<a href="#" role="button" class="btn btn-sm btn-default" onclick="carica_rinnovi(<?php echo $id;?>)"><i class="fa fa-plus" title="Carica Rinnovi"></i></a>
                                    </div>
                                <?php }?>
                                </td>
								<td>
                                    <?php if($admin==1)
									{?>
                                    <div class="btn-group">
                                        <a href="#" role="button" class="btn btn-sm btn-default" onclick="carica_busta(<?php echo $id;?>)"><i class="fa fa-plus" title="Carica Busta Paga"></i></a></div>
                                <?php }?>
                                </td>
							
							</tr>
                                
                           <?php }?>

                        </tbody>
                         <tfoot><tr><th>Matricola</th><th>Nome</th><th>Cognome</th><th>Codice Fiscale</th><th>Telefono</th><th>Email</th><th>Sede Operativa</th><th>Iban</th><th>Cessato</th><th></th><th></th><th></th><th></th></tr></tfoot>
						<!--<tfoot><tr><th>Nome</th><th>Cognome</th><th>Indirizzo</th><th>Citta</th><th>Telefono</th><th>Email</th><th>Iban</th><th>Inquadramento</th><th>Data assunzione</th><th>Data Cessazione</th><th>Data termine contratto</th><th>Livello</th><th>Mansione</th><th>Centro di Costo</th><th>Ore</th><th>Modifica</th></tr></tfoot>-->
                    
                    </table>
              
          </div>
       
          </div>
      </div>
 

    </section>
    <!-- /.content -->
  </div>
  <?php
  include 'footer.php';
  ?>
    <script>
 $(document).ready(function() {
	


    // Setup - add a text input to each footer cell
    $('#example tfoot th').each( function () {

        var title = $(this).text();
        $(this).html( '<input type="text" size="7" placeholder="'+title+'" />' );
	
    } );
 
    // DataTable
    var table = $('#example').DataTable({ dom: 'Bfrtip',"order": [[ 0, "desc" ]], "scrollX": true,
        buttons: [
            'excel', 'pdf', 'print'
        ]});
 
    // Apply the search
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
	 
$("#fileuploader").uploadfile({
	url:"upload.php?tipo=pda&&id=<?= $id ?>",
	multiple:false,
        dragDrop:false,
        maxFileCount:1,
        fileName:"myfile",
        afterUploadAll:function(obj)
            {
              
location.reload();
            }
        
	});	 

	 
} );
function delpda(path){

 var txt;
    var r = confirm("Sicuro di voler cancellare la pda?");
    if (r == true) {
$.post("function/ajax.php", { operazione : "delpda", path:path} , function(data) {
			alert(data.esito);
                          location.reload();
		}, "json"); 
                
        }
}			
	 
function carica_proroga() {
	

	
	//var file_data = $("#fileuploader").prop("files")[0];  
	$.ajax({
    url:"upload.php?tipo=pda&id=<?= $id ?>",
	multiple:false,
        dragDrop:false,
        maxFileCount:1,
        fileName:"myfile",
        afterUploadAll:function(obj)
            {
             location.reload();

            }
        
	});		 
}
		
 /*	*/
		
</script>


  
<?php }else {
    header('Location: login.php');
}
?>