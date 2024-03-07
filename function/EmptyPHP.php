<?php
if (!empty($_REQUEST['contract'])) {
   $valueopermobile="";
    $query="";
    $queryval="";
    $querykey="";
    $stringaoperatore="";
    $querytelopz="";
    $query_insert_opzvoce="";
    $queryopz_bou="";
    $keys = array_keys($_REQUEST);

    //NELLA REQUEST CI SONO BTNINVIA E PHPSESSID E ALTRI VALORI DA DISATTIVARE NEL POST
    for( $i=0;$i<count($keys);$i++ ) {
        $keynumber=$keys[$i];
       switch($keynumber)
        {
	        case 'contract' : break;
                case 'btnInvia': break;
                    case 'PHPSESSID': break;
                        case 'undefined': break;
                            default:
             $tmpkey= $keys[$i];
             $tmpval= $_REQUEST[$tmpkey];

             if ($tmpval<>"") {

                    $querykey.=$tmpkey.",";

                    //else{
                    if (is_numeric($tmpval)) {
                        if (substr($tmpval,0,1)==0)
                            {
                                $queryval.="'".($tmpval)."',";
                            }else {
                                $queryval.=$tmpval.",";
                     }

                     }
                     else {
                      if ($keynumber=="datanascita" || $keynumber=="datadoc") {
                         $queryval.="'".dataEng($tmpval)."',";
                          }
                     else {
                       //  if ($keynumber=="comunenascita"){

                             $queryval.="'".addslashes($tmpval)."',";
                         //    echo $tmpval;

                            // }
                        }

                   //}
                  }
                   }
            break;
        }
    }


        $querylen=strlen($querykey)-1;
    // echo ($querykey);
        $querykey= substr($querykey,0,$querylen);
           $querykey=$querykey .",data_contratto";
          //echo($querykey);
        $queryvarlen=strlen($queryval)-1;

        $queryval=substr($queryval,0,$queryvarlen);
          $queryval=$queryval .",CURRENT_TIMESTAMP";
        $queryinsert="";
        $queryinsert="INSERT INTO tb_sottoscrizione (".$querykey.") VALUES (".$queryval.")";
        //echo $queryinsert;
        mysql_query($queryinsert) or die (mysql_error());
        $queryok = mysql_affected_rows();

        if($queryok != -1) {
            echo("ok");



        }
        else {
            echo("problemi con la query.");
           // mysql_close($conn);
        }


     mysql_close($conn);
     //echo ($queryopz_bou);
    }

?>
