!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(74),o=r(i);window.Invoice=o["default"]},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(52),i=n(15);e.exports=function(e){return r(i(e))}},function(e,t,n){e.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(6),i=n(13);e.exports=n(4)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(8),i=n(31),o=n(24),a=Object.defineProperty;t.f=n(4)?Object.defineProperty:function(e,t,n){if(r(e),t=o(t,!0),r(n),i)try{return a(e,t,n)}catch(c){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(22)("wks"),i=n(14),o=n(1).Symbol,a="function"==typeof o,c=e.exports=function(e){return r[e]||(r[e]=a&&o[e]||(a?o:i)("Symbol."+e))};c.store=r},function(e,t,n){var r=n(11);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){var n=e.exports={version:"2.3.0"};"number"==typeof __e&&(__e=n)},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){var r=n(36),i=n(16);e.exports=Object.keys||function(e){return r(e,i)}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t){e.exports={}},function(e,t){e.exports=!0},function(e,t){t.f={}.propertyIsEnumerable},function(e,t,n){var r=n(6).f,i=n(2),o=n(7)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,o)&&r(e,o,{configurable:!0,value:t})}},function(e,t,n){var r=n(22)("keys"),i=n(14);e.exports=function(e){return r[e]||(r[e]=i(e))}},function(e,t,n){var r=n(1),i="__core-js_shared__",o=r[i]||(r[i]={});e.exports=function(e){return o[e]||(o[e]={})}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(11);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var r=n(1),i=n(9),o=n(18),a=n(26),c=n(6).f;e.exports=function(e){var t=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||c(t,e,{value:a.f(e)})}},function(e,t,n){t.f=n(7)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(42),o=r(i),a=n(41),c=r(a),u="function"==typeof c["default"]&&"symbol"==typeof o["default"]?function(e){return typeof e}:function(e){return e&&"function"==typeof c["default"]&&e.constructor===c["default"]?"symbol":typeof e};t["default"]="function"==typeof c["default"]&&"symbol"===u(o["default"])?function(e){return"undefined"==typeof e?"undefined":u(e)}:function(e){return e&&"function"==typeof c["default"]&&e.constructor===c["default"]?"symbol":"undefined"==typeof e?"undefined":u(e)}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(11),i=n(1).document,o=r(i)&&r(i.createElement);e.exports=function(e){return o?i.createElement(e):{}}},function(e,t,n){var r=n(1),i=n(9),o=n(49),a=n(5),c="prototype",u=function(e,t,n){var s,f,d,l=e&u.F,p=e&u.G,v=e&u.S,m=e&u.P,y=e&u.B,h=e&u.W,b=p?i:i[t]||(i[t]={}),g=b[c],x=p?r:v?r[t]:(r[t]||{})[c];p&&(n=t);for(s in n)f=!l&&x&&void 0!==x[s],f&&s in b||(d=f?x[s]:n[s],b[s]=p&&"function"!=typeof x[s]?n[s]:y&&f?o(d,r):h&&x[s]==d?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[c]=e[c],t}(d):m&&"function"==typeof d?o(Function.call,d):d,m&&((b.virtual||(b.virtual={}))[s]=d,e&u.R&&g&&!g[s]&&a(g,s,d)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,e.exports=u},function(e,t,n){e.exports=!n(4)&&!n(10)(function(){return 7!=Object.defineProperty(n(29)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){"use strict";var r=n(18),i=n(30),o=n(37),a=n(5),c=n(2),u=n(17),s=n(54),f=n(20),d=n(61),l=n(7)("iterator"),p=!([].keys&&"next"in[].keys()),v="@@iterator",m="keys",y="values",h=function(){return this};e.exports=function(e,t,n,b,g,x,w){s(n,t,b);var O,S,_,j=function(e){if(!p&&e in I)return I[e];switch(e){case m:return function(){return new n(this,e)};case y:return function(){return new n(this,e)}}return function(){return new n(this,e)}},P=t+" Iterator",k=g==y,E=!1,I=e.prototype,T=I[l]||I[v]||g&&I[g],A=T||j(g),M=g?k?j("entries"):A:void 0,D="Array"==t?I.entries||T:T;if(D&&(_=d(D.call(new e)),_!==Object.prototype&&(f(_,P,!0),r||c(_,l)||a(_,l,h))),k&&T&&T.name!==y&&(E=!0,A=function(){return T.call(this)}),r&&!w||!p&&!E&&I[l]||a(I,l,A),u[t]=A,u[P]=h,g)if(O={values:k?A:j(y),keys:x?A:j(m),entries:M},w)for(S in O)S in I||o(I,S,O[S]);else i(i.P+i.F*(p||E),t,O);return O}},function(e,t,n){var r=n(8),i=n(58),o=n(16),a=n(21)("IE_PROTO"),c=function(){},u="prototype",s=function(){var e,t=n(29)("iframe"),r=o.length,i=">";for(t.style.display="none",n(51).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write("<script>document.F=Object</script"+i),e.close(),s=e.F;r--;)delete s[u][o[r]];return s()};e.exports=Object.create||function(e,t){var n;return null!==e?(c[u]=r(e),n=new c,c[u]=null,n[a]=e):n=s(),void 0===t?n:i(n,t)}},function(e,t,n){var r=n(36),i=n(16).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var r=n(2),i=n(3),o=n(48)(!1),a=n(21)("IE_PROTO");e.exports=function(e,t){var n,c=i(e),u=0,s=[];for(n in c)n!=a&&r(c,n)&&s.push(n);for(;t.length>u;)r(c,n=t[u++])&&(~o(s,n)||s.push(n));return s}},function(e,t,n){e.exports=n(5)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){return JSON.parse((0,u["default"])(e))}Object.defineProperty(t,"__esModule",{value:!0});var o=n(27),a=r(o),c=n(40),u=r(c);t.inert=i,t["default"]={getJson:{redirect:"follow",headers:{Accept:"application/json"}},putJson:function(e){return window.fetch(e["@id"],{method:"put",body:(0,u["default"])(e),redirect:"follow",headers:{Accept:"application/json",Authorization:"insecure"}})},checkStatus:function(e){if(e.status<400)return e;var t=new Error(e.statusText);throw t.status=e.status,t.response=e,t},json:function(e){return e.json()},inert:function(e){return JSON.parse((0,u["default"])(e))},valueType:function(e){return"object"!==("undefined"==typeof e?"undefined":(0,a["default"])(e))?"boolean"==typeof e?"ValueString":"number"==typeof e?"ValueString":"ValueText":Array.isArray(e)?"ValueArray":e["@id"]&&"_"!==e["@id"].charAt(0)?"ValueReference":"undefined"!=typeof e["@value"]?"ValueLiteral":"ValueObject"}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(27),o=r(i),a=n(38),c={btw0:{text:"BTW vrij",percent:0},btw6:{text:"BTW 6%",percent:6},btw21:{text:"BTW 21%",percent:21}};t["default"]={props:["a","options"],data:function(){return{preview:!1}},computed:{invoiceNumber:function(){var e=this.a.url||this.a["@id"]||"nope";return e=e.slice(e.lastIndexOf(":")+1),e.slice(e.lastIndexOf("/")+1)},taxExemptionRule:function(){return this.a.provider&&this.a.provider["be:taxExemptionRule"]},total:function(){return this.totalPaymentDue[this.totalPaymentDue.length-1].price},totalPaymentDue:function(){if(this.a.totalPaymentDue)return this.a.totalPaymentDue;if(!this.a.referencesOrder)return void alert("no orders");if("object"!==(0,o["default"])(this.a.referencesOrder))return void alert("expected object but got "+this.a.referencesOrder);Array.isArray(this.a.referencesOrder)||(this.a.referencesOrder=[this.a.referencesOrder]);var e=0,t=0,n=(0,a.inert)(c);if(this.a.referencesOrder.forEach(function(r,i){if(r.orderedItem&&r.acceptedOffer){var o=r.orderedItem.category;void 0===o&&(o="btw21");var a=n[o];void 0===a&&(a=n.btw21),a.vat||(a.vat=0);var c=(a.percent||0)/100,u=parseInt(r.acceptedOffer.price)||0,s=!!r.acceptedOffer.valueAddedTaxIncluded,f=u*c/(s?1+c:1);e+=s?u-f:u,t+=s?u:u+f,a.vat+=f,console.log(e),console.log(t,f)}}),this.taxExemptionRule)return[{"@type":"PriceSpecification",price:e,priceCurrency:"EUR",name:"Totaal",valueAddedTaxIncluded:!0}];var r=[{"@type":"PriceSpecification",price:e,priceCurrency:"EUR",name:"Totaal excl. BTW",valueAddedTaxIncluded:!1}];for(var i in n)n[i].vat&&r.push({"@type":"PriceSpecification",price:n[i].vat,priceCurrency:"EUR",name:n[i].text});return r.push({"@type":"PriceSpecification",price:t,priceCurrency:"EUR",name:"Totaal incl. BTW",valueAddedTaxIncluded:!0}),r}},methods:{print:function(){var e=document.getElementById("invoicestyling").innerHTML,t=document.getElementById("printme").innerHTML,n=document.getElementById("ifmcontentstoprint").contentWindow;n.document.open(),n.document.write(t+e),n.document.close(),n.focus(),n.print()}},created:function(){console.log("Invoice compnent created"),this.options.resolve=3},attached:function(){this.$parent.hide=1},filters:{date:function(e){return e}}}},function(e,t,n){e.exports={"default":n(43),__esModule:!0}},function(e,t,n){e.exports={"default":n(44),__esModule:!0}},function(e,t,n){e.exports={"default":n(45),__esModule:!0}},function(e,t,n){var r=n(9),i=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},function(e,t,n){n(69),n(67),n(70),n(71),e.exports=n(9).Symbol},function(e,t,n){n(68),n(72),e.exports=n(26).f("iterator")},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){e.exports=function(){}},function(e,t,n){var r=n(3),i=n(64),o=n(63);e.exports=function(e){return function(t,n,a){var c,u=r(t),s=i(u.length),f=o(a,s);if(e&&n!=n){for(;s>f;)if(c=u[f++],c!=c)return!0}else for(;s>f;f++)if((e||f in u)&&u[f]===n)return e||f||0;return!e&&-1}}},function(e,t,n){var r=n(46);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var r=n(12),i=n(35),o=n(19);e.exports=function(e){var t=r(e),n=i.f;if(n)for(var a,c=n(e),u=o.f,s=0;c.length>s;)u.call(e,a=c[s++])&&t.push(a);return t}},function(e,t,n){e.exports=n(1).document&&document.documentElement},function(e,t,n){var r=n(28);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(28);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){"use strict";var r=n(33),i=n(13),o=n(20),a={};n(5)(a,n(7)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(a,{next:i(1,n)}),o(e,t+" Iterator")}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,n){var r=n(12),i=n(3);e.exports=function(e,t){for(var n,o=i(e),a=r(o),c=a.length,u=0;c>u;)if(o[n=a[u++]]===t)return n}},function(e,t,n){var r=n(14)("meta"),i=n(11),o=n(2),a=n(6).f,c=0,u=Object.isExtensible||function(){return!0},s=!n(10)(function(){return u(Object.preventExtensions({}))}),f=function(e){a(e,r,{value:{i:"O"+ ++c,w:{}}})},d=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,r)){if(!u(e))return"F";if(!t)return"E";f(e)}return e[r].i},l=function(e,t){if(!o(e,r)){if(!u(e))return!0;if(!t)return!1;f(e)}return e[r].w},p=function(e){return s&&v.NEED&&u(e)&&!o(e,r)&&f(e),e},v=e.exports={KEY:r,NEED:!1,fastKey:d,getWeak:l,onFreeze:p}},function(e,t,n){var r=n(6),i=n(8),o=n(12);e.exports=n(4)?Object.defineProperties:function(e,t){i(e);for(var n,a=o(t),c=a.length,u=0;c>u;)r.f(e,n=a[u++],t[n]);return e}},function(e,t,n){var r=n(19),i=n(13),o=n(3),a=n(24),c=n(2),u=n(31),s=Object.getOwnPropertyDescriptor;t.f=n(4)?s:function(e,t){if(e=o(e),t=a(t,!0),u)try{return s(e,t)}catch(n){}return c(e,t)?i(!r.f.call(e,t),e[t]):void 0}},function(e,t,n){var r=n(3),i=n(34).f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(e){try{return i(e)}catch(t){return a.slice()}};e.exports.f=function(e){return a&&"[object Window]"==o.call(e)?c(e):i(r(e))}},function(e,t,n){var r=n(2),i=n(65),o=n(21)("IE_PROTO"),a=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),r(e,o)?e[o]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},function(e,t,n){var r=n(23),i=n(15);e.exports=function(e){return function(t,n){var o,a,c=String(i(t)),u=r(n),s=c.length;return 0>u||u>=s?e?"":void 0:(o=c.charCodeAt(u),55296>o||o>56319||u+1===s||(a=c.charCodeAt(u+1))<56320||a>57343?e?c.charAt(u):o:e?c.slice(u,u+2):(o-55296<<10)+(a-56320)+65536)}}},function(e,t,n){var r=n(23),i=Math.max,o=Math.min;e.exports=function(e,t){return e=r(e),0>e?i(e+t,0):o(e,t)}},function(e,t,n){var r=n(23),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},function(e,t,n){var r=n(15);e.exports=function(e){return Object(r(e))}},function(e,t,n){"use strict";var r=n(47),i=n(55),o=n(17),a=n(3);e.exports=n(32)(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(e,t){},function(e,t,n){"use strict";var r=n(62)(!0);n(32)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t,n){"use strict";var r=n(1),i=n(2),o=n(4),a=n(30),c=n(37),u=n(57).KEY,s=n(10),f=n(22),d=n(20),l=n(14),p=n(7),v=n(26),m=n(25),y=n(56),h=n(50),b=n(53),g=n(8),x=n(3),w=n(24),O=n(13),S=n(33),_=n(60),j=n(59),P=n(6),k=n(12),E=j.f,I=P.f,T=_.f,A=r.Symbol,M=r.JSON,D=M&&M.stringify,N="prototype",F=p("_hidden"),C=p("toPrimitive"),z={}.propertyIsEnumerable,R=f("symbol-registry"),B=f("symbols"),L=Object[N],W="function"==typeof A,J=r.QObject,V=!J||!J[N]||!J[N].findChild,U=o&&s(function(){return 7!=S(I({},"a",{get:function(){return I(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=E(L,t);r&&delete L[t],I(e,t,n),r&&e!==L&&I(L,t,r)}:I,G=function(e){var t=B[e]=S(A[N]);return t._k=e,t},H=W&&"symbol"==typeof A.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof A},K=function(e,t,n){return g(e),t=w(t,!0),g(n),i(B,t)?(n.enumerable?(i(e,F)&&e[F][t]&&(e[F][t]=!1),n=S(n,{enumerable:O(0,!1)})):(i(e,F)||I(e,F,O(1,{})),e[F][t]=!0),U(e,t,n)):I(e,t,n)},Y=function(e,t){g(e);for(var n,r=h(t=x(t)),i=0,o=r.length;o>i;)K(e,n=r[i++],t[n]);return e},$=function(e,t){return void 0===t?S(e):Y(S(e),t)},Q=function(e){var t=z.call(this,e=w(e,!0));return t||!i(this,e)||!i(B,e)||i(this,F)&&this[F][e]?t:!0},q=function(e,t){var n=E(e=x(e),t=w(t,!0));return!n||!i(B,t)||i(e,F)&&e[F][t]||(n.enumerable=!0),n},X=function(e){for(var t,n=T(x(e)),r=[],o=0;n.length>o;)i(B,t=n[o++])||t==F||t==u||r.push(t);return r},Z=function(e){for(var t,n=T(x(e)),r=[],o=0;n.length>o;)i(B,t=n[o++])&&r.push(B[t]);return r};W||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var e=l(arguments.length>0?arguments[0]:void 0);return o&&V&&U(L,e,{configurable:!0,set:function(t){i(this,F)&&i(this[F],e)&&(this[F][e]=!1),U(this,e,O(1,t))}}),G(e)},c(A[N],"toString",function(){return this._k}),j.f=q,P.f=K,n(34).f=_.f=X,n(19).f=Q,n(35).f=Z,o&&!n(18)&&c(L,"propertyIsEnumerable",Q,!0),v.f=function(e){return G(p(e))}),a(a.G+a.W+a.F*!W,{Symbol:A});for(var ee="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),te=0;ee.length>te;)p(ee[te++]);for(var ee=k(p.store),te=0;ee.length>te;)m(ee[te++]);a(a.S+a.F*!W,"Symbol",{"for":function(e){return i(R,e+="")?R[e]:R[e]=A(e)},keyFor:function(e){if(H(e))return y(R,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),a(a.S+a.F*!W,"Object",{create:$,defineProperty:K,defineProperties:Y,getOwnPropertyDescriptor:q,getOwnPropertyNames:X,getOwnPropertySymbols:Z}),M&&a(a.S+a.F*(!W||s(function(){var e=A();return"[null]"!=D([e])||"{}"!=D({a:e})||"{}"!=D(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!H(e)){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&b(t)||(t=function(e,t){return n&&(t=n.call(this,e,t)),H(t)?void 0:t}),r[1]=t,D.apply(M,r)}}}),A[N][C]||n(5)(A[N],C,A[N].valueOf),d(A,"Symbol"),d(Math,"Math",!0),d(r.JSON,"JSON",!0)},function(e,t,n){n(25)("asyncIterator")},function(e,t,n){n(25)("observable")},function(e,t,n){n(66);for(var r=n(1),i=n(5),o=n(17),a=n(7)("toStringTag"),c=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;5>u;u++){var s=c[u],f=r[s],d=f&&f.prototype;d&&!d[a]&&i(d,a,s),o[s]=o.Array}},function(e,t){e.exports='<div> <p class=fragment-cta> <button class="btn btn-soft" @click=print>Print</button> <button class="btn btn-soft" @click="preview=!preview">Preview</button> </p> <iframe id=ifmcontentstoprint style="border:0;height: 0px; width: 0px; position: absolute"></iframe> <template id=invoicestyling> <style type=text/css>html,\n      body {\n        box-sizing: border-box;\n        margin: 0;\n        padding: 0;\n        width: 210mm;\n        height: 277mm;\n        background: transparent;\n      }\n      .invoice-page {\n        position: static;\n        margin: 0;\n        outline: initial;\n        width: initial;\n        min-height: initial;\n        box-shadow: initial;\n        page-break-after: always;\n        transform: none!important;\n        transition: none;\n      }\n      @page {\n        size: A4;\n        margin: 0;\n      }</style> </template> <style type=text/css>#printme {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      padding: 3rem 0;\n      overflow: auto;\n      background-color: #888;\n      z-index: 60;\n    }\n    #printme>.invoice {\n      margin: 0 auto;\n    }\n    body {\n      overflow: auto;\n    }</style> <div id=printme v-show=preview @click="preview=!preview"> <div class="invoice invoice-page"> <style>.bold {\n          font-weight: bold;\n        }\n        .bolder {\n          font-weight: bolder;\n        }\n        .method {\n          flex-basis: 100%;\n          margin: 1cm 0 0\n        }\n        .flex-top {\n          padding: 2cm 0 1cm;\n          display: flex;\n          align-items: flex-end;\n        }\n        .invoice * {\n          box-sizing: border-box;\n        }\n        .invoice a {\n          color: inherit;\n        }\n        .invoice h1 {\n          margin: 0;\n          font-size: 2em;\n          font-weight: 300;\n          line-height: 1.1;\n        }\n        .invoice h2 {\n          margin: 0;\n          font-size: 1.5em;\n          font-weight: 400;\n          opacity: .5;\n        }\n        .invoice h3 {\n          margin: 0;\n          font-size: 1.125em;\n          font-weight: 500;\n          line-height: 1.6rem;\n        }\n        .invoice h3+p {\n          margin: 0;\n          opacity: .8;\n        }\n        .invoice address>div {\n          white-space: nowrap;\n        }\n        .invoice header {\n          position: relative;\n          flex-grow: 1;\n        }\n        .invoice .summary {\n          background: #eee;\n          display: flex;\n          justify-content: space-between;\n          flex-wrap: wrap;\n          padding: 1cm 2cm;\n        }\n        .invoice .summary-item {\n          font-size: 1.25rem;\n        }\n        .invoice .summary-label {\n          display: block;\n          text-transform: uppercase;\n          font-size: 12px;\n          font-weight: normal;\n        }\n        .invoice .badge {\n          padding: .3em .5em;\n          line-height: 1.2em;\n          background: #888;\n          color: #FFF;\n          text-transform: uppercase;\n          font-size: 1.5em;\n          text-align: center;\n        }\n        .invoice .number {\n          display: block;\n        }\n        .invoice .details {\n          padding-top: 1em;\n          margin-bottom: 1em;\n        }\n        .invoice .list {\n          margin-top: 1em;\n          padding-bottom: 1em;\n        }\n        .invoice .taxes {\n          text-align: right;\n        }\n        .tbl {\n          border: 0;\n          border-collapse: collapse;\n          text-align: left;\n        }\n        .tbl td,\n        .tbl th {\n          line-height: 1.4em;\n        }\n        .tbl-orders {\n          width: 100%;\n        }\n        .tbl-orders  td {\n          border-bottom: 1px solid #ccc;\n          padding-top: .5em;\n          padding-bottom: .5em;\n        }\n        .tbl-orders  th {\n          border-bottom: 1px solid #ccc;\n          padding-top: .5em;\n          padding-bottom: 1em;\n          font-size: 12px;\n          font-weight: 400;\n          text-transform: uppercase;\n          color: #666;\n        }\n\n        .tbl-calc {\n          float: right;\n          margin-top: .5em;\n        }\n        .tbl-calc> .e {\n          padding-left: 3em;\n        }\n        .tbl .e {\n          text-align: right;\n          padding-left: 2em;\n          white-space: nowrap;\n          vertical-align: top;\n        }\n        .invoice {\n          font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", sans-serif;\n          color: black;\n          font-size: 16px;\n        }\n        .invoice-page {\n          width: 210mm;\n          min-height: 277mm;\n          padding: 0;\n          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n          background: #fff;\n        }\n        #printme .invoice-subpage {\n          height: 277mm;\n          padding-bottom: 2cm;\n        }\n        .invoice-subpage {\n          height: 277mm;\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n          -webkit-flex-direction: column;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n          -webkit-box-pack: justify;\n          -webkit-justify-content: space-between;\n              -ms-flex-pack: justify;\n                  justify-content: space-between;\n        }\n        .invoice-container {\n          padding-left: 2cm;\n          padding-right: 2cm;\n        }\n        .invoice h3 {\n          margin: 0;\n          font-size: 1.125em;\n          font-weight: 500;\n          line-height: 25px;\n          line-height: 1.6rem;\n        }\n        .invoice p {\n          margin: 1em 0;\n        }\n        .invoice h3+p {\n          margin: 0;\n          opacity: .8;\n          filter: alpha(opacity=80);\n        }</style> <div class=invoice-subpage> <div class=invoice-container v-if=a.provider||a.customer> <div class=flex-top> <img :src="a.provider.logo||\'\'" v-if=a.provider.logo> <header v-if=a.provider> <h1 class=h1>{{a.provider.name}}</h1> <address v-if=a.provider.address> <div>{{a.provider.address&&a.provider.address.streetAddress}}</div> <div>{{a.provider.address&&a.provider.address.postalCode}} {{a.provider.address&&a.provider.address.addressLocality}}</div> </address> <div><a href=mailto:{{a.provider.email}}>{{a.provider.email}}</a></div> <div><a href=mailto:{{a.provider.url}}>{{a.provider.url}}</a></div> <div>{{a.provider.vatID}}</div> </header> <section class=customer v-if=a.customer> Opgemaakt voor: <div>{{a.customer.name}}</div> <address> <div>{{a.customer.address&&a.customer.address.streetAddress}}</div> <div>{{a.customer.address&&a.customer.address.postalCode}} {{a.customer.address&&a.customer.address.addressLocality}}</div> </address> <div><a href=mailto:{{a.customer.email}}>{{a.customer.email}}</a></div> <div><a href=mailto:{{a.customer.url}}>{{a.customer.url}}</a></div> <div>{{a.customer.vatID}}</div> </section> </div> </div> <section class=summary v-if=a.dateCreated||a.url||a.paymentDueDate> <div class=summary-item v-if=invoiceNumber> <span class=summary-label>Factuurnr.</span> <div class=number v-text=invoiceNumber>01 / 2015</div> </div> <div class=summary-item v-if=a.dateCreated> <span class=summary-label>Factuurdatum</span> {{a.dateCreated| date}} </div> <div class="summary-item bolder" v-if=a.paymentDueDate> <span class=summary-label>Vervaldatum</span> {{a.paymentDueDate| date}} </div> <div class="summary-item bolder" v-if=total> <span class=summary-label>Totaalbedrag</span>{{total|currency \'€ \'}} </div> <p class=method v-if=a.paymentMethod v-html=a.paymentMethod></p> </section> <section class="list invoice-container" v-if=a.referencesOrder> <table class="tbl tbl-orders"> <thead> <tr> <th>Beschrijving</th> <th class=e>Bedrag</th> </tr> </thead> <tbody> <tr v-for="order in a.referencesOrder"> <td> <h3 v-if=order.orderedItem.name>{{order.orderedItem.name}}</h3> <p v-if=order.orderedItem.description>{{order.orderedItem.description}}</p> </td> <td class=e> <span v-if=order.acceptedOffer.price> {{order.acceptedOffer.price||0|currency \'€ \'}} </span> </td> </tr> </tbody> </table> <table class="tbl tbl-calc" v-if=totalPaymentDue> <tbody> <tr v-for="line in totalPaymentDue" track-by=$index :class={bold:line.valueAddedTaxIncluded}> <td>{{line.name}}</td> <td class=e v-if="line.price!=undefined">{{line.price|currency \'€ \'}}</td> </tr> </tbody> </table> <p v-if=taxExemptionRule style=float:right;text-align:right;width:100%> Bijzondere vrijstellingsregeling kleine ondernemingen </p> </section> <footer class=invoice-container v-if=a.provider> <strong>{{a.provider.name}}</strong> <i v-if=a.provider.address> &nbsp; &bullet; &nbsp; {{a.provider.address.streetAddress}}, {{a.provider.address.postalCode}} {{a.provider.address.addressLocality}}</i> <span v-if=a.provider.vatID>&nbsp; &bullet; &nbsp; {{a.provider.vatID}}</span> </footer> </div> </div> </div> </div>'},function(e,t,n){var r,i;r=n(39),i=n(73),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)}]);