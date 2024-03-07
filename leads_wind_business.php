<?php
include 'header.php';
include 'menu.php';
include 'include/db.php';
include 'session.php';
include 'keepalive.php';
require_once ('include/htmlpurifier/library/HTMLPurifier.auto.php');

$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);
//$azienda=$_REQUEST['azienda'];
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
.table-responsive 
	{
        width: auto; 
    }
.modal-content
	{
		margin-top: 20%
	}	
div.dataTables_wrapper div.dataTables_filter{
	    display: none !important;
}

.dt-button{
    background-color: #00c0ef;
	color: white;
    border-radius: 5px;
    padding: 5px 12px 5px 12px;
	border: none;
	float: right;
    margin-left: 10px;
	box-shadow: 0 3px 15px -2px rgba(37, 45, 51, 0.4);
}

.btn-nuova-leads{
	float: left; 
	margin-right: 10px;
	padding: 5px 12px 5px 12px;
	box-shadow: 0 3px 15px -2px rgba(37, 45, 51, 0.4);
	background-color: green;
	color: white;
	border-radius: 5px;
}

input{
	width: 100%;
}

.dataTables_scroll{
    flex-direction: column-reverse;
    display: flex;
}
</style>


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
          <div class="col-sm-12">
              <div class="box">
                            <div id="my-modal" class="modal fade" tabindex="-1">
									<div class="modal-dialog modal-lg">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
												 <h3 class="smaller lighter blue no-margin">Inserimento Nuova Leads</h3>
											</div>
												
											<div class="modal-body">
                                                                                            	
													<div class="col-sm-6"><label>BRAND*</label>
                                                  <select id="nuovo_brand" class="form-control">
                                                    <option value="WIND BUSINESS">WIND BUSINESS</option>
                                                   </select>
                                               </div>
												<div class="col-sm-6">
                                                   <label>Nome e Cognome</label>
                                                     <input type="text" id="nuovo_nome" class="form-control">
												</div>
												<div class="col-sm-6">
													<label>Telefono*</label>
                                                     <input type="text" id="nuovo_telefono" class="form-control">
												</div>
												<div class="col-sm-6">
													<label>Email</label>
                                                     <input type="text" id="nuovo_email" class="form-control">
												</div>
												<div class="col-sm-12">
													<br>
												</div>
											</div>
											<div class="modal-footer">  
                                               <a href="#" class="btn btn-sm btn-primary pull-left" onclick="nuovo_leads_wind_business()">Inserisci</a>
											</div>
										</div>
										<!-- /.modal-content -->
									</div><!-- /.modal-dialog -->
								</div>
                  	<table id="example" class="table table-bordered table-hover">
                        <!-- Content Header (Page header) -->
                        <section class="content-header">
                            <? $query_ragione_sociale="SELECT * from ragione_sociale where rag_id=2 ";
                            $qrs=mysqli_query($db_connect,$query_ragione_sociale) or die(mysqli_error($db_connect));
                            $mrs=mysqli_fetch_array($qrs); 
                            $azienda1=$mrs['rag_desc'];?>
                        <h1 style="float: left; margin-right: 10px;">Leads <? print $azienda1?></h1>
                        <a href="#my-modal" role="button" class="btn-nuova-leads" data-toggle="modal"><i class="fa fa-plus" style="float: left; margin-right: 10px;"></i> Nuova Leads</a>
                        </section>
                      <thead><tr><th>Data Ins</th><th>Nome</th><th>Email</th><th>Telefono</th><th>Orario</th><th>Provenienza</th><th>Operatore</th><th>Esito OP</th><th>Esito BO</th><th>Modifica</th></tr></thead>
                        <tbody>
                            <?php 
                           
							$queryLeads="SELECT * FROM leads WHERE brand LIKE 'WIND BUSINESS' order by data_inserimento DESC"; 
                            $leads=mysqli_query($db_connect,$queryLeads) or die(mysqli_error($db_connect)); 
							$arrayReturn = array();
							$arrayReturn['query'] = $queryLeads ;
                            while ($row=mysqli_fetch_array($leads)) {
                                $id=$row['id'];
                                $id = $purifier->purify($id);
          
                                $data_inserimento=$row['data_inserimento'];
                                $data_inserimento = $purifier->purify($data_inserimento);
								$nome=$row['nome'];
                                $nome = $purifier->purify($nome);
                                $nome2 = ucwords(strtolower($nome));
								$email=$row['email'];
                                $email = $purifier->purify($email);
								$telefono=$row['telefono'];
                                $telefono = $purifier->purify($telefono);
								$cap=$row['cap'];
                                $cap = $purifier->purify($cap);
								$regione=$row['regione'];
                                $regione = $purifier->purify($regione);
								$eta=$row['eta'];
                                $eta = $purifier->purify($eta);
								$orario_contatto=$row['orario_contatto'];
                                $orario_contatto = $purifier->purify($orario_contatto);
								$provenienza=$row['provenienza'];
                                $provenienza = $purifier->purify($provenienza);
                                $operatore=$row['operatore'];
                                $operatore = $purifier->purify($operatore);
								$esito_op=$row['esito_op'];
                                $esito_op = $purifier->purify($esito_op);
								$esito_bo=$row['esito_bo'];
                                $esito_bo = $purifier->purify($esito_bo);
								
                                ?>
                            <tr id="id_<?php echo $id;?>">
                                                          
                            <td>
                                <?php 
                            // Assumendo che $data_inserimento sia nel formato standard di MySQL (YYYY-MM-DD)
                                $data_formattata = date('d-m-Y H:i', strtotime($data_inserimento));
                                echo $data_formattata; 
                                 ?>
                                <input type="text" hidden id="data_inserimento_<?php echo $id;?>" value="<?php echo $data_inserimento; ?>">
                                </td>
								<td><?php echo $nome2; ?>
                                    <input type="text" hidden id="nome_<?php echo $id;?>" value="<?php echo $nome; ?>">
                                </td>
                                <td><?php echo $email; ?>
                                    <input type="text" hidden id="email_<?php echo $id;?>" value="<?php echo $email; ?>">
                                </td>
								<td><?php echo $telefono; ?>
                                    <input type="text" hidden id="telefono_<?php echo $id;?>" value="<?php echo $telefono; ?>">
								</td>
								<td><?php echo $orario_contatto; ?>
                                    <input type="text" hidden id="orario_contratto_<?php echo $id;?>" value="<?php echo $orario_contatto; ?>">
                                </td>
								<td><?php echo $provenienza; ?>
                                    <input type="text" hidden id="provenienza_<?php echo $id;?>" value="<?php echo $provenienza; ?>">
                                </td>
                                <td>
									<?php 
										  
										  if($row['operatore']==0)
											 echo " ";
										  if($row['operatore']==12)
											  echo "ANDREA MONTALTO";
										  if($row['operatore']==29)
											echo "ANTONIO RICCARDI";
										  if($row['operatore']==30)
											 echo "ELENA IGNOTO";
										  if($row['operatore']==31)
											  echo "ANITA GRECO'";
										  if($row['operatore']==32)
											echo "ALESSANDRO PULVIRENTI";
										  if($row['operatore']==33)
											 echo "GIUSI BONACCORSI";
										  if($row['operatore']==34)
											  echo "DORIANA DI MAURO";
										  if($row['operatore']==35)
											echo "LOREDANA PUGLISI";
                                          if($row['operatore']==36)
											echo "STEFANIA NICOTRA";
                                          if($row['operatore']==37)
											echo "LORENA MILO";  
                                          if($row['operatore']==38)
											echo "ORIANA MURABITO";
                                          if($row['operatore']==39)
											echo "MARTINA MURABITO";     
									  ?>
								</td>
								<td>
									<?php 
										  
                                       if($row['esito_op']==0)
                                          echo "INSERITO";
                                       if($row['esito_op']==1)
                                          echo "<p style='background-color:#66FF00;padding: 5px;'>OK CONTRATTO</p>";
                                       if($row['esito_op']==2)
                                         echo "NON RISPONDE";
                                       if($row['esito_op']==3)
                                       echo "<p style='background-color:#DC143C; padding: 5px; color: white;'>NON INTERESSATO</p>";
                                       if($row['esito_op']==4)
                                       echo "<p style='background-color:red;padding: 5px; color: white;'>KO NON CONTATTARE PIU'</p>";
                                       if($row['esito_op']==5)
                                       echo "<p style='background-color:#ffffAA;padding: 5px;'>RICHIAMO PERSONALE</p>";
                                       if($row['esito_op']==6)
                                          echo "RICHIAMO PUBBLICO";
                                       if($row['esito_op']==7)
                                           echo "SEGRETERIA";
                                       if($row['esito_op']==8)
                                         echo "NUMERO INESISTENTE";
                                       if($row['esito_op']==9)
                                         echo "GIA' CLIENTE TIM";
                                       if($row['esito_op']==10)
                                         echo "GIA' CLIENTE WIND";
                                         if($row['esito_op']==11)
                                         echo "<p style='background-color:#fbbc04;padding: 5px;'>FATTA TRATTATIVA</p>";    
									  ?>
								</td>
								<td>
									<?php 
										  
										if($row['esito_bo']==0)
											 echo "DA ESITARE";
										  if($row['esito_bo']==1)
											  echo "ANNULLATO MANCATA FIRMA";
										  if($row['esito_bo']==2)
											echo "OK INSERITO";
										  if($row['esito_bo']==3)
											 echo "KO INSERITO";
										  if($row['esito_bo']==4)
											  echo "EMESSO";
										  if($row['esito_bo']==5)
											echo "WAIT OLO";
										  if($row['esito_bo']==6)
											 echo "SOSPESO";
										  if($row['esito_bo']==7)
											  echo "ATTIVO";
										  if($row['esito_bo']==8)
											echo "KO";
										  if($row['esito_bo']==9)
											 echo "IN GESTIONE";
										  if($row['esito_bo']==10)
											  echo "SCARTATO";
										   if($row['esito_bo']==11)
											  echo "FIRMATO";
									  ?>
								</td>
                                <td>
                                    <div class="btn-group">
                                        <a href="#" role="button" class="btn btn-sm btn-warning" onclick="open_leads_wind_business(<?php echo $id;?>)"><i class="fa fa-pencil" title="Modifica"></i></a>
										<!--<a href="#" role="button" class="btn btn-sm btn-success" onclick="rinnova_dipendente(<?php echo $id;?>)"><i class="fa fa-plus" title="Rinnovi"></i></a>-->
                                    	<? if($tipologia==1){ ?>
												<a href="#" role="button" class="btn btn-sm btn-danger" onclick="del_leads(<?php echo $id;?>)"><i class="fa fa-trash" title="Elimina"></i></a>
										<? } ?>
									</div>  
                                </td>
							</tr>
							
							<? } ?>
                        </tbody>
                         <tfoot><tr><th>Data Ins</th><th>Nome</th><th>Email</th><th>Telefono</th><th>Orario</th><th>Provenienza</th><th>Operatore</th><th>Esito OP</th><th>Esito BO</th><th></th></tr></tfoot>

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