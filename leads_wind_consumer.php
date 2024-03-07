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
input[type="file"] {
                display: none;
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
    border-radius: 5px;
    box-shadow: 0 3px 15px -2px rgba(37, 45, 51, 0.4);
    border: none;
    padding: 5px;
}

#myModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    max-width: 300px; /* Imposta la larghezza massima del popup */
    max-height: 220px; /* Imposta l'altezza massima del popup */
    overflow-y: hidden; /* Aggiungi una barra di scorrimento verticale se necessario */
}

#myModal .modal-content {
    text-align: center;
}

#myModal .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

/* CSS per il popup modale */
.modal {
    display: none; /* Inizialmente nascosto */
    position: fixed; /* Posizionamento fisso */
    z-index: 9999; /* Livello di sovrapposizione elevato per assicurarsi che sia in primo piano */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; /* Consenti lo scorrimento se il contenuto è più grande della finestra modale */
    background-color: rgba(0, 0, 0, 0.5); /* Sfondo semitrasparente */
}

/* Contenuto del popup */
.modal-content {
    background-color: #fefefe; /* Sfondo bianco */
    margin: 15% auto; /* Centro verticalmente e orizzontalmente */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Larghezza del contenuto del popup */
    max-width: 600px; /* Larghezza massima del popup */
    border-radius: 5px; /* Bordo arrotondato */
}

/* Pulsante di chiusura */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

/* Pulsante "Chiudi" */
#closeModalBtn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

#closeModalBtn:hover {
    background-color: #0056b3;
}

.dataTables_scroll{
    flex-direction: column-reverse;
    display: flex;
}

.ciccio{
    
}

</style>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
      <section class="content">
        <section class="content-header">
            <? $query_ragione_sociale="SELECT * from ragione_sociale where rag_id=1 ";
        $qrs=mysqli_query($db_connect,$query_ragione_sociale) or die(mysqli_error($db_connect));
        $mrs=mysqli_fetch_array($qrs); 
        $azienda1=$mrs['rag_desc'];?>
        <h1 style="float: left; margin-right: 10px;">Leads <? print $azienda1?></h1>
        <a href="#my-modal" role="button" class="btn-nuova-leads" data-toggle="modal"><i class="fa fa-plus"></i> Nuova Leads</a>
        </section>
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
                                                    <option value="WIND CONSUMER">WIND CONSUMER</option>
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
                                               <a href="#" class="btn btn-sm btn-primary pull-left" onclick="nuovo_leads_wind_consumer()">Inserisci</a>
											</div>
										</div>
										<!-- /.modal-content -->
									</div><!-- /.modal-dialog -->
								</div>
                  	<table id="example" class="table table-bordered table-hover">
                          <!-- Content Header (Page header) -->
                    <thead><tr><th>Data Ins</th><th>Nome</th><th>Email</th><th>Telefono</th><th>Orario</th><th>Indirizzo IP</th><th>Lotto</th><th>Provenienza</th><th>Operatore</th><th>Esito OP</th><th>Note</th><th>Modifica</th></tr></thead>
                    <tbody>
                        <?php 
                           
                           $queryLeads="SELECT * FROM leads WHERE brand LIKE 'WIND CONSUMER' order by data_inserimento DESC"; 
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
                                $ip_address=$row['ip_address'];
                                $ip_address = $purifier->purify($ip_address);
                                $lotto=$row['lotto'];
                                $lotto = $purifier->purify($lotto);
								$orario_contatto=$row['orario_contatto'];
                                $orario_contatto = $purifier->purify($orario_contatto);
								$provenienza=$row['provenienza'];
                                $provenienza = $purifier->purify($provenienza);
								$esito_op=$row['esito_op'];
                                $esito_op = $purifier->purify($esito_op);
								$esito_bo=$row['esito_bo'];
                                $esito_bo = $purifier->purify($esito_bo);
                                $note=$row['note'];
                                $note = $purifier->purify($note);
								
                                ?>
                            <tr id="id_<?php echo $id;?>">
                                                          
                            <td><?php echo $data_inserimento; ?>
                                <input type="text" hidden id="data_inserimento_<?php echo $id;?>" value="<?php echo $data_formattata; ?>">
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
            <td><?php echo $ip_address; ?>
            <input type="text" hidden id="ip_address_<?php echo $id;?>" value="<?php echo $ip_address; ?>">
        </td>
        <td><?php echo $lotto; ?>
        <input type="text" hidden id="lotto_<?php echo $id;?>" value="<?php echo $lotto; ?>">
    </td>
    <td><?php echo $provenienza; ?>
    <input type="text" hidden id="provenienza_<?php echo $id;?>" value="<?php echo $provenienza; ?>">
</td>

