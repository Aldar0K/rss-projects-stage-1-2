(()=>{"use strict";var e,t,r,n,o,a,i,c={506:(e,t,r)=>{r(279);function n(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,d=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){d=!0,i=e},f:function(){try{c||null==r.return||r.return()}finally{if(d)throw i}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var a=document.createElement("div");a.classList.add("container"),a.id="container",document.body.append(a);var i=document.createElement("h1");i.textContent="Virtual keyboard RS School",i.classList.add("title"),a.append(i);var c=document.createElement("textarea");c.classList.add("textarea","keyboard__textarea"),a.append(c);var d=document.createElement("p");d.textContent+="К сожалению я не успел доделать работу до дедлайна. ",d.textContent+="Буду очень признателен, если вы проверите мою работу немного позже.",d.classList.add("info"),a.append(d);var s={elements:{main:null,keysContainer:null,keys:[]},eventHandlers:{oninput:null,onclose:null},properties:{value:"",capsLock:!1},layouts:{enLayout:["`","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","del","caps","a","s","d","f","g","h","j","k","l",";","'","enter","lshift","z","x","c","v","b","n","m",",",".","/","up","rshift","done","ctrl","win","alt","space","alt","left","down","right","ctrl"],ruLayout:["ё","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","й","ц","у","к","е","н","г","ш","щ","з","х","ъ","\\","del","caps","ф","ы","в","а","п","р","о","л","д","ж","э","enter","lshift","я","ч","с","м","и","т","ь","б","ю",".","up","rshift","done","ctrl","win","alt","space","alt","left","down","right","ctrl"]},_getCurrentLayout:function(){return localStorage.getItem("layoutLang")},init:function(){var e=this;this.elements.main=document.createElement("div"),this.elements.keysContainer=document.createElement("div"),this.elements.main.classList.add("keyboard","keyboard_hidden"),this.elements.keysContainer.classList.add("keyboard__keys"),this.elements.keysContainer.appendChild(this._createKeys(this._getCurrentLayout())),this.elements.keys=this.elements.keysContainer.querySelectorAll(".keyboard__key"),this.elements.main.append(this.elements.keysContainer),document.body.append(this.elements.main),document.querySelectorAll(".keyboard__textarea").forEach((function(t){t.addEventListener("focus",(function(){e.open(t.value,(function(e){t.value=e}))}))}))},_createKeys:function(e){var t=this,r=this.layouts.enLayout;"ru"===e&&(r=this.layouts.ruLayout);var n=document.createDocumentFragment(),o=function(e){return'<i class="material-icons">'.concat(e,"</i>")};return r.forEach((function(e){var r=document.createElement("div"),a=-1!==["backspace","del","enter","done"].indexOf(e);switch(r.setAttribute("type","button"),r.classList.add("keyboard__key"),e){case"backspace":r.classList.add("keyboard__key_wide","keyboard__key_dark"),r.id="backspace",r.innerHTML=o("backspace"),r.addEventListener("click",(function(){t.properties.value=t.properties.value.substring(0,t.properties.value.length-1),t._triggerEvent("oninput")}));break;case"del":r.classList.add("keyboard__key_wide","keyboard__key_dark"),r.id="del",r.textContent="Del",r.addEventListener("click",(function(){t.properties.value=t.properties.value.substring(0,t.properties.value.length-1),t._triggerEvent("oninput")}));break;case"caps":r.classList.add("keyboard__key_wide","keyboard__key_activatable","keyboard__key_dark"),r.id="caps",r.innerHTML=o("keyboard_capslock"),r.addEventListener("click",(function(){t._toogleCapseLock(),r.classList.toggle("keyboard__key_active",t.properties.capsLock)}));break;case"lshift":r.classList.add("keyboard__key_wide","keyboard__key_dark"),r.id="lshift",r.textContent="Shift",r.addEventListener("mousedown",(function(){t._toogleCapseLock(),r.classList.toggle("keyboard__key_active",t.properties.capsLock)})),r.addEventListener("mouseup",(function(){t._toogleCapseLock(),r.classList.toggle("keyboard__key_active",t.properties.capsLock)}));break;case"rshift":r.classList.add("keyboard__key_wide","keyboard__key_dark"),r.id="rshift",r.textContent="Shift",r.addEventListener("mousedown",(function(){t._toogleCapseLock(),r.classList.toggle("keyboard__key_active",t.properties.capsLock)})),r.addEventListener("mouseup",(function(){t._toogleCapseLock(),r.classList.toggle("keyboard__key_active",t.properties.capsLock)}));break;case"enter":r.classList.add("keyboard__key_wide","keyboard__key_dark"),r.id="enter",r.innerHTML=o("keyboard_return"),r.addEventListener("click",(function(){t.properties.value+="\n",t._triggerEvent("oninput")}));break;case"space":r.classList.add("keyboard__key_extra-wide"),r.id="space",r.innerHTML=o("space_bar"),r.addEventListener("click",(function(){t.properties.value+=" ",t._triggerEvent("oninput")}));break;case"done":r.classList.add("keyboard__key_wide","keyboard__key_dark"),r.innerHTML=o("check_circle"),r.addEventListener("click",(function(){t.close(),t._triggerEvent("onclose")}));break;case"tab":r.classList.add("keyboard__key_wide","keyboard__key_dark"),r.id="tab",r.innerHTML=o("keyboard_tab"),r.addEventListener("click",(function(){t.properties.value+="    ",t._triggerEvent("oninput")}));break;case"ctrl":r.classList.add("keyboard__key_dark"),r.textContent="Ctrl",r.addEventListener("click",(function(){t._triggerEvent("oninput")}));break;case"alt":r.classList.add("keyboard__key_dark"),r.textContent="Alt",r.addEventListener("click",(function(){t._triggerEvent("oninput")}));break;case"win":r.classList.add("keyboard__key_dark"),r.textContent="Win",r.addEventListener("click",(function(){t._triggerEvent("oninput")}));break;case"up":r.classList.add("keyboard__key_dark"),r.innerHTML=o("keyboard_arrow_up"),r.addEventListener("click",(function(){t.properties.value+="↑",t._triggerEvent("oninput")}));break;case"down":r.classList.add("keyboard__key_dark"),r.innerHTML=o("keyboard_arrow_down"),r.addEventListener("click",(function(){t.properties.value+="↓",t._triggerEvent("oninput")}));break;case"left":r.classList.add("keyboard__key_dark"),r.innerHTML=o("keyboard_arrow_left"),r.addEventListener("click",(function(){t.properties.value+="←",t._triggerEvent("oninput")}));break;case"right":r.classList.add("keyboard__key_dark"),r.innerHTML=o("keyboard_arrow_right"),r.addEventListener("click",(function(){t.properties.value+="→",t._triggerEvent("oninput")}));break;default:r.textContent=e.toLowerCase(),r.addEventListener("click",(function(){t.properties.value+=t.properties.capsLock?e.toUpperCase():e,t._triggerEvent("oninput")}))}n.append(r),a&&n.append(document.createElement("br"))})),n},_triggerEvent:function(e){"function"==typeof this.eventHandlers[e]&&this.eventHandlers[e](this.properties.value)},_toogleCapseLock:function(){this.properties.capsLock=!this.properties.capsLock;var e,t=n(this.elements.keys);try{for(t.s();!(e=t.n()).done;){var r=e.value;1===r.innerHTML.length&&(r.textContent=this.properties.capsLock?r.textContent.toUpperCase():r.textContent.toLowerCase())}}catch(e){t.e(e)}finally{t.f()}},_switchLang:function(e){},open:function(e,t,r){this.properties.value=e||"",this.eventHandlers.oninput=t,this.eventHandlers.onclose=r,this.elements.main.classList.remove("keyboard_hidden")},close:function(){this.properties.value="",this.eventHandlers.oninput=oninput,this.eventHandlers.onclose=onclose,this.elements.main.classList.add("keyboard_hidden")}};window.addEventListener("DOMContentLoaded",(function(){s.init(),s.open()}));window.addEventListener("keydown",(function(e){for(var t=s.elements.keys,r=0;r<t.length;r++)e.key.toLowerCase()==t[r].textContent.toLowerCase()&&(console.log(e.key),s.properties.value+=t[r].textContent,t[r].classList.add("keyboard__key_active")),"CapsLock"===e.code&&(document.querySelector("#caps").classList.toggle("keyboard__key_active"),s._toogleCapseLock()),"Backspace"===e.code&&document.querySelector("#backspace").classList.add("keyboard__key_active"),"Space"===e.code&&document.querySelector("#space").classList.add("keyboard__key_active"),"Tab"===e.code&&(document.querySelector("#tab").classList.add("keyboard__key_active"),s.properties.value+="    "),e.code})),window.addEventListener("keyup",(function(e){for(var t=s.elements.keys,r=0;r<t.length;r++)e.key.toLowerCase()==t[r].textContent.toLowerCase()&&t[r].classList.remove("keyboard__key_active");document.querySelector("#space").classList.remove("keyboard__key_active")}))},783:(e,t,r)=>{var n=r(618),o=Object.create(null),a="undefined"==typeof document,i=Array.prototype.forEach;function c(){}function d(e,t){if(!t){if(!e.href)return;t=e.href.split("?")[0]}if(u(t)&&!1!==e.isLoaded&&t&&t.indexOf(".css")>-1){e.visited=!0;var r=e.cloneNode();r.isLoaded=!1,r.addEventListener("load",(function(){r.isLoaded||(r.isLoaded=!0,e.parentNode.removeChild(e))})),r.addEventListener("error",(function(){r.isLoaded||(r.isLoaded=!0,e.parentNode.removeChild(e))})),r.href="".concat(t,"?").concat(Date.now()),e.nextSibling?e.parentNode.insertBefore(r,e.nextSibling):e.parentNode.appendChild(r)}}function s(e){if(!e)return!1;var t=document.querySelectorAll("link"),r=!1;return i.call(t,(function(t){if(t.href){var o=function(e,t){var r;return e=n(e),t.some((function(n){e.indexOf(t)>-1&&(r=n)})),r}(t.href,e);u(o)&&!0!==t.visited&&o&&(d(t,o),r=!0)}})),r}function l(){var e=document.querySelectorAll("link");i.call(e,(function(e){!0!==e.visited&&d(e)}))}function u(e){return!!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e)}e.exports=function(e,t){if(a)return console.log("no window.document found, will not HMR CSS"),c;var r,i,d,u=function(e){var t=o[e];if(!t){if(document.currentScript)t=document.currentScript.src;else{var r=document.getElementsByTagName("script"),a=r[r.length-1];a&&(t=a.src)}o[e]=t}return function(e){if(!t)return null;var r=t.split(/([^\\/]+)\.js$/),o=r&&r[1];return o&&e?e.split(",").map((function(e){var r=new RegExp("".concat(o,"\\.js$"),"g");return n(t.replace(r,"".concat(e.replace(/{fileName}/g,o),".css")))})):[t.replace(".js",".css")]}}(e);return r=function(){var e=u(t.filename),r=s(e);if(t.locals)return console.log("[HMR] Detected local css modules. Reload all css"),void l();r?console.log("[HMR] css reload %s",e.join(" ")):(console.log("[HMR] Reload all css"),l())},i=50,d=0,function(){var e=this,t=arguments,n=function(){return r.apply(e,t)};clearTimeout(d),d=setTimeout(n,i)}}},618:e=>{e.exports=function(e){if(e=e.trim(),/^data:/i.test(e))return e;var t=-1!==e.indexOf("//")?e.split("//")[0]+"//":"",r=e.replace(new RegExp(t,"i"),"").split("/"),n=r[0].toLowerCase().replace(/\.$/,"");return r[0]="",t+n+r.reduce((function(e,t){switch(t){case"..":e.pop();break;case".":break;default:e.push(t)}return e}),[]).join("/")}},279:(e,t,r)=>{var n=r(783)(e.id,{locals:!1});e.hot.dispose(n),e.hot.accept(void 0,n)}},d={};function s(e){var t=d[e];if(void 0!==t){if(void 0!==t.error)throw t.error;return t.exports}var r=d[e]={id:e,exports:{}};try{var n={id:e,module:r,factory:c[e],require:s};s.i.forEach((function(e){e(n)})),r=n.module,n.factory.call(r.exports,r,r.exports,n.require)}catch(e){throw r.error=e,e}return r.exports}s.m=c,s.c=d,s.i=[],s.hu=e=>e+"."+s.h()+".hot-update.js",s.miniCssF=e=>{},s.hmrF=()=>"main."+s.h()+".hot-update.json",s.h=()=>"7b532412c696ebc10e0d",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="virtual-keyboard:",s.l=(r,n,o,a)=>{if(e[r])e[r].push(n);else{var i,c;if(void 0!==o)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var u=d[l];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+o){i=u;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,s.nc&&i.setAttribute("nonce",s.nc),i.setAttribute("data-webpack",t+o),i.src=r),e[r]=[n];var p=(t,n)=>{i.onerror=i.onload=null,clearTimeout(f);var o=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(n))),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}},(()=>{var e,t,r,n={},o=s.c,a=[],i=[],c="idle",d=0,l=[];function u(e){c=e;for(var t=[],r=0;r<i.length;r++)t[r]=i[r].call(null,e);return Promise.all(t)}function p(){0==--d&&u("ready").then((function(){if(0===d){var e=l;l=[];for(var t=0;t<e.length;t++)e[t]()}}))}function f(e){if("idle"!==c)throw new Error("check() is only allowed in idle status");return u("check").then(s.hmrM).then((function(r){return r?u("prepare").then((function(){var n=[];return t=[],Promise.all(Object.keys(s.hmrC).reduce((function(e,o){return s.hmrC[o](r.c,r.r,r.m,e,t,n),e}),[])).then((function(){return t=function(){return e?v(e):u("ready").then((function(){return n}))},0===d?t():new Promise((function(e){l.push((function(){e(t())}))}));var t}))})):u(y()?"ready":"idle").then((function(){return null}))}))}function h(e){return"ready"!==c?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status (state: "+c+")")})):v(e)}function v(e){e=e||{},y();var n=t.map((function(t){return t(e)}));t=void 0;var o=n.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return u("abort").then((function(){throw o[0]}));var a=u("dispose");n.forEach((function(e){e.dispose&&e.dispose()}));var i,c=u("apply"),d=function(e){i||(i=e)},s=[];return n.forEach((function(e){if(e.apply){var t=e.apply(d);if(t)for(var r=0;r<t.length;r++)s.push(t[r])}})),Promise.all([a,c]).then((function(){return i?u("fail").then((function(){throw i})):r?v(e).then((function(e){return s.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e})):u("idle").then((function(){return s}))}))}function y(){if(r)return t||(t=[]),Object.keys(s.hmrI).forEach((function(e){r.forEach((function(r){s.hmrI[e](r,t)}))})),r=void 0,!0}s.hmrD=n,s.i.push((function(l){var v,y,k,_,m=l.module,b=function(t,r){var n=o[r];if(!n)return t;var i=function(i){if(n.hot.active){if(o[i]){var c=o[i].parents;-1===c.indexOf(r)&&c.push(r)}else a=[r],e=i;-1===n.children.indexOf(i)&&n.children.push(i)}else console.warn("[HMR] unexpected require("+i+") from disposed module "+r),a=[];return t(i)},s=function(e){return{configurable:!0,enumerable:!0,get:function(){return t[e]},set:function(r){t[e]=r}}};for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&"e"!==l&&Object.defineProperty(i,l,s(l));return i.e=function(e){return function(e){switch(c){case"ready":u("prepare");case"prepare":return d++,e.then(p,p),e;default:return e}}(t.e(e))},i}(l.require,l.id);m.hot=(v=l.id,y=m,_={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:k=e!==v,_requireSelf:function(){a=y.parents.slice(),e=k?void 0:v,s(v)},active:!0,accept:function(e,t,r){if(void 0===e)_._selfAccepted=!0;else if("function"==typeof e)_._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var n=0;n<e.length;n++)_._acceptedDependencies[e[n]]=t||function(){},_._acceptedErrorHandlers[e[n]]=r;else _._acceptedDependencies[e]=t||function(){},_._acceptedErrorHandlers[e]=r},decline:function(e){if(void 0===e)_._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)_._declinedDependencies[e[t]]=!0;else _._declinedDependencies[e]=!0},dispose:function(e){_._disposeHandlers.push(e)},addDisposeHandler:function(e){_._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=_._disposeHandlers.indexOf(e);t>=0&&_._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,c){case"idle":t=[],Object.keys(s.hmrI).forEach((function(e){s.hmrI[e](v,t)})),u("ready");break;case"ready":Object.keys(s.hmrI).forEach((function(e){s.hmrI[e](v,t)}));break;case"prepare":case"check":case"dispose":case"apply":(r=r||[]).push(v)}},check:f,apply:h,status:function(e){if(!e)return c;i.push(e)},addStatusHandler:function(e){i.push(e)},removeStatusHandler:function(e){var t=i.indexOf(e);t>=0&&i.splice(t,1)},data:n[v]},e=void 0,_),m.parents=a,m.children=[],a=[],l.require=b})),s.hmrC={},s.hmrI={}})(),(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),r=(e,t,r,n)=>{var o=document.createElement("link");return o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=a=>{if(o.onerror=o.onload=null,"load"===a.type)r();else{var i=a&&("load"===a.type?"missing":a.type),c=a&&a.target&&a.target.href||t,d=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");d.code="CSS_CHUNK_LOAD_FAILED",d.type=i,d.request=c,o.parentNode.removeChild(o),n(d)}},o.href=t,document.head.appendChild(o),o},n=(e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=(i=r[n]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===t))return i}var a=document.getElementsByTagName("style");for(n=0;n<a.length;n++){var i;if((o=(i=a[n]).getAttribute("data-href"))===e||o===t)return i}},o=[],a=[],i=e=>({dispose:()=>{for(var e=0;e<o.length;e++){var t=o[e];t.parentNode&&t.parentNode.removeChild(t)}o.length=0},apply:()=>{for(var e=0;e<a.length;e++)a[e].rel="stylesheet";a.length=0}}),s.hmrC.miniCss=(e,t,c,d,l,u)=>{l.push(i),e.forEach((e=>{var t=s.miniCssF(e),i=s.p+t,c=n(t,i);c&&d.push(new Promise(((t,n)=>{var d=r(e,i,(()=>{d.as="style",d.rel="preload",t()}),n);o.push(c),a.push(d)})))}))},(()=>{var e,t,r,n,o,a=s.hmrS_jsonp=s.hmrS_jsonp||{179:0},i={};function c(t,r){return e=r,new Promise(((e,r)=>{i[t]=e;var n=s.p+s.hu(t),o=new Error;s.l(n,(e=>{if(i[t]){i[t]=void 0;var n=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;o.message="Loading hot update chunk "+t+" failed.\n("+n+": "+a+")",o.name="ChunkLoadError",o.type=n,o.request=a,r(o)}}))}))}function d(e){function i(e){for(var t=[e],r={},n=t.map((function(e){return{chain:[e],id:e}}));n.length>0;){var o=n.pop(),a=o.id,i=o.chain,d=s.c[a];if(d&&(!d.hot._selfAccepted||d.hot._selfInvalidated)){if(d.hot._selfDeclined)return{type:"self-declined",chain:i,moduleId:a};if(d.hot._main)return{type:"unaccepted",chain:i,moduleId:a};for(var l=0;l<d.parents.length;l++){var u=d.parents[l],p=s.c[u];if(p){if(p.hot._declinedDependencies[a])return{type:"declined",chain:i.concat([u]),moduleId:a,parentId:u};-1===t.indexOf(u)&&(p.hot._acceptedDependencies[a]?(r[u]||(r[u]=[]),c(r[u],[a])):(delete r[u],t.push(u),n.push({chain:i.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:r}}function c(e,t){for(var r=0;r<t.length;r++){var n=t[r];-1===e.indexOf(n)&&e.push(n)}}s.f&&delete s.f.jsonpHmr,t=void 0;var d={},l=[],u={},p=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var f in r)if(s.o(r,f)){var h,v=r[f],y=!1,k=!1,_=!1,m="";switch((h=v?i(f):{type:"disposed",moduleId:f}).chain&&(m="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(y=new Error("Aborted because of self decline: "+h.moduleId+m));break;case"declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(y=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+m));break;case"unaccepted":e.onUnaccepted&&e.onUnaccepted(h),e.ignoreUnaccepted||(y=new Error("Aborted because "+f+" is not accepted"+m));break;case"accepted":e.onAccepted&&e.onAccepted(h),k=!0;break;case"disposed":e.onDisposed&&e.onDisposed(h),_=!0;break;default:throw new Error("Unexception type "+h.type)}if(y)return{error:y};if(k)for(f in u[f]=v,c(l,h.outdatedModules),h.outdatedDependencies)s.o(h.outdatedDependencies,f)&&(d[f]||(d[f]=[]),c(d[f],h.outdatedDependencies[f]));_&&(c(l,[h.moduleId]),u[f]=p)}r=void 0;for(var b,g=[],L=0;L<l.length;L++){var E=l[L],w=s.c[E];w&&(w.hot._selfAccepted||w.hot._main)&&u[E]!==p&&!w.hot._selfInvalidated&&g.push({module:E,require:w.hot._requireSelf,errorHandler:w.hot._selfAccepted})}return{dispose:function(){var e;n.forEach((function(e){delete a[e]})),n=void 0;for(var t,r=l.slice();r.length>0;){var o=r.pop(),i=s.c[o];if(i){var c={},u=i.hot._disposeHandlers;for(L=0;L<u.length;L++)u[L].call(null,c);for(s.hmrD[o]=c,i.hot.active=!1,delete s.c[o],delete d[o],L=0;L<i.children.length;L++){var p=s.c[i.children[L]];p&&((e=p.parents.indexOf(o))>=0&&p.parents.splice(e,1))}}}for(var f in d)if(s.o(d,f)&&(i=s.c[f]))for(b=d[f],L=0;L<b.length;L++)t=b[L],(e=i.children.indexOf(t))>=0&&i.children.splice(e,1)},apply:function(t){for(var r in u)s.o(u,r)&&(s.m[r]=u[r]);for(var n=0;n<o.length;n++)o[n](s);for(var a in d)if(s.o(d,a)){var i=s.c[a];if(i){b=d[a];for(var c=[],p=[],f=[],h=0;h<b.length;h++){var v=b[h],y=i.hot._acceptedDependencies[v],k=i.hot._acceptedErrorHandlers[v];if(y){if(-1!==c.indexOf(y))continue;c.push(y),p.push(k),f.push(v)}}for(var _=0;_<c.length;_++)try{c[_].call(null,b)}catch(r){if("function"==typeof p[_])try{p[_](r,{moduleId:a,dependencyId:f[_]})}catch(n){e.onErrored&&e.onErrored({type:"accept-error-handler-errored",moduleId:a,dependencyId:f[_],error:n,originalError:r}),e.ignoreErrored||(t(n),t(r))}else e.onErrored&&e.onErrored({type:"accept-errored",moduleId:a,dependencyId:f[_],error:r}),e.ignoreErrored||t(r)}}}for(var m=0;m<g.length;m++){var L=g[m],E=L.module;try{L.require(E)}catch(r){if("function"==typeof L.errorHandler)try{L.errorHandler(r,{moduleId:E,module:s.c[E]})}catch(n){e.onErrored&&e.onErrored({type:"self-accept-error-handler-errored",moduleId:E,error:n,originalError:r}),e.ignoreErrored||(t(n),t(r))}else e.onErrored&&e.onErrored({type:"self-accept-errored",moduleId:E,error:r}),e.ignoreErrored||t(r)}}return l}}}self.webpackHotUpdatevirtual_keyboard=(t,n,a)=>{for(var c in n)s.o(n,c)&&(r[c]=n[c],e&&e.push(c));a&&o.push(a),i[t]&&(i[t](),i[t]=void 0)},s.hmrI.jsonp=function(e,t){r||(r={},o=[],n=[],t.push(d)),s.o(r,e)||(r[e]=s.m[e])},s.hmrC.jsonp=function(e,i,l,u,p,f){p.push(d),t={},n=i,r=l.reduce((function(e,t){return e[t]=!1,e}),{}),o=[],e.forEach((function(e){s.o(a,e)&&void 0!==a[e]?(u.push(c(e,f)),t[e]=!0):t[e]=!1})),s.f&&(s.f.jsonpHmr=function(e,r){t&&s.o(t,e)&&!t[e]&&(r.push(c(e)),t[e]=!0)})},s.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(s.p+s.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})();s(506)})();