!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=184)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(41),i=n(19);t.exports=function(t){return r(i(t))}},function(t,e,n){var r=n(24)("wks"),i=n(14),o=n(0).Symbol,a="function"==typeof o,s=t.exports=function(t){return r[t]||(r[t]=a&&o[t]||(a?o:i)("Symbol."+t))};s.store=r},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(11),i=n(33),o=n(26),a=Object.defineProperty;e.f=n(5)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(6),i=n(13);t.exports=n(5)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){"use strict";function r(t){return JSON.parse(m()(t))}function i(t){return"object"!==("undefined"==typeof t?"undefined":p()(t))?"boolean"==typeof t?"ValueString":"number"==typeof t?"ValueString":"ValueText":Array.isArray(t)?"ValueArray":t["@id"]&&"_"!==t["@id"].charAt(0)?"ValueReference":"undefined"!=typeof t["@value"]?"ValueLiteral":"ValueObject"}function o(t){if("string"==typeof t){t.endsWith("#id")&&(t=t.slice(0,-3));for(var e=h.length-1;e>=0;e--)t=t.replace(h[e].prefix,h[e].url)}else if("object"===("undefined"==typeof t?"undefined":p()(t)))for(var n in t)t[n]=o(t[n]);return t}function a(t){if("string"==typeof t)for(var e=0;e<h.length;e++)s=s.replace(h[e].url,h[e].prefix);else if("object"===("undefined"==typeof t?"undefined":p()(t)))for(var n in t)t[n]=a(t[n]);return t}function c(t){return window.fetch(t,{redirect:"follow",headers:{Accept:"application/json"}}).then(f).then(l)}function u(t){return window.fetch(t["@id"],{method:"put",body:m()(t),redirect:"follow",headers:{Accept:"application/json",Authorization:"insecure"}}).then(l)}function f(t){if(t.status<400)return t;var e=new Error(t.statusText);throw e.status=t.status,e.response=t,e}function l(t){return t.json()}var d=n(18),p=n.n(d),v=n(40),m=n.n(v);e.a=r,e.f=i,e.e=o,e.d=a,e.b=c,e.c=u,n.d(e,"g",function(){return y});var h=[],y={render:function(t){return t("style",this.$slots.default)}}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(37),i=n(20);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(12);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(0),i=n(1),o=n(54),a=n(7),s="prototype",c=function(t,e,n){var u,f,l,d=t&c.F,p=t&c.G,v=t&c.S,m=t&c.P,h=t&c.B,y=t&c.W,b=p?i:i[e]||(i[e]={}),_=b[s],g=p?r:v?r[e]:(r[e]||{})[s];p&&(n=e);for(u in n)f=!d&&g&&void 0!==g[u],f&&u in b||(l=f?g[u]:n[u],b[u]=p&&"function"!=typeof g[u]?n[u]:h&&f?o(l,r):y&&g[u]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(l):m&&"function"==typeof l?o(Function.call,l):l,m&&((b.virtual||(b.virtual={}))[u]=l,t&c.R&&_&&!_[u]&&a(_,u,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){t.exports={}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(47),o=r(i),a=n(46),s=r(a),c="function"==typeof s.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===c(o.default)?function(t){return"undefined"==typeof t?"undefined":c(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":c(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports=!0},function(t,e,n){var r=n(6).f,i=n(2),o=n(4)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},function(t,e,n){var r=n(24)("keys"),i=n(14);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(0),i="__core-js_shared__",o=r[i]||(r[i]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(12);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(0),i=n(1),o=n(21),a=n(28),s=n(6).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(4)},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){e.f=Object.getOwnPropertySymbols},,function(t,e,n){var r=n(12),i=n(0).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){t.exports=!n(5)&&!n(9)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(21),i=n(15),o=n(38),a=n(7),s=n(2),c=n(16),u=n(58),f=n(22),l=n(65),d=n(4)("iterator"),p=!([].keys&&"next"in[].keys()),v="@@iterator",m="keys",h="values",y=function(){return this};t.exports=function(t,e,n,b,_,g,x){u(n,e,b);var w,O,C,S=function(t){if(!p&&t in E)return E[t];switch(t){case m:return function(){return new n(this,t)};case h:return function(){return new n(this,t)}}return function(){return new n(this,t)}},j=e+" Iterator",P=_==h,k=!1,E=t.prototype,I=E[d]||E[v]||_&&E[_],A=I||S(_),D=_?P?S("entries"):A:void 0,T="Array"==e?E.entries||I:I;if(T&&(C=l(T.call(new t)),C!==Object.prototype&&(f(C,j,!0),r||s(C,d)||a(C,d,y))),P&&I&&I.name!==h&&(k=!0,A=function(){return I.call(this)}),r&&!x||!p&&!k&&E[d]||a(E,d,A),c[e]=A,c[j]=y,_)if(w={values:P?A:S(h),keys:g?A:S(m),entries:D},x)for(O in w)O in E||o(E,O,w[O]);else i(i.P+i.F*(p||k),e,w);return w}},function(t,e,n){var r=n(11),i=n(62),o=n(20),a=n(23)("IE_PROTO"),s=function(){},c="prototype",u=function(){var t,e=n(32)("iframe"),r=o.length,i="<",a=">";for(e.style.display="none",n(56).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(i+"script"+a+"document.F=Object"+i+"/script"+a),t.close(),u=t.F;r--;)delete u[c][o[r]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[c]=r(t),n=new s,s[c]=null,n[a]=t):n=u(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(37),i=n(20).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},function(t,e,n){var r=n(2),i=n(3),o=n(53)(!1),a=n(23)("IE_PROTO");t.exports=function(t,e){var n,s=i(t),c=0,u=[];for(n in s)n!=a&&r(s,n)&&u.push(n);for(;e.length>c;)r(s,n=e[c++])&&(~o(u,n)||u.push(n));return u}},function(t,e,n){t.exports=n(7)},function(t,e,n){var r=n(19);t.exports=function(t){return Object(r(t))}},function(t,e,n){t.exports={default:n(48),__esModule:!0}},function(t,e,n){var r=n(29);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){"use strict";var r=n(66)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){n(69);for(var r=n(0),i=n(7),o=n(16),a=n(4)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],c=0;c<5;c++){var u=s[c],f=r[u],l=f&&f.prototype;l&&!l[a]&&i(l,a,u),o[u]=o.Array}},function(t,e,n){var r,i;r=n(45);var o=n(77);i=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(i=r=r.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,t.exports=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(18),i=n.n(r),o=n(8);e.default={name:"input-single",props:{a:null,path:null,label:null,length:{default:10}},data:function(){return{focus:!1}},computed:{classes:function(){return{"input--empty":!this.model,"input--focus":this.focus}},model:{get:function(){return this.parent[this.prop]},set:function(t){console.log("setting",this.parent,this.prop,t),this.$set(this.parent,this.prop,t)}},parent:function(){return this.resolved.parent},prop:function(){return this.resolved.prop},resolved:function(){if(!this.a||!this.a["@id"])return console.warn("input single only supports fragments with @id");for(var t=this.storage(this.a),e=this.path&&this.path.split(".")||[],n=0;n<e.length;n++){var r="schema:"+e[n];if("undefined"==typeof t[r]&&this.$set(t,r,n<e.length-1?{}:"nope"),n===e.length-1)return{parent:t,prop:r};t=this.storage(t[r])||t[r]}throw"path param in follow() is required"}},methods:{storage:function(t){return this.$root.fragments[n.i(o.d)("object"===("undefined"==typeof t?"undefined":i()(t))?t["@id"]:t)]}}}},function(t,e,n){t.exports={default:n(49),__esModule:!0}},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){var r=n(1),i=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},function(t,e,n){n(71),n(70),n(72),n(73),t.exports=n(1).Symbol},function(t,e,n){n(42),n(43),t.exports=n(28).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(3),i=n(68),o=n(67);t.exports=function(t){return function(e,n,a){var s,c=r(e),u=i(c.length),f=o(a,u);if(t&&n!=n){for(;u>f;)if(s=c[f++],s!=s)return!0}else for(;u>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(51);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(10),i=n(30),o=n(17);t.exports=function(t){var e=r(t),n=i.f;if(n)for(var a,s=n(t),c=o.f,u=0;s.length>u;)c.call(t,a=s[u++])&&e.push(a);return e}},function(t,e,n){t.exports=n(0).document&&document.documentElement},function(t,e,n){var r=n(29);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(35),i=n(13),o=n(22),a={};n(7)(a,n(4)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:i(1,n)}),o(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(10),i=n(3);t.exports=function(t,e){for(var n,o=i(t),a=r(o),s=a.length,c=0;s>c;)if(o[n=a[c++]]===e)return n}},function(t,e,n){var r=n(14)("meta"),i=n(12),o=n(2),a=n(6).f,s=0,c=Object.isExtensible||function(){return!0},u=!n(9)(function(){return c(Object.preventExtensions({}))}),f=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},l=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!c(t))return"F";if(!e)return"E";f(t)}return t[r].i},d=function(t,e){if(!o(t,r)){if(!c(t))return!0;if(!e)return!1;f(t)}return t[r].w},p=function(t){return u&&v.NEED&&c(t)&&!o(t,r)&&f(t),t},v=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:d,onFreeze:p}},function(t,e,n){var r=n(6),i=n(11),o=n(10);t.exports=n(5)?Object.defineProperties:function(t,e){i(t);for(var n,a=o(e),s=a.length,c=0;s>c;)r.f(t,n=a[c++],e[n]);return t}},function(t,e,n){var r=n(17),i=n(13),o=n(3),a=n(26),s=n(2),c=n(33),u=Object.getOwnPropertyDescriptor;e.f=n(5)?u:function(t,e){if(t=o(t),e=a(e,!0),c)try{return u(t,e)}catch(t){}if(s(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(3),i=n(36).f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return i(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?s(t):i(r(t))}},function(t,e,n){var r=n(2),i=n(39),o=n(23)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(25),i=n(19);t.exports=function(t){return function(e,n){var o,a,s=String(i(e)),c=r(n),u=s.length;return c<0||c>=u?t?"":void 0:(o=s.charCodeAt(c),o<55296||o>56319||c+1===u||(a=s.charCodeAt(c+1))<56320||a>57343?t?s.charAt(c):o:t?s.slice(c,c+2):(o-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(25),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(25),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e,n){"use strict";var r=n(52),i=n(59),o=n(16),a=n(3);t.exports=n(34)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):"keys"==e?i(0,n):"values"==e?i(0,t[n]):i(0,[n,t[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(t,e){},function(t,e,n){"use strict";var r=n(0),i=n(2),o=n(5),a=n(15),s=n(38),c=n(61).KEY,u=n(9),f=n(24),l=n(22),d=n(14),p=n(4),v=n(28),m=n(27),h=n(60),y=n(55),b=n(57),_=n(11),g=n(3),x=n(26),w=n(13),O=n(35),C=n(64),S=n(63),j=n(6),P=n(10),k=S.f,E=j.f,I=C.f,A=r.Symbol,D=r.JSON,T=D&&D.stringify,M="prototype",F=p("_hidden"),N=p("toPrimitive"),R={}.propertyIsEnumerable,z=f("symbol-registry"),B=f("symbols"),L=f("op-symbols"),W=Object[M],$="function"==typeof A,J=r.QObject,V=!J||!J[M]||!J[M].findChild,U=o&&u(function(){return 7!=O(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=k(W,e);r&&delete W[e],E(t,e,n),r&&t!==W&&E(W,e,r)}:E,K=function(t){var e=B[t]=O(A[M]);return e._k=t,e},G=$&&"symbol"==typeof A.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof A},H=function(t,e,n){return t===W&&H(L,e,n),_(t),e=x(e,!0),_(n),i(B,e)?(n.enumerable?(i(t,F)&&t[F][e]&&(t[F][e]=!1),n=O(n,{enumerable:w(0,!1)})):(i(t,F)||E(t,F,w(1,{})),t[F][e]=!0),U(t,e,n)):E(t,e,n)},Y=function(t,e){_(t);for(var n,r=y(e=g(e)),i=0,o=r.length;o>i;)H(t,n=r[i++],e[n]);return t},q=function(t,e){return void 0===e?O(t):Y(O(t),e)},Q=function(t){var e=R.call(this,t=x(t,!0));return!(this===W&&i(B,t)&&!i(L,t))&&(!(e||!i(this,t)||!i(B,t)||i(this,F)&&this[F][t])||e)},X=function(t,e){if(t=g(t),e=x(e,!0),t!==W||!i(B,e)||i(L,e)){var n=k(t,e);return!n||!i(B,e)||i(t,F)&&t[F][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=I(g(t)),r=[],o=0;n.length>o;)i(B,e=n[o++])||e==F||e==c||r.push(e);return r},tt=function(t){for(var e,n=t===W,r=I(n?L:g(t)),o=[],a=0;r.length>a;)!i(B,e=r[a++])||n&&!i(W,e)||o.push(B[e]);return o};$||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===W&&e.call(L,n),i(this,F)&&i(this[F],t)&&(this[F][t]=!1),U(this,t,w(1,n))};return o&&V&&U(W,t,{configurable:!0,set:e}),K(t)},s(A[M],"toString",function(){return this._k}),S.f=X,j.f=H,n(36).f=C.f=Z,n(17).f=Q,n(30).f=tt,o&&!n(21)&&s(W,"propertyIsEnumerable",Q,!0),v.f=function(t){return K(p(t))}),a(a.G+a.W+a.F*!$,{Symbol:A});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)p(et[nt++]);for(var et=P(p.store),nt=0;et.length>nt;)m(et[nt++]);a(a.S+a.F*!$,"Symbol",{for:function(t){return i(z,t+="")?z[t]:z[t]=A(t)},keyFor:function(t){if(G(t))return h(z,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),a(a.S+a.F*!$,"Object",{create:q,defineProperty:H,defineProperties:Y,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:tt}),D&&a(a.S+a.F*(!$||u(function(){var t=A();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!G(t)){for(var e,n,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);return e=r[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!G(e))return e}),r[1]=e,T.apply(D,r)}}}),A[M][N]||n(7)(A[M],N,A[M].valueOf),l(A,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){n(27)("asyncIterator")},function(t,e,n){n(27)("observable")},,,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"input input--single",class:t.classes},[n("div",{staticClass:"input__label"},[t._v(t._s(t.label))]),t._v(" "),n("span",{staticClass:"input__input inp-subtle"},[n("span",{staticClass:"inp-subtle-span",domProps:{textContent:t._s((t.model||"")+".")}}),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"}],staticClass:"input__input__textarea",attrs:{autofocus:!t.model,type:"text"},domProps:{value:t._s(t.model)},on:{focus:function(e){t.focus=1},blur:function(e){t.focus=0},input:function(e){e.target.composing||(t.model=e.target.value)}}})])])},staticRenderFns:[]}},,,,,,,,,,,,,,,,,,,function(t,e,n){var r,i;r=n(120);var o=n(176);i=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(i=r=r.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,t.exports=r},,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(18),i=n.n(r),o=n(8),a=n(122),s=n(44),c=n.n(s),u='<style type="text/css">\n        html,\n        body {\n          box-sizing: border-box;\n          margin: 0;\n          padding: 0;\n          width: 210mm;\n          height: 277mm;\n          background: transparent;\n        }\n        .invoice-page {\n          position: static;\n          margin: 0;\n          outline: initial;\n          width: initial;\n          min-height: initial;\n          box-shadow: initial;\n          page-break-after: always;\n          transform: none!important;\n          transition: none;\n        }\n        .print-hidden {\n          display: none;\n        }\n        @page {\n          size: A4;\n          margin: 0;\n        }\n      </style>',f={btw0:{text:"BTW vrij",percent:0},btw6:{text:"BTW 6%",percent:6},btw21:{text:"BTW 21%",percent:21}};e.default={props:["a","options"],data:function(){return{preview:!0}},computed:{invoiceNumber:function(){var t=this.a.url||this.a["@id"]||"nope";return t=t.slice(t.lastIndexOf(":")+1),t=t.slice(t.lastIndexOf("/")+1),t.indexOf("-")>0?t.slice(0,t.indexOf("-")):t},dateCreated:function(){return this.a.dateCreated||this.$set(this.$root.fragments[n.i(o.d)(this.a["@id"])],"schema:dateCreated",{"@type":"xsd:date","@value":(new Date).toJSON().slice(0,10)}),this.a.dateCreated},paymentDueDate:function(){if(!this.a.paymentDueDate&&this.dateCreated){var t=new Date(this.dateCreated);t.setMonth(t.getMonth()+1),this.$set(this.$root.fragments[n.i(o.d)(this.a["@id"])],"schema:paymentDueDate",{"@type":"xsd:date","@value":t.toJSON().slice(0,10)})}return this.a.paymentDueDate},taxExemptionRule:function(){return this.a.provider&&this.a.provider["be:taxExemptionRule"]},total:function(){return n.i(a.a)(this.totalPaymentDue).price},orders:function(){return Array.isArray(this.a.referencesOrder)?this.a.referencesOrder:[this.a.referencesOrder]},totalPaymentDue:function(){if(this.a.totalPaymentDue)return this.a.totalPaymentDue;if(this.orders||(this.a.referencesOrder=[{orderedItem:{name:""},acceptedOffer:{price:10}}]),"object"===i()(this.orders[0])){var t=0,e=0,r=n.i(o.a)(f);if(this.orders.forEach(function(n,i){if(n.orderedItem&&n.acceptedOffer){var o=n.orderedItem.category;void 0===o&&(o="btw21");var a=r[o];void 0===a&&(a=r.btw21),a.vat||(a.vat=0);var s=(a.percent||0)/100,c=parseInt(n.acceptedOffer.price)||0,u=!!n.acceptedOffer.valueAddedTaxIncluded,f=c*s/(u?1+s:1);t+=u?c-f:c,e+=u?c:c+f,a.vat+=f}}),this.taxExemptionRule)return[{"@type":"PriceSpecification",price:0,priceCurrency:"%",name:"Btw-tarief: 0%",asterisk:1},{"@type":"PriceSpecification",price:t,priceCurrency:"EUR",name:"Totaal",valueAddedTaxIncluded:!0}];var a=[{"@type":"PriceSpecification",price:t,priceCurrency:"EUR",name:"Totaal excl. BTW",valueAddedTaxIncluded:!1}];for(var s in r)r[s].vat&&a.push({"@type":"PriceSpecification",price:r[s].vat,priceCurrency:"EUR",name:r[s].text});return a.push({"@type":"PriceSpecification",price:e,priceCurrency:"EUR",name:"Totaal incl. BTW",valueAddedTaxIncluded:!0}),a}}},methods:{print:function(){var t=document.getElementById("printme").innerHTML,e=document.getElementById("ifmcontentstoprint").contentWindow;e.document.open(),e.document.write(t+u),e.document.close(),e.focus(),e.print()}},created:function(){console.log("Invoice compnent created"),this.options.resolve=3},filters:{date:function(t){return t}},components:{InputSingle:c.a,StyleInline:o.g}}},,function(t,e,n){"use strict";function r(t){return Array.isArray(t)?t:[t]}function i(t){return t=r(t),t[t.length-1]}e.a=i},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",{staticClass:"fragment-cta"},[n("button",{staticClass:"btn btn-soft",on:{click:t.print}},[t._v("Print")]),t._v(" "),n("button",{staticClass:"btn btn-soft",on:{click:function(e){t.preview=!t.preview}}},[t._v("Preview")])]),t._v(" "),n("iframe",{staticStyle:{border:"0",height:"0px",width:"0px",position:"absolute"},attrs:{id:"ifmcontentstoprint"}}),t._v(" "),n("style-inline",[t._v("\n    #printme {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      padding: 0 0 3rem;\n      overflow: auto;\n      background-color: #1b1f32;\n      z-index: 60;\n    }\n    .print-hidden {\n      margin: 0 auto;\n      padding: 0 5mm;\n      max-width: 22cm;\n    }\n    #printme>.invoice {\n      margin: 0 auto;\n    }\n    .invoice-ctrl {\n      margin: 2rem 0;\n      display: block;\n    }\n    .invoice-ctrl input {\n      width: 14rem;\n    }\n    body {\n      overflow: auto;\n    }\n  ")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.preview,expression:"preview"}],attrs:{id:"printme"}},[n("div",{staticClass:"print-hidden"},[n("div",{staticClass:"invoice-ctrl"},[n("p",[t._v("\n          Klik op 'Bewaren' nadat je verbeteringen aangebracht hebt.\n        ")]),t._v(" "),n("input-single",{attrs:{a:t.a,path:"customer.name",label:"Naam"}}),t._v(" "),n("input-single",{attrs:{a:t.a,path:"customer.address.streetAddress",label:"Straat + nummer"}}),t._v(" "),n("input-single",{attrs:{a:t.a,path:"customer.address.postalCode",label:"Postcode"}}),t._v(" "),n("input-single",{attrs:{a:t.a,path:"customer.address.addressLocality",label:"Stad"}}),t._v(" "),n("input-single",{attrs:{a:t.a,path:"customer.email",label:"E-mailadres"}}),t._v(" "),n("input-single",{attrs:{a:t.a,path:"customer.vatID",label:"Ondernemingsnummer"}})],1),t._v(" "),n("div",{staticClass:"invoice-ctrl"},[n("button",{staticClass:"btn",on:{click:function(e){t.$root.sync(t.a.customer["@id"]||t.a["@id"])}}},[t._v("Bewaren")]),t._v(" "),n("button",{staticClass:"btn",on:{click:t.print}},[t._v("Afdrukken")])])]),t._v(" "),n("div",{staticClass:"invoice invoice-page"},[n("style-inline",[t._v('\n        .bold {\n          font-weight: bold;\n        }\n        .bolder {\n          font-weight: bolder;\n        }\n        .pre-wrap {\n          white-space: pre-wrap;\n        }\n        .method {\n          flex-basis: 100%;\n          margin: 1cm 0 0\n        }\n        .invoice * {\n          box-sizing: border-box;\n        }\n        .invoice a {\n          color: inherit;\n          text-decoration: none;\n          border-bottom: 1px dashed #999;\n        }\n        .invoice a:hover {\n          border-bottom: 2px solid #000;\n        }\n        .invoice h1 {\n          margin: 0;\n          font-size: 1.125em;\n          font-weight: 500;\n        }\n        .invoice h2 {\n          margin: 0;\n          font-size: 1.5em;\n          font-weight: 400;\n          opacity: .5;\n        }\n        .invoice h3 {\n          margin: 0;\n          font-size: 1.125em;\n          font-weight: 500;\n          line-height: 1.6rem;\n        }\n        .invoice h3+p {\n          margin: 0;\n          opacity: .8;\n        }\n        .invoice address>div {\n          white-space: nowrap;\n        }\n        .invoice-top {\n          padding: 2cm 0 1cm;\n        }\n        .invoice-parties {\n          display: flex;\n          align-items: flex-start;\n        }\n        .invoice-start {\n          text-transform: uppercase;\n          font-size: 2em;\n          font-weight: 700;\n          opacity: .4;\n          margin-bottom: 1em;\n        }\n        .invoice-to {\n          text-transform: uppercase;\n          font-size: 1.125em;\n          font-weight: 500;\n          opacity: .6;\n          margin-right: 1em;\n        }\n        .invoice .customer {\n          position: relative;\n          flex-grow: 1;\n        }\n        .invoice .provider {\n          color: #666;\n        }\n        .invoice .summary {\n          background: #eee;\n          display: flex;\n          justify-content: space-between;\n          flex-wrap: wrap;\n          padding: 1cm 2cm;\n        }\n        .invoice .summary-item {\n          font-size: 1.25rem;\n        }\n        .invoice .summary-label {\n          display: block;\n          text-transform: uppercase;\n          font-size: 12px;\n          font-weight: normal;\n        }\n        .invoice .badge {\n          padding: .3em .5em;\n          line-height: 1.2em;\n          background: #888;\n          color: #FFF;\n          text-transform: uppercase;\n          font-size: 1.5em;\n          text-align: center;\n        }\n        .invoice .number {\n          display: block;\n        }\n        .invoice .details {\n          padding-top: 1em;\n          margin-bottom: 1em;\n        }\n        .invoice .list {\n          margin-top: 1em;\n          padding-bottom: 1em;\n        }\n        .invoice .taxes {\n          text-align: right;\n        }\n        .invoice-asterisk {\n          font-weight: 900;\n          color: red;\n        }\n        .tbl {\n          border: 0;\n          border-collapse: collapse;\n          text-align: left;\n        }\n        .tbl td,\n        .tbl th {\n          line-height: 1.4em;\n        }\n        .tbl-orders {\n          width: 100%;\n        }\n        .tbl-orders  td {\n          border-bottom: 1px solid #ccc;\n          padding-top: .5em;\n          padding-bottom: .5em;\n        }\n        .tbl-orders  th {\n          border-bottom: 1px solid #ccc;\n          padding-top: .5em;\n          padding-bottom: 1em;\n          font-size: 12px;\n          font-weight: 400;\n          text-transform: uppercase;\n          color: #666;\n        }\n\n        .tbl-calc {\n          float: right;\n          margin-top: .5em;\n        }\n        .tbl-calc> .e {\n          padding-left: 3em;\n        }\n        .tbl .e {\n          text-align: right;\n          padding-left: 2em;\n          white-space: nowrap;\n          vertical-align: top;\n        }\n        .invoice {\n          font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", sans-serif;\n          color: black;\n          font-size: 16px;\n        }\n        .invoice-page {\n          width: 210mm;\n          min-height: 277mm;\n          padding: 0;\n          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n          background: #fff;\n        }\n        #printme .invoice-subpage {\n          height: 277mm;\n          padding-bottom: 2cm;\n        }\n        .invoice-subpage {\n          height: 277mm;\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n          -webkit-flex-direction: column;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n          -webkit-box-pack: justify;\n          -webkit-justify-content: space-between;\n              -ms-flex-pack: justify;\n                  justify-content: space-between;\n        }\n        .invoice-container {\n          padding-left: 2cm;\n          padding-right: 2cm;\n        }\n        .invoice h3 {\n          margin: 0;\n          font-size: 1.125em;\n          font-weight: 500;\n          line-height: 25px;\n          line-height: 1.6rem;\n        }\n        .invoice p {\n          margin: 1em 0;\n        }\n        .invoice h3+p {\n          margin: 0;\n          opacity: .8;\n          filter: alpha(opacity=80);\n        }\n      ')]),t._v(" "),n("div",{staticClass:"invoice-subpage"},[t.a.provider||t.a.customer?n("div",{staticClass:"invoice-container"},[n("div",{staticClass:"invoice-top"},[n("div",{staticClass:"invoice-start"},[t._v("Factuur")]),t._v(" "),n("div",{staticClass:"invoice-parties"},[n("div",{staticClass:"invoice-to"},[t._v("aan")]),t._v(" "),t.a.customer?n("section",{staticClass:"customer"},[n("h1",[t._v(t._s(t.a.customer.name))]),t._v(" "),n("address",[n("div",[t._v(t._s(t.a.customer.address&&t.a.customer.address.streetAddress))]),t._v(" "),n("div",[t._v(t._s(t.a.customer.address&&t.a.customer.address.postalCode)+" "+t._s(t.a.customer.address&&t.a.customer.address.addressLocality))])]),t._v(" "),n("div",[n("a",{attrs:{href:"mailto:"+t.a.customer.email}},[t._v(t._s(t.a.customer.email))])]),t._v(" "),t.a.customer.email?t._e():n("div",[n("a",{attrs:{href:t.a.customer.url}},[t._v(t._s(t.a.customer.url))])]),t._v(" "),n("div",[t._v(t._s(t.a.customer.vatID))])]):t._e(),t._v(" "),t.a.provider?n("section",{staticClass:"provider"},[t.a.provider.logo?n("img",{attrs:{src:t.a.provider.logo||""}}):t._e(),t._v(" "),n("h1",[t._v(t._s(t.a.provider.name))]),t._v(" "),t.a.provider.address?n("address",[n("div",[t._v(t._s(t.a.provider.address&&t.a.provider.address.streetAddress))]),t._v(" "),n("div",[t._v(t._s(t.a.provider.address&&t.a.provider.address.postalCode)+" "+t._s(t.a.provider.address&&t.a.provider.address.addressLocality))])]):t._e(),t._v(" "),n("div",[n("a",{attrs:{href:"mailto:"+t.a.provider.email}},[t._v(t._s(t.a.provider.email))])]),t._v(" "),t.a.provider.email?t._e():n("div",[n("a",{attrs:{href:t.a.provider.url}},[t._v(t._s(t.a.provider.url))])]),t._v(" "),n("div",[t._v(t._s(t.a.provider.vatID))])]):t._e()])])]):t._e(),t._v(" "),t.dateCreated||t.a.url||t.paymentDueDate?n("section",{staticClass:"summary"},[t.invoiceNumber?n("div",{
staticClass:"summary-item"},[n("span",{staticClass:"summary-label"},[t._v("Factuurnr.")]),t._v(" "),n("div",{staticClass:"number",domProps:{textContent:t._s(t.invoiceNumber)}},[t._v("01 / 2015")])]):t._e(),t._v(" "),t.dateCreated?n("div",{staticClass:"summary-item"},[n("span",{staticClass:"summary-label"},[t._v("Factuurdatum")]),t._v(" "+t._s(t._f("date")(t.a.dateCreated))+"\n          ")]):t._e(),t._v(" "),t.paymentDueDate?n("div",{staticClass:"summary-item bolder"},[n("span",{staticClass:"summary-label"},[t._v("Vervaldatum")]),t._v(" "+t._s(t._f("date")(t.paymentDueDate))+"\n          ")]):t._e(),t._v(" "),t.total?n("div",{staticClass:"summary-item bolder"},[n("span",{staticClass:"summary-label"},[t._v("Totaalbedrag")]),t._v(" € "+t._s(t.total)+"\n          ")]):t._e(),t._v(" "),t.a.paymentMethod?n("p",{staticClass:"method",domProps:{innerHTML:t._s(t.a.paymentMethod)}}):t._e()]):t._e(),t._v(" "),t.a.referencesOrder?n("section",{staticClass:"list invoice-container"},[n("table",{staticClass:"tbl tbl-orders"},[t._m(0),t._v(" "),n("tbody",t._l(t.orders,function(e){return n("tr",[n("td",[e.orderedItem.name?n("h3",[t._v(t._s(e.orderedItem.name))]):t._e(),t._v(" "),e.orderedItem.description?n("p",{staticClass:"pre-wrap"},[t._v(t._s(e.orderedItem.description))]):t._e()]),t._v(" "),n("td",{staticClass:"e"},[e.acceptedOffer.price?n("span",[t._v("\n                  € "+t._s(e.acceptedOffer.price||0)+"\n                  ")]):t._e()])])}))]),t._v(" "),t.totalPaymentDue?n("table",{staticClass:"tbl tbl-calc"},[n("tbody",t._l(t.totalPaymentDue,function(e,r){return n("tr",{key:r,class:{bold:e.valueAddedTaxIncluded}},[n("td",[t._v(t._s(e.name)+" "),e.asterisk?n("span",{staticClass:"invoice-asterisk"},[t._v("*")]):t._e()]),t._v(" "),void 0!=e.price?n("td",{staticClass:"e"},[t._v("€ "+t._s(e.price))]):t._e()])}))]):t._e(),t._v(" "),t.taxExemptionRule?n("p",{staticStyle:{float:"right","text-align":"right",width:"100%"}},[n("span",{staticClass:"invoice-asterisk"},[t._v("*")]),t._v(" Bijzondere vrijstellingsregeling kleine ondernemingen   \n          ")]):t._e()]):t._e(),t._v(" "),t.a.provider?n("footer",{staticClass:"invoice-container"},[n("strong",[t._v(t._s(t.a.provider.name))]),t._v(" "),t.a.provider.address?n("i",[t._v("   •   "+t._s(t.a.provider.address.streetAddress)+", "+t._s(t.a.provider.address.postalCode)+" "+t._s(t.a.provider.address.addressLocality))]):t._e(),t._v(" "),t.a.provider.vatID?n("span",[t._v("  •   "+t._s(t.a.provider.vatID))]):t._e()]):t._e()])],1),t._v(" "),n("div",{staticClass:"print-hidden"},[n("div",{staticClass:"invoice-ctrl"},[n("button",{staticClass:"btn btn-soft",on:{click:function(e){t.preview=0}}},[t._v("Close")])])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("Beschrijving")]),t._v(" "),n("th",{staticClass:"e"},[t._v("Bedrag")])])])}]}},,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(96),i=n.n(r);window.Invoice=i.a}]);
//# sourceMappingURL=Invoice.c6a5c12f.js.map