<td>
    <?php 
										  
										if($row['esito_op']==0)
                                            echo "INSERITO";
                                        if($row['esito_op']==1)
                                            echo "<p style='background-color:#66FF00; padding: 5px;'>OK CONTRATTO</p>";
                                        if($row['esito_op']==2)
                                            echo "NON RISPONDE";
                                        if($row['esito_op']==3)
                                            echo "<p style='background-color:#DC143C; padding: 5px; color: white;'>NON INTERESSATO</p>";
                                        if($row['esito_op']==4)
                                            echo "<p style='background-color:red; padding: 5px; color: white;'>KO NON CONTATTARE PIU'</p>";
                                        if($row['esito_op']==12)
                                          	echo "<p style='background-color:red; padding: 5px; color: white;'>KO NON LAVORABILE</p>";
                                        if($row['esito_op']==5)
										  	echo "<p style='background-color:#ffffAA; padding: 5px;'>RICHIAMO PERSONALE</p>";  
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
                                            echo "<p style='background-color:#fbbc04; padding: 5px;'>FATTA TRATTATIVA</p>";    
                                ?>
								</td>
								<td>
									<?php 
                                        if($row['esito_bo']==0)
                                            echo "<p style='background-color:#04dafb;padding: 5px;'>DA ESITARE</p>";
                                        if($row['esito_bo']==2)
                                            echo "<p style='background-color:#66FF00;padding: 5px;'>OK INSERITO</p>";
                                        if($row['esito_bo']==7)
                                            echo "ATTIVO";
                                        if($row['esito_bo']==5)
                                            echo "WAIT OLO";
                                        if($row['esito_bo']==6)
                                            echo "SOSPESO";
                                        if($row['esito_bo']==9)
                                            echo "SOSPESO NON RISPONDE";
                                        if($row['esito_bo']==8)
                                            echo "<p style='background-color:#DC143C; padding: 5px; color: white;'>KO NON RISPONDE</p>";
                                        if($row['esito_bo']==3)
                                            echo "<p style='background-color:#DC143C; padding: 5px; color: white;'>KO INSERITO</p>";
                                        if($row['esito_bo']==10)
                                            echo "<p style='background-color:#DC143C; padding: 5px; color: white;'>KO CRIF</p>";
									  ?>
								</td>
                                <td>
                                    <textarea id="note_<?php echo $id;?>" class="form-control"><?=$note ?></textarea>
                                </td>
                                <td>
                                    <div class="btn-group">
                                        <a href="#" role="button" class="btn btn-sm btn-warning" onclick="open_leads_wind_consumer(<?php echo $id;?>)"><i class="fa fa-pencil" title="Modifica"></i></a>
										<!--<a href="#" role="button" class="btn btn-sm btn-success" onclick="rinnova_dipendente(<?php echo $id;?>)"><i class="fa fa-plus" title="Rinnovi"></i></a>-->
                                    	<? if($tipologia==1){ ?>
                                            <a href="#" role="button" class="btn btn-sm btn-danger" onclick="del_leads(<?php echo $id;?>)"><i class="fa fa-trash" title="Elimina"></i></a>
										<? } ?>
									</div>
                               
                                </td>
							 	
							
							</tr>
							
							<? } ?>
                        </tbody>
                        <tfoot><tr><th>Data Ins</th><th>Nome</th><th>Email</th><th>Telefono</th><th>Orario</th><th>Indirizzo IP</th><th>Lotto</th><th>Provenienza</th><th>Esito OP</th><th>Esito BO</th><th>Note</th><th></th></tr></tfoot>
                        
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
        buttons: [ ]});
 
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
<!-- JavaScript per controllare periodicamente le nuove lead -->

$(document).ready(function() {
    // Funzione per controllare le nuove lead
    function checkNewLeads() {
        $.ajax({
            url: 'check_new_leads_wind_consumer.php', // URL del file PHP per controllare le nuove lead
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Controlla se ci sono nuove lead
                if (response.new_leads > 0) {
                    // Mostra il popup di avviso
                    var popupContent = '<div id="myModal" class="modal">';
                    popupContent += '<div class="modal-content">';
                    popupContent += '<span class="close">&times;</span>';
                    popupContent += '<p>Hai nuove leads!</p>';
                    popupContent += '<button id="closeModalBtn">Chiudi</button>';
                    popupContent += '</div></div>';
                    $('body').append(popupContent);
                    $('#myModal').show();
                } else {
                    // Nascondi il popup di avviso se non ci sono nuove lead
                    $('#myModal').remove();
                }
            },
            error: function(xhr, status, error) {
                console.error('Errore durante la richiesta AJAX:', error);
            }
        });
    }

    // Controlla le nuove lead ogni 5 minuti (300.000 millisecondi)
    setInterval(checkNewLeads, 500000); // Cambia 10000 con il tempo desiderato in millisecondi

    // Gestore dell'evento per il pulsante "Chiudi" (delegato per gli elementi dinamici)
    $(document).on('click', '#myModal .close, #myModal #closeModalBtn', function() {
        $('#myModal').remove(); // Rimuovi il popup modale quando viene cliccato il pulsante "Chiudi"
    });
});

 /*	*/
		
</script>
  
<?php }else {
    header('Location: login.php');
}
?>