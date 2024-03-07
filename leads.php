<?php
include 'header.php';
include 'menu.php';
include 'include/db.php';
include 'session.php';
include 'keepalive.php';
require_once ('include/htmlpurifier/library/HTMLPurifier.auto.php');

$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);
$azienda=$_REQUEST['azienda'];
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
input[type="file"] {
                display: none;
            }
.custom-file-upload {
                border: 1px solid #ccc;
                display: inline-block;
                padding: 6px 12px;
                cursor: pointer;
            }
.table-responsive 
	{
        width: auto; 
    }
#example {
    width: auto;
	font-size: 12px;
}
.modal-content
	{
		margin-top: 20%
	}	

.busta-paga-wrapper {
        margin-bottom: 10px; /* Puoi regolare la quantità di spazio vuoto desiderato */
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
		
      <h1>Leads <? print $azienda1?>
       
      </h1>
     <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <!--<li><a class="active">Dipendenti</a></li>-->
       
      </ol>
    </section>

    <section class="content">
    
     
      <div class="row">
          <div class="col-sm-12">
              <a href="#my-modal" role="button" class="btn btn-lg btn-info" data-toggle="modal"><i class="fa fa-plus"></i> Nuovo Dipendente</a>
              <div class="box">
                  
                            <div id="my-modal" class="modal fade" tabindex="-1">
									<div class="modal-dialog modal-lg">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
												 <h3 class="smaller lighter blue no-margin">Inserimento nuovo dipendente</h3>
											</div>
												
											<div class="modal-body">
                                                                                            	
												<div class="col-sm-6"><label style="font-size: 12px">Ragione Sociale*</label>
                                                  <select style="font-size: 12px" id="nuovo_ragione_sociale" class="form-control">
                                                    <option value="">----</option>
                                                      <?php
                                                         $queryMan="SELECT * from ragione_sociale order by rag_id";
                                                         $man=mysqli_query($db_connect,$queryMan) or die(mysqli_error($db_connect));
                                                           while ($m=mysqli_fetch_array($man)) 
														   {
                                                           	echo "<option value='$m[rag_id]'>$m[rag_desc]</option>";
                                                                                                        
														   }
                                                          ?>
                                                   </select>
                                               </div>
												<div class="col-sm-6">
                                                   <label style="font-size: 12px">Nome*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_nome" class="form-control">
												</div>
                                                <div class="col-sm-6">
													<label style="font-size: 12px">Cognome*</label>
                                                   	 <input style="font-size: 12px" type="text" id="nuovo_cognome" class="form-control">
												</div>
											    <div class="col-sm-6">
													<label style="font-size: 12px">Codice Fiscale*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_cod_fiscale" class="form-control">
												</div>
                                                <div class="col-sm-6">
													<label style="font-size: 12px">Indirizzo*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_indirizzo" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">Citta*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_citta" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">Telefono*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_telefono" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">Email*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_email" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">Data Nascita*</label>
                                                     <input style="font-size: 12px" type="date" id="nuovo_data_nascita" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">Comune Nascita*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_comune_nascita" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">Sede Operativa*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_sede_operativa" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">Brand*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_brand" class="form-control">
												</div>
												<div class="col-sm-6">
													<label style="font-size: 12px">IBAN*</label>
                                                     <input style="font-size: 12px" type="text" id="nuovo_iban" class="form-control">
												</div>
											</div>
											<div class="modal-footer">  
                                               <a href="#" class="btn btn-lg btn-primary pull-left" onclick="nuovo_dipendente()">Inserisci</a>
											</div>
										</div>
										<!-- /.modal-content -->
									</div><!-- /.modal-dialog -->
								</div>
                  	<table id="example" class="table table-bordered table-hover">
                      <thead><tr><th>Nome</th><th>Cognome</th><th>Codice Fiscale</th><th>Telefono</th><th>Email</th><th>Sede Operativa</th><th>Cessato</th><th>Modifica</th><th>Carica Contratto</th><th>Carica Rinnovo</th><th>Carica Busta Paga</th></tr></thead>
                        <tbody>
                            <?php 
                           
							$queryUtenti="select * from dipendenti where ragione_sociale=$azienda"; 
                            $utenti=mysqli_query($db_connect,$queryUtenti) or die(mysqli_error($db_connect)); 
                            while ($row=mysqli_fetch_array($utenti)) {
                                $id=$row['id_dipendente'];
                                $id = $purifier->purify($id);
          
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
                                $iban=$row['iban'];
                                $iban = $purifier->purify($iban);
								
								
                                ?>
                            <tr id="id_<?php echo $id;?>">
                                                          
								<td><?php echo $nome; ?>
                                    <input style="font-size: 12px" type="text" hidden id="nome_<?php echo $id;?>" value="<?php echo $nome; ?>">
                                </td>
                                <td><?php echo $cognome; ?>
                                    <input style="font-size: 12px" type="text" hidden id="cognome_<?php echo $id;?>" value="<?php echo $cognome; ?>">
                                </td>
								<td><?php echo $cod_fiscale; ?>
                                    <input style="font-size: 12px" type="text" hidden id="cod_fiscale_<?php echo $id;?>" value="<?php echo $cod_fiscale; ?>">
								</td>
								<td><?php echo $telefono; ?>
                                    <input style="font-size: 12px" type="text" hidden id="telefono_<?php echo $id;?>" value="<?php echo $telefono; ?>">
                                </td>
								<td><?php echo $email; ?>
                                    <input style="font-size: 12px" type="text" hidden id="email_<?php echo $id;?>" value="<?php echo $email; ?>">
                                </td>
								<td><?php echo $sede_operativa; ?>
                                    <input style="font-size: 12px" type="text" hidden id="sede_operativa_<?php echo $id;?>" value="<?php echo $sede_operativa; ?>">
                                </td>
								<td><?php
								$dataCessazione=0;
								$dataCessazione1=0;
								$dataCessazione2=0;
								$dataCessazione3=0;
								$dataCessazione4=0;
								$dataCessazione5=0;
								$dataCessazione6=0;
								$dataCessazione7=0;
								$dataCessazione8=0;
								$dataCessazione9=0;
								$dataCessazione10=0;
								$dataCessazione11=0;
								
								$queryCessazione="select * from dipendenti_rinnovi where id_dipendente=$id"; 
                            	$utentiCessazione=mysqli_query($db_connect,$queryCessazione) or die(mysqli_error($db_connect));					
								$rowCessazione=mysqli_fetch_array($utentiCessazione);	
								$dataCess = $rowCessazione['data_cessazione'];
									if($dataCess!='0001-01-01')
										$dataCessazione = $rowCessazione['data_cessazione'];
									else
									$dataCessazione="";
						
								
								$queryCessazione1="select * from dipendenti_rinnovi1 where id_dipendente=$id"; 
                            	$utentiCessazione1=mysqli_query($db_connect,$queryCessazione1) or die(mysqli_error($db_connect));
								$rowCessazione1=mysqli_fetch_array($utentiCessazione1);	
									$dataCess1 = $rowCessazione1['data_cessazione'];
									if($dataCess1!='0001-01-01')
										$dataCessazione1 = $rowCessazione1['data_cessazione'];
									else
									$dataCessazione1="";
								
								$queryCessazione2="select * from dipendenti_rinnovi2 where id_dipendente=$id"; 
                            	$utentiCessazione2=mysqli_query($db_connect,$queryCessazione2) or die(mysqli_error($db_connect));
								$rowCessazione2=mysqli_fetch_array($utentiCessazione2);	
									$dataCess2 = $rowCessazione2['data_cessazione'];
									if($dataCess2!='0001-01-01')
										$dataCessazione2 = $rowCessazione2['data_cessazione'];
									else
									$dataCessazione2="";
								
								$queryCessazione3="select * from dipendenti_rinnovi3 where id_dipendente=$id"; 
                            	$utentiCessazione3=mysqli_query($db_connect,$queryCessazione3) or die(mysqli_error($db_connect));
								$rowCessazione3=mysqli_fetch_array($utentiCessazione3);	
								$dataCess3 = $rowCessazione3['data_cessazione'];	
									if($dataCess3!='0001-01-01')
										$dataCessazione3 = $rowCessazione3['data_cessazione'];
									else
									$dataCessazione3="";
								
								$queryCessazione4="select * from dipendenti_rinnovi4 where id_dipendente=$id"; 
                            	$utentiCessazione4=mysqli_query($db_connect,$queryCessazione4) or die(mysqli_error($db_connect));
								$rowCessazione4=mysqli_fetch_array($utentiCessazione4);	
								$dataCess4 = $rowCessazione4['data_cessazione'];
									if($dataCess4!='0001-01-01')
										$dataCessazione4 = $rowCessazione4['data_cessazione'];
									else
									$dataCessazione4="";
								
								$queryCessazione5="select * from dipendenti_rinnovi5 where id_dipendente=$id"; 
                            	$utentiCessazione5=mysqli_query($db_connect,$queryCessazione5) or die(mysqli_error($db_connect));
								$rowCessazione5=mysqli_fetch_array($utentiCessazione5);	
								$dataCess5 = $rowCessazione5['data_cessazione'];
									if($dataCess5!='0001-01-01')
										$dataCessazione5 = $rowCessazione5['data_cessazione'];
									else
									$dataCessazione5="";
								
								$queryCessazione6="select * from dipendenti_rinnovi6 where id_dipendente=$id"; 
                            	$utentiCessazione6=mysqli_query($db_connect,$queryCessazione6) or die(mysqli_error($db_connect));
								$rowCessazione6=mysqli_fetch_array($utentiCessazione6);	
								$dataCess6 = $rowCessazione6['data_cessazione'];
									if($dataCess6!='0001-01-01')
										$dataCessazione6 = $rowCessazione6['data_cessazione'];
									else
									$dataCessazione6="";
								
								$queryCessazione7="select * from dipendenti_rinnovi7 where id_dipendente=$id"; 
                            	$utentiCessazione7=mysqli_query($db_connect,$queryCessazione7) or die(mysqli_error($db_connect));
								$rowCessazione7=mysqli_fetch_array($utentiCessazione7);	
								$dataCess7 = $rowCessazione7['data_cessazione'];
									if($dataCess7!='0001-01-01')
										$dataCessazione7 = $rowCessazione7['data_cessazione'];
									else
									$dataCessazione7="";
								
								$queryCessazione8="select * from dipendenti_rinnovi8 where id_dipendente=$id"; 
                            	$utentiCessazione8=mysqli_query($db_connect,$queryCessazione8) or die(mysqli_error($db_connect));
								$rowCessazione8=mysqli_fetch_array($utentiCessazione8);	
								$dataCess8 = $rowCessazione8['data_cessazione'];
									if($dataCess8!='0001-01-01')
										$dataCessazione8 = $rowCessazione8['data_cessazione'];
									else
									$dataCessazione8="";
								
								$queryCessazione9="select * from dipendenti_rinnovi9 where id_dipendente=$id"; 
                            	$utentiCessazione9=mysqli_query($db_connect,$queryCessazione9) or die(mysqli_error($db_connect));
								$rowCessazione9=mysqli_fetch_array($utentiCessazione9);	
								$dataCess9 = $rowCessazione9['data_cessazione'];
									if($dataCess9!='0001-01-01')
										$dataCessazione9 = $rowCessazione9['data_cessazione'];
									else
									$dataCessazione9="";
								
								$queryCessazione10="select * from dipendenti_rinnovi10 where id_dipendente=$id"; 
                            	$utentiCessazione10=mysqli_query($db_connect,$queryCessazione10) or die(mysqli_error($db_connect));
								$rowCessazione10=mysqli_fetch_array($utentiCessazione10);	
								$dataCess10 = $rowCessazione10['data_cessazione'];
									if($dataCess10!='0001-01-01')
										$dataCessazione10 = $rowCessazione10['data_cessazione'];
									else
									$dataCessazione10="";
								
								$queryCessazione11="select * from dipendenti_rinnovi11 where id_dipendente=$id"; 
                            	$utentiCessazione11=mysqli_query($db_connect,$queryCessazione11) or die(mysqli_error($db_connect));
								$rowCessazione11=mysqli_fetch_array($utentiCessazione11);	
								$dataCess11 = $rowCessazione11['data_cessazione'];
									if($dataCess11!='0001-01-01')
										$dataCessazione11 = $rowCessazione11['data_cessazione'];
									else
									$dataCessazione11="";
								
							
										//echo '<span style="color:#F00">'."NO".'</span>' ;
										echo '<span style="color:#F00">'." ".$dataCessazione." ".$dataCessazione1." ".$dataCessazione2." ".$dataCessazione3." ".$dataCessazione4." ".$dataCessazione5." ".$dataCessazione6." ".$dataCessazione7." ".$dataCessazione8." ".$dataCessazione9." ".$dataCessazione10." ".$dataCessazione11.'</span>';
										//echo $queryCessazione."".$queryCessazione1."".$queryCessazione2."".$queryCessazione3."".$queryCessazione4."".$queryCessazione5."".$queryCessazione6."".$queryCessazione7."".$queryCessazione8."".$queryCessazione9."".$queryCessazione10."".$queryCessazione11;
										/*echo "<br>row:".$utentiCessazione."<br>row1:".$utentiCessazione1."<br>row2:".$utentiCessazione2."<br>row3:".$utentiCessazione3."<br>row4:".$utentiCessazione4."<br>row5:".$utentiCessazione5."<br>row6:".$utentiCessazione6."<br>row7:".$utentiCessazione7."<br>row8:".$utentiCessazione8."<br>row9:".$utentiCessazione9."<br>row10:".$utentiCessazione10."<br>row11:".$utentiCessazione11;*/
													
								
									?>
                                   
                                </td>
							
                                <td>
                                    <div class="btn-group">
                                        <a href="#" role="button" class="btn btn-sm btn-warning" onclick="open_dipendente(<?php echo $id;?>)"><i class="fa fa-pencil" title="Modifica"></i></a>
										<a href="#" role="button" class="btn btn-sm btn-success" onclick="rinnova_dipendente(<?php echo $id;?>)"><i class="fa fa-plus" title="Rinnovi"></i></a>
                                    	<a href="#" role="button" class="btn btn-sm btn-danger" onclick="del_dipendente(<?php echo $id;?>)"><i class="fa fa-trash" title="Elimina"></i></a></div>
                               
                                </td>
							 	<td> 
                                    <div class="btn-group">
                              				<label class="custom-file-upload">
    											<input id="contratto_<?php echo $id; ?>" type="file" name="contratto_<?php echo $id; ?>" onchange="handleFileUpload(this, 'contratto', '<? echo $id;?>')" />
    											 <span class="custom-file-upload-label">Carica</span>
											</label>
												<!--<button type="button" onClick="upload_contratto('<? echo $id;?>')">Upload</button>-->
									</div>
									<div class="btn-group">
                       					<?php
											$cartella = "pubblic/" . $id . "/"; // Imposta la cartella di base
    										$max_num_files = 20; // Numero massimo di file CONTRATTO
    										for ($i = 1; $i <= $max_num_files; $i++) {
        										$contratto_path = $cartella . "contratto" . $i . ".pdf";
        											if (is_file($contratto_path)) {
            							?>
            								<a href="<?= $contratto_path ?>" target="_blank" class="btn btn-sm btn-default">CONTRATTO<?= $i ?></a><br>
            								<a href="#" onclick="delpda('contratto<?= $i ?>', '<?= $contratto_path ?>')" class="btn btn-danger"><span class="fa fa-trash"></span></a><br><br>
            							<?php
        																	}
    																				}
    									?>
									</div>
                                </td>
								<td>
									<div class="btn-group">	
		                   				<label class="custom-file-upload">
    											<input id="rinnovo_<?php echo $id; ?>" type="file" name="rinnovo_<?php echo $id; ?>" onchange="handleFileUpload(this, 'rinnovo', '<? echo $id;?>')" />
    											 <span class="custom-file-upload-label">Carica</span>
											</label>
											<!--<button type="button" onClick="upload_rinnovo('<? echo $id;?>')">Upload</button>-->
									</div>
									<div class="btn-group">
                       					<?php
											$cartella = "pubblic/" . $id . "/"; // Imposta la cartella di base
    										$max_num_files = 20; // Numero massimo di file RINNOVO
    										for ($i = 1; $i <= $max_num_files; $i++) {
        										$rinnovo_path = $cartella . "rinnovo" . $i . ".pdf";
        											if (is_file($rinnovo_path)) {
            							?>
            								<a href="<?= $rinnovo_path ?>" target="_blank" class="btn btn-sm btn-default">RINNOVO<?= $i ?></a><br>
            								<a href="#" onclick="delpda('rinnovo<?= $i ?>', '<?= $rinnovo_path ?>')" class="btn btn-danger"><span class="fa fa-trash"></span></a><br><br>
            							<?php
        																	}
    																				}
    									?>
									</div>  
                                </td>
								<td>
                                    <div class="btn-group">	
                                    		<label class="custom-file-upload">
    											<input id="busta_paga_<?php echo $id; ?>" type="file" name="busta_paga_<?php echo $id; ?>" onchange="handleFileUpload(this, 'busta_paga', '<? echo $id;?>')" />
    											<span id="busta_paga-label-<?php echo $id; ?>">Carica</span>
											</label>
									<!--<button type="button" onClick="upload_rinnovo('<? echo $id;?>')">Upload</button>-->	
									</div>
									<div class="btn-group">	
                       					<?php
											$cartella = "pubblic/" . $id . "/"; // Imposta la cartella di base
    										$max_num_files = 20; // Numero massimo di file DID
    										for ($i = 1; $i <= $max_num_files; $i++) {
        										$busta_paga_path = $cartella . "busta_paga" . $i . ".pdf";
        											if (is_file($busta_paga_path)) {
            							?>
            								<p>
												<a href="<?= $busta_paga_path ?>" target="_blank" class="btn btn-sm btn-default">BUSTA PAGA<?= $i ?></a>
            									<a href="#" onclick="delpda('busta_paga<?= $i ?>', '<?= $busta_paga_path ?>')" class="btn btn-danger"><span class="fa fa-trash"></span></a>
												<a href="#" onclick="inviaEmail('<?= $email ?>', '<?= $busta_paga_path ?>')" class="btn btn-primary">Invia</a>
											</p>	
            							<?php
        																	}
    																				}
								
								
								
    									?>
									</div>
                                </td>
							
							</tr>
							
							<? } ?>
                        </tbody>
                         <tfoot><tr><th>Nome</th><th>Cognome</th><th>Codice Fiscale</th><th>Telefono</th><th>Email</th><th>Sede Operativa</th><th>Cessato</th><th></th><th></th><th></th><th></th></tr></tfoot>

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
	 
	$('body').on('click', 'button[id^="upload_did_"]', function() {
        // Estrai l'ID dell'utente dallo stesso ID del pulsante
        var userId = this.id.replace('upload_did_', '');
        // Chiama la funzione di upload DID
        upload_did(userId);
    });

    // Aggiungi un ascoltatore per l'evento click sul pulsante di upload per Documenti
    $('body').on('click', 'button[id^="upload_documenti_"]', function() {
        // Estrai l'ID dell'utente dallo stesso ID del pulsante
        var userId = this.id.replace('upload_documenti_', '');
        // Chiama la funzione di upload Documenti
        upload_documenti(userId);
    });

    // Aggiungi un ascoltatore per l'evento click sul pulsante di upload per Contratto
    $('body').on('click', 'button[id^="upload_contratto_"]', function() {
        // Estrai l'ID dell'utente dallo stesso ID del pulsante
        var userId = this.id.replace('upload_contratto_', '');
        // Chiama la funzione di upload Contratto
        upload_contratto(userId);
    });

    // Aggiungi un ascoltatore per l'evento click sul pulsante di upload per Rinnovo
    $('body').on('click', 'button[id^="upload_rinnovo_"]', function() {
        // Estrai l'ID dell'utente dallo stesso ID del pulsante
        var userId = this.id.replace('upload_rinnovo_', '');
        // Chiama la funzione di upload Rinnovo
        upload_rinnovo(userId);
    });

    // Aggiungi un ascoltatore per l'evento click sul pulsante di upload per Busta Paga
    $('body').on('click', 'button[id^="upload_busta_paga_"]', function() {
        // Estrai l'ID dell'utente dallo stesso ID del pulsante
        var userId = this.id.replace('upload_busta_paga_', '');
        // Chiama la funzione di upload Busta Paga
        upload_busta_paga(userId);
    });
} );
		
		
		
