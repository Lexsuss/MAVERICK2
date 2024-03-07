<?php
include 'header.php';
include 'menu.php';
include 'include/db.php';
include 'session.php';
include 'keepalive.php';
require_once ('include/htmlpurifier/library/HTMLPurifier.auto.php');
$config = HTMLPurifier_Config::createDefault();
$purifier = new HTMLPurifier($config);

if($user!=""){
    $queryUtenti="Select id_utente, user, nome, cognome, mail, tipologia from utenti where user not like 'admin'";
    $utenti=mysqli_query($db_connect,$queryUtenti) or die(mysqli_error($db_connect)); 
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
      <h1>Gestione utenti
       
      </h1>
     
    </section>

    <section class="content">
    
     
      <div class="row">
          <div class="col-sm-12">
              <a href="#my-modal" role="button" class="btn btn-sm btn-default" data-toggle="modal">Nuovo Utente</a>
              <div class="box">
                  
                            <div id="my-modal" class="modal fade" tabindex="-1">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												 <h3 class="smaller lighter blue no-margin">Inserimento nuovo utente</h3>
											</div>

											<div class="modal-body">
                                                                                            <div class="col-sm-6">
                                                                                                <label>Nome</label>
                                                                                                <input type="text" id="nuovo_nome" class="form-control"></div>
                                                                                                <div class="col-sm-6"><label>Cognome</label>
                                                                                                <input type="text" id="nuovo_cognome" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>User</label>
                                                                                                <input type="text" id="nuovo_utente" class="form-control">
                                                                                            <span class="nascosta" id="nomeNonValido">Nome scelto non valido</span> 
                                                                                            <span class="nascosta" id="nomeVuoto">Il nome utente non pu&ograve; essere vuoto</span>
                                                                                            <span class="nascosta" id="nomeEsiste">Il nome utente scelto esiste gi&agrave;</span></div>
                                                                                            <div class="col-sm-6"><label>Password</label>
                                                                                                <input type="password" id="nuovo_password" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>Mail</label>
                                                                                                <input type="text" id="nuovo_mail" class="form-control">
                                                                                            <span class="nascosta" id="emailNonValida">L'indirizzo email non &egrave; valido</span>
                                                                                            <span class="nascosta" id="emailEsiste">L'indirizzo email &egrave; gi&agrave; registrato.</span></div>
                                                                                            <div class="col-sm-12"><label>Tipologia</label>
                                                                                            <select id="nuovo_tipologia" class="form-control">
                                                                                                <option value="1">AMMINISTRATORE</option>
                                                                                                <option value="2">WIND CONSUMER</option>
																								<option value="3">WIND CONSUMER - TIM CONSUMER</option>
																								<option value="4">TIM BUSINESS</option>
                                                                                                <option value="5">TIM CONSUMER</option>
                                                                                            </select></div>
											</div>
                                                                                     
											<div class="modal-footer">  
                                                                                            <a href="#" class="btn btn-sm btn-primary pull-left" onclick="crea_nuovo_exe()">Inserisci</a>
												 
											</div>
										</div><!-- /.modal-content -->
									</div><!-- /.modal-dialog -->
								</div>
                  <table id="example" class="table table-bordered table-hover">
                      <thead><tr><th>Nome e cognome</th><th>User<th>E-mail</th><th>Tipologia</th><th>#</th></tr></thead>
                        <tbody>
                            <?php 
                            while ($row=mysqli_fetch_array($utenti)) {
                                $id=$row['id_utente'];
                                $id = $purifier->purify($id);
                                $nome=$row['nome'];
                                $nome = $purifier->purify($nome);
                                $cognome=$row['cognome'];
                                $cognome = $purifier->purify($cognome);
                                $utente=$row['user'];
                                $utente = $purifier->purify($utente);
                                $mail=$row['mail'];
                                $mail = $purifier->purify($mail);
                                $tipologia=$row['tipologia'];
                                $tipologia = $purifier->purify($tipologia);
                                
                                ?>
                            <tr id="id_<?php echo $id;?>">
                                <td><?php echo $nome." ".$cognome; ?>
                                    <input type="text" hidden id="nome_<?php echo $id;?>" value="<?php echo $nome; ?>">
                                    <input type="text" hidden id="cognome_<?php echo $id;?>" value="<?php echo $cognome; ?>">
                                </td>
                                <td><?php echo $utente;?>
                                <input type="text" hidden id="utente_<?php echo $id;?>" value="<?php echo $utente; ?>"></td>
                                <td><?php echo $mail;?>
                                <input type="text" hidden id="mail_<?php echo $id;?>" value="<?php echo $mail; ?>"></td>
                                <td>
                                	<select id="tipologia_<?php echo $id;?>" class="form-control">
                          				<option value="1" <?php if($tipologia=="1") echo "selected" ?>>AMMINISTRATORE</option>
										<option value="2" <?php if($tipologia=="2") echo "selected" ?>>WIND CONSUMER</option>
										<option value="3" <?php if($tipologia=="3") echo "selected" ?>>WIND CONSUMER - TIM CONSUMER</option>
										<option value="4" <?php if($tipologia=="4") echo "selected" ?>>TIM BUSINESS</option>
                                        <option value="5" <?php if($tipologia=="5") echo "selected" ?>>TIM CONSUMER</option>
							   	    </select>
								</td>
                                <td>
                                 
                                    <div class="btn-group">
                                        <a href="#" role="button" class="btn btn-sm btn-default" onclick="open_modifica(<?php echo $id;?>)"><i class="fa fa-pencil" title="Modifica"></i></a>
                                    <a href="#" role="button" class="btn btn-sm btn-default" onclick="del_utente(<?php echo $id;?>)"><i class="fa fa-trash" title="Elimina"></i></a></div>
                                
                                </td></tr>
                                
                           <?php }?>

                        </tbody>
                    </table>
              <div id="my-modal2" class="modal fade" tabindex="-1">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												 <h3 class="smaller lighter blue no-margin">Modifica utente</h3>
											</div>

											<div class="modal-body">
                                                                                           <div class="col-sm-6">
                                                                                                <label>Nome</label>
                                                                                                <input type="text" id="modifica_nome" class="form-control"></div>
                                                                                                <div class="col-sm-6"><label>Cognome</label>
                                                                                                <input type="text" id="modifica_cognome" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>User</label>
                                                                                                <input type="text" id="modifica_utente" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>Password</label>
                                                                                                <input type="password" id="modifica_password" class="form-control"></div>
                                                                                            <div class="col-sm-6"><label>Mail</label>
                                                                                                <input type="text" id="modifica_mail" class="form-control"></div>
                                                                                            <div class="col-sm-12"><label>Tipologia</label>
                                                                                            <select id="modifica_tipologia" class="form-control">
                                                                                                <option value="1" <?php if($tipologia=="1") echo "selected" ?>>AMMINISTRATORE</option>
										                                                        <option value="2" <?php if($tipologia=="2") echo "selected" ?>>WIND CONSUMER</option>
										                                                        <option value="3" <?php if($tipologia=="3") echo "selected" ?>>WIND CONSUMER - TIM CONSUMER</option>
										                                                        <option value="4" <?php if($tipologia=="4") echo "selected" ?>>TIM BUSINESS</option>
                                                                                                <option value="5" <?php if($tipologia=="5") echo "selected" ?>>TIM CONSUMER</option>
                                                                                            </select></div>
											</div>
                                                                                     
											<div class="modal-footer">  
                                                                                            <input type="text" id="modifica_id" hidden>
                                                                                            <a href="#" class="btn btn-sm btn-primary pull-left" onclick="modifica_utente()">Modifica</a>
												 
											</div>
										</div><!-- /.modal-content -->
									</div><!-- /.modal-dialog -->
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
  <script>
    $(document).ready(function() {
    var table = $('#example').DataTable( {
        "order": [[ 0, "desc" ]],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
        },
        "paging":   false
        
    } );
    
} );
function open_modifica(id){
    var nome=$("#nome_"+id).val();
    var cognome=$("#cognome_"+id).val();
    var mail=$("#mail_"+id).val();
    var tipologia=$("#tipologia_"+id).val();
    var utente=$("#utente_"+id).val();
    
    $("#modifica_nome").attr('value', nome);
    $("#modifica_cognome").attr('value', cognome);
    $("#modifica_mail").attr('value', mail);
    $("#modifica_tipologia option[value="+tipologia+"]").attr('selected','selected');
    $("#modifica_utente").attr('value', utente);
    $("#modifica_id").attr('value', id);
    $('#my-modal2').modal();
}
var arrayMail = [];
var arrayNomi = [];


