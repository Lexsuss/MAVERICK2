<?php
include 'include/db.php';
include 'session.php';
include 'keepalive.php';


if($user!=""){
    include 'header.php';
include 'menu.php';
?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
	  
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
       
      </h1>
      
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
     
     <div class="row">
                  <?php 
                         
                         if($tipologia==1)
                            include "./statistiche/statistiche_admin.php";
                    ?>
        </div>
 

    </section>
    <!-- /.content -->
  </div>
  <?php
  include 'footer.php';
}else {
    header('Location: login.php');
   
}
  ?>