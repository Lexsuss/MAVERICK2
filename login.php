<?php
include 'header.php';
include 'menu.php';
 include 'include/db.php';
 
?>
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
       
      </h1>
      <ol class="breadcrumb">
        <li></li>
        
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
     <div class="login-box">
  
  <!-- /.login-logo -->
  <div class="login-box-body">
   <?=$user?>
      <div class="form-group has-feedback">
          <input type="text" class="form-control" id="user" placeholder="Utente">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
          <input type="password" class="form-control" id="password" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        
        <!-- /.col -->
        <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat" onclick="login()">Accedi</button>
        </div>
        <!-- /.col -->
      </div>
   
  </div>
  <!-- /.login-box-body -->
</div>
 

    </section>
    <!-- /.content -->
  </div>
  <?php
  include 'footer.php';
  ?>