<?php 
$nomi = mysqli_query($db_connect, "SELECT user,mail FROM utenti ORDER BY mail ASC");
while($row=mysqli_fetch_array($nomi)) {
	?>
	arrayMail.push('<?=strtolower($row[mail])?>');
	arrayNomi.push('<?=strtolower($row[user])?>');
	<?php
}
?>
 
function controllaNome(nome) {
	var iChars = "!@#$%^&*()+=[]\\\';,./{}|\":<>? èéàòç@#ùì";

	for (var i = 0; i < nome.length; i++) {
		if (iChars.indexOf(nome.charAt(i)) != -1) {
			return false;
		} 
		
	}
	return true;
}

function controllomail(mail){
	var espressione = /^[_a-z0-9+-]+(\.[_a-z0-9+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/;
	if (!espressione.test(mail))
	{
	   return false;
	}
	return true;
}
function crea_nuovo_exe(){
	$("#nomeNonValido").hide();
	$("#nomeEsiste").hide();
	$("#emailNonValida").hide();
	$("#nomeVuoto").hide();
	$("#emailEsiste").hide();
	$("#sommaValori").hide();
	var utente=$("#nuovo_utente").val().trim();
	var inArray = arrayNomi.indexOf(utente.toLowerCase());
    var mail = $("#nuovo_mail").val().trim();
	mail = mail.toLowerCase();
	var mailInArray = arrayMail.indexOf(mail);
	var indicatoreValid = 0;	

	var nome=$("#nuovo_nome").val();
	var cognome=$("#nuovo_cognome").val();
    var tipologia=$("#nuovo_tipologia").val();
    var password=$("#password").val();
        
	// blocco UNO ESCLUDE L'ALTRO
	if(utente=="") {
		$("#nomeVuoto").show("slow");
	}
	// -1 torna se il nome non è compreso nell'array di nomi, la verifica sarà fatta anche lato php per riverificare tutto
	else if(inArray!=-1) {
		$("#nomeEsiste").show("slow");
	}
	else if(controllaNome(utente)==false){
		$("#nomeNonValido").show("slow");
	}
	else {
		indicatoreValid++;
	}
	
	 if(controllomail(mail)==false){
		$("#emailNonValida").show("slow");
	}
	else  {
		indicatoreValid++;
		
	}
	if(indicatoreValid==2) {

   		$.post("exe/utenti_exe.php" , { operazione : "crea_nuovo",  utente:utente,  mail:mail, nome:nome, cognome:cognome, tipologia:tipologia, password:password} , function(dati) {
				 
				location.href="utenti.php";
	 		
		} , "json");
	}
}
   
    
</script>
<?php }else {
    header('Location: login.php');
   
}
  ?>