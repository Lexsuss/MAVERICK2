<?php
include 'include/db.php';
include 'session.php';

if($user!=""){
?>
<aside class="main-sidebar">
    
    <section class="sidebar">
 	 <? 
		
		if($tipologia==1)
		  {?>
      	<ul class="sidebar-menu" data-widget="tree">
          
          <li><a href="./leads_wind_consumer.php"><img src="pubblic/logow3.jpg" width="100px" height="58px"></a></li>
		  <li><a href="./leads_wind_business.php"><img src="pubblic/logow3business.png" width="100px" height="58px"></a></li>
		  <li><a href="./leads_tim_consumer.php"><img src="pubblic/logotimconsumer.jpg" width="100px" height="58px"></a></li>
		  <li><a href="./leads_tim_business.php"><img src="pubblic/logotimbusiness.png" width="100px" height="58px"></a></li>
		  <li><a href="./utenti.php" style="font-size: 14px;"><i class="fa fa-users"></i>Utenti</a></li>	
          <!--<li><a href="./leads_scadenze.php" style="font-size: 11px;"><i class="fa fa-calendar"></i>Scadenze Contratti</a></li>
		  <li><a href="./scadenze.php" style="font-size: 11px;"><i class="fa fa-calendar"></i>Calendario Scadenze Contratti</a></li>-->
        </ul>
		<? 
		}
		if($tipologia==2)
		{
		?>
	    <ul class="sidebar-menu" data-widget="tree">  
		  <li><a href="./leads_wind_consumer.php"><img src="pubblic/logow3.jpg" width="100px" height="58px"></a></li>
        </ul>
		<?
		}
		if($tipologia==3)
		{
		?>
	    <ul class="sidebar-menu" data-widget="tree">  
		  <li><a href="./leads_wind_consumer.php"><img src="pubblic/logow3.jpg" width="100px" height="58px"></a></li>
		  <li><a href="./leads_tim_consumer.php"><img src="pubblic/logotimconsumer.jpg" width="100px" height="58px"></a></li>
        </ul>
		<?
		}
		if($tipologia==4)
		{?>
        <ul class="sidebar-menu" data-widget="tree">
         
		    <li><a href="./leads_tim_business.php"><img src="pubblic/logotimbusiness.png" width="100px" height="58px"></a></li>
       
        </ul>
		<? 
		}
		if($tipologia==5)
		{?>
        <ul class="sidebar-menu" data-widget="tree">
         
		    <li><a href="./leads_tim_consumer.php"><img src="pubblic/logotimconsumer.jpg" width="100px" height="58px"></a></li>
       
        </ul>
		<? } 
		if($tipologia==6)
		{?>
        <ul class="sidebar-menu" data-widget="tree">
         
		<li><a href="./leads_tim_business.php"><img src="pubblic/logotimbusiness.png" width="100px" height="58px"></a></li>
		<li><a href="./leads_wind_business.php"><img src="pubblic/logow3business.png" width="100px" height="58px"></a></li>
       
        </ul>
		<? } ?>
    </section>
    <!-- /.sidebar -->
</aside>
 <?php
}