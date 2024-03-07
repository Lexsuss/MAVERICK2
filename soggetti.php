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
    $queryUtenti="Select * from tipo_soggetto";
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
      <h1>Gestione mansioni
       
      </h1>
     
    </section>

    <section class="content">
    
     
      <div class="row">
          <div class="col-sm-12">
              <a href="#my-modal" role="button" class="btn btn-sm btn-default" data-toggle="modal">Nuovo</a>
              <div class="box">
                  
                            <div id="my-modal" class="modal fade" tabindex="-1">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												 <h3 class="smaller lighter blue no-margin">Inserimento nuovo</h3>
											</div>

											<div class="modal-body">
                                                                                            <div class="col-sm-6">
                                                                                                <label>Descrizione*</label>
                                                                                                <input type="text" id="nuovo_desc" class="form-control"></div>
                                                                                                
											</div>
                                                                                     
											<div class="modal-footer">  
                                                                                            <a href="#" class="btn btn-sm btn-primary pull-left" onclick="crea_sog()">Inserisci</a>
												 
											</div>
										</div><!-- /.modal-content -->
									</div><!-- /.modal-dialog -->
								</div>
                  <table id="example" class="table table-bordered table-hover">
                      <thead><tr><th>Descrizione</th><th>#</th></tr></thead>
                        <tbody>
                            <?php 
                            while ($row=mysqli_fetch_array($utenti)) {
                                $id=$row['sog_id'];
                                $id = $purifier->purify($id);
                                $desc=$row['sog_desc'];
                                $desc = $purifier->purify($desc);
                                
                               ?>
                            <tr id="id_<?php echo $id;?>">
                                <td><?php echo $desc; ?>
                                    <input type="text" hidden id="desc_<?php echo $id;?>" value="<?php echo $desc; ?>">
                                  
                                </td>
                                
                               
                                <td>
                                    <?php if($admin==1){?>
                                    <div class="btn-group">
                                        <a href="#" role="button" class="btn btn-sm btn-default" onclick="open_modifica(<?php echo $id;?>)"><i class="fa fa-pencil" title="Modifica"></i></a>
                                    <a href="#" role="button" class="btn btn-sm btn-default" onclick="del_sog(<?php echo $id;?>)"><i class="fa fa-trash" title="Elimina"></i></a></div>
                                <?php }?>
                                </td></tr>
                                
                           <?php }?>

                        </tbody>
                    </table>
              <div id="my-modal2" class="modal fade" tabindex="-1">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												 <h3 class="smaller lighter blue no-margin">Modifica</h3>
											</div>
											<div class="modal-body">
                                                                                               <div class="col-sm-6">
                                                                                                <label>Descrizione*</label>
                                                                                                <input type="text" id="modifica_desc" class="form-control"></div>
                                                                                                
                                                                                     
											<div class="modal-footer">  
                                                                                            <input type="text" id="modifica_id" hidden>
                                                                                            <a href="#" class="btn btn-sm btn-primary pull-left" onclick="modifica_sog()">Modifica</a>
												 
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
    var desc=$("#desc_"+id).val();
    $("#modifica_desc").attr('value', desc);
   

    $("#modifica_id").attr('value', id);
    $('#my-modal2').modal();
}
 
</script>
<?php }else {
    header('Location: login.php');
   
}
  ?>