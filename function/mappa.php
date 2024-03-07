<?php 
define("MAPS_HOST", "maps.google.com");
define("KEY", "AIzaSyAX5bsljOZaEdDUOeDbKO77uITseyAsbkM");
require_once("./conf/_DBconf.php");

$conn     = mysql_connect($DB_HOST,$DB_USER,$DB_PSW) or die("ERRORE: Impossibile connettersi al db");
$database = mysql_select_db($DB_NAME,$conn) or die("ERRORE: Impossibile selezionare il db".mysql_error());
 $query = "SELECT  SELECT * FROM `vicidial_call_notes` , vicidial_list WHERE vicidial_call_notes.lead_id = vicidial_list.lead_id AND vicidial_call_notes.long = ''";
    $result = mysql_query($query) or die(mysql_error());
    $num_rows = mysql_num_rows($result);
    if ($num_rows > 0) {
        while ($row = mysql_fetch_assoc($result)) {
           $address=$row['address1']+" "+ $row['city'];
            address_in_coord($address,$row['notesid']);
        }
    }

//Trasforma l'indirizzo passato in coordinate latitudine-longitudine e lo ritorna in un array
//Recupera l'indirizzo passato in $address e, tramite le api geocode di Google Maps, lo trasforma in latitudine e longitudine.
function address_in_coord($address,$notes_id){

	$geocode_pending=true;

	//Initialize delay in geocode speed
	$delay=0;
	$base_url="http://".MAPS_HOST."/maps/geo?output=xml&key=".KEY;

	while($geocode_pending){

		$request_url = $base_url . "&q=" . urlencode($address);
		$xml=simplexml_load_file($request_url) or die("url not loading");

		$status = $xml->Response->Status->code;
		if (strcmp($status, "200") == 0){
			// Successful geocode
			$geocode_pending = false;
			$coordinates = $xml->Response->Placemark->Point->coordinates;
			$coordinatesSplit = explode(",", $coordinates);
			// Format: Longitude, Latitude, Altitude
			$lat = $coordinatesSplit[1];
			$lng = $coordinatesSplit[0];
 $insertintoinbox = "UPDATE vicidial_call_notes set lat='"+$lat+"',long='"+$lng+"' WHERE notesid="+$notes_id;
            // echo($insertintoinbox);
            mysql_query($insertintoinbox) or die(mysql_error());
			//echo $lat." --- ".$lng;

			//punto di origine
			$array=array();
			$array[]=$lat;
			$array[]=$lng;

			return $array;

		}elseif(strcmp($status, "620")==0) {
		  // sent geocodes too fast
		  $delay += 100000;
		}else{
		  // failure to geocode
		  $geocode_pending=false;
		  return "Address ".$address." failed to geocoded. Received status ".$status."\n";
		}
		usleep($delay);

	}//while

}
?>