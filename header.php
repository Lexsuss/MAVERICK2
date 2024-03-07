<?php
include 'include/db.php';
include 'session.php';
include 'keepalive.php';
?>
<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>MAVERICK | Dashboard</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	
  <!-- Font Awesome -->
  <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/AdminLTE.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="dist/css/skins/_all-skins.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  <!-- jvectormap -->
  <link rel="stylesheet" href="bower_components/jvectormap/jquery-jvectormap.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="bower_components/bootstrap-daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
<script src="./bower_components/scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
     <link rel="stylesheet" href="./bower_components/scheduler/dhtmlxscheduler.css" type="text/css">
<script src="./bower_components/scheduler/locale/locale_it.js" type="text/javascript" charset="utf-8"></script>
<script src="./bower_components/scheduler/ext/dhtmlxscheduler_minical.js" type="text/javascript" charset="utf-8"></script>
<script src="./bower_components/scheduler/ext/dhtmlxscheduler_active_links.js" type="text/javascript" charset="utf-8"></script>
<script src="./bower_components/scheduler/ext/dhtmlxscheduler_readonly.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="./bower_components/scheduler/dhtmlxCombo/skins/dhtmlxcombo_dhx_terrace.css">
	<script src="//export.dhtmlx.com/scheduler/api.js" type="text/javascript" charset="utf-8"></script>
<script src='./bower_components/scheduler/ext/dhtmlxscheduler_tooltip.js' type="text/javascript" charset="utf-8"></script>
<script src="./bower_components/scheduler/ext/dhtmlxscheduler_editors.js" type="text/javascript" charset="utf-8"></script>
  <link rel="stylesheet" href="bower_components/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">


  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->	
  <!-- Google Font -->
  <!--<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">-->
<style>

body {
    font-family: 'Montserrat', sans-serif;
    color: black;
}	
.nav-item {
    margin-left: 1000px; /* Modifica il valore a tuo piacimento per regolare il margine sinistro */
	
}

.btn-logout {
    background-color: #ff5c6c;
    border-color: none;
    color:#ffffff;
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 10px;
    padding: 5px 10px 5px 10px;
    box-shadow: 0 3px 15px -2px rgba(37, 45, 51, 0.4);
}

.btn-logout:hover {
    background-color: #d73925 !important;
}

#example {
    width: 100%;
	font-size: 15px;
}
	
</style>	
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a href="index.php" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b></b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><img src="pubblic/logo_maverick.png" width="140px" height="45px"></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <!--<a href="#" class="sidebar-toggle btn btn-lg" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>-->
      <!-- Content Header (Page header) -->

      <div style="float: right;">
            <?php if($user!=""){?>
            <button type="submit" class="btn-logout" onclick="logout()">Logout</button>
            <?php }?>
      </div>
    </nav>
  </header>