function delpda(tipo, path) {
    var txt;
    var r = confirm("Sicuro di voler cancellare?");
    if (r == true) {
        $.post("function/ajax.php", { operazione: "delpda", tipo: tipo, path: path }, function (data) {
            alert(data.esito);
            location.reload();
        }, "json");
    }
}			
	 
// Funzione di upload DID
function upload_did(id) {
    var file_input = $('#did_' + id)[0];
    handleFileUpload(file_input, 'did', id);
}

// Funzione di upload Documenti
function upload_documenti(id) {
    var file_input = $('#documenti_' + id)[0];
    handleFileUpload(file_input, 'documenti', id);
}

// Funzione di upload Contratto
function upload_contratto(id) {
    var file_input = $('#contratto_' + id)[0];
    handleFileUpload(file_input, 'contratto', id);
}

// Funzione di upload Rinnovo
function upload_rinnovo(id) {
    var file_input = $('#rinnovo_' + id)[0];
    handleFileUpload(file_input, 'rinnovo', id);
}

// Funzione di upload Busta Paga
function upload_busta_paga(id) {
    var file_input = $('#busta_paga_' + id)[0];
    handleFileUpload(file_input, 'busta_paga', id);
}

// Funzione di upload generica
function handleFileUpload(file_input, tipo, id) {
    if (file_input.files.length > 0) {
        var file_data = file_input.files[0];
        var form_data = new FormData();

        // Aggiungi questa parte per generare un nuovo nome con la data
        var currentDate = new Date();
        var formattedDate = currentDate.toISOString().replace(/[:.]/g, "-");
        var suffix = 1;
        var fileExtension = file_data.name.split('.').pop(); // Ottieni l'estensione del file
        var newFileName = tipo + suffix + '.' + fileExtension;

        // Continua ad aggiungere un suffisso numerico finché il file esiste
        while (suffix <= 10) {  // Limita il tentativo di ricerca a 10 iterazioni per evitare loop infiniti
            form_data.append('myfile', file_data);
            form_data.append('newFileName', newFileName);

            // Chiamata AJAX sincrona per verificare se il file esiste
            var exists = false;
            $.ajax({
                url: 'check_file_exists.php?tipo=' + tipo + '&&id=' + id + '&&fileName=' + newFileName,
                dataType: 'json',
                async: false,
                type: 'get',
                success: function (response) {
                    exists = response.exists;
                },
                error: function (error) {
                    var errorMessage = "Errore durante la verifica del file " + tipo + ": " + error.responseText;
                    console.error(errorMessage);
                    alert(errorMessage);
                }
            });

            if (!exists) {
                // Il file non esiste, interrompi il ciclo
                break;
            }

            // Incrementa il suffisso e riprova
            suffix++;
            newFileName = tipo + suffix + '.' + fileExtension;
        }

        // Aggiungi questa parte per mostrare il nuovo nome nel documento HTML
        var newFileNameContainer = document.getElementById('newFileNameContainer');
        if (newFileNameContainer) {
            newFileNameContainer.innerHTML = "Nuovo nome del file: " + newFileName;
        }

        $.ajax({
            url: 'upload.php?tipo=' + tipo + '&&id=' + id,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (response) {
                alert(tipo.charAt(0).toUpperCase() + tipo.slice(1) + " Caricato");
                window.location.reload();
            },
            error: function (error) {
                var errorMessage = "Errore durante il caricamento del file " + tipo + ": " + error.responseText;
                console.error(errorMessage);
                alert(errorMessage);
            }
        });

        alert("Il File verra' caricato con il nuovo nome: " + newFileName);
        var labelElement = $(file_input).closest(".custom-file-upload").find(".custom-file-upload-label");
        if (labelElement.length > 0) {
            labelElement.text("File caricato");
        }
        file_input.setAttribute("disabled", "disabled");
    } else {
        var warningMessage = "Nessun file " + tipo + " selezionato.";
        console.warn(warningMessage);
        alert(warningMessage);
    }
}
function inviaEmail(destinatario, bustaPagaPath) {
    $.ajax({
        type: 'POST',
        url: 'inviaEmail.php',
        data: { destinatario: destinatario, bustaPagaPath: bustaPagaPath },
        success: function(response) {
            alert(response); // Visualizza un alert con il messaggio dal server
        },
        error: function(error) {
            alert('Errore nell\'invio dell\'email: ' + error.responseText);
        }
    });
}

 /*	*/
		
</script>


  
<?php }else {
    header('Location: login.php');
}
?>