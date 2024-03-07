<?php
include 'header.php';
include 'menu.php';
include 'include/db.php';
include 'session.php';
include 'keepalive.php';
require_once 'include/htmlpurifier/library/HTMLPurifier.auto.php';

$arrayReturn =[];
$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);
$queryLeads ="SELECT * FROM leads where id=$profilo_leads";
$doquery = mysqli_query($db_connect,$queryLeads);
$do = mysqli_fetch_array($doquery);
$arrayReturn['esito'] = $doquery ? $doquery : $doquery;
$arrayReturn['query'] = $queryLeads;

// Aggiunta del blocco condizionale per bloccare l'esecuzione del codice alla riga 16 e stampare la variabile $queryLeads
/*if(true) {
    echo "Query: $queryLeads"; // Stampa della query
    exit(); // Blocca l'esecuzione del codice qui
}*/

if($user!="")
{
?><!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>Scheda Leads &nbsp;<?= $do[nome] ?></h1>
     <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="leads_wind_consumer.php">Leads</a></li>
        <li class="active">Scheda Leads</li>
      </ol>
    </section>

    <section class="content">
      <div class="row">
          <div class="col-sm-12">
              <div class="box">
                   <div class="box-body">
                  <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab">Scheda Lead</a></li>
              <!--<li><a href="#tab_2" data-toggle="tab">Tab 2</a></li>
              <li><a href="#tab_3" data-toggle="tab">Tab 3</a></li>
              -->
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
				<br>
			  <span class="col-sm-6"> <label>Brand Provenienza</label>
						<select id="nuovo_operatore_provenienza" class="form-control">
							<option value="0" <?php if($do['operatore_provenienza']=="0") echo "selected" ?>>Scegli Operatore...</option>
							<?php  
								$queryOperatore = "SELECT DISTINCT(id_op),operatore FROM operatore_provenienza ";
								$queryOperatore2=mysqli_query($db_connect, $queryOperatore)or die (mysql_error());
								while($rowOperatore = mysqli_fetch_array($queryOperatore2)) 
									  { ?>
              							<option value= <?= $rowOperatore['id_op'] ?> <?php if($do['operatore_provenienza']==$rowOperatore['id_op']) echo "selected" ?>><?= $rowOperatore['operatore'];?></option>
             					<?php }?>
						
						</select></span>
				  	<span class="col-sm-6"> <label>Attuale Tecnologia Cliente</label>
						<select id="nuovo_tecnologia" class="form-control">
										<option value="0" <?php if($do['tecnologia']=="0") echo "selected" ?>>Scegli Tecnologia...</option>
							<?php  
								$queryTecnologia = "SELECT DISTINCT(id_tec),tecnologia FROM tecnologia ";
								$queryTecnologia2=mysqli_query($db_connect, $queryTecnologia)or die (mysql_error());
								while($rowTecnologia = mysqli_fetch_array($queryTecnologia2)) 
									  { ?>
              							<option value= <?= $rowTecnologia['id_tec'] ?> <?php if($do['tecnologia']==$rowTecnologia['id_tec']) echo "selected" ?>><?= $rowTecnologia['tecnologia'];?></option>
             					<?php }?>
                         </select></span>
						 <span class="col-sm-6"> <label>Attuale Prezzo Offerta Cliente</label><input type="text" id="nuovo_prezzo" class="form-control" value="<?= $do['prezzo'] ?>"></span>	 
						 <span class="col-sm-6"> <label>Ip Address</label><input type="text" id="nuovo_indirizzo_ip" class="form-control" value="<?= $do[ip_address] ?>"></span>
				    	 <span class="col-sm-6"> <label>Lotto</label><input type="text" id="nuovo_lotto" class="form-control" value="<?= $do[lotto] ?>"></span>
                         <span class="col-sm-6"> <label>Url Sito</label><input type="text" id="nuovo_url_sito" class="form-control" value="https://www.offertefissowindtre.com"></span>
						 <span class="col-sm-6"> <label>Note</label><textarea id="nuovo_note" class="form-control"><?= $do[note] ?></textarea></span>					
						 <span class="col-sm-6"><br><br><br><br><br><br></span>
                         
                         <span class="col-sm-6"> <label>Operatore</label>
						<select id="nuovo_operatore" class="form-control">
                        	<option value="0" <?php if($do['operatore']=="0") echo "selected" ?>>DA INSERIRE</option>
							<option value="33" <?php if($do['operatore']=="33") echo "selected" ?>>GIUSI BONACCORSI</option>
							<option value="32" <?php if($do['operatore']=="32") echo "selected" ?>>ALESSANDRO PULVIRENTI</option>
                         </select></span>
					<span class="col-sm-6"> <label>Esito OP</label>
						<select id="nuovo_esito_op" class="form-control">
                        <option value="0" <?php if($do['esito_op']=="0") echo "selected" ?>>INSERITO</option>
							<option value="1" <?php if($do['esito_op']=="1") echo "selected" ?>>OK CONTRATTO</option>
							<option value="2" <?php if($do['esito_op']=="2") echo "selected" ?>>NON RISPONDE</option>
							<option value="3" <?php if($do['esito_op']=="3") echo "selected" ?>>NON INTERESSATO</option>
							<option value="4" <?php if($do['esito_op']=="4") echo "selected" ?>>KO NON CONTATTARE PIU'</option>
							<option value="11" <?php if($do['esito_op']=="11") echo "selected" ?>>FATTA TRATTATIVA</option>
							<option value="5" <?php if($do['esito_op']=="5") echo "selected" ?>>RICHIAMO PERSONALE</option>
							<option value="6" <?php if($do['esito_op']=="6") echo "selected" ?>>RICHIAMO PUBBLICO</option>
							<option value="7" <?php if($do['esito_op']=="7") echo "selected" ?>>SEGRETERIA</option>
							<option value="8" <?php if($do['esito_op']=="8") echo "selected" ?>>NUMERO INESISTENTE</option>
							<option value="9" <?php if($do['esito_op']=="9") echo "selected" ?>>GIA' CLIENTE TIM</option>
							<option value="10" <?php if($do['esito_op']=="10") echo "selected" ?>>GIA' CLIENTE WIND</option>
                         </select></span>
						 <span class="col-sm-6"> <label>Tecnologia Nuovo Contratto</label>
						<select id="nuovo_tecnologia2" class="form-control">
										<option value="0" <?php if($do['tecnologia']=="0") echo "selected" ?>>Scegli Tecnologia...</option>
							<?php  
								$queryTecnologia = "SELECT DISTINCT(id_tec),tecnologia FROM tecnologia ";
								$queryTecnologia2=mysqli_query($db_connect, $queryTecnologia)or die (mysql_error());
								while($rowTecnologia = mysqli_fetch_array($queryTecnologia2)) 
									  { ?>
              							<option value= <?= $rowTecnologia['id_tec'] ?> <?php if($do['tecnologia2']==$rowTecnologia['id_tec']) echo "selected" ?>><?= $rowTecnologia['tecnologia'];?></option>
             					<?php }?>
                         </select></span>
				  	<span class="col-sm-6"> <label>Offerta Nuovo Contratto</label>
						<select id="nuovo_offerta" class="form-control">
                          	<option value="0" <?php if($do['offerta']=="0") echo "selected" ?>>Scegli Offerta...</option>
							<?php  
								$queryOfferta = "SELECT DISTINCT(id_off), offerta FROM offerte_wind_consumer ";
								$queryOfferta2=mysqli_query($db_connect, $queryOfferta)or die (mysql_error());
								while($rowOfferta = mysqli_fetch_array($queryOfferta2)) 
									  { ?>
              							<option value= <?= $rowOfferta['id_off'] ?> <?php if($do['offerta']==$rowOfferta['id_off']) echo "selected" ?>><?= $rowOfferta['offerta'];?></option>
             					<?php }?>
                         </select></span>
				  	<span class="col-sm-6"> <label>Prezzo Nuovo Contratto</label>
						<select id="nuovo_prezzo2" class="form-control" disabled>
						<option value="0" <?php if($do['prezzo']==" ") echo "selected" ?>>---</option>
							<?php  
								$queryPrezzo = "SELECT DISTINCT(id_off), offerta, prezzo FROM offerte_wind_consumer ";
								$queryPrezzo2=mysqli_query($db_connect, $queryPrezzo)or die (mysql_error());
								while($rowPrezzo = mysqli_fetch_array($queryPrezzo2)) 
									  { ?>
              							<option value= <?= $rowPrezzo['prezzo'] ?> <?php if($do['offerta']==$rowPrezzo['id_off']) echo "selected" ?>><?= $rowPrezzo['prezzo'];?></option>
             					<?php }?>
                         </select></span> 
					<span class="col-sm-6"><br><br><br><br><br></span>		 
				  	<span class="col-sm-6"> <label>Esito BO</label>
						<select id="nuovo_esito_bo" class="form-control">
                          	<option value="0" <?php if($do['esito_bo']=="0") echo "selected" ?>>DA ESITARE</option>
                            <option value="2" <?php if($do['esito_bo']=="2") echo "selected" ?>>OK INSERITO</option>
							<option value="7" <?php if($do['esito_bo']=="7") echo "selected" ?>>ATTIVO</option>
							<option value="5" <?php if($do['esito_bo']=="5") echo "selected" ?>>WAIT OLO</option>
							<option value="6" <?php if($do['esito_bo']=="6") echo "selected" ?>>SOSPESO</option>
                            <option value="9" <?php if($do['esito_bo']=="9") echo "selected" ?>>SOSPESO NON RISPONDE</option>
							<option value="8" <?php if($do['esito_bo']=="8") echo "selected" ?>>KO NON RISPONDE</option>
							<option value="3" <?php if($do['esito_bo']=="3") echo "selected" ?>>KO INSERITO</option>
                            <option value="10" <?php if($do['esito_bo']=="10") echo "selected" ?>>KO CRIF</option>
                         </select></span>
					
						 
					<span class="col-sm-6"><br><br><br><br><br></span>						
				    
				  	<span class="col-sm-6"> <label>Data Inserimento</label><input type="text" id="nuovo_data_inserimento" class="form-control" value="<?= $do[data_inserimento] ?>"></span>
				    <span class="col-sm-6"> <label>Nome</label><input type="text" id="nuovo_nome" class="form-control" value="<?= $do[nome] ?>"></span>
				  	<span class="col-sm-6"> <label>Email</label><input type="text" id="email" class="form-control" value="<?= $do[email] ?>"></span>
				  	<span class="col-sm-6"> <label>Telefono</label><input type="text" id="nuovo_telefono" class="form-control" value="<?= $do[telefono] ?>"></span>
				    <span class="col-sm-6"> <label>Indirizzo</label><input type="text" id="nuovo_indirizzo" class="form-control" value="<?= $do[indirizzo] ?>"></span>
                    <span class="col-sm-6"> <label>Comune</label><input type="text" id="nuovo_comune" class="form-control" value="<?= $do[comune] ?>"></span>
                    <span class="col-sm-6"> <label>Cap</label><input type="text" id="nuovo_cap" class="form-control" value="<?= $do[cap] ?>"></span>
                    <span class="col-sm-6"> <label>Regione</label><input type="text" id="nuovo_regione" class="form-control" value="<?= $do[regione] ?>"></span>
				  	<span class="col-sm-6"> <label>Eta'</label><input type="text" id="nuovo_eta" class="form-control" value="<?= $do[eta] ?>"></span>
				  	<span class="col-sm-6"> <label>Orario Contatto</label><input type="text" id="nuovo_orario_contatto" class="form-control" value="<?= $do[orario_contatto] ?>"></span>
				  	<span class="col-sm-6"> <label>Consenso Privacy</label>
						<select id="nuovo_consenso_privacy" class="form-control">
                          	<option value="0" <?php if($do['consenso_privacy']=="0") echo "selected" ?>>NO</option>
							<option value="1" <?php if($do['consenso_privacy']=="1") echo "selected" ?>>SI</option>
                         </select>
				  	</span>
                    
		
                    
					<span class="col-sm-6"> <label>Provenienza</label><input type="text" id="nuovo_provenienza" class="form-control" value="<?= $do[provenienza] ?>"><br></span>

						 <input hidden value="<?= $profilo_leads;?>" id="modifica_id"></span>
                    <div class="box-footer clearfix">
                        <button onclick="modifica_leads_wind_consumer()" class="btn btn-sm btn-primary btn-flat pull-left">Modifica</button>
                    </div>
					<span class="col-sm-6"><br><br><br><br><br></span>
				  	
                    
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_2">
              
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_3">
                
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
                  
                  </div>
                  
              </div>
          </div>
      </div>

    </section>
    <!-- /.content -->
  </div>
<?php
  include 'footer.php';
?>
<? }else {
    header('Location: login.php');
}
?>