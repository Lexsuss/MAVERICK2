
<?php

include('../include/db.php');

include('../session.php'); 

require_once ('../include/htmlpurifier/library/HTMLPurifier.auto.php');



$config = HTMLPurifier_Config::createDefault();

$purifier = new HTMLPurifier($config);



$operazione = $purifier->purify($_POST['operazione']);



$arrayReturn =[];

switch($operazione) {

	case "nuova_leads_wind_consumer":

		$brand				= $purifier->purify($_POST['brand']);
		
		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$email				= $purifier->purify($_POST['email']);
		
		//$centro_di_costo	= $purifier->purify($_POST['centro_di_costo']);
		if($nome=="") $nome=" ";
		if($email=="") $email=" ";
		
		// Impostazione della timezone
		date_default_timezone_set('Europe/Rome');

		// Ottenere la data e l'orario corrente
		$data_ora_corrente = date('Y-m-d H:i:s');	
		
		$crea_nuova_leads_wind_consumer2 = "INSERT INTO leads (brand, nome, telefono, email, data_inserimento, url_sito, provenienza) VALUES ('$brand','$nome','$telefono','$email','$data_ora_corrente','https://www.offertefissowindtre.com/?new','ASSET')";
		$crea_nuova_leads_wind_consumer = mysqli_query($db_connect,$crea_nuova_leads_wind_consumer2);
		
		/*$crea_nuovo2 = mysqli_query($db_connect, "INSERT INTO dipendenti_rinnovo "
					. "(tipo_soggetto, data_cessazione, data_assunzione, data_termine, livello, mansione, ore,centro_di_costo) "
			. "VALUES ('$tipo_soggetto','$data_cessazione','$data_assunzione','$data_termine', '$livello','$mansione','$ore','$centro_di_costo')");		*/			   
		$arrayReturn['esito'] = $crea_nuova_leads_wind_consumer ? $crea_nuova_leads_wind_consumer : $crea_nuova_leads_wind_consumer;
		$arrayReturn['query'] = $crea_nuova_leads_wind_consumer2;
		
		break;

	case "nuova_leads_wind_business":

		$brand				= $purifier->purify($_POST['brand']);
		
		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$email				= $purifier->purify($_POST['email']);
		
		//$centro_di_costo	= $purifier->purify($_POST['centro_di_costo']);
		if($nome=="") $nome=" ";
		if($email=="") $email=" ";
		
		// Impostazione della timezone
		date_default_timezone_set('Europe/Rome');

		// Ottenere la data e l'orario corrente
		$data_ora_corrente = date('Y-m-d H:i:s');	
		
		$crea_nuova_leads_wind_business2 = "INSERT INTO leads (brand, nome, telefono, email, data_inserimento, url_sito, provenienza) VALUES ('$brand','$nome','$telefono','$email','$data_ora_corrente','https://www.prezzofibra.it/windbusiness/?new','ASSET')";
		$crea_nuova_leads_wind_business = mysqli_query($db_connect,$crea_nuova_leads_wind_business2);
		
		/*$crea_nuovo2 = mysqli_query($db_connect, "INSERT INTO dipendenti_rinnovo "
					. "(tipo_soggetto, data_cessazione, data_assunzione, data_termine, livello, mansione, ore,centro_di_costo) "
			. "VALUES ('$tipo_soggetto','$data_cessazione','$data_assunzione','$data_termine', '$livello','$mansione','$ore','$centro_di_costo')");		*/			   
		$arrayReturn['esito'] = $crea_nuova_leads_wind_business ? $crea_nuova_leads_wind_business : $crea_nuova_leads_wind_business;
		$arrayReturn['query'] = $crea_nuova_leads_wind_business2;
		
		break;

		
	case "nuova_leads_tim_consumer":

		$brand				= $purifier->purify($_POST['brand']);
		
		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$email				= $purifier->purify($_POST['email']);
		
		//$centro_di_costo	= $purifier->purify($_POST['centro_di_costo']);
		if($nome=="") $nome=" ";
		if($email=="") $email=" ";
		
		// Impostazione della timezone
		date_default_timezone_set('Europe/Rome');

		// Ottenere la data e l'orario corrente
		$data_ora_corrente = date('Y-m-d H:i:s');	
		
		$crea_nuova_leads_tim_consumer2 = "INSERT INTO leads (brand, nome, telefono, email, data_inserimento, url_sito, provenienza) VALUES ('$brand','$nome','$telefono','$email','$data_ora_corrente','https://www.prezzofibra.it/offertetimfibra/?new','ASSET')";
		$crea_nuova_leads_tim_consumer = mysqli_query($db_connect,$crea_nuova_leads_tim_consumer2);
		
		/*$crea_nuovo2 = mysqli_query($db_connect, "INSERT INTO dipendenti_rinnovo "
					. "(tipo_soggetto, data_cessazione, data_assunzione, data_termine, livello, mansione, ore,centro_di_costo) "
			. "VALUES ('$tipo_soggetto','$data_cessazione','$data_assunzione','$data_termine', '$livello','$mansione','$ore','$centro_di_costo')");		*/			   
		$arrayReturn['esito'] = $crea_nuova_leads_tim_consumer ? $crea_nuova_leads_tim_consumer : $crea_nuova_leads_tim_consumer;
		$arrayReturn['query'] = $crea_nuova_leads_tim_consumer2;
		
		break;
		
	case "nuova_leads_tim_business":

		$brand				= $purifier->purify($_POST['brand']);
		
		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$email				= $purifier->purify($_POST['email']);
		
		//$centro_di_costo	= $purifier->purify($_POST['centro_di_costo']);
		if($nome=="") $nome=" ";
		if($email=="") $email=" ";
		
		// Impostazione della timezone
		date_default_timezone_set('Europe/Rome');

		// Ottenere la data e l'orario corrente
		$data_ora_corrente = date('Y-m-d H:i:s');	
		
		$crea_nuova_leads_tim_business2 = "INSERT INTO leads (brand, nome, telefono, email, data_inserimento, url_sito, provenienza) VALUES ('$brand','$nome','$telefono','$email','$data_ora_corrente','https://www.prezzofibra.it/timbusiness/?new', 'ASSET')";
		$crea_nuova_leads_tim_business = mysqli_query($db_connect,$crea_nuova_leads_tim_business2);
		
		/*$crea_nuovo2 = mysqli_query($db_connect, "INSERT INTO dipendenti_rinnovo "
					. "(tipo_soggetto, data_cessazione, data_assunzione, data_termine, livello, mansione, ore,centro_di_costo) "
			. "VALUES ('$tipo_soggetto','$data_cessazione','$data_assunzione','$data_termine', '$livello','$mansione','$ore','$centro_di_costo')");		*/			   
		$arrayReturn['esito'] = $crea_nuova_leads_tim_business ? $crea_nuova_leads_tim_business : $crea_nuova_leads_tim_business;
		$arrayReturn['query'] = $crea_nuova_leads_tim_business2;
		
		break;	
		

	case "open_leads_wind_consumer":

		$profilo_leads = $_SESSION['profilo_leads'] = $_POST['id'];

		break;
		
	case "open_leads_wind_business":

		$profilo_leads = $_SESSION['profilo_leads'] = $_POST['id'];

		break;	
		
	case "open_leads_tim_consumer":

		$profilo_leads = $_SESSION['profilo_leads'] = $_POST['id'];

		break;		
		
	case "open_leads_tim_business":

		$profilo_leads = $_SESSION['profilo_leads'] = $_POST['id'];

		break;	
	

	case "modifica_leads_wind_consumer":

		$id					= $purifier->purify($_POST['id']);
		
		$data_inserimento	= $purifier->purify($_POST['data_inserimento']);

		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$email				= $purifier->purify($_POST['email']);
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$indirizzo			= $purifier->purify(addslashes($_POST['indirizzo']));
		
		$comune				= $purifier->purify(addslashes($_POST['comune']));
		
		$cap				= $purifier->purify(addslashes($_POST['cap']));

		$regione			= $purifier->purify(addslashes($_POST['regione']));

		$eta				= $purifier->purify($_POST['eta']);
		
		$orario_contatto	= $purifier->purify($_POST['orario_contatto']);
		
		$consenso_privacy	= $purifier->purify($_POST['consenso_privacy']);
		
		$indirizzo_ip		= $purifier->purify($_POST['indirizzo_ip']);
		
		$lotto				= $purifier->purify($_POST['lotto']);
		
		$url_sito       	= $purifier->purify($_POST['url_sito']);
		
		$brand				= $purifier->purify($_POST['brand']);
		
		$provenienza		= $purifier->purify($_POST['provenienza']);
		
		$operatore_provenienza	= $purifier->purify($_POST['operatore_provenienza']);
		
		$tecnologia			= $purifier->purify($_POST['tecnologia']);

		$tecnologia2		= $purifier->purify($_POST['tecnologia2']);

		$offerta			= $purifier->purify($_POST['offerta']);
		
		$prezzo				= $purifier->purify($_POST['prezzo']);

		$prezzo2			= $purifier->purify($_POST['prezzo2']);
		
		$note				= $purifier->purify($_POST['note']);

		$operatore			= $purifier->purify($_POST['operatore']);
		
		$esito_operatore	= $purifier->purify($_POST['esito_operatore']);
		
		$esito_bo			= $purifier->purify($_POST['esito_bo']);
		
		if($cap=="") $cap=00000;
		if($eta=="") $eta=0;
		if($operatore_provenienza=="") $operatore_provenienza=0;
		if($lotto=="") $lotto=0;
		if($prezzo=="") $prezzo=0;


		$modifica2= "UPDATE leads SET "

				. "data_inserimento='$data_inserimento',"

				. "nome='$nome',"
			
				. "email='$email',"
			
				. "telefono='$telefono',"
				
				. "indirizzo='$indirizzo',"

				. "comune='$comune',"
								
				. "cap=$cap,"
								
				. "regione='$regione',"
								
				. "eta=$eta,"	
								
				. "orario_contatto='$orario_contatto',"	
								
				. "consenso_privacy='$consenso_privacy',"	
								
				. "ip_address='$indirizzo_ip',"
			
				. "lotto=$lotto,"	
			
				. "provenienza='$provenienza',"
			
				. "operatore_provenienza=$operatore_provenienza,"
			
				. "tecnologia=$tecnologia,"

				. "tecnologia2=$tecnologia2,"
			
				. "offerta=$offerta,"
			
				. "prezzo=$prezzo,"

				. "prezzo2=$prezzo2,"

				. "operatore=$operatore,"
			
				. "esito_op=$esito_operatore,"
			
				. "esito_bo=$esito_bo,"

				. "note='$note' "				

				. "WHERE id='$id'";

		$modifica = mysqli_query($db_connect,$modifica2);	

		$arrayReturn['esito'] = $modifica ? "Modifica effettuata".$modifica : $modifica;
		
		$arrayReturn['query'] = $modifica2;

		break;
		
		
	case "modifica_leads_wind_business":

		$id					= $purifier->purify($_POST['id']);
		
		$data_inserimento	= $purifier->purify($_POST['data_inserimento']);

		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$email				= $purifier->purify($_POST['email']);
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$indirizzo			= $purifier->purify(addslashes($_POST['indirizzo']));
		
		$comune				= $purifier->purify(addslashes($_POST['comune']));
		
		$cap				= $purifier->purify(addslashes($_POST['cap']));

		$regione			= $purifier->purify(addslashes($_POST['regione']));

		$eta				= $purifier->purify($_POST['eta']);
		
		$orario_contatto	= $purifier->purify($_POST['orario_contatto']);
		
		$consenso_privacy	= $purifier->purify($_POST['consenso_privacy']);
		
		$indirizzo_ip		= $purifier->purify($_POST['indirizzo_ip']);
		
		$url_sito       	= $purifier->purify($_POST['url_sito']);
		
		$brand				= $purifier->purify($_POST['brand']);
		
		$provenienza		= $purifier->purify($_POST['provenienza']);
		
		$operatore_provenienza	= $purifier->purify($_POST['operatore_provenienza']);
		
		$tecnologia			= $purifier->purify($_POST['tecnologia']);

		$tecnologia2		= $purifier->purify($_POST['tecnologia2']);

		$offerta			= $purifier->purify($_POST['offerta']);
		
		$prezzo				= $purifier->purify($_POST['prezzo']);

		$prezzo2			= $purifier->purify($_POST['prezzo2']);
		
		$note				= $purifier->purify($_POST['note']);

		$operatore			= $purifier->purify($_POST['operatore']);
		
		$esito_operatore	= $purifier->purify($_POST['esito_operatore']);
		
		$esito_bo			= $purifier->purify($_POST['esito_bo']);
		
		if($cap=="") $cap=00000;
		if($eta=="") $eta=0;
		if($operatore_provenienza=="") $operatore_provenienza=0;
		if($prezzo=="") $prezzo=0;


		$modifica2= "UPDATE leads SET "

				. "data_inserimento='$data_inserimento',"

				. "nome='$nome',"
			
				. "email='$email',"
			
				. "telefono='$telefono',"
				
				. "indirizzo='$indirizzo',"

				. "comune='$comune',"
								
				. "cap=$cap,"
								
				. "regione='$regione',"
								
				. "eta=$eta,"	
								
				. "orario_contatto='$orario_contatto',"	
								
				. "consenso_privacy='$consenso_privacy',"	
								
				. "ip_address='$indirizzo_ip',"	
			
				. "provenienza='$provenienza',"

                . "url_sito='$url_sito',"
			
				. "operatore_provenienza=$operatore_provenienza,"
			
				. "tecnologia=$tecnologia,"

				. "tecnologia2=$tecnologia2,"
			
				. "offerta=$offerta,"
			
				. "prezzo=$prezzo,"

				. "prezzo2=$prezzo2,"

				. "operatore=$operatore,"
			
				. "esito_op=$esito_operatore,"
			
				. "esito_bo=$esito_bo,"

				. "note='$note' "				

				. "WHERE id='$id'";


		$modifica = mysqli_query($db_connect,$modifica2);	

		$arrayReturn['esito'] = $modifica ? "Modifica effettuata".$modifica : $modifica;
		
		$arrayReturn['query'] = $modifica2;
	

		break;
		
	case "modifica_leads_tim_consumer":

		$id					= $purifier->purify($_POST['id']);
		
		$data_inserimento	= $purifier->purify($_POST['data_inserimento']);

		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$email				= $purifier->purify($_POST['email']);
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$indirizzo			= $purifier->purify(addslashes($_POST['indirizzo']));
		
		$comune				= $purifier->purify(addslashes($_POST['comune']));
		
		$cap				= $purifier->purify(addslashes($_POST['cap']));

		$regione			= $purifier->purify(addslashes($_POST['regione']));

		$eta				= $purifier->purify($_POST['eta']);
		
		$orario_contatto	= $purifier->purify($_POST['orario_contatto']);
		
		$consenso_privacy	= $purifier->purify($_POST['consenso_privacy']);
		
		$indirizzo_ip		= $purifier->purify($_POST['indirizzo_ip']);
		
		$url_sito       	= $purifier->purify($_POST['url_sito']);
		
		$brand				= $purifier->purify($_POST['brand']);
		
		$provenienza		= $purifier->purify($_POST['provenienza']);
		
		$operatore_provenienza	= $purifier->purify($_POST['operatore_provenienza']);
		
		$tecnologia			= $purifier->purify($_POST['tecnologia']);

		$tecnologia2		= $purifier->purify($_POST['tecnologia2']);

		$offerta			= $purifier->purify($_POST['offerta']);
		
		$prezzo				= $purifier->purify($_POST['prezzo']);

		$prezzo2			= $purifier->purify($_POST['prezzo2']);
		
		$note				= $purifier->purify($_POST['note']);

		$operatore			= $purifier->purify($_POST['operatore']);
		
		$esito_operatore	= $purifier->purify($_POST['esito_operatore']);
		
		$esito_bo			= $purifier->purify($_POST['esito_bo']);
		
		if($cap=="") $cap=00000;
		if($eta=="") $eta=0;
		if($operatore_provenienza=="") $operatore_provenienza=0;
		if($prezzo=="") $prezzo=0;


		$modifica2= "UPDATE leads SET "

				. "data_inserimento='$data_inserimento',"

				. "nome='$nome',"
			
				. "email='$email',"
			
				. "telefono='$telefono',"
				
				. "indirizzo='$indirizzo',"

				. "comune='$comune',"
								
				. "cap=$cap,"
								
				. "regione='$regione',"
								
				. "eta=$eta,"	
								
				. "orario_contatto='$orario_contatto',"	
								
				. "consenso_privacy='$consenso_privacy',"	
								
				. "ip_address='$indirizzo_ip',"	
			
				. "provenienza='$provenienza',"

                . "url_sito='$url_sito',"
			
				. "operatore_provenienza=$operatore_provenienza,"
			
				. "tecnologia=$tecnologia,"

				. "tecnologia2=$tecnologia2,"
			
				. "offerta=$offerta,"
			
				. "prezzo=$prezzo,"

				. "prezzo2=$prezzo2,"

				. "operatore=$operatore,"
			
				. "esito_op=$esito_operatore,"
			
				. "esito_bo=$esito_bo,"

				. "note='$note' "				

				. "WHERE id='$id'";


		$modifica = mysqli_query($db_connect,$modifica2);	

		$arrayReturn['esito'] = $modifica ? "Modifica effettuata".$modifica : $modifica;
		
		$arrayReturn['query'] = $modifica2;
	

		break;
	

	case "modifica_leads_tim_business":

		$id					= $purifier->purify($_POST['id']);
		
		$data_inserimento	= $purifier->purify($_POST['data_inserimento']);

		$nome				= $purifier->purify(addslashes($_POST['nome']));
		
		$email				= $purifier->purify($_POST['email']);
		
		$telefono			= $purifier->purify($_POST['telefono']);
		
		$indirizzo			= $purifier->purify(addslashes($_POST['indirizzo']));
		
		$comune				= $purifier->purify(addslashes($_POST['comune']));
		
		$cap				= $purifier->purify(addslashes($_POST['cap']));

		$regione			= $purifier->purify(addslashes($_POST['regione']));

		$eta				= $purifier->purify($_POST['eta']);
		
		$orario_contatto	= $purifier->purify($_POST['orario_contatto']);
		
		$consenso_privacy	= $purifier->purify($_POST['consenso_privacy']);
		
		$indirizzo_ip		= $purifier->purify($_POST['indirizzo_ip']);
		
		$url_sito       	= $purifier->purify($_POST['url_sito']);
		
		$brand				= $purifier->purify($_POST['brand']);
		
		$provenienza		= $purifier->purify($_POST['provenienza']);
		
		$operatore_provenienza	= $purifier->purify($_POST['operatore_provenienza']);
		
		$tecnologia			= $purifier->purify($_POST['tecnologia']);

		$tecnologia2		= $purifier->purify($_POST['tecnologia2']);

		$offerta			= $purifier->purify($_POST['offerta']);
		
		$prezzo				= $purifier->purify($_POST['prezzo']);

		$prezzo2			= $purifier->purify($_POST['prezzo2']);
		
		$note				= $purifier->purify($_POST['note']);

		$operatore			= $purifier->purify($_POST['operatore']);
		
		$esito_operatore	= $purifier->purify($_POST['esito_operatore']);
		
		$esito_bo			= $purifier->purify($_POST['esito_bo']);
		
		if($cap=="") $cap=00000;
		if($eta=="") $eta=0;
		if($operatore_provenienza=="") $operatore_provenienza=0;
		if($prezzo=="") $prezzo=0;


		$modifica2= "UPDATE leads SET "

				. "data_inserimento='$data_inserimento',"

				. "nome='$nome',"
			
				. "email='$email',"
			
				. "telefono='$telefono',"
				
				. "indirizzo='$indirizzo',"

				. "comune='$comune',"
								
				. "cap=$cap,"
								
				. "regione='$regione',"
								
				. "eta=$eta,"	
								
				. "orario_contatto='$orario_contatto',"	
								
				. "consenso_privacy='$consenso_privacy',"	
								
				. "ip_address='$indirizzo_ip',"	
			
				. "provenienza='$provenienza',"

                . "url_sito='$url_sito',"
			
				. "operatore_provenienza=$operatore_provenienza,"
			
				. "tecnologia=$tecnologia,"

				. "tecnologia2=$tecnologia2,"
			
				. "offerta=$offerta,"
			
				. "prezzo=$prezzo,"

				. "prezzo2=$prezzo2,"

				. "operatore=$operatore,"
			
				. "esito_op=$esito_operatore,"
			
				. "esito_bo=$esito_bo,"

				. "note='$note' "				

				. "WHERE id='$id'";


		$modifica = mysqli_query($db_connect,$modifica2);	

		$arrayReturn['esito'] = $modifica ? "Modifica effettuata".$modifica : $modifica;
		
		$arrayReturn['query'] = $modifica2;
	

		break;
	

	case "del_leads":

		$modificascheda = mysqli_query($db_connect, "DELETE FROM leads WHERE id='".$_POST[id]."'");

		break;
						
				
		

}


echo json_encode($arrayReturn);


?>