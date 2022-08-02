'use strict';

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$3=Symbol(),n$5=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$5.get(this.cssText);return t$1&&void 0===e&&(n$5.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",e$3),r$2=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,e$3)},i$2=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window.trustedTypes,r$1=e$2?e$2.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$2={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$4=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$4};class a$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l$2){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$2.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$2.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$4)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_());}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i$1=globalThis.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e$1,n$3=`<${o$1}>`,l$1=document,h=(t="")=>l$1.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea|title)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$3:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$1+y):s+e$1+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$1),s=t.length-1;if(s>0){l.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$1,t+1));)c.push({type:7,index:r}),t+=e$1.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t));}$(t){this._$AH!==w&&r(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.A(h()),this.A(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$1?i$1.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.2.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i(e,n)}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

const bulmaStyles = r$2`
/**
* Calculate the contrast ratio between two colors.
* See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
*/
/**
* Determine whether to use dark or light text on top of given color.
* Returns black for dark text and white for light text.
*/
/**
* sets the elements color
*/
.is-white {
  color: white !important;
}

.is-black {
  color: black !important;
}

.is-mint {
  color: #1fc2a7 !important;
}

.is-mint-darker-10 {
  color: #1caf96 !important;
}

.is-mint-darker-20 {
  color: #199b86 !important;
}

.is-mint-darker-30 {
  color: #168875 !important;
}

.is-mint-darker-40 {
  color: #137464 !important;
}

.is-mint-darker-50 {
  color: #106154 !important;
}

.is-mint-darker-60 {
  color: #0c4e43 !important;
}

.is-mint-darker-70 {
  color: #093a32 !important;
}

.is-mint-darker-80 {
  color: #062721 !important;
}

.is-mint-darker-90 {
  color: #031311 !important;
}

.is-mint-lighter-10 {
  color: #35c8b0 !important;
}

.is-mint-lighter-20 {
  color: #4cceb9 !important;
}

.is-mint-lighter-30 {
  color: #62d4c1 !important;
}

.is-mint-lighter-40 {
  color: #79daca !important;
}

.is-mint-lighter-50 {
  color: #8fe1d3 !important;
}

.is-mint-lighter-60 {
  color: #a5e7dc !important;
}

.is-mint-lighter-70 {
  color: #bcede5 !important;
}

.is-mint-lighter-80 {
  color: #d2f3ed !important;
}

.is-mint-lighter-90 {
  color: #e9f9f6 !important;
}

.is-lightblue {
  color: #4FB3D9 !important;
}

.is-lightblue-darker-10 {
  color: #47a1c3 !important;
}

.is-lightblue-darker-20 {
  color: #3f8fae !important;
}

.is-lightblue-darker-30 {
  color: #377d98 !important;
}

.is-lightblue-darker-40 {
  color: #2f6b82 !important;
}

.is-lightblue-darker-50 {
  color: #285a6d !important;
}

.is-lightblue-darker-60 {
  color: #204857 !important;
}

.is-lightblue-darker-70 {
  color: #183641 !important;
}

.is-lightblue-darker-80 {
  color: #081216 !important;
}

.is-lightblue-darker-80 {
  color: #081216 !important;
}

.is-lightblue-lighter-10 {
  color: #61bbdd !important;
}

.is-lightblue-lighter-20 {
  color: #72c2e1 !important;
}

.is-lightblue-lighter-30 {
  color: #84cae4 !important;
}

.is-lightblue-lighter-40 {
  color: #95d1e8 !important;
}

.is-lightblue-lighter-50 {
  color: #a7d9ec !important;
}

.is-lightblue-lighter-60 {
  color: #b9e1f0 !important;
}

.is-lightblue-lighter-70 {
  color: #cae8f4 !important;
}

.is-lightblue-lighter-80 {
  color: #dcf0f7 !important;
}

.is-lightblue-lighter-90 {
  color: #edf7fb !important;
}

.is-darkblue {
  color: #2D3E50 !important;
}

.is-darkblue-darker-10 {
  color: #293848 !important;
}

.is-darkblue-darker-20 {
  color: #243240 !important;
}

.is-darkblue-darker-30 {
  color: #1f2b38 !important;
}

.is-darkblue-darker-40 {
  color: #1b2530 !important;
}

.is-darkblue-darker-50 {
  color: #171f28 !important;
}

.is-darkblue-darker-60 {
  color: #121920 !important;
}

.is-darkblue-darker-70 {
  color: #0d1318 !important;
}

.is-darkblue-darker-80 {
  color: #090c10 !important;
}

.is-darkblue-darker-90 {
  color: #040608 !important;
}

.is-darkblue-lighter-10 {
  color: #425162 !important;
}

.is-darkblue-lighter-20 {
  color: #576573 !important;
}

.is-darkblue-lighter-30 {
  color: #6c7885 !important;
}

.is-darkblue-lighter-40 {
  color: #818b96 !important;
}

.is-darkblue-lighter-50 {
  color: #969fa8 !important;
}

.is-darkblue-lighter-60 {
  color: #abb2b9 !important;
}

.is-darkblue-lighter-70 {
  color: #c0c5cb !important;
}

.is-darkblue-lighter-80 {
  color: #d5d8dc !important;
}

.is-darkblue-lighter-90 {
  color: #eaecee !important;
}

.is-yellow {
  color: #F9CD69 !important;
}

.is-yellow-darker-10 {
  color: #e6ad00 !important;
}

.is-yellow-darker-20 {
  color: #cc9a00 !important;
}

.is-yellow-darker-30 {
  color: #b38600 !important;
}

.is-yellow-darker-40 {
  color: #997300 !important;
}

.is-yellow-darker-50 {
  color: #806000 !important;
}

.is-yellow-darker-60 {
  color: #664d00 !important;
}

.is-yellow-darker-70 {
  color: #4c3a00 !important;
}

.is-yellow-darker-80 {
  color: #332600 !important;
}

.is-yellow-darker-90 {
  color: #191300 !important;
}

.is-yellow-lighter-10 {
  color: #ffc61a !important;
}

.is-yellow-lighter-20 {
  color: #ffcd33 !important;
}

.is-yellow-lighter-30 {
  color: #ffd34d !important;
}

.is-yellow-lighter-40 {
  color: #ffd966 !important;
}

.is-yellow-lighter-50 {
  color: #ffe080 !important;
}

.is-yellow-lighter-60 {
  color: #ffe699 !important;
}

.is-yellow-lighter-70 {
  color: #ffecb3 !important;
}

.is-yellow-lighter-80 {
  color: #fff2cc !important;
}

.is-yellow-lighter-90 {
  color: #fff9e6 !important;
}

.is-olive {
  color: #b4ce82 !important;
}

.is-olive-darker-10 {
  color: #a2b975 !important;
}

.is-olive-darker-20 {
  color: #90a568 !important;
}

.is-olive-darker-30 {
  color: #7e905b !important;
}

.is-olive-darker-40 {
  color: #6c7c4e !important;
}

.is-olive-darker-50 {
  color: #5a6741 !important;
}

.is-olive-darker-60 {
  color: #485234 !important;
}

.is-olive-darker-70 {
  color: #363e27 !important;
}

.is-olive-darker-80 {
  color: #24291a !important;
}

.is-olive-darker-90 {
  color: #12150d !important;
}

.is-olive-lighter-10 {
  color: #bcd38f !important;
}

.is-olive-lighter-20 {
  color: #c3d89b !important;
}

.is-olive-lighter-30 {
  color: #cbdda8 !important;
}

.is-olive-lighter-40 {
  color: #d2e2b4 !important;
}

.is-olive-lighter-50 {
  color: #dae7c1 !important;
}

.is-olive-lighter-60 {
  color: #e1ebcd !important;
}

.is-olive-lighter-70 {
  color: #e9f0da !important;
}

.is-olive-lighter-80 {
  color: #f0f5e6 !important;
}

.is-olive-lighter-90 {
  color: #f8faf3 !important;
}

.is-red {
  color: #c21f3a !important;
}

.is-red-darker-10 {
  color: #AE1B34 !important;
}

.is-red-darker-20 {
  color: #9B182E !important;
}

.is-red-darker-30 {
  color: #871528 !important;
}

.is-red-darker-40 {
  color: #741222 !important;
}

.is-red-darker-50 {
  color: #600F1D !important;
}

.is-red-darker-60 {
  color: #4D0C17 !important;
}

.is-red-darker-70 {
  color: #3A0911 !important;
}

.is-red-darker-80 {
  color: #26060B !important;
}

.is-red-darker-90 {
  color: #130305 !important;
}

.is-red-lighter-10 {
  color: #C8354D !important;
}

.is-red-lighter-20 {
  color: #CE4B61 !important;
}

.is-red-lighter-30 {
  color: #D46275 !important;
}

.is-red-lighter-40 {
  color: #DA7888 !important;
}

.is-red-lighter-50 {
  color: #E08F9C !important;
}

.is-red-lighter-60 {
  color: #E6A5B0 !important;
}

.is-red-lighter-70 {
  color: #ECBBC3 !important;
}

.is-red-lighter-80 {
  color: #F2D2D7 !important;
}

.is-red-lighter-90 {
  color: #F8E8EB !important;
}

/**
* sets the background color with the correct contrast color for text
*/
.has-bg-white {
  background-color: white !important;
  color: black !important;
}

.has-bg-black {
  background-color: black !important;
  color: white !important;
}

.has-bg-mint {
  background-color: #1fc2a7 !important;
  color: black !important;
}

.has-bg-mint-darker-10 {
  background-color: #1caf96 !important;
  color: black !important;
}

.has-bg-mint-darker-20 {
  background-color: #199b86 !important;
  color: black !important;
}

.has-bg-mint-darker-30 {
  background-color: #168875 !important;
  color: black !important;
}

.has-bg-mint-darker-40 {
  background-color: #137464 !important;
  color: white !important;
}

.has-bg-mint-darker-50 {
  background-color: #106154 !important;
  color: white !important;
}

.has-bg-mint-darker-60 {
  background-color: #0c4e43 !important;
  color: white !important;
}

.has-bg-mint-darker-70 {
  background-color: #093a32 !important;
  color: white !important;
}

.has-bg-mint-darker-80 {
  background-color: #062721 !important;
  color: white !important;
}

.has-bg-mint-darker-90 {
  background-color: #031311 !important;
  color: white !important;
}

.has-bg-mint-lighter-10 {
  background-color: #35c8b0 !important;
  color: black !important;
}

.has-bg-mint-lighter-20 {
  background-color: #4cceb9 !important;
  color: black !important;
}

.has-bg-mint-lighter-30 {
  background-color: #62d4c1 !important;
  color: black !important;
}

.has-bg-mint-lighter-40 {
  background-color: #79daca !important;
  color: black !important;
}

.has-bg-mint-lighter-50 {
  background-color: #8fe1d3 !important;
  color: black !important;
}

.has-bg-mint-lighter-60 {
  background-color: #a5e7dc !important;
  color: black !important;
}

.has-bg-mint-lighter-70 {
  background-color: #bcede5 !important;
  color: black !important;
}

.has-bg-mint-lighter-80 {
  background-color: #d2f3ed !important;
  color: black !important;
}

.has-bg-mint-lighter-90 {
  background-color: #e9f9f6 !important;
  color: black !important;
}

.has-bg-lightblue {
  background-color: #4FB3D9 !important;
  color: black !important;
}

.has-bg-lightblue-darker-10 {
  background-color: #47a1c3 !important;
  color: black !important;
}

.has-bg-lightblue-darker-20 {
  background-color: #3f8fae !important;
  color: black !important;
}

.has-bg-lightblue-darker-30 {
  background-color: #377d98 !important;
  color: white !important;
}

.has-bg-lightblue-darker-40 {
  background-color: #2f6b82 !important;
  color: white !important;
}

.has-bg-lightblue-darker-50 {
  background-color: #285a6d !important;
  color: white !important;
}

.has-bg-lightblue-darker-60 {
  background-color: #204857 !important;
  color: white !important;
}

.has-bg-lightblue-darker-70 {
  background-color: #183641 !important;
  color: white !important;
}

.has-bg-lightblue-darker-80 {
  background-color: #081216 !important;
  color: white !important;
}

.has-bg-lightblue-darker-80 {
  background-color: #081216 !important;
  color: white !important;
}

.has-bg-lightblue-lighter-10 {
  background-color: #61bbdd !important;
  color: black !important;
}

.has-bg-lightblue-lighter-20 {
  background-color: #72c2e1 !important;
  color: black !important;
}

.has-bg-lightblue-lighter-30 {
  background-color: #84cae4 !important;
  color: black !important;
}

.has-bg-lightblue-lighter-40 {
  background-color: #95d1e8 !important;
  color: black !important;
}

.has-bg-lightblue-lighter-50 {
  background-color: #a7d9ec !important;
  color: black !important;
}

.has-bg-lightblue-lighter-60 {
  background-color: #b9e1f0 !important;
  color: black !important;
}

.has-bg-lightblue-lighter-70 {
  background-color: #cae8f4 !important;
  color: black !important;
}

.has-bg-lightblue-lighter-80 {
  background-color: #dcf0f7 !important;
  color: black !important;
}

.has-bg-lightblue-lighter-90 {
  background-color: #edf7fb !important;
  color: black !important;
}

.has-bg-darkblue {
  background-color: #2D3E50 !important;
  color: white !important;
}

.has-bg-darkblue-darker-10 {
  background-color: #293848 !important;
  color: white !important;
}

.has-bg-darkblue-darker-20 {
  background-color: #243240 !important;
  color: white !important;
}

.has-bg-darkblue-darker-30 {
  background-color: #1f2b38 !important;
  color: white !important;
}

.has-bg-darkblue-darker-40 {
  background-color: #1b2530 !important;
  color: white !important;
}

.has-bg-darkblue-darker-50 {
  background-color: #171f28 !important;
  color: white !important;
}

.has-bg-darkblue-darker-60 {
  background-color: #121920 !important;
  color: white !important;
}

.has-bg-darkblue-darker-70 {
  background-color: #0d1318 !important;
  color: white !important;
}

.has-bg-darkblue-darker-80 {
  background-color: #090c10 !important;
  color: white !important;
}

.has-bg-darkblue-darker-90 {
  background-color: #040608 !important;
  color: white !important;
}

.has-bg-darkblue-lighter-10 {
  background-color: #425162 !important;
  color: white !important;
}

.has-bg-darkblue-lighter-20 {
  background-color: #576573 !important;
  color: white !important;
}

.has-bg-darkblue-lighter-30 {
  background-color: #6c7885 !important;
  color: black !important;
}

.has-bg-darkblue-lighter-40 {
  background-color: #818b96 !important;
  color: black !important;
}

.has-bg-darkblue-lighter-50 {
  background-color: #969fa8 !important;
  color: black !important;
}

.has-bg-darkblue-lighter-60 {
  background-color: #abb2b9 !important;
  color: black !important;
}

.has-bg-darkblue-lighter-70 {
  background-color: #c0c5cb !important;
  color: black !important;
}

.has-bg-darkblue-lighter-80 {
  background-color: #d5d8dc !important;
  color: black !important;
}

.has-bg-darkblue-lighter-90 {
  background-color: #eaecee !important;
  color: black !important;
}

.has-bg-yellow {
  background-color: #F9CD69 !important;
  color: black !important;
}

.has-bg-yellow-darker-10 {
  background-color: #e6ad00 !important;
  color: black !important;
}

.has-bg-yellow-darker-20 {
  background-color: #cc9a00 !important;
  color: black !important;
}

.has-bg-yellow-darker-30 {
  background-color: #b38600 !important;
  color: black !important;
}

.has-bg-yellow-darker-40 {
  background-color: #997300 !important;
  color: black !important;
}

.has-bg-yellow-darker-50 {
  background-color: #806000 !important;
  color: white !important;
}

.has-bg-yellow-darker-60 {
  background-color: #664d00 !important;
  color: white !important;
}

.has-bg-yellow-darker-70 {
  background-color: #4c3a00 !important;
  color: white !important;
}

.has-bg-yellow-darker-80 {
  background-color: #332600 !important;
  color: white !important;
}

.has-bg-yellow-darker-90 {
  background-color: #191300 !important;
  color: white !important;
}

.has-bg-yellow-lighter-10 {
  background-color: #ffc61a !important;
  color: black !important;
}

.has-bg-yellow-lighter-20 {
  background-color: #ffcd33 !important;
  color: black !important;
}

.has-bg-yellow-lighter-30 {
  background-color: #ffd34d !important;
  color: black !important;
}

.has-bg-yellow-lighter-40 {
  background-color: #ffd966 !important;
  color: black !important;
}

.has-bg-yellow-lighter-50 {
  background-color: #ffe080 !important;
  color: black !important;
}

.has-bg-yellow-lighter-60 {
  background-color: #ffe699 !important;
  color: black !important;
}

.has-bg-yellow-lighter-70 {
  background-color: #ffecb3 !important;
  color: black !important;
}

.has-bg-yellow-lighter-80 {
  background-color: #fff2cc !important;
  color: black !important;
}

.has-bg-yellow-lighter-90 {
  background-color: #fff9e6 !important;
  color: black !important;
}

.has-bg-olive {
  background-color: #b4ce82 !important;
  color: black !important;
}

.has-bg-olive-darker-10 {
  background-color: #a2b975 !important;
  color: black !important;
}

.has-bg-olive-darker-20 {
  background-color: #90a568 !important;
  color: black !important;
}

.has-bg-olive-darker-30 {
  background-color: #7e905b !important;
  color: black !important;
}

.has-bg-olive-darker-40 {
  background-color: #6c7c4e !important;
  color: black !important;
}

.has-bg-olive-darker-50 {
  background-color: #5a6741 !important;
  color: white !important;
}

.has-bg-olive-darker-60 {
  background-color: #485234 !important;
  color: white !important;
}

.has-bg-olive-darker-70 {
  background-color: #363e27 !important;
  color: white !important;
}

.has-bg-olive-darker-80 {
  background-color: #24291a !important;
  color: white !important;
}

.has-bg-olive-darker-90 {
  background-color: #12150d !important;
  color: white !important;
}

.has-bg-olive-lighter-10 {
  background-color: #bcd38f !important;
  color: black !important;
}

.has-bg-olive-lighter-20 {
  background-color: #c3d89b !important;
  color: black !important;
}

.has-bg-olive-lighter-30 {
  background-color: #cbdda8 !important;
  color: black !important;
}

.has-bg-olive-lighter-40 {
  background-color: #d2e2b4 !important;
  color: black !important;
}

.has-bg-olive-lighter-50 {
  background-color: #dae7c1 !important;
  color: black !important;
}

.has-bg-olive-lighter-60 {
  background-color: #e1ebcd !important;
  color: black !important;
}

.has-bg-olive-lighter-70 {
  background-color: #e9f0da !important;
  color: black !important;
}

.has-bg-olive-lighter-80 {
  background-color: #f0f5e6 !important;
  color: black !important;
}

.has-bg-olive-lighter-90 {
  background-color: #f8faf3 !important;
  color: black !important;
}

.has-bg-red {
  background-color: #c21f3a !important;
  color: white !important;
}

.has-bg-red-darker-10 {
  background-color: #AE1B34 !important;
  color: white !important;
}

.has-bg-red-darker-20 {
  background-color: #9B182E !important;
  color: white !important;
}

.has-bg-red-darker-30 {
  background-color: #871528 !important;
  color: white !important;
}

.has-bg-red-darker-40 {
  background-color: #741222 !important;
  color: white !important;
}

.has-bg-red-darker-50 {
  background-color: #600F1D !important;
  color: white !important;
}

.has-bg-red-darker-60 {
  background-color: #4D0C17 !important;
  color: white !important;
}

.has-bg-red-darker-70 {
  background-color: #3A0911 !important;
  color: white !important;
}

.has-bg-red-darker-80 {
  background-color: #26060B !important;
  color: white !important;
}

.has-bg-red-darker-90 {
  background-color: #130305 !important;
  color: white !important;
}

.has-bg-red-lighter-10 {
  background-color: #C8354D !important;
  color: white !important;
}

.has-bg-red-lighter-20 {
  background-color: #CE4B61 !important;
  color: black !important;
}

.has-bg-red-lighter-30 {
  background-color: #D46275 !important;
  color: black !important;
}

.has-bg-red-lighter-40 {
  background-color: #DA7888 !important;
  color: black !important;
}

.has-bg-red-lighter-50 {
  background-color: #E08F9C !important;
  color: black !important;
}

.has-bg-red-lighter-60 {
  background-color: #E6A5B0 !important;
  color: black !important;
}

.has-bg-red-lighter-70 {
  background-color: #ECBBC3 !important;
  color: black !important;
}

.has-bg-red-lighter-80 {
  background-color: #F2D2D7 !important;
  color: black !important;
}

.has-bg-red-lighter-90 {
  background-color: #F8E8EB !important;
  color: black !important;
}

/**
* sets the border color
*/
.has-border-color-white {
  border: 3px solid;
  border-color: white !important;
}

.has-border-color-black {
  border: 3px solid;
  border-color: black !important;
}

.has-border-color-mint {
  border: 3px solid;
  border-color: #1fc2a7 !important;
}

.has-border-color-mint-darker-10 {
  border: 3px solid;
  border-color: #1caf96 !important;
}

.has-border-color-mint-darker-20 {
  border: 3px solid;
  border-color: #199b86 !important;
}

.has-border-color-mint-darker-30 {
  border: 3px solid;
  border-color: #168875 !important;
}

.has-border-color-mint-darker-40 {
  border: 3px solid;
  border-color: #137464 !important;
}

.has-border-color-mint-darker-50 {
  border: 3px solid;
  border-color: #106154 !important;
}

.has-border-color-mint-darker-60 {
  border: 3px solid;
  border-color: #0c4e43 !important;
}

.has-border-color-mint-darker-70 {
  border: 3px solid;
  border-color: #093a32 !important;
}

.has-border-color-mint-darker-80 {
  border: 3px solid;
  border-color: #062721 !important;
}

.has-border-color-mint-darker-90 {
  border: 3px solid;
  border-color: #031311 !important;
}

.has-border-color-mint-lighter-10 {
  border: 3px solid;
  border-color: #35c8b0 !important;
}

.has-border-color-mint-lighter-20 {
  border: 3px solid;
  border-color: #4cceb9 !important;
}

.has-border-color-mint-lighter-30 {
  border: 3px solid;
  border-color: #62d4c1 !important;
}

.has-border-color-mint-lighter-40 {
  border: 3px solid;
  border-color: #79daca !important;
}

.has-border-color-mint-lighter-50 {
  border: 3px solid;
  border-color: #8fe1d3 !important;
}

.has-border-color-mint-lighter-60 {
  border: 3px solid;
  border-color: #a5e7dc !important;
}

.has-border-color-mint-lighter-70 {
  border: 3px solid;
  border-color: #bcede5 !important;
}

.has-border-color-mint-lighter-80 {
  border: 3px solid;
  border-color: #d2f3ed !important;
}

.has-border-color-mint-lighter-90 {
  border: 3px solid;
  border-color: #e9f9f6 !important;
}

.has-border-color-lightblue {
  border: 3px solid;
  border-color: #4FB3D9 !important;
}

.has-border-color-lightblue-darker-10 {
  border: 3px solid;
  border-color: #47a1c3 !important;
}

.has-border-color-lightblue-darker-20 {
  border: 3px solid;
  border-color: #3f8fae !important;
}

.has-border-color-lightblue-darker-30 {
  border: 3px solid;
  border-color: #377d98 !important;
}

.has-border-color-lightblue-darker-40 {
  border: 3px solid;
  border-color: #2f6b82 !important;
}

.has-border-color-lightblue-darker-50 {
  border: 3px solid;
  border-color: #285a6d !important;
}

.has-border-color-lightblue-darker-60 {
  border: 3px solid;
  border-color: #204857 !important;
}

.has-border-color-lightblue-darker-70 {
  border: 3px solid;
  border-color: #183641 !important;
}

.has-border-color-lightblue-darker-80 {
  border: 3px solid;
  border-color: #081216 !important;
}

.has-border-color-lightblue-darker-80 {
  border: 3px solid;
  border-color: #081216 !important;
}

.has-border-color-lightblue-lighter-10 {
  border: 3px solid;
  border-color: #61bbdd !important;
}

.has-border-color-lightblue-lighter-20 {
  border: 3px solid;
  border-color: #72c2e1 !important;
}

.has-border-color-lightblue-lighter-30 {
  border: 3px solid;
  border-color: #84cae4 !important;
}

.has-border-color-lightblue-lighter-40 {
  border: 3px solid;
  border-color: #95d1e8 !important;
}

.has-border-color-lightblue-lighter-50 {
  border: 3px solid;
  border-color: #a7d9ec !important;
}

.has-border-color-lightblue-lighter-60 {
  border: 3px solid;
  border-color: #b9e1f0 !important;
}

.has-border-color-lightblue-lighter-70 {
  border: 3px solid;
  border-color: #cae8f4 !important;
}

.has-border-color-lightblue-lighter-80 {
  border: 3px solid;
  border-color: #dcf0f7 !important;
}

.has-border-color-lightblue-lighter-90 {
  border: 3px solid;
  border-color: #edf7fb !important;
}

.has-border-color-darkblue {
  border: 3px solid;
  border-color: #2D3E50 !important;
}

.has-border-color-darkblue-darker-10 {
  border: 3px solid;
  border-color: #293848 !important;
}

.has-border-color-darkblue-darker-20 {
  border: 3px solid;
  border-color: #243240 !important;
}

.has-border-color-darkblue-darker-30 {
  border: 3px solid;
  border-color: #1f2b38 !important;
}

.has-border-color-darkblue-darker-40 {
  border: 3px solid;
  border-color: #1b2530 !important;
}

.has-border-color-darkblue-darker-50 {
  border: 3px solid;
  border-color: #171f28 !important;
}

.has-border-color-darkblue-darker-60 {
  border: 3px solid;
  border-color: #121920 !important;
}

.has-border-color-darkblue-darker-70 {
  border: 3px solid;
  border-color: #0d1318 !important;
}

.has-border-color-darkblue-darker-80 {
  border: 3px solid;
  border-color: #090c10 !important;
}

.has-border-color-darkblue-darker-90 {
  border: 3px solid;
  border-color: #040608 !important;
}

.has-border-color-darkblue-lighter-10 {
  border: 3px solid;
  border-color: #425162 !important;
}

.has-border-color-darkblue-lighter-20 {
  border: 3px solid;
  border-color: #576573 !important;
}

.has-border-color-darkblue-lighter-30 {
  border: 3px solid;
  border-color: #6c7885 !important;
}

.has-border-color-darkblue-lighter-40 {
  border: 3px solid;
  border-color: #818b96 !important;
}

.has-border-color-darkblue-lighter-50 {
  border: 3px solid;
  border-color: #969fa8 !important;
}

.has-border-color-darkblue-lighter-60 {
  border: 3px solid;
  border-color: #abb2b9 !important;
}

.has-border-color-darkblue-lighter-70 {
  border: 3px solid;
  border-color: #c0c5cb !important;
}

.has-border-color-darkblue-lighter-80 {
  border: 3px solid;
  border-color: #d5d8dc !important;
}

.has-border-color-darkblue-lighter-90 {
  border: 3px solid;
  border-color: #eaecee !important;
}

.has-border-color-yellow {
  border: 3px solid;
  border-color: #F9CD69 !important;
}

.has-border-color-yellow-darker-10 {
  border: 3px solid;
  border-color: #e6ad00 !important;
}

.has-border-color-yellow-darker-20 {
  border: 3px solid;
  border-color: #cc9a00 !important;
}

.has-border-color-yellow-darker-30 {
  border: 3px solid;
  border-color: #b38600 !important;
}

.has-border-color-yellow-darker-40 {
  border: 3px solid;
  border-color: #997300 !important;
}

.has-border-color-yellow-darker-50 {
  border: 3px solid;
  border-color: #806000 !important;
}

.has-border-color-yellow-darker-60 {
  border: 3px solid;
  border-color: #664d00 !important;
}

.has-border-color-yellow-darker-70 {
  border: 3px solid;
  border-color: #4c3a00 !important;
}

.has-border-color-yellow-darker-80 {
  border: 3px solid;
  border-color: #332600 !important;
}

.has-border-color-yellow-darker-90 {
  border: 3px solid;
  border-color: #191300 !important;
}

.has-border-color-yellow-lighter-10 {
  border: 3px solid;
  border-color: #ffc61a !important;
}

.has-border-color-yellow-lighter-20 {
  border: 3px solid;
  border-color: #ffcd33 !important;
}

.has-border-color-yellow-lighter-30 {
  border: 3px solid;
  border-color: #ffd34d !important;
}

.has-border-color-yellow-lighter-40 {
  border: 3px solid;
  border-color: #ffd966 !important;
}

.has-border-color-yellow-lighter-50 {
  border: 3px solid;
  border-color: #ffe080 !important;
}

.has-border-color-yellow-lighter-60 {
  border: 3px solid;
  border-color: #ffe699 !important;
}

.has-border-color-yellow-lighter-70 {
  border: 3px solid;
  border-color: #ffecb3 !important;
}

.has-border-color-yellow-lighter-80 {
  border: 3px solid;
  border-color: #fff2cc !important;
}

.has-border-color-yellow-lighter-90 {
  border: 3px solid;
  border-color: #fff9e6 !important;
}

.has-border-color-olive {
  border: 3px solid;
  border-color: #b4ce82 !important;
}

.has-border-color-olive-darker-10 {
  border: 3px solid;
  border-color: #a2b975 !important;
}

.has-border-color-olive-darker-20 {
  border: 3px solid;
  border-color: #90a568 !important;
}

.has-border-color-olive-darker-30 {
  border: 3px solid;
  border-color: #7e905b !important;
}

.has-border-color-olive-darker-40 {
  border: 3px solid;
  border-color: #6c7c4e !important;
}

.has-border-color-olive-darker-50 {
  border: 3px solid;
  border-color: #5a6741 !important;
}

.has-border-color-olive-darker-60 {
  border: 3px solid;
  border-color: #485234 !important;
}

.has-border-color-olive-darker-70 {
  border: 3px solid;
  border-color: #363e27 !important;
}

.has-border-color-olive-darker-80 {
  border: 3px solid;
  border-color: #24291a !important;
}

.has-border-color-olive-darker-90 {
  border: 3px solid;
  border-color: #12150d !important;
}

.has-border-color-olive-lighter-10 {
  border: 3px solid;
  border-color: #bcd38f !important;
}

.has-border-color-olive-lighter-20 {
  border: 3px solid;
  border-color: #c3d89b !important;
}

.has-border-color-olive-lighter-30 {
  border: 3px solid;
  border-color: #cbdda8 !important;
}

.has-border-color-olive-lighter-40 {
  border: 3px solid;
  border-color: #d2e2b4 !important;
}

.has-border-color-olive-lighter-50 {
  border: 3px solid;
  border-color: #dae7c1 !important;
}

.has-border-color-olive-lighter-60 {
  border: 3px solid;
  border-color: #e1ebcd !important;
}

.has-border-color-olive-lighter-70 {
  border: 3px solid;
  border-color: #e9f0da !important;
}

.has-border-color-olive-lighter-80 {
  border: 3px solid;
  border-color: #f0f5e6 !important;
}

.has-border-color-olive-lighter-90 {
  border: 3px solid;
  border-color: #f8faf3 !important;
}

.has-border-color-red {
  border: 3px solid;
  border-color: #c21f3a !important;
}

.has-border-color-red-darker-10 {
  border: 3px solid;
  border-color: #AE1B34 !important;
}

.has-border-color-red-darker-20 {
  border: 3px solid;
  border-color: #9B182E !important;
}

.has-border-color-red-darker-30 {
  border: 3px solid;
  border-color: #871528 !important;
}

.has-border-color-red-darker-40 {
  border: 3px solid;
  border-color: #741222 !important;
}

.has-border-color-red-darker-50 {
  border: 3px solid;
  border-color: #600F1D !important;
}

.has-border-color-red-darker-60 {
  border: 3px solid;
  border-color: #4D0C17 !important;
}

.has-border-color-red-darker-70 {
  border: 3px solid;
  border-color: #3A0911 !important;
}

.has-border-color-red-darker-80 {
  border: 3px solid;
  border-color: #26060B !important;
}

.has-border-color-red-darker-90 {
  border: 3px solid;
  border-color: #130305 !important;
}

.has-border-color-red-lighter-10 {
  border: 3px solid;
  border-color: #C8354D !important;
}

.has-border-color-red-lighter-20 {
  border: 3px solid;
  border-color: #CE4B61 !important;
}

.has-border-color-red-lighter-30 {
  border: 3px solid;
  border-color: #D46275 !important;
}

.has-border-color-red-lighter-40 {
  border: 3px solid;
  border-color: #DA7888 !important;
}

.has-border-color-red-lighter-50 {
  border: 3px solid;
  border-color: #E08F9C !important;
}

.has-border-color-red-lighter-60 {
  border: 3px solid;
  border-color: #E6A5B0 !important;
}

.has-border-color-red-lighter-70 {
  border: 3px solid;
  border-color: #ECBBC3 !important;
}

.has-border-color-red-lighter-80 {
  border: 3px solid;
  border-color: #F2D2D7 !important;
}

.has-border-color-red-lighter-90 {
  border: 3px solid;
  border-color: #F8E8EB !important;
}

.has-bg-split-10-mint {
  background-color: #1fc2a7;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-10-mint {
    background: linear-gradient(rgba(0, 0, 0, 0) 10%, #1fc2a7 10%);
  }
}

.has-bg-split-20-mint {
  background-color: #1fc2a7;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-20-mint {
    background: linear-gradient(rgba(0, 0, 0, 0) 20%, #1fc2a7 20%);
  }
}

.has-bg-split-30-mint {
  background-color: #1fc2a7;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-30-mint {
    background: linear-gradient(rgba(0, 0, 0, 0) 30%, #1fc2a7 30%);
  }
}

.has-bg-split-10-lightblue {
  background-color: #4FB3D9;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-10-lightblue {
    background: linear-gradient(rgba(0, 0, 0, 0) 10%, #4FB3D9 10%);
  }
}

.has-bg-split-20-lightblue {
  background-color: #4FB3D9;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-20-lightblue {
    background: linear-gradient(rgba(0, 0, 0, 0) 20%, #4FB3D9 20%);
  }
}

.has-bg-split-30-lightblue {
  background-color: #4FB3D9;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-30-lightblue {
    background: linear-gradient(rgba(0, 0, 0, 0) 30%, #4FB3D9 30%);
  }
}

.has-bg-split-10-darkblue {
  background-color: #2D3E50;
  color: white;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-10-darkblue {
    background: linear-gradient(rgba(0, 0, 0, 0) 10%, #2D3E50 10%);
  }
}

.has-bg-split-20-darkblue {
  background-color: #2D3E50;
  color: white;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-20-darkblue {
    background: linear-gradient(rgba(0, 0, 0, 0) 20%, #2D3E50 20%);
  }
}

.has-bg-split-30-darkblue {
  background-color: #2D3E50;
  color: white;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-30-darkblue {
    background: linear-gradient(rgba(0, 0, 0, 0) 30%, #2D3E50 30%);
  }
}

.has-bg-split-10-olive {
  background-color: #b4ce82;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-10-olive {
    background: linear-gradient(rgba(0, 0, 0, 0) 10%, #b4ce82 10%);
  }
}

.has-bg-split-20-olive {
  background-color: #b4ce82;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-20-olive {
    background: linear-gradient(rgba(0, 0, 0, 0) 20%, #b4ce82 20%);
  }
}

.has-bg-split-30-olive {
  background-color: #b4ce82;
  color: black;
}
@media screen and (min-width: 1024px) {
  .has-bg-split-30-olive {
    background: linear-gradient(rgba(0, 0, 0, 0) 30%, #b4ce82 30%);
  }
}

.has-rounded-border {
  border-radius: 6px;
}

.pt-10 {
  padding-top: 10% !important;
}

.pb-10 {
  padding-bottom: 10% !important;
}

.align-items-bottom {
  margin-top: auto;
}

.align-items-top {
  margin-bottom: auto;
}

/*! bulma.io v0.9.2 | MIT License | github.com/jgthms/bulma */
/* Bulma Utilities */
.pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis, .file-cta,
.file-name, .select select, .textarea, .input, .button {
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
}
.pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus,
.pagination-ellipsis:focus, .file-cta:focus,
.file-name:focus, .select select:focus, .textarea:focus, .input:focus, .button:focus, .is-focused.pagination-previous,
.is-focused.pagination-next,
.is-focused.pagination-link,
.is-focused.pagination-ellipsis, .is-focused.file-cta,
.is-focused.file-name, .select select.is-focused, .is-focused.textarea, .is-focused.input, .is-focused.button, .pagination-previous:active,
.pagination-next:active,
.pagination-link:active,
.pagination-ellipsis:active, .file-cta:active,
.file-name:active, .select select:active, .textarea:active, .input:active, .button:active, .is-active.pagination-previous,
.is-active.pagination-next,
.is-active.pagination-link,
.is-active.pagination-ellipsis, .is-active.file-cta,
.is-active.file-name, .select select.is-active, .is-active.textarea, .is-active.input, .is-active.button {
  outline: none;
}
[disabled].pagination-previous,
[disabled].pagination-next,
[disabled].pagination-link,
[disabled].pagination-ellipsis, [disabled].file-cta,
[disabled].file-name, .select select[disabled], [disabled].textarea, [disabled].input, [disabled].button, fieldset[disabled] .pagination-previous,
fieldset[disabled] .pagination-next,
fieldset[disabled] .pagination-link,
fieldset[disabled] .pagination-ellipsis, fieldset[disabled] .file-cta,
fieldset[disabled] .file-name, fieldset[disabled] .select select, .select fieldset[disabled] select, fieldset[disabled] .textarea, fieldset[disabled] .input, fieldset[disabled] .button {
  cursor: not-allowed;
}

.is-unselectable, .tabs, .pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis, .breadcrumb, .file, .button {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.navbar-link:not(.is-arrowless)::after, .select:not(.is-multiple):not(.is-loading)::after {
  border: 3px solid transparent;
  border-radius: 2px;
  border-right: 0;
  border-top: 0;
  content: " ";
  display: block;
  height: 0.625em;
  margin-top: -0.4375em;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: rotate(-45deg);
  transform-origin: center;
  width: 0.625em;
}

.tabs:not(:last-child), .pagination:not(:last-child), .message:not(:last-child), .level:not(:last-child), .breadcrumb:not(:last-child), .highlight:not(:last-child), .block:not(:last-child), .title:not(:last-child),
.subtitle:not(:last-child), .table-container:not(:last-child), .table:not(:last-child), .progress:not(:last-child), .notification:not(:last-child), .content:not(:last-child), .box:not(:last-child) {
  margin-bottom: 1.5rem;
}

.modal-close, .delete {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 290486px;
  cursor: pointer;
  pointer-events: auto;
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 20px;
  max-height: 20px;
  max-width: 20px;
  min-height: 20px;
  min-width: 20px;
  outline: none;
  position: relative;
  vertical-align: top;
  width: 20px;
}
.modal-close::before, .delete::before, .modal-close::after, .delete::after {
  background-color: white;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}
.modal-close::before, .delete::before {
  height: 2px;
  width: 50%;
}
.modal-close::after, .delete::after {
  height: 50%;
  width: 2px;
}
.modal-close:hover, .delete:hover, .modal-close:focus, .delete:focus {
  background-color: rgba(0, 0, 0, 0.3);
}
.modal-close:active, .delete:active {
  background-color: rgba(0, 0, 0, 0.4);
}
.is-small.modal-close, .is-small.delete {
  height: 16px;
  max-height: 16px;
  max-width: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;
}
.is-medium.modal-close, .is-medium.delete {
  height: 24px;
  max-height: 24px;
  max-width: 24px;
  min-height: 24px;
  min-width: 24px;
  width: 24px;
}
.is-large.modal-close, .is-large.delete {
  height: 32px;
  max-height: 32px;
  max-width: 32px;
  min-height: 32px;
  min-width: 32px;
  width: 32px;
}

.control.is-loading::after, .select.is-loading::after, .loader, .button.is-loading::after {
  animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}

.hero-video, .is-overlay, .modal-background, .modal, .image.is-square img,
.image.is-square .has-ratio, .image.is-1by1 img,
.image.is-1by1 .has-ratio, .image.is-5by4 img,
.image.is-5by4 .has-ratio, .image.is-4by3 img,
.image.is-4by3 .has-ratio, .image.is-3by2 img,
.image.is-3by2 .has-ratio, .image.is-5by3 img,
.image.is-5by3 .has-ratio, .image.is-16by9 img,
.image.is-16by9 .has-ratio, .image.is-2by1 img,
.image.is-2by1 .has-ratio, .image.is-3by1 img,
.image.is-3by1 .has-ratio, .image.is-4by5 img,
.image.is-4by5 .has-ratio, .image.is-3by4 img,
.image.is-3by4 .has-ratio, .image.is-2by3 img,
.image.is-2by3 .has-ratio, .image.is-3by5 img,
.image.is-3by5 .has-ratio, .image.is-9by16 img,
.image.is-9by16 .has-ratio, .image.is-1by2 img,
.image.is-1by2 .has-ratio, .image.is-1by3 img,
.image.is-1by3 .has-ratio {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

/* Bulma Base */
/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select,
textarea {
  margin: 0;
}

:host,
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}
td:not([align]),
th:not([align]) {
  text-align: inherit;
}

:host {
  background-color: white;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-width: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

article,
aside,
figure,
footer,
header,
hgroup,
section {
  display: block;
}

:host,
body,
button,
input,
optgroup,
select,
textarea {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

code,
pre {
  -moz-osx-font-smoothing: auto;
  -webkit-font-smoothing: auto;
  font-family: monospace;
}

:host,
body {
  color: #4a4a4a;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
}

a {
  color: #4FB3D9;
  cursor: pointer;
  text-decoration: none;
}
a strong {
  color: currentColor;
}
a:hover {
  color: #363636;
}

code {
  background-color: whitesmoke;
  color: #801426;
  font-size: 0.875em;
  font-weight: normal;
  padding: 0.25em 0.5em 0.25em;
}

hr {
  background-color: whitesmoke;
  border: none;
  display: block;
  height: 2px;
  margin: 1.5rem 0;
}

img {
  height: auto;
  max-width: 100%;
}

input[type=checkbox],
input[type=radio] {
  vertical-align: baseline;
}

small {
  font-size: 0.875em;
}

span {
  font-style: inherit;
  font-weight: inherit;
}

strong {
  color: #363636;
  font-weight: 700;
}

fieldset {
  border: none;
}

pre {
  -webkit-overflow-scrolling: touch;
  background-color: whitesmoke;
  color: #4a4a4a;
  font-size: 0.875em;
  overflow-x: auto;
  padding: 1.25rem 1.5rem;
  white-space: pre;
  word-wrap: normal;
}
pre code {
  background-color: transparent;
  color: currentColor;
  font-size: 1em;
  padding: 0;
}

table td,
table th {
  vertical-align: top;
}
table td:not([align]),
table th:not([align]) {
  text-align: inherit;
}
table th {
  color: #363636;
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
/* Bulma Elements */
.box {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1), 0 0px 0 1px rgba(0, 0, 0, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

a.box:hover, a.box:focus {
  box-shadow: 0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1), 0 0 0 1px #4FB3D9;
}
a.box:active {
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), 0 0 0 1px #4FB3D9;
}

.button {
  background-color: white;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
}
.button strong {
  color: inherit;
}
.button .icon, .button .icon.is-small, .button .icon.is-medium, .button .icon.is-large {
  height: 1.5em;
  width: 1.5em;
}
.button .icon:first-child:not(:last-child) {
  margin-left: calc(-0.5em - 1px);
  margin-right: 0.25em;
}
.button .icon:last-child:not(:first-child) {
  margin-left: 0.25em;
  margin-right: calc(-0.5em - 1px);
}
.button .icon:first-child:last-child {
  margin-left: calc(-0.5em - 1px);
  margin-right: calc(-0.5em - 1px);
}
.button:hover, .button.is-hovered {
  border-color: #b5b5b5;
  color: #363636;
}
.button:focus, .button.is-focused {
  border-color: #3273dc;
  color: #363636;
}
.button:focus:not(:active), .button.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(79, 179, 217, 0.25);
}
.button:active, .button.is-active {
  border-color: #4a4a4a;
  color: #363636;
}
.button.is-text {
  background-color: transparent;
  border-color: transparent;
  color: #4a4a4a;
  text-decoration: underline;
}
.button.is-text:hover, .button.is-text.is-hovered, .button.is-text:focus, .button.is-text.is-focused {
  background-color: whitesmoke;
  color: #363636;
}
.button.is-text:active, .button.is-text.is-active {
  background-color: #e8e8e8;
  color: #363636;
}
.button.is-text[disabled], fieldset[disabled] .button.is-text {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}
.button.is-ghost {
  background: none;
  border-color: transparent;
  color: #4FB3D9;
  text-decoration: none;
}
.button.is-ghost:hover, .button.is-ghost.is-hovered {
  color: #4FB3D9;
  text-decoration: underline;
}
.button.is-white {
  background-color: white;
  border-color: transparent;
  color: black;
}
.button.is-white:hover, .button.is-white.is-hovered {
  background-color: #f9f9f9;
  border-color: transparent;
  color: black;
}
.button.is-white:focus, .button.is-white.is-focused {
  border-color: transparent;
  color: black;
}
.button.is-white:focus:not(:active), .button.is-white.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}
.button.is-white:active, .button.is-white.is-active {
  background-color: #f2f2f2;
  border-color: transparent;
  color: black;
}
.button.is-white[disabled], fieldset[disabled] .button.is-white {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
}
.button.is-white.is-inverted {
  background-color: black;
  color: white;
}
.button.is-white.is-inverted:hover, .button.is-white.is-inverted.is-hovered {
  background-color: black;
}
.button.is-white.is-inverted[disabled], fieldset[disabled] .button.is-white.is-inverted {
  background-color: black;
  border-color: transparent;
  box-shadow: none;
  color: white;
}
.button.is-white.is-loading::after {
  border-color: transparent transparent black black !important;
}
.button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}
.button.is-white.is-outlined:hover, .button.is-white.is-outlined.is-hovered, .button.is-white.is-outlined:focus, .button.is-white.is-outlined.is-focused {
  background-color: white;
  border-color: white;
  color: black;
}
.button.is-white.is-outlined.is-loading::after {
  border-color: transparent transparent white white !important;
}
.button.is-white.is-outlined.is-loading:hover::after, .button.is-white.is-outlined.is-loading.is-hovered::after, .button.is-white.is-outlined.is-loading:focus::after, .button.is-white.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent black black !important;
}
.button.is-white.is-outlined[disabled], fieldset[disabled] .button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}
.button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: black;
  color: black;
}
.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined.is-hovered, .button.is-white.is-inverted.is-outlined:focus, .button.is-white.is-inverted.is-outlined.is-focused {
  background-color: black;
  color: white;
}
.button.is-white.is-inverted.is-outlined.is-loading:hover::after, .button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-white.is-inverted.is-outlined.is-loading:focus::after, .button.is-white.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}
.button.is-white.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: black;
  box-shadow: none;
  color: black;
}
.button.is-black {
  background-color: black;
  border-color: transparent;
  color: white;
}
.button.is-black:hover, .button.is-black.is-hovered {
  background-color: black;
  border-color: transparent;
  color: white;
}
.button.is-black:focus, .button.is-black.is-focused {
  border-color: transparent;
  color: white;
}
.button.is-black:focus:not(:active), .button.is-black.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25);
}
.button.is-black:active, .button.is-black.is-active {
  background-color: black;
  border-color: transparent;
  color: white;
}
.button.is-black[disabled], fieldset[disabled] .button.is-black {
  background-color: black;
  border-color: transparent;
  box-shadow: none;
}
.button.is-black.is-inverted {
  background-color: white;
  color: black;
}
.button.is-black.is-inverted:hover, .button.is-black.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-black.is-inverted[disabled], fieldset[disabled] .button.is-black.is-inverted {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
  color: black;
}
.button.is-black.is-loading::after {
  border-color: transparent transparent white white !important;
}
.button.is-black.is-outlined {
  background-color: transparent;
  border-color: black;
  color: black;
}
.button.is-black.is-outlined:hover, .button.is-black.is-outlined.is-hovered, .button.is-black.is-outlined:focus, .button.is-black.is-outlined.is-focused {
  background-color: black;
  border-color: black;
  color: white;
}
.button.is-black.is-outlined.is-loading::after {
  border-color: transparent transparent black black !important;
}
.button.is-black.is-outlined.is-loading:hover::after, .button.is-black.is-outlined.is-loading.is-hovered::after, .button.is-black.is-outlined.is-loading:focus::after, .button.is-black.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}
.button.is-black.is-outlined[disabled], fieldset[disabled] .button.is-black.is-outlined {
  background-color: transparent;
  border-color: black;
  box-shadow: none;
  color: black;
}
.button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}
.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined.is-hovered, .button.is-black.is-inverted.is-outlined:focus, .button.is-black.is-inverted.is-outlined.is-focused {
  background-color: white;
  color: black;
}
.button.is-black.is-inverted.is-outlined.is-loading:hover::after, .button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-black.is-inverted.is-outlined.is-loading:focus::after, .button.is-black.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent black black !important;
}
.button.is-black.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}
.button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light:hover, .button.is-light.is-hovered {
  background-color: #eeeeee;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light:focus, .button.is-light.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light:focus:not(:active), .button.is-light.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}
.button.is-light:active, .button.is-light.is-active {
  background-color: #e8e8e8;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light[disabled], fieldset[disabled] .button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  box-shadow: none;
}
.button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}
.button.is-light.is-inverted:hover, .button.is-light.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}
.button.is-light.is-inverted[disabled], fieldset[disabled] .button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: whitesmoke;
}
.button.is-light.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  color: whitesmoke;
}
.button.is-light.is-outlined:hover, .button.is-light.is-outlined.is-hovered, .button.is-light.is-outlined:focus, .button.is-light.is-outlined.is-focused {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light.is-outlined.is-loading::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}
.button.is-light.is-outlined.is-loading:hover::after, .button.is-light.is-outlined.is-loading.is-hovered::after, .button.is-light.is-outlined.is-loading:focus::after, .button.is-light.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-light.is-outlined[disabled], fieldset[disabled] .button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  box-shadow: none;
  color: whitesmoke;
}
.button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined.is-hovered, .button.is-light.is-inverted.is-outlined:focus, .button.is-light.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}
.button.is-light.is-inverted.is-outlined.is-loading:hover::after, .button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-light.is-inverted.is-outlined.is-loading:focus::after, .button.is-light.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}
.button.is-light.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-dark {
  background-color: #363636;
  border-color: transparent;
  color: #fff;
}
.button.is-dark:hover, .button.is-dark.is-hovered {
  background-color: #2f2f2f;
  border-color: transparent;
  color: #fff;
}
.button.is-dark:focus, .button.is-dark.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-dark:focus:not(:active), .button.is-dark.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}
.button.is-dark:active, .button.is-dark.is-active {
  background-color: #292929;
  border-color: transparent;
  color: #fff;
}
.button.is-dark[disabled], fieldset[disabled] .button.is-dark {
  background-color: #363636;
  border-color: transparent;
  box-shadow: none;
}
.button.is-dark.is-inverted {
  background-color: #fff;
  color: #363636;
}
.button.is-dark.is-inverted:hover, .button.is-dark.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-dark.is-inverted[disabled], fieldset[disabled] .button.is-dark.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #363636;
}
.button.is-dark.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  color: #363636;
}
.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined.is-hovered, .button.is-dark.is-outlined:focus, .button.is-dark.is-outlined.is-focused {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}
.button.is-dark.is-outlined.is-loading::after {
  border-color: transparent transparent #363636 #363636 !important;
}
.button.is-dark.is-outlined.is-loading:hover::after, .button.is-dark.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-outlined.is-loading:focus::after, .button.is-dark.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-dark.is-outlined[disabled], fieldset[disabled] .button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  box-shadow: none;
  color: #363636;
}
.button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined.is-hovered, .button.is-dark.is-inverted.is-outlined:focus, .button.is-dark.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #363636;
}
.button.is-dark.is-inverted.is-outlined.is-loading:hover::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-inverted.is-outlined.is-loading:focus::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #363636 #363636 !important;
}
.button.is-dark.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}
.button.is-primary:hover, .button.is-primary.is-hovered {
  background-color: #00c4a7;
  border-color: transparent;
  color: #fff;
}
.button.is-primary:focus, .button.is-primary.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-primary:focus:not(:active), .button.is-primary.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}
.button.is-primary:active, .button.is-primary.is-active {
  background-color: #00b89c;
  border-color: transparent;
  color: #fff;
}
.button.is-primary[disabled], fieldset[disabled] .button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  box-shadow: none;
}
.button.is-primary.is-inverted {
  background-color: #fff;
  color: #00d1b2;
}
.button.is-primary.is-inverted:hover, .button.is-primary.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-primary.is-inverted[disabled], fieldset[disabled] .button.is-primary.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #00d1b2;
}
.button.is-primary.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  color: #00d1b2;
}
.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined.is-hovered, .button.is-primary.is-outlined:focus, .button.is-primary.is-outlined.is-focused {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}
.button.is-primary.is-outlined.is-loading::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}
.button.is-primary.is-outlined.is-loading:hover::after, .button.is-primary.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-outlined.is-loading:focus::after, .button.is-primary.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-primary.is-outlined[disabled], fieldset[disabled] .button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  box-shadow: none;
  color: #00d1b2;
}
.button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined.is-hovered, .button.is-primary.is-inverted.is-outlined:focus, .button.is-primary.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #00d1b2;
}
.button.is-primary.is-inverted.is-outlined.is-loading:hover::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-inverted.is-outlined.is-loading:focus::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}
.button.is-primary.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}
.button.is-primary.is-light:hover, .button.is-primary.is-light.is-hovered {
  background-color: #defffa;
  border-color: transparent;
  color: #00947e;
}
.button.is-primary.is-light:active, .button.is-primary.is-light.is-active {
  background-color: #d1fff8;
  border-color: transparent;
  color: #00947e;
}
.button.is-link {
  background-color: #4FB3D9;
  border-color: transparent;
  color: #fff;
}
.button.is-link:hover, .button.is-link.is-hovered {
  background-color: #45aed7;
  border-color: transparent;
  color: #fff;
}
.button.is-link:focus, .button.is-link.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-link:focus:not(:active), .button.is-link.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(79, 179, 217, 0.25);
}
.button.is-link:active, .button.is-link.is-active {
  background-color: #3aaad4;
  border-color: transparent;
  color: #fff;
}
.button.is-link[disabled], fieldset[disabled] .button.is-link {
  background-color: #4FB3D9;
  border-color: transparent;
  box-shadow: none;
}
.button.is-link.is-inverted {
  background-color: #fff;
  color: #4FB3D9;
}
.button.is-link.is-inverted:hover, .button.is-link.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-link.is-inverted[disabled], fieldset[disabled] .button.is-link.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #4FB3D9;
}
.button.is-link.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-link.is-outlined {
  background-color: transparent;
  border-color: #4FB3D9;
  color: #4FB3D9;
}
.button.is-link.is-outlined:hover, .button.is-link.is-outlined.is-hovered, .button.is-link.is-outlined:focus, .button.is-link.is-outlined.is-focused {
  background-color: #4FB3D9;
  border-color: #4FB3D9;
  color: #fff;
}
.button.is-link.is-outlined.is-loading::after {
  border-color: transparent transparent #4FB3D9 #4FB3D9 !important;
}
.button.is-link.is-outlined.is-loading:hover::after, .button.is-link.is-outlined.is-loading.is-hovered::after, .button.is-link.is-outlined.is-loading:focus::after, .button.is-link.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-link.is-outlined[disabled], fieldset[disabled] .button.is-link.is-outlined {
  background-color: transparent;
  border-color: #4FB3D9;
  box-shadow: none;
  color: #4FB3D9;
}
.button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-link.is-inverted.is-outlined:hover, .button.is-link.is-inverted.is-outlined.is-hovered, .button.is-link.is-inverted.is-outlined:focus, .button.is-link.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #4FB3D9;
}
.button.is-link.is-inverted.is-outlined.is-loading:hover::after, .button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-link.is-inverted.is-outlined.is-loading:focus::after, .button.is-link.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #4FB3D9 #4FB3D9 !important;
}
.button.is-link.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-link.is-light {
  background-color: #eef8fb;
  color: #1e6d8a;
}
.button.is-link.is-light:hover, .button.is-link.is-light.is-hovered {
  background-color: #e4f3f9;
  border-color: transparent;
  color: #1e6d8a;
}
.button.is-link.is-light:active, .button.is-link.is-light.is-active {
  background-color: #d9eff7;
  border-color: transparent;
  color: #1e6d8a;
}
.button.is-info {
  background-color: #3298dc;
  border-color: transparent;
  color: #fff;
}
.button.is-info:hover, .button.is-info.is-hovered {
  background-color: #2793da;
  border-color: transparent;
  color: #fff;
}
.button.is-info:focus, .button.is-info.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-info:focus:not(:active), .button.is-info.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}
.button.is-info:active, .button.is-info.is-active {
  background-color: #238cd1;
  border-color: transparent;
  color: #fff;
}
.button.is-info[disabled], fieldset[disabled] .button.is-info {
  background-color: #3298dc;
  border-color: transparent;
  box-shadow: none;
}
.button.is-info.is-inverted {
  background-color: #fff;
  color: #3298dc;
}
.button.is-info.is-inverted:hover, .button.is-info.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-info.is-inverted[disabled], fieldset[disabled] .button.is-info.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #3298dc;
}
.button.is-info.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3298dc;
  color: #3298dc;
}
.button.is-info.is-outlined:hover, .button.is-info.is-outlined.is-hovered, .button.is-info.is-outlined:focus, .button.is-info.is-outlined.is-focused {
  background-color: #3298dc;
  border-color: #3298dc;
  color: #fff;
}
.button.is-info.is-outlined.is-loading::after {
  border-color: transparent transparent #3298dc #3298dc !important;
}
.button.is-info.is-outlined.is-loading:hover::after, .button.is-info.is-outlined.is-loading.is-hovered::after, .button.is-info.is-outlined.is-loading:focus::after, .button.is-info.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-info.is-outlined[disabled], fieldset[disabled] .button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3298dc;
  box-shadow: none;
  color: #3298dc;
}
.button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined.is-hovered, .button.is-info.is-inverted.is-outlined:focus, .button.is-info.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #3298dc;
}
.button.is-info.is-inverted.is-outlined.is-loading:hover::after, .button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-info.is-inverted.is-outlined.is-loading:focus::after, .button.is-info.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #3298dc #3298dc !important;
}
.button.is-info.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}
.button.is-info.is-light:hover, .button.is-info.is-light.is-hovered {
  background-color: #e3f1fa;
  border-color: transparent;
  color: #1d72aa;
}
.button.is-info.is-light:active, .button.is-info.is-light.is-active {
  background-color: #d8ebf8;
  border-color: transparent;
  color: #1d72aa;
}
.button.is-success {
  background-color: #48c774;
  border-color: transparent;
  color: #fff;
}
.button.is-success:hover, .button.is-success.is-hovered {
  background-color: #3ec46d;
  border-color: transparent;
  color: #fff;
}
.button.is-success:focus, .button.is-success.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-success:focus:not(:active), .button.is-success.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}
.button.is-success:active, .button.is-success.is-active {
  background-color: #3abb67;
  border-color: transparent;
  color: #fff;
}
.button.is-success[disabled], fieldset[disabled] .button.is-success {
  background-color: #48c774;
  border-color: transparent;
  box-shadow: none;
}
.button.is-success.is-inverted {
  background-color: #fff;
  color: #48c774;
}
.button.is-success.is-inverted:hover, .button.is-success.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-success.is-inverted[disabled], fieldset[disabled] .button.is-success.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #48c774;
}
.button.is-success.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c774;
  color: #48c774;
}
.button.is-success.is-outlined:hover, .button.is-success.is-outlined.is-hovered, .button.is-success.is-outlined:focus, .button.is-success.is-outlined.is-focused {
  background-color: #48c774;
  border-color: #48c774;
  color: #fff;
}
.button.is-success.is-outlined.is-loading::after {
  border-color: transparent transparent #48c774 #48c774 !important;
}
.button.is-success.is-outlined.is-loading:hover::after, .button.is-success.is-outlined.is-loading.is-hovered::after, .button.is-success.is-outlined.is-loading:focus::after, .button.is-success.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-success.is-outlined[disabled], fieldset[disabled] .button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c774;
  box-shadow: none;
  color: #48c774;
}
.button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined.is-hovered, .button.is-success.is-inverted.is-outlined:focus, .button.is-success.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #48c774;
}
.button.is-success.is-inverted.is-outlined.is-loading:hover::after, .button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-success.is-inverted.is-outlined.is-loading:focus::after, .button.is-success.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #48c774 #48c774 !important;
}
.button.is-success.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}
.button.is-success.is-light:hover, .button.is-success.is-light.is-hovered {
  background-color: #e6f7ec;
  border-color: transparent;
  color: #257942;
}
.button.is-success.is-light:active, .button.is-success.is-light.is-active {
  background-color: #dcf4e4;
  border-color: transparent;
  color: #257942;
}
.button.is-warning {
  background-color: #F9CD69;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning:hover, .button.is-warning.is-hovered {
  background-color: #f9c95d;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning:focus, .button.is-warning.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning:focus:not(:active), .button.is-warning.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(249, 205, 105, 0.25);
}
.button.is-warning:active, .button.is-warning.is-active {
  background-color: #f8c550;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning[disabled], fieldset[disabled] .button.is-warning {
  background-color: #F9CD69;
  border-color: transparent;
  box-shadow: none;
}
.button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: #F9CD69;
}
.button.is-warning.is-inverted:hover, .button.is-warning.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-inverted[disabled], fieldset[disabled] .button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: #F9CD69;
}
.button.is-warning.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #F9CD69;
  color: #F9CD69;
}
.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined.is-hovered, .button.is-warning.is-outlined:focus, .button.is-warning.is-outlined.is-focused {
  background-color: #F9CD69;
  border-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-outlined.is-loading::after {
  border-color: transparent transparent #F9CD69 #F9CD69 !important;
}
.button.is-warning.is-outlined.is-loading:hover::after, .button.is-warning.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-outlined.is-loading:focus::after, .button.is-warning.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-warning.is-outlined[disabled], fieldset[disabled] .button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #F9CD69;
  box-shadow: none;
  color: #F9CD69;
}
.button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined.is-hovered, .button.is-warning.is-inverted.is-outlined:focus, .button.is-warning.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: #F9CD69;
}
.button.is-warning.is-inverted.is-outlined.is-loading:hover::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-inverted.is-outlined.is-loading:focus::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #F9CD69 #F9CD69 !important;
}
.button.is-warning.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-light {
  background-color: #fef8eb;
  color: #8e6406;
}
.button.is-warning.is-light:hover, .button.is-warning.is-light.is-hovered {
  background-color: #fef4df;
  border-color: transparent;
  color: #8e6406;
}
.button.is-warning.is-light:active, .button.is-warning.is-light.is-active {
  background-color: #fdf0d3;
  border-color: transparent;
  color: #8e6406;
}
.button.is-danger {
  background-color: #c21f3a;
  border-color: transparent;
  color: #fff;
}
.button.is-danger:hover, .button.is-danger.is-hovered {
  background-color: #b71d37;
  border-color: transparent;
  color: #fff;
}
.button.is-danger:focus, .button.is-danger.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-danger:focus:not(:active), .button.is-danger.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(194, 31, 58, 0.25);
}
.button.is-danger:active, .button.is-danger.is-active {
  background-color: #ac1b33;
  border-color: transparent;
  color: #fff;
}
.button.is-danger[disabled], fieldset[disabled] .button.is-danger {
  background-color: #c21f3a;
  border-color: transparent;
  box-shadow: none;
}
.button.is-danger.is-inverted {
  background-color: #fff;
  color: #c21f3a;
}
.button.is-danger.is-inverted:hover, .button.is-danger.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-danger.is-inverted[disabled], fieldset[disabled] .button.is-danger.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #c21f3a;
}
.button.is-danger.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #c21f3a;
  color: #c21f3a;
}
.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined.is-hovered, .button.is-danger.is-outlined:focus, .button.is-danger.is-outlined.is-focused {
  background-color: #c21f3a;
  border-color: #c21f3a;
  color: #fff;
}
.button.is-danger.is-outlined.is-loading::after {
  border-color: transparent transparent #c21f3a #c21f3a !important;
}
.button.is-danger.is-outlined.is-loading:hover::after, .button.is-danger.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-outlined.is-loading:focus::after, .button.is-danger.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-danger.is-outlined[disabled], fieldset[disabled] .button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #c21f3a;
  box-shadow: none;
  color: #c21f3a;
}
.button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined.is-hovered, .button.is-danger.is-inverted.is-outlined:focus, .button.is-danger.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #c21f3a;
}
.button.is-danger.is-inverted.is-outlined.is-loading:hover::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-inverted.is-outlined.is-loading:focus::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #c21f3a #c21f3a !important;
}
.button.is-danger.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-danger.is-light {
  background-color: #fcedf0;
  color: #d72240;
}
.button.is-danger.is-light:hover, .button.is-danger.is-light.is-hovered {
  background-color: #fae2e6;
  border-color: transparent;
  color: #d72240;
}
.button.is-danger.is-light:active, .button.is-danger.is-light.is-active {
  background-color: #f9d7dd;
  border-color: transparent;
  color: #d72240;
}
.button.is-small {
  font-size: 0.75rem;
}
.button.is-small:not(.is-rounded) {
  border-radius: 2px;
}
.button.is-normal {
  font-size: 1rem;
}
.button.is-medium {
  font-size: 1.25rem;
}
.button.is-large {
  font-size: 1.5rem;
}
.button[disabled], fieldset[disabled] .button {
  background-color: white;
  border-color: #dbdbdb;
  box-shadow: none;
  opacity: 0.5;
}
.button.is-fullwidth {
  display: flex;
  width: 100%;
}
.button.is-loading {
  color: transparent !important;
  pointer-events: none;
}
.button.is-loading::after {
  position: absolute;
  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
  position: absolute !important;
}
.button.is-static {
  background-color: whitesmoke;
  border-color: #dbdbdb;
  color: #7a7a7a;
  box-shadow: none;
  pointer-events: none;
}
.button.is-rounded {
  border-radius: 290486px;
  padding-left: calc(1em + 0.25em);
  padding-right: calc(1em + 0.25em);
}

.buttons {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.buttons .button {
  margin-bottom: 0.5rem;
}
.buttons .button:not(:last-child):not(.is-fullwidth) {
  margin-right: 0.5rem;
}
.buttons:last-child {
  margin-bottom: -0.5rem;
}
.buttons:not(:last-child) {
  margin-bottom: 1rem;
}
.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large) {
  font-size: 0.75rem;
}
.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded) {
  border-radius: 2px;
}
.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large) {
  font-size: 1.25rem;
}
.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium) {
  font-size: 1.5rem;
}
.buttons.has-addons .button:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.buttons.has-addons .button:not(:last-child) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  margin-right: -1px;
}
.buttons.has-addons .button:last-child {
  margin-right: 0;
}
.buttons.has-addons .button:hover, .buttons.has-addons .button.is-hovered {
  z-index: 2;
}
.buttons.has-addons .button:focus, .buttons.has-addons .button.is-focused, .buttons.has-addons .button:active, .buttons.has-addons .button.is-active, .buttons.has-addons .button.is-selected {
  z-index: 3;
}
.buttons.has-addons .button:focus:hover, .buttons.has-addons .button.is-focused:hover, .buttons.has-addons .button:active:hover, .buttons.has-addons .button.is-active:hover, .buttons.has-addons .button.is-selected:hover {
  z-index: 4;
}
.buttons.has-addons .button.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}
.buttons.is-centered {
  justify-content: center;
}
.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.buttons.is-right {
  justify-content: flex-end;
}
.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.container {
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: auto;
}
.container.is-fluid {
  max-width: none !important;
  padding-left: 32px;
  padding-right: 32px;
  width: 100%;
}
@media screen and (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}
@media screen and (max-width: 1215px) {
  .container.is-widescreen:not(.is-max-desktop) {
    max-width: 1152px;
  }
}
@media screen and (max-width: 1407px) {
  .container.is-fullhd:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
  }
}
@media screen and (min-width: 1216px) {
  .container:not(.is-max-desktop) {
    max-width: 1152px;
  }
}
@media screen and (min-width: 1408px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
  }
}

.content li + li {
  margin-top: 0.25em;
}
.content p:not(:last-child),
.content dl:not(:last-child),
.content ol:not(:last-child),
.content ul:not(:last-child),
.content blockquote:not(:last-child),
.content pre:not(:last-child),
.content table:not(:last-child) {
  margin-bottom: 1em;
}
.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
}
.content h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}
.content h1:not(:first-child) {
  margin-top: 1em;
}
.content h2 {
  font-size: 1.75em;
  margin-bottom: 0.5714em;
}
.content h2:not(:first-child) {
  margin-top: 1.1428em;
}
.content h3 {
  font-size: 1.5em;
  margin-bottom: 0.6666em;
}
.content h3:not(:first-child) {
  margin-top: 1.3333em;
}
.content h4 {
  font-size: 1.25em;
  margin-bottom: 0.8em;
}
.content h5 {
  font-size: 1.125em;
  margin-bottom: 0.8888em;
}
.content h6 {
  font-size: 1em;
  margin-bottom: 1em;
}
.content blockquote {
  background-color: whitesmoke;
  border-left: 5px solid #dbdbdb;
  padding: 1.25em 1.5em;
}
.content ol {
  list-style-position: outside;
  margin-left: 2em;
  margin-top: 1em;
}
.content ol:not([type]) {
  list-style-type: decimal;
}
.content ol:not([type]).is-lower-alpha {
  list-style-type: lower-alpha;
}
.content ol:not([type]).is-lower-roman {
  list-style-type: lower-roman;
}
.content ol:not([type]).is-upper-alpha {
  list-style-type: upper-alpha;
}
.content ol:not([type]).is-upper-roman {
  list-style-type: upper-roman;
}
.content ul {
  list-style: disc outside;
  margin-left: 2em;
  margin-top: 1em;
}
.content ul ul {
  list-style-type: circle;
  margin-top: 0.5em;
}
.content ul ul ul {
  list-style-type: square;
}
.content dd {
  margin-left: 2em;
}
.content figure {
  margin-left: 2em;
  margin-right: 2em;
  text-align: center;
}
.content figure:not(:first-child) {
  margin-top: 2em;
}
.content figure:not(:last-child) {
  margin-bottom: 2em;
}
.content figure img {
  display: inline-block;
}
.content figure figcaption {
  font-style: italic;
}
.content pre {
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  padding: 1.25em 1.5em;
  white-space: pre;
  word-wrap: normal;
}
.content sup,
.content sub {
  font-size: 75%;
}
.content table {
  width: 100%;
}
.content table td,
.content table th {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}
.content table th {
  color: #363636;
}
.content table th:not([align]) {
  text-align: inherit;
}
.content table thead td,
.content table thead th {
  border-width: 0 0 2px;
  color: #363636;
}
.content table tfoot td,
.content table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}
.content table tbody tr:last-child td,
.content table tbody tr:last-child th {
  border-bottom-width: 0;
}
.content .tabs li + li {
  margin-top: 0;
}
.content.is-small {
  font-size: 0.75rem;
}
.content.is-medium {
  font-size: 1.25rem;
}
.content.is-large {
  font-size: 1.5rem;
}

.icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
}
.icon.is-small {
  height: 1rem;
  width: 1rem;
}
.icon.is-medium {
  height: 2rem;
  width: 2rem;
}
.icon.is-large {
  height: 3rem;
  width: 3rem;
}

.icon-text {
  align-items: flex-start;
  color: inherit;
  display: inline-flex;
  flex-wrap: wrap;
  line-height: 1.5rem;
  vertical-align: top;
}
.icon-text .icon {
  flex-grow: 0;
  flex-shrink: 0;
}
.icon-text .icon:not(:last-child) {
  margin-right: 0.25em;
}
.icon-text .icon:not(:first-child) {
  margin-left: 0.25em;
}

div.icon-text {
  display: flex;
}

.image {
  display: block;
  position: relative;
}
.image img {
  display: block;
  height: auto;
  width: 100%;
}
.image img.is-rounded {
  border-radius: 290486px;
}
.image.is-fullwidth {
  width: 100%;
}
.image.is-square img,
.image.is-square .has-ratio, .image.is-1by1 img,
.image.is-1by1 .has-ratio, .image.is-5by4 img,
.image.is-5by4 .has-ratio, .image.is-4by3 img,
.image.is-4by3 .has-ratio, .image.is-3by2 img,
.image.is-3by2 .has-ratio, .image.is-5by3 img,
.image.is-5by3 .has-ratio, .image.is-16by9 img,
.image.is-16by9 .has-ratio, .image.is-2by1 img,
.image.is-2by1 .has-ratio, .image.is-3by1 img,
.image.is-3by1 .has-ratio, .image.is-4by5 img,
.image.is-4by5 .has-ratio, .image.is-3by4 img,
.image.is-3by4 .has-ratio, .image.is-2by3 img,
.image.is-2by3 .has-ratio, .image.is-3by5 img,
.image.is-3by5 .has-ratio, .image.is-9by16 img,
.image.is-9by16 .has-ratio, .image.is-1by2 img,
.image.is-1by2 .has-ratio, .image.is-1by3 img,
.image.is-1by3 .has-ratio {
  height: 100%;
  width: 100%;
}
.image.is-square, .image.is-1by1 {
  padding-top: 100%;
}
.image.is-5by4 {
  padding-top: 80%;
}
.image.is-4by3 {
  padding-top: 75%;
}
.image.is-3by2 {
  padding-top: 66.6666%;
}
.image.is-5by3 {
  padding-top: 60%;
}
.image.is-16by9 {
  padding-top: 56.25%;
}
.image.is-2by1 {
  padding-top: 50%;
}
.image.is-3by1 {
  padding-top: 33.3333%;
}
.image.is-4by5 {
  padding-top: 125%;
}
.image.is-3by4 {
  padding-top: 133.3333%;
}
.image.is-2by3 {
  padding-top: 150%;
}
.image.is-3by5 {
  padding-top: 166.6666%;
}
.image.is-9by16 {
  padding-top: 177.7777%;
}
.image.is-1by2 {
  padding-top: 200%;
}
.image.is-1by3 {
  padding-top: 300%;
}
.image.is-16x16 {
  height: 16px;
  width: 16px;
}
.image.is-24x24 {
  height: 24px;
  width: 24px;
}
.image.is-32x32 {
  height: 32px;
  width: 32px;
}
.image.is-48x48 {
  height: 48px;
  width: 48px;
}
.image.is-64x64 {
  height: 64px;
  width: 64px;
}
.image.is-96x96 {
  height: 96px;
  width: 96px;
}
.image.is-128x128 {
  height: 128px;
  width: 128px;
}

.notification {
  background-color: whitesmoke;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}
.notification a:not(.button):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}
.notification strong {
  color: currentColor;
}
.notification code,
.notification pre {
  background: white;
}
.notification pre code {
  background: transparent;
}
.notification > .delete {
  right: 0.5rem;
  position: absolute;
  top: 0.5rem;
}
.notification .title,
.notification .subtitle,
.notification .content {
  color: currentColor;
}
.notification.is-white {
  background-color: white;
  color: black;
}
.notification.is-black {
  background-color: black;
  color: white;
}
.notification.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.notification.is-dark {
  background-color: #363636;
  color: #fff;
}
.notification.is-primary {
  background-color: #00d1b2;
  color: #fff;
}
.notification.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}
.notification.is-link {
  background-color: #4FB3D9;
  color: #fff;
}
.notification.is-link.is-light {
  background-color: #eef8fb;
  color: #1e6d8a;
}
.notification.is-info {
  background-color: #3298dc;
  color: #fff;
}
.notification.is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}
.notification.is-success {
  background-color: #48c774;
  color: #fff;
}
.notification.is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}
.notification.is-warning {
  background-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.notification.is-warning.is-light {
  background-color: #fef8eb;
  color: #8e6406;
}
.notification.is-danger {
  background-color: #c21f3a;
  color: #fff;
}
.notification.is-danger.is-light {
  background-color: #fcedf0;
  color: #d72240;
}

.progress {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  border-radius: 290486px;
  display: block;
  height: 1rem;
  overflow: hidden;
  padding: 0;
  width: 100%;
}
.progress::-webkit-progress-bar {
  background-color: #ededed;
}
.progress::-webkit-progress-value {
  background-color: #4a4a4a;
}
.progress::-moz-progress-bar {
  background-color: #4a4a4a;
}
.progress::-ms-fill {
  background-color: #4a4a4a;
  border: none;
}
.progress.is-white::-webkit-progress-value {
  background-color: white;
}
.progress.is-white::-moz-progress-bar {
  background-color: white;
}
.progress.is-white::-ms-fill {
  background-color: white;
}
.progress.is-white:indeterminate {
  background-image: linear-gradient(to right, white 30%, #ededed 30%);
}
.progress.is-black::-webkit-progress-value {
  background-color: black;
}
.progress.is-black::-moz-progress-bar {
  background-color: black;
}
.progress.is-black::-ms-fill {
  background-color: black;
}
.progress.is-black:indeterminate {
  background-image: linear-gradient(to right, black 30%, #ededed 30%);
}
.progress.is-light::-webkit-progress-value {
  background-color: whitesmoke;
}
.progress.is-light::-moz-progress-bar {
  background-color: whitesmoke;
}
.progress.is-light::-ms-fill {
  background-color: whitesmoke;
}
.progress.is-light:indeterminate {
  background-image: linear-gradient(to right, whitesmoke 30%, #ededed 30%);
}
.progress.is-dark::-webkit-progress-value {
  background-color: #363636;
}
.progress.is-dark::-moz-progress-bar {
  background-color: #363636;
}
.progress.is-dark::-ms-fill {
  background-color: #363636;
}
.progress.is-dark:indeterminate {
  background-image: linear-gradient(to right, #363636 30%, #ededed 30%);
}
.progress.is-primary::-webkit-progress-value {
  background-color: #00d1b2;
}
.progress.is-primary::-moz-progress-bar {
  background-color: #00d1b2;
}
.progress.is-primary::-ms-fill {
  background-color: #00d1b2;
}
.progress.is-primary:indeterminate {
  background-image: linear-gradient(to right, #00d1b2 30%, #ededed 30%);
}
.progress.is-link::-webkit-progress-value {
  background-color: #4FB3D9;
}
.progress.is-link::-moz-progress-bar {
  background-color: #4FB3D9;
}
.progress.is-link::-ms-fill {
  background-color: #4FB3D9;
}
.progress.is-link:indeterminate {
  background-image: linear-gradient(to right, #4FB3D9 30%, #ededed 30%);
}
.progress.is-info::-webkit-progress-value {
  background-color: #3298dc;
}
.progress.is-info::-moz-progress-bar {
  background-color: #3298dc;
}
.progress.is-info::-ms-fill {
  background-color: #3298dc;
}
.progress.is-info:indeterminate {
  background-image: linear-gradient(to right, #3298dc 30%, #ededed 30%);
}
.progress.is-success::-webkit-progress-value {
  background-color: #48c774;
}
.progress.is-success::-moz-progress-bar {
  background-color: #48c774;
}
.progress.is-success::-ms-fill {
  background-color: #48c774;
}
.progress.is-success:indeterminate {
  background-image: linear-gradient(to right, #48c774 30%, #ededed 30%);
}
.progress.is-warning::-webkit-progress-value {
  background-color: #F9CD69;
}
.progress.is-warning::-moz-progress-bar {
  background-color: #F9CD69;
}
.progress.is-warning::-ms-fill {
  background-color: #F9CD69;
}
.progress.is-warning:indeterminate {
  background-image: linear-gradient(to right, #F9CD69 30%, #ededed 30%);
}
.progress.is-danger::-webkit-progress-value {
  background-color: #c21f3a;
}
.progress.is-danger::-moz-progress-bar {
  background-color: #c21f3a;
}
.progress.is-danger::-ms-fill {
  background-color: #c21f3a;
}
.progress.is-danger:indeterminate {
  background-image: linear-gradient(to right, #c21f3a 30%, #ededed 30%);
}
.progress:indeterminate {
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: moveIndeterminate;
  animation-timing-function: linear;
  background-color: #ededed;
  background-image: linear-gradient(to right, #4a4a4a 30%, #ededed 30%);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 150% 150%;
}
.progress:indeterminate::-webkit-progress-bar {
  background-color: transparent;
}
.progress:indeterminate::-moz-progress-bar {
  background-color: transparent;
}
.progress:indeterminate::-ms-fill {
  animation-name: none;
}
.progress.is-small {
  height: 0.75rem;
}
.progress.is-medium {
  height: 1.25rem;
}
.progress.is-large {
  height: 1.5rem;
}

@keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
.table {
  background-color: white;
  color: #363636;
}
.table td,
.table th {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}
.table td.is-white,
.table th.is-white {
  background-color: white;
  border-color: white;
  color: black;
}
.table td.is-black,
.table th.is-black {
  background-color: black;
  border-color: black;
  color: white;
}
.table td.is-light,
.table th.is-light {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.table td.is-dark,
.table th.is-dark {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}
.table td.is-primary,
.table th.is-primary {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}
.table td.is-link,
.table th.is-link {
  background-color: #4FB3D9;
  border-color: #4FB3D9;
  color: #fff;
}
.table td.is-info,
.table th.is-info {
  background-color: #3298dc;
  border-color: #3298dc;
  color: #fff;
}
.table td.is-success,
.table th.is-success {
  background-color: #48c774;
  border-color: #48c774;
  color: #fff;
}
.table td.is-warning,
.table th.is-warning {
  background-color: #F9CD69;
  border-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.table td.is-danger,
.table th.is-danger {
  background-color: #c21f3a;
  border-color: #c21f3a;
  color: #fff;
}
.table td.is-narrow,
.table th.is-narrow {
  white-space: nowrap;
  width: 1%;
}
.table td.is-selected,
.table th.is-selected {
  background-color: #00d1b2;
  color: #fff;
}
.table td.is-selected a,
.table td.is-selected strong,
.table th.is-selected a,
.table th.is-selected strong {
  color: currentColor;
}
.table td.is-vcentered,
.table th.is-vcentered {
  vertical-align: middle;
}
.table th {
  color: #363636;
}
.table th:not([align]) {
  text-align: inherit;
}
.table tr.is-selected {
  background-color: #00d1b2;
  color: #fff;
}
.table tr.is-selected a,
.table tr.is-selected strong {
  color: currentColor;
}
.table tr.is-selected td,
.table tr.is-selected th {
  border-color: #fff;
  color: currentColor;
}
.table thead {
  background-color: transparent;
}
.table thead td,
.table thead th {
  border-width: 0 0 2px;
  color: #363636;
}
.table tfoot {
  background-color: transparent;
}
.table tfoot td,
.table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}
.table tbody {
  background-color: transparent;
}
.table tbody tr:last-child td,
.table tbody tr:last-child th {
  border-bottom-width: 0;
}
.table.is-bordered td,
.table.is-bordered th {
  border-width: 1px;
}
.table.is-bordered tr:last-child td,
.table.is-bordered tr:last-child th {
  border-bottom-width: 1px;
}
.table.is-fullwidth {
  width: 100%;
}
.table.is-hoverable tbody tr:not(.is-selected):hover {
  background-color: #fafafa;
}
.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover {
  background-color: #fafafa;
}
.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even) {
  background-color: whitesmoke;
}
.table.is-narrow td,
.table.is-narrow th {
  padding: 0.25em 0.5em;
}
.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: #fafafa;
}

.table-container {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  overflow-y: hidden;
  max-width: 100%;
}

.tags {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.tags .tag {
  margin-bottom: 0.5rem;
}
.tags .tag:not(:last-child) {
  margin-right: 0.5rem;
}
.tags:last-child {
  margin-bottom: -0.5rem;
}
.tags:not(:last-child) {
  margin-bottom: 1rem;
}
.tags.are-medium .tag:not(.is-normal):not(.is-large) {
  font-size: 1rem;
}
.tags.are-large .tag:not(.is-normal):not(.is-medium) {
  font-size: 1.25rem;
}
.tags.is-centered {
  justify-content: center;
}
.tags.is-centered .tag {
  margin-right: 0.25rem;
  margin-left: 0.25rem;
}
.tags.is-right {
  justify-content: flex-end;
}
.tags.is-right .tag:not(:first-child) {
  margin-left: 0.5rem;
}
.tags.is-right .tag:not(:last-child) {
  margin-right: 0;
}
.tags.has-addons .tag {
  margin-right: 0;
}
.tags.has-addons .tag:not(:first-child) {
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.tags.has-addons .tag:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.tag:not(body) {
  align-items: center;
  background-color: whitesmoke;
  border-radius: 4px;
  color: #4a4a4a;
  display: inline-flex;
  font-size: 0.75rem;
  height: 2em;
  justify-content: center;
  line-height: 1.5;
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
}
.tag:not(body) .delete {
  margin-left: 0.25rem;
  margin-right: -0.375rem;
}
.tag:not(body).is-white {
  background-color: white;
  color: black;
}
.tag:not(body).is-black {
  background-color: black;
  color: white;
}
.tag:not(body).is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.tag:not(body).is-dark {
  background-color: #363636;
  color: #fff;
}
.tag:not(body).is-primary {
  background-color: #00d1b2;
  color: #fff;
}
.tag:not(body).is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}
.tag:not(body).is-link {
  background-color: #4FB3D9;
  color: #fff;
}
.tag:not(body).is-link.is-light {
  background-color: #eef8fb;
  color: #1e6d8a;
}
.tag:not(body).is-info {
  background-color: #3298dc;
  color: #fff;
}
.tag:not(body).is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}
.tag:not(body).is-success {
  background-color: #48c774;
  color: #fff;
}
.tag:not(body).is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}
.tag:not(body).is-warning {
  background-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.tag:not(body).is-warning.is-light {
  background-color: #fef8eb;
  color: #8e6406;
}
.tag:not(body).is-danger {
  background-color: #c21f3a;
  color: #fff;
}
.tag:not(body).is-danger.is-light {
  background-color: #fcedf0;
  color: #d72240;
}
.tag:not(body).is-normal {
  font-size: 0.75rem;
}
.tag:not(body).is-medium {
  font-size: 1rem;
}
.tag:not(body).is-large {
  font-size: 1.25rem;
}
.tag:not(body) .icon:first-child:not(:last-child) {
  margin-left: -0.375em;
  margin-right: 0.1875em;
}
.tag:not(body) .icon:last-child:not(:first-child) {
  margin-left: 0.1875em;
  margin-right: -0.375em;
}
.tag:not(body) .icon:first-child:last-child {
  margin-left: -0.375em;
  margin-right: -0.375em;
}
.tag:not(body).is-delete {
  margin-left: 1px;
  padding: 0;
  position: relative;
  width: 2em;
}
.tag:not(body).is-delete::before, .tag:not(body).is-delete::after {
  background-color: currentColor;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}
.tag:not(body).is-delete::before {
  height: 1px;
  width: 50%;
}
.tag:not(body).is-delete::after {
  height: 50%;
  width: 1px;
}
.tag:not(body).is-delete:hover, .tag:not(body).is-delete:focus {
  background-color: #e8e8e8;
}
.tag:not(body).is-delete:active {
  background-color: #dbdbdb;
}
.tag:not(body).is-rounded {
  border-radius: 290486px;
}

a.tag:hover {
  text-decoration: underline;
}

.title,
.subtitle {
  word-break: break-word;
}
.title em,
.title span,
.subtitle em,
.subtitle span {
  font-weight: inherit;
}
.title sub,
.subtitle sub {
  font-size: 0.75em;
}
.title sup,
.subtitle sup {
  font-size: 0.75em;
}
.title .tag,
.subtitle .tag {
  vertical-align: middle;
}

.title {
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
}
.title strong {
  color: inherit;
  font-weight: inherit;
}
.title + .highlight {
  margin-top: -0.75rem;
}
.title:not(.is-spaced) + .subtitle {
  margin-top: -1.25rem;
}
.title.is-1 {
  font-size: 3rem;
}
.title.is-2 {
  font-size: 2.5rem;
}
.title.is-3 {
  font-size: 2rem;
}
.title.is-4 {
  font-size: 1.5rem;
}
.title.is-5 {
  font-size: 1.25rem;
}
.title.is-6 {
  font-size: 1rem;
}
.title.is-7 {
  font-size: 0.75rem;
}

.subtitle {
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}
.subtitle strong {
  color: #363636;
  font-weight: 600;
}
.subtitle:not(.is-spaced) + .title {
  margin-top: -1.25rem;
}
.subtitle.is-1 {
  font-size: 3rem;
}
.subtitle.is-2 {
  font-size: 2.5rem;
}
.subtitle.is-3 {
  font-size: 2rem;
}
.subtitle.is-4 {
  font-size: 1.5rem;
}
.subtitle.is-5 {
  font-size: 1.25rem;
}
.subtitle.is-6 {
  font-size: 1rem;
}
.subtitle.is-7 {
  font-size: 0.75rem;
}

.heading {
  display: block;
  font-size: 11px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.highlight {
  font-weight: 400;
  max-width: 100%;
  overflow: hidden;
  padding: 0;
}
.highlight pre {
  overflow: auto;
  max-width: 100%;
}

.number {
  align-items: center;
  background-color: whitesmoke;
  border-radius: 290486px;
  display: inline-flex;
  font-size: 1.25rem;
  height: 2em;
  justify-content: center;
  margin-right: 1.5rem;
  min-width: 2.5em;
  padding: 0.25rem 0.5rem;
  text-align: center;
  vertical-align: top;
}

/* Bulma Form */
.select select, .textarea, .input {
  background-color: white;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
.select select::-moz-placeholder, .textarea::-moz-placeholder, .input::-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}
.select select::-webkit-input-placeholder, .textarea::-webkit-input-placeholder, .input::-webkit-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}
.select select:-moz-placeholder, .textarea:-moz-placeholder, .input:-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}
.select select:-ms-input-placeholder, .textarea:-ms-input-placeholder, .input:-ms-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}
.select select:hover, .textarea:hover, .input:hover, .select select.is-hovered, .is-hovered.textarea, .is-hovered.input {
  border-color: #b5b5b5;
}
.select select:focus, .textarea:focus, .input:focus, .select select.is-focused, .is-focused.textarea, .is-focused.input, .select select:active, .textarea:active, .input:active, .select select.is-active, .is-active.textarea, .is-active.input {
  border-color: #4FB3D9;
  box-shadow: 0 0 0 0.125em rgba(79, 179, 217, 0.25);
}
.select select[disabled], [disabled].textarea, [disabled].input, fieldset[disabled] .select select, .select fieldset[disabled] select, fieldset[disabled] .textarea, fieldset[disabled] .input {
  background-color: whitesmoke;
  border-color: whitesmoke;
  box-shadow: none;
  color: #7a7a7a;
}
.select select[disabled]::-moz-placeholder, [disabled].textarea::-moz-placeholder, [disabled].input::-moz-placeholder, fieldset[disabled] .select select::-moz-placeholder, .select fieldset[disabled] select::-moz-placeholder, fieldset[disabled] .textarea::-moz-placeholder, fieldset[disabled] .input::-moz-placeholder {
  color: rgba(122, 122, 122, 0.3);
}
.select select[disabled]::-webkit-input-placeholder, [disabled].textarea::-webkit-input-placeholder, [disabled].input::-webkit-input-placeholder, fieldset[disabled] .select select::-webkit-input-placeholder, .select fieldset[disabled] select::-webkit-input-placeholder, fieldset[disabled] .textarea::-webkit-input-placeholder, fieldset[disabled] .input::-webkit-input-placeholder {
  color: rgba(122, 122, 122, 0.3);
}
.select select[disabled]:-moz-placeholder, [disabled].textarea:-moz-placeholder, [disabled].input:-moz-placeholder, fieldset[disabled] .select select:-moz-placeholder, .select fieldset[disabled] select:-moz-placeholder, fieldset[disabled] .textarea:-moz-placeholder, fieldset[disabled] .input:-moz-placeholder {
  color: rgba(122, 122, 122, 0.3);
}
.select select[disabled]:-ms-input-placeholder, [disabled].textarea:-ms-input-placeholder, [disabled].input:-ms-input-placeholder, fieldset[disabled] .select select:-ms-input-placeholder, .select fieldset[disabled] select:-ms-input-placeholder, fieldset[disabled] .textarea:-ms-input-placeholder, fieldset[disabled] .input:-ms-input-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.textarea, .input {
  box-shadow: inset 0 0.0625em 0.125em rgba(0, 0, 0, 0.05);
  max-width: 100%;
  width: 100%;
}
[readonly].textarea, [readonly].input {
  box-shadow: none;
}
.is-white.textarea, .is-white.input {
  border-color: white;
}
.is-white.textarea:focus, .is-white.input:focus, .is-white.is-focused.textarea, .is-white.is-focused.input, .is-white.textarea:active, .is-white.input:active, .is-white.is-active.textarea, .is-white.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}
.is-black.textarea, .is-black.input {
  border-color: black;
}
.is-black.textarea:focus, .is-black.input:focus, .is-black.is-focused.textarea, .is-black.is-focused.input, .is-black.textarea:active, .is-black.input:active, .is-black.is-active.textarea, .is-black.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25);
}
.is-light.textarea, .is-light.input {
  border-color: whitesmoke;
}
.is-light.textarea:focus, .is-light.input:focus, .is-light.is-focused.textarea, .is-light.is-focused.input, .is-light.textarea:active, .is-light.input:active, .is-light.is-active.textarea, .is-light.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}
.is-dark.textarea, .is-dark.input {
  border-color: #363636;
}
.is-dark.textarea:focus, .is-dark.input:focus, .is-dark.is-focused.textarea, .is-dark.is-focused.input, .is-dark.textarea:active, .is-dark.input:active, .is-dark.is-active.textarea, .is-dark.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}
.is-primary.textarea, .is-primary.input {
  border-color: #00d1b2;
}
.is-primary.textarea:focus, .is-primary.input:focus, .is-primary.is-focused.textarea, .is-primary.is-focused.input, .is-primary.textarea:active, .is-primary.input:active, .is-primary.is-active.textarea, .is-primary.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}
.is-link.textarea, .is-link.input {
  border-color: #4FB3D9;
}
.is-link.textarea:focus, .is-link.input:focus, .is-link.is-focused.textarea, .is-link.is-focused.input, .is-link.textarea:active, .is-link.input:active, .is-link.is-active.textarea, .is-link.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(79, 179, 217, 0.25);
}
.is-info.textarea, .is-info.input {
  border-color: #3298dc;
}
.is-info.textarea:focus, .is-info.input:focus, .is-info.is-focused.textarea, .is-info.is-focused.input, .is-info.textarea:active, .is-info.input:active, .is-info.is-active.textarea, .is-info.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}
.is-success.textarea, .is-success.input {
  border-color: #48c774;
}
.is-success.textarea:focus, .is-success.input:focus, .is-success.is-focused.textarea, .is-success.is-focused.input, .is-success.textarea:active, .is-success.input:active, .is-success.is-active.textarea, .is-success.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}
.is-warning.textarea, .is-warning.input {
  border-color: #F9CD69;
}
.is-warning.textarea:focus, .is-warning.input:focus, .is-warning.is-focused.textarea, .is-warning.is-focused.input, .is-warning.textarea:active, .is-warning.input:active, .is-warning.is-active.textarea, .is-warning.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(249, 205, 105, 0.25);
}
.is-danger.textarea, .is-danger.input {
  border-color: #c21f3a;
}
.is-danger.textarea:focus, .is-danger.input:focus, .is-danger.is-focused.textarea, .is-danger.is-focused.input, .is-danger.textarea:active, .is-danger.input:active, .is-danger.is-active.textarea, .is-danger.is-active.input {
  box-shadow: 0 0 0 0.125em rgba(194, 31, 58, 0.25);
}
.is-small.textarea, .is-small.input {
  border-radius: 2px;
  font-size: 0.75rem;
}
.is-medium.textarea, .is-medium.input {
  font-size: 1.25rem;
}
.is-large.textarea, .is-large.input {
  font-size: 1.5rem;
}
.is-fullwidth.textarea, .is-fullwidth.input {
  display: block;
  width: 100%;
}
.is-inline.textarea, .is-inline.input {
  display: inline;
  width: auto;
}

.input.is-rounded {
  border-radius: 290486px;
  padding-left: calc(calc(0.75em - 1px) + 0.375em);
  padding-right: calc(calc(0.75em - 1px) + 0.375em);
}
.input.is-static {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
}

.textarea {
  display: block;
  max-width: 100%;
  min-width: 100%;
  padding: calc(0.75em - 1px);
  resize: vertical;
}
.textarea:not([rows]) {
  max-height: 40em;
  min-height: 8em;
}
.textarea[rows] {
  height: initial;
}
.textarea.has-fixed-size {
  resize: none;
}

.radio, .checkbox {
  cursor: pointer;
  display: inline-block;
  line-height: 1.25;
  position: relative;
}
.radio input, .checkbox input {
  cursor: pointer;
}
.radio:hover, .checkbox:hover {
  color: #363636;
}
[disabled].radio, [disabled].checkbox, fieldset[disabled] .radio, fieldset[disabled] .checkbox,
.radio input[disabled],
.checkbox input[disabled] {
  color: #7a7a7a;
  cursor: not-allowed;
}

.radio + .radio {
  margin-left: 0.5em;
}

.select {
  display: inline-block;
  max-width: 100%;
  position: relative;
  vertical-align: top;
}
.select:not(.is-multiple) {
  height: 2.5em;
}
.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #4FB3D9;
  right: 1.125em;
  z-index: 4;
}
.select.is-rounded select {
  border-radius: 290486px;
  padding-left: 1em;
}
.select select {
  cursor: pointer;
  display: block;
  font-size: 1em;
  max-width: 100%;
  outline: none;
}
.select select::-ms-expand {
  display: none;
}
.select select[disabled]:hover, fieldset[disabled] .select select:hover {
  border-color: whitesmoke;
}
.select select:not([multiple]) {
  padding-right: 2.5em;
}
.select select[multiple] {
  height: auto;
  padding: 0;
}
.select select[multiple] option {
  padding: 0.5em 1em;
}
.select:not(.is-multiple):not(.is-loading):hover::after {
  border-color: #363636;
}
.select.is-white:not(:hover)::after {
  border-color: white;
}
.select.is-white select {
  border-color: white;
}
.select.is-white select:hover, .select.is-white select.is-hovered {
  border-color: #f2f2f2;
}
.select.is-white select:focus, .select.is-white select.is-focused, .select.is-white select:active, .select.is-white select.is-active {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}
.select.is-black:not(:hover)::after {
  border-color: black;
}
.select.is-black select {
  border-color: black;
}
.select.is-black select:hover, .select.is-black select.is-hovered {
  border-color: black;
}
.select.is-black select:focus, .select.is-black select.is-focused, .select.is-black select:active, .select.is-black select.is-active {
  box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25);
}
.select.is-light:not(:hover)::after {
  border-color: whitesmoke;
}
.select.is-light select {
  border-color: whitesmoke;
}
.select.is-light select:hover, .select.is-light select.is-hovered {
  border-color: #e8e8e8;
}
.select.is-light select:focus, .select.is-light select.is-focused, .select.is-light select:active, .select.is-light select.is-active {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}
.select.is-dark:not(:hover)::after {
  border-color: #363636;
}
.select.is-dark select {
  border-color: #363636;
}
.select.is-dark select:hover, .select.is-dark select.is-hovered {
  border-color: #292929;
}
.select.is-dark select:focus, .select.is-dark select.is-focused, .select.is-dark select:active, .select.is-dark select.is-active {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}
.select.is-primary:not(:hover)::after {
  border-color: #00d1b2;
}
.select.is-primary select {
  border-color: #00d1b2;
}
.select.is-primary select:hover, .select.is-primary select.is-hovered {
  border-color: #00b89c;
}
.select.is-primary select:focus, .select.is-primary select.is-focused, .select.is-primary select:active, .select.is-primary select.is-active {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}
.select.is-link:not(:hover)::after {
  border-color: #4FB3D9;
}
.select.is-link select {
  border-color: #4FB3D9;
}
.select.is-link select:hover, .select.is-link select.is-hovered {
  border-color: #3aaad4;
}
.select.is-link select:focus, .select.is-link select.is-focused, .select.is-link select:active, .select.is-link select.is-active {
  box-shadow: 0 0 0 0.125em rgba(79, 179, 217, 0.25);
}
.select.is-info:not(:hover)::after {
  border-color: #3298dc;
}
.select.is-info select {
  border-color: #3298dc;
}
.select.is-info select:hover, .select.is-info select.is-hovered {
  border-color: #238cd1;
}
.select.is-info select:focus, .select.is-info select.is-focused, .select.is-info select:active, .select.is-info select.is-active {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}
.select.is-success:not(:hover)::after {
  border-color: #48c774;
}
.select.is-success select {
  border-color: #48c774;
}
.select.is-success select:hover, .select.is-success select.is-hovered {
  border-color: #3abb67;
}
.select.is-success select:focus, .select.is-success select.is-focused, .select.is-success select:active, .select.is-success select.is-active {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}
.select.is-warning:not(:hover)::after {
  border-color: #F9CD69;
}
.select.is-warning select {
  border-color: #F9CD69;
}
.select.is-warning select:hover, .select.is-warning select.is-hovered {
  border-color: #f8c550;
}
.select.is-warning select:focus, .select.is-warning select.is-focused, .select.is-warning select:active, .select.is-warning select.is-active {
  box-shadow: 0 0 0 0.125em rgba(249, 205, 105, 0.25);
}
.select.is-danger:not(:hover)::after {
  border-color: #c21f3a;
}
.select.is-danger select {
  border-color: #c21f3a;
}
.select.is-danger select:hover, .select.is-danger select.is-hovered {
  border-color: #ac1b33;
}
.select.is-danger select:focus, .select.is-danger select.is-focused, .select.is-danger select:active, .select.is-danger select.is-active {
  box-shadow: 0 0 0 0.125em rgba(194, 31, 58, 0.25);
}
.select.is-small {
  border-radius: 2px;
  font-size: 0.75rem;
}
.select.is-medium {
  font-size: 1.25rem;
}
.select.is-large {
  font-size: 1.5rem;
}
.select.is-disabled::after {
  border-color: #7a7a7a;
}
.select.is-fullwidth {
  width: 100%;
}
.select.is-fullwidth select {
  width: 100%;
}
.select.is-loading::after {
  margin-top: 0;
  position: absolute;
  right: 0.625em;
  top: 0.625em;
  transform: none;
}
.select.is-loading.is-small:after {
  font-size: 0.75rem;
}
.select.is-loading.is-medium:after {
  font-size: 1.25rem;
}
.select.is-loading.is-large:after {
  font-size: 1.5rem;
}

.file {
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  position: relative;
}
.file.is-white .file-cta {
  background-color: white;
  border-color: transparent;
  color: black;
}
.file.is-white:hover .file-cta, .file.is-white.is-hovered .file-cta {
  background-color: #f9f9f9;
  border-color: transparent;
  color: black;
}
.file.is-white:focus .file-cta, .file.is-white.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);
  color: black;
}
.file.is-white:active .file-cta, .file.is-white.is-active .file-cta {
  background-color: #f2f2f2;
  border-color: transparent;
  color: black;
}
.file.is-black .file-cta {
  background-color: black;
  border-color: transparent;
  color: white;
}
.file.is-black:hover .file-cta, .file.is-black.is-hovered .file-cta {
  background-color: black;
  border-color: transparent;
  color: white;
}
.file.is-black:focus .file-cta, .file.is-black.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
  color: white;
}
.file.is-black:active .file-cta, .file.is-black.is-active .file-cta {
  background-color: black;
  border-color: transparent;
  color: white;
}
.file.is-light .file-cta {
  background-color: whitesmoke;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.file.is-light:hover .file-cta, .file.is-light.is-hovered .file-cta {
  background-color: #eeeeee;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.file.is-light:focus .file-cta, .file.is-light.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);
  color: rgba(0, 0, 0, 0.7);
}
.file.is-light:active .file-cta, .file.is-light.is-active .file-cta {
  background-color: #e8e8e8;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.file.is-dark .file-cta {
  background-color: #363636;
  border-color: transparent;
  color: #fff;
}
.file.is-dark:hover .file-cta, .file.is-dark.is-hovered .file-cta {
  background-color: #2f2f2f;
  border-color: transparent;
  color: #fff;
}
.file.is-dark:focus .file-cta, .file.is-dark.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);
  color: #fff;
}
.file.is-dark:active .file-cta, .file.is-dark.is-active .file-cta {
  background-color: #292929;
  border-color: transparent;
  color: #fff;
}
.file.is-primary .file-cta {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}
.file.is-primary:hover .file-cta, .file.is-primary.is-hovered .file-cta {
  background-color: #00c4a7;
  border-color: transparent;
  color: #fff;
}
.file.is-primary:focus .file-cta, .file.is-primary.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);
  color: #fff;
}
.file.is-primary:active .file-cta, .file.is-primary.is-active .file-cta {
  background-color: #00b89c;
  border-color: transparent;
  color: #fff;
}
.file.is-link .file-cta {
  background-color: #4FB3D9;
  border-color: transparent;
  color: #fff;
}
.file.is-link:hover .file-cta, .file.is-link.is-hovered .file-cta {
  background-color: #45aed7;
  border-color: transparent;
  color: #fff;
}
.file.is-link:focus .file-cta, .file.is-link.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(79, 179, 217, 0.25);
  color: #fff;
}
.file.is-link:active .file-cta, .file.is-link.is-active .file-cta {
  background-color: #3aaad4;
  border-color: transparent;
  color: #fff;
}
.file.is-info .file-cta {
  background-color: #3298dc;
  border-color: transparent;
  color: #fff;
}
.file.is-info:hover .file-cta, .file.is-info.is-hovered .file-cta {
  background-color: #2793da;
  border-color: transparent;
  color: #fff;
}
.file.is-info:focus .file-cta, .file.is-info.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(50, 152, 220, 0.25);
  color: #fff;
}
.file.is-info:active .file-cta, .file.is-info.is-active .file-cta {
  background-color: #238cd1;
  border-color: transparent;
  color: #fff;
}
.file.is-success .file-cta {
  background-color: #48c774;
  border-color: transparent;
  color: #fff;
}
.file.is-success:hover .file-cta, .file.is-success.is-hovered .file-cta {
  background-color: #3ec46d;
  border-color: transparent;
  color: #fff;
}
.file.is-success:focus .file-cta, .file.is-success.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(72, 199, 116, 0.25);
  color: #fff;
}
.file.is-success:active .file-cta, .file.is-success.is-active .file-cta {
  background-color: #3abb67;
  border-color: transparent;
  color: #fff;
}
.file.is-warning .file-cta {
  background-color: #F9CD69;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.file.is-warning:hover .file-cta, .file.is-warning.is-hovered .file-cta {
  background-color: #f9c95d;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.file.is-warning:focus .file-cta, .file.is-warning.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(249, 205, 105, 0.25);
  color: rgba(0, 0, 0, 0.7);
}
.file.is-warning:active .file-cta, .file.is-warning.is-active .file-cta {
  background-color: #f8c550;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.file.is-danger .file-cta {
  background-color: #c21f3a;
  border-color: transparent;
  color: #fff;
}
.file.is-danger:hover .file-cta, .file.is-danger.is-hovered .file-cta {
  background-color: #b71d37;
  border-color: transparent;
  color: #fff;
}
.file.is-danger:focus .file-cta, .file.is-danger.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(194, 31, 58, 0.25);
  color: #fff;
}
.file.is-danger:active .file-cta, .file.is-danger.is-active .file-cta {
  background-color: #ac1b33;
  border-color: transparent;
  color: #fff;
}
.file.is-small {
  font-size: 0.75rem;
}
.file.is-medium {
  font-size: 1.25rem;
}
.file.is-medium .file-icon .fa {
  font-size: 21px;
}
.file.is-large {
  font-size: 1.5rem;
}
.file.is-large .file-icon .fa {
  font-size: 28px;
}
.file.has-name .file-cta {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.file.has-name .file-name {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.file.has-name.is-empty .file-cta {
  border-radius: 4px;
}
.file.has-name.is-empty .file-name {
  display: none;
}
.file.is-boxed .file-label {
  flex-direction: column;
}
.file.is-boxed .file-cta {
  flex-direction: column;
  height: auto;
  padding: 1em 3em;
}
.file.is-boxed .file-name {
  border-width: 0 1px 1px;
}
.file.is-boxed .file-icon {
  height: 1.5em;
  width: 1.5em;
}
.file.is-boxed .file-icon .fa {
  font-size: 21px;
}
.file.is-boxed.is-small .file-icon .fa {
  font-size: 14px;
}
.file.is-boxed.is-medium .file-icon .fa {
  font-size: 28px;
}
.file.is-boxed.is-large .file-icon .fa {
  font-size: 35px;
}
.file.is-boxed.has-name .file-cta {
  border-radius: 4px 4px 0 0;
}
.file.is-boxed.has-name .file-name {
  border-radius: 0 0 4px 4px;
  border-width: 0 1px 1px;
}
.file.is-centered {
  justify-content: center;
}
.file.is-fullwidth .file-label {
  width: 100%;
}
.file.is-fullwidth .file-name {
  flex-grow: 1;
  max-width: none;
}
.file.is-right {
  justify-content: flex-end;
}
.file.is-right .file-cta {
  border-radius: 0 4px 4px 0;
}
.file.is-right .file-name {
  border-radius: 4px 0 0 4px;
  border-width: 1px 0 1px 1px;
  order: -1;
}

.file-label {
  align-items: stretch;
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
}
.file-label:hover .file-cta {
  background-color: #eeeeee;
  color: #363636;
}
.file-label:hover .file-name {
  border-color: #d5d5d5;
}
.file-label:active .file-cta {
  background-color: #e8e8e8;
  color: #363636;
}
.file-label:active .file-name {
  border-color: #cfcfcf;
}

.file-input {
  height: 100%;
  left: 0;
  opacity: 0;
  outline: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.file-cta,
.file-name {
  border-color: #dbdbdb;
  border-radius: 4px;
  font-size: 1em;
  padding-left: 1em;
  padding-right: 1em;
  white-space: nowrap;
}

.file-cta {
  background-color: whitesmoke;
  color: #4a4a4a;
}

.file-name {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 1px 1px 1px 0;
  display: block;
  max-width: 16em;
  overflow: hidden;
  text-align: inherit;
  text-overflow: ellipsis;
}

.file-icon {
  align-items: center;
  display: flex;
  height: 1em;
  justify-content: center;
  margin-right: 0.5em;
  width: 1em;
}
.file-icon .fa {
  font-size: 14px;
}

.label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
}
.label:not(:last-child) {
  margin-bottom: 0.5em;
}
.label.is-small {
  font-size: 0.75rem;
}
.label.is-medium {
  font-size: 1.25rem;
}
.label.is-large {
  font-size: 1.5rem;
}

.help {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
.help.is-white {
  color: white;
}
.help.is-black {
  color: black;
}
.help.is-light {
  color: whitesmoke;
}
.help.is-dark {
  color: #363636;
}
.help.is-primary {
  color: #00d1b2;
}
.help.is-link {
  color: #4FB3D9;
}
.help.is-info {
  color: #3298dc;
}
.help.is-success {
  color: #48c774;
}
.help.is-warning {
  color: #F9CD69;
}
.help.is-danger {
  color: #c21f3a;
}

.field:not(:last-child) {
  margin-bottom: 0.75rem;
}
.field.has-addons {
  display: flex;
  justify-content: flex-start;
}
.field.has-addons .control:not(:last-child) {
  margin-right: -1px;
}
.field.has-addons .control:not(:first-child):not(:last-child) .button,
.field.has-addons .control:not(:first-child):not(:last-child) .input,
.field.has-addons .control:not(:first-child):not(:last-child) .select select {
  border-radius: 0;
}
.field.has-addons .control:first-child:not(:only-child) .button,
.field.has-addons .control:first-child:not(:only-child) .input,
.field.has-addons .control:first-child:not(:only-child) .select select {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.field.has-addons .control:last-child:not(:only-child) .button,
.field.has-addons .control:last-child:not(:only-child) .input,
.field.has-addons .control:last-child:not(:only-child) .select select {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.field.has-addons .control .button:not([disabled]):hover, .field.has-addons .control .button:not([disabled]).is-hovered,
.field.has-addons .control .input:not([disabled]):hover,
.field.has-addons .control .input:not([disabled]).is-hovered,
.field.has-addons .control .select select:not([disabled]):hover,
.field.has-addons .control .select select:not([disabled]).is-hovered {
  z-index: 2;
}
.field.has-addons .control .button:not([disabled]):focus, .field.has-addons .control .button:not([disabled]).is-focused, .field.has-addons .control .button:not([disabled]):active, .field.has-addons .control .button:not([disabled]).is-active,
.field.has-addons .control .input:not([disabled]):focus,
.field.has-addons .control .input:not([disabled]).is-focused,
.field.has-addons .control .input:not([disabled]):active,
.field.has-addons .control .input:not([disabled]).is-active,
.field.has-addons .control .select select:not([disabled]):focus,
.field.has-addons .control .select select:not([disabled]).is-focused,
.field.has-addons .control .select select:not([disabled]):active,
.field.has-addons .control .select select:not([disabled]).is-active {
  z-index: 3;
}
.field.has-addons .control .button:not([disabled]):focus:hover, .field.has-addons .control .button:not([disabled]).is-focused:hover, .field.has-addons .control .button:not([disabled]):active:hover, .field.has-addons .control .button:not([disabled]).is-active:hover,
.field.has-addons .control .input:not([disabled]):focus:hover,
.field.has-addons .control .input:not([disabled]).is-focused:hover,
.field.has-addons .control .input:not([disabled]):active:hover,
.field.has-addons .control .input:not([disabled]).is-active:hover,
.field.has-addons .control .select select:not([disabled]):focus:hover,
.field.has-addons .control .select select:not([disabled]).is-focused:hover,
.field.has-addons .control .select select:not([disabled]):active:hover,
.field.has-addons .control .select select:not([disabled]).is-active:hover {
  z-index: 4;
}
.field.has-addons .control.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}
.field.has-addons.has-addons-centered {
  justify-content: center;
}
.field.has-addons.has-addons-right {
  justify-content: flex-end;
}
.field.has-addons.has-addons-fullwidth .control {
  flex-grow: 1;
  flex-shrink: 0;
}
.field.is-grouped {
  display: flex;
  justify-content: flex-start;
}
.field.is-grouped > .control {
  flex-shrink: 0;
}
.field.is-grouped > .control:not(:last-child) {
  margin-bottom: 0;
  margin-right: 0.75rem;
}
.field.is-grouped > .control.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}
.field.is-grouped.is-grouped-centered {
  justify-content: center;
}
.field.is-grouped.is-grouped-right {
  justify-content: flex-end;
}
.field.is-grouped.is-grouped-multiline {
  flex-wrap: wrap;
}
.field.is-grouped.is-grouped-multiline > .control:last-child, .field.is-grouped.is-grouped-multiline > .control:not(:last-child) {
  margin-bottom: 0.75rem;
}
.field.is-grouped.is-grouped-multiline:last-child {
  margin-bottom: -0.75rem;
}
.field.is-grouped.is-grouped-multiline:not(:last-child) {
  margin-bottom: 0;
}
@media screen and (min-width: 769px), print {
  .field.is-horizontal {
    display: flex;
  }
}

.field-label .label {
  font-size: inherit;
}
@media screen and (max-width: 768px) {
  .field-label {
    margin-bottom: 0.5rem;
  }
}
@media screen and (min-width: 769px), print {
  .field-label {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    margin-right: 1.5rem;
    text-align: right;
  }
  .field-label.is-small {
    font-size: 0.75rem;
    padding-top: 0.375em;
  }
  .field-label.is-normal {
    padding-top: 0.375em;
  }
  .field-label.is-medium {
    font-size: 1.25rem;
    padding-top: 0.375em;
  }
  .field-label.is-large {
    font-size: 1.5rem;
    padding-top: 0.375em;
  }
}

.field-body .field .field {
  margin-bottom: 0;
}
@media screen and (min-width: 769px), print {
  .field-body {
    display: flex;
    flex-basis: 0;
    flex-grow: 5;
    flex-shrink: 1;
  }
  .field-body .field {
    margin-bottom: 0;
  }
  .field-body > .field {
    flex-shrink: 1;
  }
  .field-body > .field:not(.is-narrow) {
    flex-grow: 1;
  }
  .field-body > .field:not(:last-child) {
    margin-right: 0.75rem;
  }
}

.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
}
.control.has-icons-left .input:focus ~ .icon,
.control.has-icons-left .select:focus ~ .icon, .control.has-icons-right .input:focus ~ .icon,
.control.has-icons-right .select:focus ~ .icon {
  color: #4a4a4a;
}
.control.has-icons-left .input.is-small ~ .icon,
.control.has-icons-left .select.is-small ~ .icon, .control.has-icons-right .input.is-small ~ .icon,
.control.has-icons-right .select.is-small ~ .icon {
  font-size: 0.75rem;
}
.control.has-icons-left .input.is-medium ~ .icon,
.control.has-icons-left .select.is-medium ~ .icon, .control.has-icons-right .input.is-medium ~ .icon,
.control.has-icons-right .select.is-medium ~ .icon {
  font-size: 1.25rem;
}
.control.has-icons-left .input.is-large ~ .icon,
.control.has-icons-left .select.is-large ~ .icon, .control.has-icons-right .input.is-large ~ .icon,
.control.has-icons-right .select.is-large ~ .icon {
  font-size: 1.5rem;
}
.control.has-icons-left .icon, .control.has-icons-right .icon {
  color: #dbdbdb;
  height: 2.5em;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 2.5em;
  z-index: 4;
}
.control.has-icons-left .input,
.control.has-icons-left .select select {
  padding-left: 2.5em;
}
.control.has-icons-left .icon.is-left {
  left: 0;
}
.control.has-icons-right .input,
.control.has-icons-right .select select {
  padding-right: 2.5em;
}
.control.has-icons-right .icon.is-right {
  right: 0;
}
.control.is-loading::after {
  position: absolute !important;
  right: 0.625em;
  top: 0.625em;
  z-index: 4;
}
.control.is-loading.is-small:after {
  font-size: 0.75rem;
}
.control.is-loading.is-medium:after {
  font-size: 1.25rem;
}
.control.is-loading.is-large:after {
  font-size: 1.5rem;
}

/* Bulma Components */
.breadcrumb {
  font-size: 1rem;
  white-space: nowrap;
}
.breadcrumb a {
  align-items: center;
  color: #4FB3D9;
  display: flex;
  justify-content: center;
  padding: 0 0.75em;
}
.breadcrumb a:hover {
  color: #363636;
}
.breadcrumb li {
  align-items: center;
  display: flex;
}
.breadcrumb li:first-child a {
  padding-left: 0;
}
.breadcrumb li.is-active a {
  color: #363636;
  cursor: default;
  pointer-events: none;
}
.breadcrumb li + li::before {
  color: #b5b5b5;
  content: "/";
}
.breadcrumb ul,
.breadcrumb ol {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.breadcrumb .icon:first-child {
  margin-right: 0.5em;
}
.breadcrumb .icon:last-child {
  margin-left: 0.5em;
}
.breadcrumb.is-centered ol,
.breadcrumb.is-centered ul {
  justify-content: center;
}
.breadcrumb.is-right ol,
.breadcrumb.is-right ul {
  justify-content: flex-end;
}
.breadcrumb.is-small {
  font-size: 0.75rem;
}
.breadcrumb.is-medium {
  font-size: 1.25rem;
}
.breadcrumb.is-large {
  font-size: 1.5rem;
}
.breadcrumb.has-arrow-separator li + li::before {
  content: "→";
}
.breadcrumb.has-bullet-separator li + li::before {
  content: "•";
}
.breadcrumb.has-dot-separator li + li::before {
  content: "·";
}
.breadcrumb.has-succeeds-separator li + li::before {
  content: "≻";
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1), 0 0px 0 1px rgba(0, 0, 0, 0.02);
  color: #4a4a4a;
  max-width: 100%;
  position: relative;
}

.card-footer:first-child, .card-content:first-child, .card-header:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.card-footer:last-child, .card-content:last-child, .card-header:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.card-header {
  background-color: transparent;
  align-items: stretch;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.1);
  display: flex;
}

.card-header-title {
  align-items: center;
  color: #363636;
  display: flex;
  flex-grow: 1;
  font-weight: 700;
  padding: 0.75rem 1rem;
}
.card-header-title.is-centered {
  justify-content: center;
}

.card-header-icon {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
}

.card-image {
  display: block;
  position: relative;
}
.card-image:first-child img {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.card-image:last-child img {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.card-content {
  background-color: transparent;
  padding: 1.5rem;
}

.card-footer {
  background-color: transparent;
  border-top: 1px solid #ededed;
  align-items: stretch;
  display: flex;
}

.card-footer-item {
  align-items: center;
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  padding: 0.75rem;
}
.card-footer-item:not(:last-child) {
  border-right: 1px solid #ededed;
}

.card .media:not(:last-child) {
  margin-bottom: 1.5rem;
}

.dropdown {
  display: inline-flex;
  position: relative;
  vertical-align: top;
}
.dropdown.is-active .dropdown-menu, .dropdown.is-hoverable:hover .dropdown-menu {
  display: block;
}
.dropdown.is-right .dropdown-menu {
  left: auto;
  right: 0;
}
.dropdown.is-up .dropdown-menu {
  bottom: 100%;
  padding-bottom: 4px;
  padding-top: initial;
  top: auto;
}

.dropdown-menu {
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;
}

.dropdown-content {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1), 0 0px 0 1px rgba(0, 0, 0, 0.02);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.dropdown-item {
  color: #4a4a4a;
  display: block;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.375rem 1rem;
  position: relative;
}

a.dropdown-item,
button.dropdown-item {
  padding-right: 3rem;
  text-align: inherit;
  white-space: nowrap;
  width: 100%;
}
a.dropdown-item:hover,
button.dropdown-item:hover {
  background-color: whitesmoke;
  color: black;
}
a.dropdown-item.is-active,
button.dropdown-item.is-active {
  background-color: #4FB3D9;
  color: #fff;
}

.dropdown-divider {
  background-color: #ededed;
  border: none;
  display: block;
  height: 1px;
  margin: 0.5rem 0;
}

.level {
  align-items: center;
  justify-content: space-between;
}
.level code {
  border-radius: 4px;
}
.level img {
  display: inline-block;
  vertical-align: top;
}
.level.is-mobile {
  display: flex;
}
.level.is-mobile .level-left,
.level.is-mobile .level-right {
  display: flex;
}
.level.is-mobile .level-left + .level-right {
  margin-top: 0;
}
.level.is-mobile .level-item:not(:last-child) {
  margin-bottom: 0;
  margin-right: 0.75rem;
}
.level.is-mobile .level-item:not(.is-narrow) {
  flex-grow: 1;
}
@media screen and (min-width: 769px), print {
  .level {
    display: flex;
  }
  .level > .level-item:not(.is-narrow) {
    flex-grow: 1;
  }
}

.level-item {
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
}
.level-item .title,
.level-item .subtitle {
  margin-bottom: 0;
}
@media screen and (max-width: 768px) {
  .level-item:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}

.level-left,
.level-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
.level-left .level-item.is-flexible,
.level-right .level-item.is-flexible {
  flex-grow: 1;
}
@media screen and (min-width: 769px), print {
  .level-left .level-item:not(:last-child),
.level-right .level-item:not(:last-child) {
    margin-right: 0.75rem;
  }
}

.level-left {
  align-items: center;
  justify-content: flex-start;
}
@media screen and (max-width: 768px) {
  .level-left + .level-right {
    margin-top: 1.5rem;
  }
}
@media screen and (min-width: 769px), print {
  .level-left {
    display: flex;
  }
}

.level-right {
  align-items: center;
  justify-content: flex-end;
}
@media screen and (min-width: 769px), print {
  .level-right {
    display: flex;
  }
}

.media {
  align-items: flex-start;
  display: flex;
  text-align: inherit;
}
.media .content:not(:last-child) {
  margin-bottom: 0.75rem;
}
.media .media {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  display: flex;
  padding-top: 0.75rem;
}
.media .media .content:not(:last-child),
.media .media .control:not(:last-child) {
  margin-bottom: 0.5rem;
}
.media .media .media {
  padding-top: 0.5rem;
}
.media .media .media + .media {
  margin-top: 0.5rem;
}
.media + .media {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 1rem;
  padding-top: 1rem;
}
.media.is-large + .media {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
}

.media-left,
.media-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.media-left {
  margin-right: 1rem;
}

.media-right {
  margin-left: 1rem;
}

.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: inherit;
}

@media screen and (max-width: 768px) {
  .media-content {
    overflow-x: auto;
  }
}
.menu {
  font-size: 1rem;
}
.menu.is-small {
  font-size: 0.75rem;
}
.menu.is-medium {
  font-size: 1.25rem;
}
.menu.is-large {
  font-size: 1.5rem;
}

.menu-list {
  line-height: 1.25;
}
.menu-list a {
  border-radius: 2px;
  color: #4a4a4a;
  display: block;
  padding: 0.5em 0.75em;
}
.menu-list a:hover {
  background-color: whitesmoke;
  color: #363636;
}
.menu-list a.is-active {
  background-color: #4FB3D9;
  color: #fff;
}
.menu-list li ul {
  border-left: 1px solid #dbdbdb;
  margin: 0.75em;
  padding-left: 0.75em;
}

.menu-label {
  color: #7a7a7a;
  font-size: 0.75em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.menu-label:not(:first-child) {
  margin-top: 1em;
}
.menu-label:not(:last-child) {
  margin-bottom: 1em;
}

.message {
  background-color: whitesmoke;
  border-radius: 4px;
  font-size: 1rem;
}
.message strong {
  color: currentColor;
}
.message a:not(.button):not(.tag):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}
.message.is-small {
  font-size: 0.75rem;
}
.message.is-medium {
  font-size: 1.25rem;
}
.message.is-large {
  font-size: 1.5rem;
}
.message.is-white {
  background-color: white;
}
.message.is-white .message-header {
  background-color: white;
  color: black;
}
.message.is-white .message-body {
  border-color: white;
}
.message.is-black {
  background-color: #fafafa;
}
.message.is-black .message-header {
  background-color: black;
  color: white;
}
.message.is-black .message-body {
  border-color: black;
}
.message.is-light {
  background-color: #fafafa;
}
.message.is-light .message-header {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.message.is-light .message-body {
  border-color: whitesmoke;
}
.message.is-dark {
  background-color: #fafafa;
}
.message.is-dark .message-header {
  background-color: #363636;
  color: #fff;
}
.message.is-dark .message-body {
  border-color: #363636;
}
.message.is-primary {
  background-color: #ebfffc;
}
.message.is-primary .message-header {
  background-color: #00d1b2;
  color: #fff;
}
.message.is-primary .message-body {
  border-color: #00d1b2;
  color: #00947e;
}
.message.is-link {
  background-color: #eef8fb;
}
.message.is-link .message-header {
  background-color: #4FB3D9;
  color: #fff;
}
.message.is-link .message-body {
  border-color: #4FB3D9;
  color: #1e6d8a;
}
.message.is-info {
  background-color: #eef6fc;
}
.message.is-info .message-header {
  background-color: #3298dc;
  color: #fff;
}
.message.is-info .message-body {
  border-color: #3298dc;
  color: #1d72aa;
}
.message.is-success {
  background-color: #effaf3;
}
.message.is-success .message-header {
  background-color: #48c774;
  color: #fff;
}
.message.is-success .message-body {
  border-color: #48c774;
  color: #257942;
}
.message.is-warning {
  background-color: #fef8eb;
}
.message.is-warning .message-header {
  background-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.message.is-warning .message-body {
  border-color: #F9CD69;
  color: #8e6406;
}
.message.is-danger {
  background-color: #fcedf0;
}
.message.is-danger .message-header {
  background-color: #c21f3a;
  color: #fff;
}
.message.is-danger .message-body {
  border-color: #c21f3a;
  color: #d72240;
}

.message-header {
  align-items: center;
  background-color: #4a4a4a;
  border-radius: 4px 4px 0 0;
  color: #fff;
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  line-height: 1.25;
  padding: 0.75em 1em;
  position: relative;
}
.message-header .delete {
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 0.75em;
}
.message-header + .message-body {
  border-width: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.message-body {
  border-color: #dbdbdb;
  border-radius: 4px;
  border-style: solid;
  border-width: 0 0 0 4px;
  color: #4a4a4a;
  padding: 1.25em 1.5em;
}
.message-body code,
.message-body pre {
  background-color: white;
}
.message-body pre code {
  background-color: transparent;
}

.modal {
  align-items: center;
  display: none;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 40;
}
.modal.is-active {
  display: flex;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.86);
}

.modal-content,
.modal-card {
  margin: 0 20px;
  max-height: calc(100vh - 160px);
  overflow: auto;
  position: relative;
  width: 100%;
}
@media screen and (min-width: 769px) {
  .modal-content,
.modal-card {
    margin: 0 auto;
    max-height: calc(100vh - 40px);
    width: 640px;
  }
}

.modal-close {
  background: none;
  height: 40px;
  position: fixed;
  right: 20px;
  top: 20px;
  width: 40px;
}

.modal-card {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  overflow: hidden;
  -ms-overflow-y: visible;
}

.modal-card-head,
.modal-card-foot {
  align-items: center;
  background-color: whitesmoke;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 20px;
  position: relative;
}

.modal-card-head {
  border-bottom: 1px solid #dbdbdb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.modal-card-title {
  color: #363636;
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1.5rem;
  line-height: 1;
}

.modal-card-foot {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 1px solid #dbdbdb;
}
.modal-card-foot .button:not(:last-child) {
  margin-right: 0.5em;
}

.modal-card-body {
  -webkit-overflow-scrolling: touch;
  background-color: white;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  padding: 20px;
}

.navbar {
  background-color: white;
  min-height: 3.25rem;
  position: relative;
  z-index: 30;
}
.navbar.is-white {
  background-color: white;
  color: black;
}
.navbar.is-white .navbar-brand > .navbar-item,
.navbar.is-white .navbar-brand .navbar-link {
  color: black;
}
.navbar.is-white .navbar-brand > a.navbar-item:focus, .navbar.is-white .navbar-brand > a.navbar-item:hover, .navbar.is-white .navbar-brand > a.navbar-item.is-active,
.navbar.is-white .navbar-brand .navbar-link:focus,
.navbar.is-white .navbar-brand .navbar-link:hover,
.navbar.is-white .navbar-brand .navbar-link.is-active {
  background-color: #f2f2f2;
  color: black;
}
.navbar.is-white .navbar-brand .navbar-link::after {
  border-color: black;
}
.navbar.is-white .navbar-burger {
  color: black;
}
@media screen and (min-width: 1024px) {
  .navbar.is-white .navbar-start > .navbar-item,
.navbar.is-white .navbar-start .navbar-link,
.navbar.is-white .navbar-end > .navbar-item,
.navbar.is-white .navbar-end .navbar-link {
    color: black;
  }
  .navbar.is-white .navbar-start > a.navbar-item:focus, .navbar.is-white .navbar-start > a.navbar-item:hover, .navbar.is-white .navbar-start > a.navbar-item.is-active,
.navbar.is-white .navbar-start .navbar-link:focus,
.navbar.is-white .navbar-start .navbar-link:hover,
.navbar.is-white .navbar-start .navbar-link.is-active,
.navbar.is-white .navbar-end > a.navbar-item:focus,
.navbar.is-white .navbar-end > a.navbar-item:hover,
.navbar.is-white .navbar-end > a.navbar-item.is-active,
.navbar.is-white .navbar-end .navbar-link:focus,
.navbar.is-white .navbar-end .navbar-link:hover,
.navbar.is-white .navbar-end .navbar-link.is-active {
    background-color: #f2f2f2;
    color: black;
  }
  .navbar.is-white .navbar-start .navbar-link::after,
.navbar.is-white .navbar-end .navbar-link::after {
    border-color: black;
  }
  .navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #f2f2f2;
    color: black;
  }
  .navbar.is-white .navbar-dropdown a.navbar-item.is-active {
    background-color: white;
    color: black;
  }
}
.navbar.is-black {
  background-color: black;
  color: white;
}
.navbar.is-black .navbar-brand > .navbar-item,
.navbar.is-black .navbar-brand .navbar-link {
  color: white;
}
.navbar.is-black .navbar-brand > a.navbar-item:focus, .navbar.is-black .navbar-brand > a.navbar-item:hover, .navbar.is-black .navbar-brand > a.navbar-item.is-active,
.navbar.is-black .navbar-brand .navbar-link:focus,
.navbar.is-black .navbar-brand .navbar-link:hover,
.navbar.is-black .navbar-brand .navbar-link.is-active {
  background-color: black;
  color: white;
}
.navbar.is-black .navbar-brand .navbar-link::after {
  border-color: white;
}
.navbar.is-black .navbar-burger {
  color: white;
}
@media screen and (min-width: 1024px) {
  .navbar.is-black .navbar-start > .navbar-item,
.navbar.is-black .navbar-start .navbar-link,
.navbar.is-black .navbar-end > .navbar-item,
.navbar.is-black .navbar-end .navbar-link {
    color: white;
  }
  .navbar.is-black .navbar-start > a.navbar-item:focus, .navbar.is-black .navbar-start > a.navbar-item:hover, .navbar.is-black .navbar-start > a.navbar-item.is-active,
.navbar.is-black .navbar-start .navbar-link:focus,
.navbar.is-black .navbar-start .navbar-link:hover,
.navbar.is-black .navbar-start .navbar-link.is-active,
.navbar.is-black .navbar-end > a.navbar-item:focus,
.navbar.is-black .navbar-end > a.navbar-item:hover,
.navbar.is-black .navbar-end > a.navbar-item.is-active,
.navbar.is-black .navbar-end .navbar-link:focus,
.navbar.is-black .navbar-end .navbar-link:hover,
.navbar.is-black .navbar-end .navbar-link.is-active {
    background-color: black;
    color: white;
  }
  .navbar.is-black .navbar-start .navbar-link::after,
.navbar.is-black .navbar-end .navbar-link::after {
    border-color: white;
  }
  .navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: black;
    color: white;
  }
  .navbar.is-black .navbar-dropdown a.navbar-item.is-active {
    background-color: black;
    color: white;
  }
}
.navbar.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.navbar.is-light .navbar-brand > .navbar-item,
.navbar.is-light .navbar-brand .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}
.navbar.is-light .navbar-brand > a.navbar-item:focus, .navbar.is-light .navbar-brand > a.navbar-item:hover, .navbar.is-light .navbar-brand > a.navbar-item.is-active,
.navbar.is-light .navbar-brand .navbar-link:focus,
.navbar.is-light .navbar-brand .navbar-link:hover,
.navbar.is-light .navbar-brand .navbar-link.is-active {
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.7);
}
.navbar.is-light .navbar-brand .navbar-link::after {
  border-color: rgba(0, 0, 0, 0.7);
}
.navbar.is-light .navbar-burger {
  color: rgba(0, 0, 0, 0.7);
}
@media screen and (min-width: 1024px) {
  .navbar.is-light .navbar-start > .navbar-item,
.navbar.is-light .navbar-start .navbar-link,
.navbar.is-light .navbar-end > .navbar-item,
.navbar.is-light .navbar-end .navbar-link {
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-start > a.navbar-item:focus, .navbar.is-light .navbar-start > a.navbar-item:hover, .navbar.is-light .navbar-start > a.navbar-item.is-active,
.navbar.is-light .navbar-start .navbar-link:focus,
.navbar.is-light .navbar-start .navbar-link:hover,
.navbar.is-light .navbar-start .navbar-link.is-active,
.navbar.is-light .navbar-end > a.navbar-item:focus,
.navbar.is-light .navbar-end > a.navbar-item:hover,
.navbar.is-light .navbar-end > a.navbar-item.is-active,
.navbar.is-light .navbar-end .navbar-link:focus,
.navbar.is-light .navbar-end .navbar-link:hover,
.navbar.is-light .navbar-end .navbar-link.is-active {
    background-color: #e8e8e8;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-start .navbar-link::after,
.navbar.is-light .navbar-end .navbar-link::after {
    border-color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #e8e8e8;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: rgba(0, 0, 0, 0.7);
  }
}
.navbar.is-dark {
  background-color: #363636;
  color: #fff;
}
.navbar.is-dark .navbar-brand > .navbar-item,
.navbar.is-dark .navbar-brand .navbar-link {
  color: #fff;
}
.navbar.is-dark .navbar-brand > a.navbar-item:focus, .navbar.is-dark .navbar-brand > a.navbar-item:hover, .navbar.is-dark .navbar-brand > a.navbar-item.is-active,
.navbar.is-dark .navbar-brand .navbar-link:focus,
.navbar.is-dark .navbar-brand .navbar-link:hover,
.navbar.is-dark .navbar-brand .navbar-link.is-active {
  background-color: #292929;
  color: #fff;
}
.navbar.is-dark .navbar-brand .navbar-link::after {
  border-color: #fff;
}
.navbar.is-dark .navbar-burger {
  color: #fff;
}
@media screen and (min-width: 1024px) {
  .navbar.is-dark .navbar-start > .navbar-item,
.navbar.is-dark .navbar-start .navbar-link,
.navbar.is-dark .navbar-end > .navbar-item,
.navbar.is-dark .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-dark .navbar-start > a.navbar-item:focus, .navbar.is-dark .navbar-start > a.navbar-item:hover, .navbar.is-dark .navbar-start > a.navbar-item.is-active,
.navbar.is-dark .navbar-start .navbar-link:focus,
.navbar.is-dark .navbar-start .navbar-link:hover,
.navbar.is-dark .navbar-start .navbar-link.is-active,
.navbar.is-dark .navbar-end > a.navbar-item:focus,
.navbar.is-dark .navbar-end > a.navbar-item:hover,
.navbar.is-dark .navbar-end > a.navbar-item.is-active,
.navbar.is-dark .navbar-end .navbar-link:focus,
.navbar.is-dark .navbar-end .navbar-link:hover,
.navbar.is-dark .navbar-end .navbar-link.is-active {
    background-color: #292929;
    color: #fff;
  }
  .navbar.is-dark .navbar-start .navbar-link::after,
.navbar.is-dark .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #292929;
    color: #fff;
  }
  .navbar.is-dark .navbar-dropdown a.navbar-item.is-active {
    background-color: #363636;
    color: #fff;
  }
}
.navbar.is-primary {
  background-color: #00d1b2;
  color: #fff;
}
.navbar.is-primary .navbar-brand > .navbar-item,
.navbar.is-primary .navbar-brand .navbar-link {
  color: #fff;
}
.navbar.is-primary .navbar-brand > a.navbar-item:focus, .navbar.is-primary .navbar-brand > a.navbar-item:hover, .navbar.is-primary .navbar-brand > a.navbar-item.is-active,
.navbar.is-primary .navbar-brand .navbar-link:focus,
.navbar.is-primary .navbar-brand .navbar-link:hover,
.navbar.is-primary .navbar-brand .navbar-link.is-active {
  background-color: #00b89c;
  color: #fff;
}
.navbar.is-primary .navbar-brand .navbar-link::after {
  border-color: #fff;
}
.navbar.is-primary .navbar-burger {
  color: #fff;
}
@media screen and (min-width: 1024px) {
  .navbar.is-primary .navbar-start > .navbar-item,
.navbar.is-primary .navbar-start .navbar-link,
.navbar.is-primary .navbar-end > .navbar-item,
.navbar.is-primary .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-primary .navbar-start > a.navbar-item:focus, .navbar.is-primary .navbar-start > a.navbar-item:hover, .navbar.is-primary .navbar-start > a.navbar-item.is-active,
.navbar.is-primary .navbar-start .navbar-link:focus,
.navbar.is-primary .navbar-start .navbar-link:hover,
.navbar.is-primary .navbar-start .navbar-link.is-active,
.navbar.is-primary .navbar-end > a.navbar-item:focus,
.navbar.is-primary .navbar-end > a.navbar-item:hover,
.navbar.is-primary .navbar-end > a.navbar-item.is-active,
.navbar.is-primary .navbar-end .navbar-link:focus,
.navbar.is-primary .navbar-end .navbar-link:hover,
.navbar.is-primary .navbar-end .navbar-link.is-active {
    background-color: #00b89c;
    color: #fff;
  }
  .navbar.is-primary .navbar-start .navbar-link::after,
.navbar.is-primary .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #00b89c;
    color: #fff;
  }
  .navbar.is-primary .navbar-dropdown a.navbar-item.is-active {
    background-color: #00d1b2;
    color: #fff;
  }
}
.navbar.is-link {
  background-color: #4FB3D9;
  color: #fff;
}
.navbar.is-link .navbar-brand > .navbar-item,
.navbar.is-link .navbar-brand .navbar-link {
  color: #fff;
}
.navbar.is-link .navbar-brand > a.navbar-item:focus, .navbar.is-link .navbar-brand > a.navbar-item:hover, .navbar.is-link .navbar-brand > a.navbar-item.is-active,
.navbar.is-link .navbar-brand .navbar-link:focus,
.navbar.is-link .navbar-brand .navbar-link:hover,
.navbar.is-link .navbar-brand .navbar-link.is-active {
  background-color: #3aaad4;
  color: #fff;
}
.navbar.is-link .navbar-brand .navbar-link::after {
  border-color: #fff;
}
.navbar.is-link .navbar-burger {
  color: #fff;
}
@media screen and (min-width: 1024px) {
  .navbar.is-link .navbar-start > .navbar-item,
.navbar.is-link .navbar-start .navbar-link,
.navbar.is-link .navbar-end > .navbar-item,
.navbar.is-link .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-link .navbar-start > a.navbar-item:focus, .navbar.is-link .navbar-start > a.navbar-item:hover, .navbar.is-link .navbar-start > a.navbar-item.is-active,
.navbar.is-link .navbar-start .navbar-link:focus,
.navbar.is-link .navbar-start .navbar-link:hover,
.navbar.is-link .navbar-start .navbar-link.is-active,
.navbar.is-link .navbar-end > a.navbar-item:focus,
.navbar.is-link .navbar-end > a.navbar-item:hover,
.navbar.is-link .navbar-end > a.navbar-item.is-active,
.navbar.is-link .navbar-end .navbar-link:focus,
.navbar.is-link .navbar-end .navbar-link:hover,
.navbar.is-link .navbar-end .navbar-link.is-active {
    background-color: #3aaad4;
    color: #fff;
  }
  .navbar.is-link .navbar-start .navbar-link::after,
.navbar.is-link .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #3aaad4;
    color: #fff;
  }
  .navbar.is-link .navbar-dropdown a.navbar-item.is-active {
    background-color: #4FB3D9;
    color: #fff;
  }
}
.navbar.is-info {
  background-color: #3298dc;
  color: #fff;
}
.navbar.is-info .navbar-brand > .navbar-item,
.navbar.is-info .navbar-brand .navbar-link {
  color: #fff;
}
.navbar.is-info .navbar-brand > a.navbar-item:focus, .navbar.is-info .navbar-brand > a.navbar-item:hover, .navbar.is-info .navbar-brand > a.navbar-item.is-active,
.navbar.is-info .navbar-brand .navbar-link:focus,
.navbar.is-info .navbar-brand .navbar-link:hover,
.navbar.is-info .navbar-brand .navbar-link.is-active {
  background-color: #238cd1;
  color: #fff;
}
.navbar.is-info .navbar-brand .navbar-link::after {
  border-color: #fff;
}
.navbar.is-info .navbar-burger {
  color: #fff;
}
@media screen and (min-width: 1024px) {
  .navbar.is-info .navbar-start > .navbar-item,
.navbar.is-info .navbar-start .navbar-link,
.navbar.is-info .navbar-end > .navbar-item,
.navbar.is-info .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-info .navbar-start > a.navbar-item:focus, .navbar.is-info .navbar-start > a.navbar-item:hover, .navbar.is-info .navbar-start > a.navbar-item.is-active,
.navbar.is-info .navbar-start .navbar-link:focus,
.navbar.is-info .navbar-start .navbar-link:hover,
.navbar.is-info .navbar-start .navbar-link.is-active,
.navbar.is-info .navbar-end > a.navbar-item:focus,
.navbar.is-info .navbar-end > a.navbar-item:hover,
.navbar.is-info .navbar-end > a.navbar-item.is-active,
.navbar.is-info .navbar-end .navbar-link:focus,
.navbar.is-info .navbar-end .navbar-link:hover,
.navbar.is-info .navbar-end .navbar-link.is-active {
    background-color: #238cd1;
    color: #fff;
  }
  .navbar.is-info .navbar-start .navbar-link::after,
.navbar.is-info .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #238cd1;
    color: #fff;
  }
  .navbar.is-info .navbar-dropdown a.navbar-item.is-active {
    background-color: #3298dc;
    color: #fff;
  }
}
.navbar.is-success {
  background-color: #48c774;
  color: #fff;
}
.navbar.is-success .navbar-brand > .navbar-item,
.navbar.is-success .navbar-brand .navbar-link {
  color: #fff;
}
.navbar.is-success .navbar-brand > a.navbar-item:focus, .navbar.is-success .navbar-brand > a.navbar-item:hover, .navbar.is-success .navbar-brand > a.navbar-item.is-active,
.navbar.is-success .navbar-brand .navbar-link:focus,
.navbar.is-success .navbar-brand .navbar-link:hover,
.navbar.is-success .navbar-brand .navbar-link.is-active {
  background-color: #3abb67;
  color: #fff;
}
.navbar.is-success .navbar-brand .navbar-link::after {
  border-color: #fff;
}
.navbar.is-success .navbar-burger {
  color: #fff;
}
@media screen and (min-width: 1024px) {
  .navbar.is-success .navbar-start > .navbar-item,
.navbar.is-success .navbar-start .navbar-link,
.navbar.is-success .navbar-end > .navbar-item,
.navbar.is-success .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-success .navbar-start > a.navbar-item:focus, .navbar.is-success .navbar-start > a.navbar-item:hover, .navbar.is-success .navbar-start > a.navbar-item.is-active,
.navbar.is-success .navbar-start .navbar-link:focus,
.navbar.is-success .navbar-start .navbar-link:hover,
.navbar.is-success .navbar-start .navbar-link.is-active,
.navbar.is-success .navbar-end > a.navbar-item:focus,
.navbar.is-success .navbar-end > a.navbar-item:hover,
.navbar.is-success .navbar-end > a.navbar-item.is-active,
.navbar.is-success .navbar-end .navbar-link:focus,
.navbar.is-success .navbar-end .navbar-link:hover,
.navbar.is-success .navbar-end .navbar-link.is-active {
    background-color: #3abb67;
    color: #fff;
  }
  .navbar.is-success .navbar-start .navbar-link::after,
.navbar.is-success .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #3abb67;
    color: #fff;
  }
  .navbar.is-success .navbar-dropdown a.navbar-item.is-active {
    background-color: #48c774;
    color: #fff;
  }
}
.navbar.is-warning {
  background-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.navbar.is-warning .navbar-brand > .navbar-item,
.navbar.is-warning .navbar-brand .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}
.navbar.is-warning .navbar-brand > a.navbar-item:focus, .navbar.is-warning .navbar-brand > a.navbar-item:hover, .navbar.is-warning .navbar-brand > a.navbar-item.is-active,
.navbar.is-warning .navbar-brand .navbar-link:focus,
.navbar.is-warning .navbar-brand .navbar-link:hover,
.navbar.is-warning .navbar-brand .navbar-link.is-active {
  background-color: #f8c550;
  color: rgba(0, 0, 0, 0.7);
}
.navbar.is-warning .navbar-brand .navbar-link::after {
  border-color: rgba(0, 0, 0, 0.7);
}
.navbar.is-warning .navbar-burger {
  color: rgba(0, 0, 0, 0.7);
}
@media screen and (min-width: 1024px) {
  .navbar.is-warning .navbar-start > .navbar-item,
.navbar.is-warning .navbar-start .navbar-link,
.navbar.is-warning .navbar-end > .navbar-item,
.navbar.is-warning .navbar-end .navbar-link {
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-start > a.navbar-item:focus, .navbar.is-warning .navbar-start > a.navbar-item:hover, .navbar.is-warning .navbar-start > a.navbar-item.is-active,
.navbar.is-warning .navbar-start .navbar-link:focus,
.navbar.is-warning .navbar-start .navbar-link:hover,
.navbar.is-warning .navbar-start .navbar-link.is-active,
.navbar.is-warning .navbar-end > a.navbar-item:focus,
.navbar.is-warning .navbar-end > a.navbar-item:hover,
.navbar.is-warning .navbar-end > a.navbar-item.is-active,
.navbar.is-warning .navbar-end .navbar-link:focus,
.navbar.is-warning .navbar-end .navbar-link:hover,
.navbar.is-warning .navbar-end .navbar-link.is-active {
    background-color: #f8c550;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-start .navbar-link::after,
.navbar.is-warning .navbar-end .navbar-link::after {
    border-color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #f8c550;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-dropdown a.navbar-item.is-active {
    background-color: #F9CD69;
    color: rgba(0, 0, 0, 0.7);
  }
}
.navbar.is-danger {
  background-color: #c21f3a;
  color: #fff;
}
.navbar.is-danger .navbar-brand > .navbar-item,
.navbar.is-danger .navbar-brand .navbar-link {
  color: #fff;
}
.navbar.is-danger .navbar-brand > a.navbar-item:focus, .navbar.is-danger .navbar-brand > a.navbar-item:hover, .navbar.is-danger .navbar-brand > a.navbar-item.is-active,
.navbar.is-danger .navbar-brand .navbar-link:focus,
.navbar.is-danger .navbar-brand .navbar-link:hover,
.navbar.is-danger .navbar-brand .navbar-link.is-active {
  background-color: #ac1b33;
  color: #fff;
}
.navbar.is-danger .navbar-brand .navbar-link::after {
  border-color: #fff;
}
.navbar.is-danger .navbar-burger {
  color: #fff;
}
@media screen and (min-width: 1024px) {
  .navbar.is-danger .navbar-start > .navbar-item,
.navbar.is-danger .navbar-start .navbar-link,
.navbar.is-danger .navbar-end > .navbar-item,
.navbar.is-danger .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-danger .navbar-start > a.navbar-item:focus, .navbar.is-danger .navbar-start > a.navbar-item:hover, .navbar.is-danger .navbar-start > a.navbar-item.is-active,
.navbar.is-danger .navbar-start .navbar-link:focus,
.navbar.is-danger .navbar-start .navbar-link:hover,
.navbar.is-danger .navbar-start .navbar-link.is-active,
.navbar.is-danger .navbar-end > a.navbar-item:focus,
.navbar.is-danger .navbar-end > a.navbar-item:hover,
.navbar.is-danger .navbar-end > a.navbar-item.is-active,
.navbar.is-danger .navbar-end .navbar-link:focus,
.navbar.is-danger .navbar-end .navbar-link:hover,
.navbar.is-danger .navbar-end .navbar-link.is-active {
    background-color: #ac1b33;
    color: #fff;
  }
  .navbar.is-danger .navbar-start .navbar-link::after,
.navbar.is-danger .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,
.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,
.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #ac1b33;
    color: #fff;
  }
  .navbar.is-danger .navbar-dropdown a.navbar-item.is-active {
    background-color: #c21f3a;
    color: #fff;
  }
}
.navbar > .container {
  align-items: stretch;
  display: flex;
  min-height: 3.25rem;
  width: 100%;
}
.navbar.has-shadow {
  box-shadow: 0 2px 0 0 whitesmoke;
}
.navbar.is-fixed-bottom, .navbar.is-fixed-top {
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
}
.navbar.is-fixed-bottom {
  bottom: 0;
}
.navbar.is-fixed-bottom.has-shadow {
  box-shadow: 0 -2px 0 0 whitesmoke;
}
.navbar.is-fixed-top {
  top: 0;
}

html.has-navbar-fixed-top,
body.has-navbar-fixed-top {
  padding-top: 3.25rem;
}
html.has-navbar-fixed-bottom,
body.has-navbar-fixed-bottom {
  padding-bottom: 3.25rem;
}

.navbar-brand,
.navbar-tabs {
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
}

.navbar-brand a.navbar-item:focus, .navbar-brand a.navbar-item:hover {
  background-color: transparent;
}

.navbar-tabs {
  -webkit-overflow-scrolling: touch;
  max-width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
}

.navbar-burger {
  color: white;
  cursor: pointer;
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3.25rem;
  margin-left: auto;
}
.navbar-burger span {
  background-color: currentColor;
  display: block;
  height: 1px;
  left: calc(50% - 8px);
  position: absolute;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color, opacity, transform;
  transition-timing-function: ease-out;
  width: 16px;
}
.navbar-burger span:nth-child(1) {
  top: calc(50% - 6px);
}
.navbar-burger span:nth-child(2) {
  top: calc(50% - 1px);
}
.navbar-burger span:nth-child(3) {
  top: calc(50% + 4px);
}
.navbar-burger:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.navbar-burger.is-active span:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
}
.navbar-burger.is-active span:nth-child(2) {
  opacity: 0;
}
.navbar-burger.is-active span:nth-child(3) {
  transform: translateY(-5px) rotate(-45deg);
}

.navbar-menu {
  display: none;
}

.navbar-item,
.navbar-link {
  color: white;
  display: block;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;
}
.navbar-item .icon:only-child,
.navbar-link .icon:only-child {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}

a.navbar-item,
.navbar-link {
  cursor: pointer;
}
a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active,
.navbar-link:focus,
.navbar-link:focus-within,
.navbar-link:hover,
.navbar-link.is-active {
  background-color: #576573;
  color: white;
}

.navbar-item {
  flex-grow: 0;
  flex-shrink: 0;
}
.navbar-item img {
  max-height: 1.75rem;
}
.navbar-item.has-dropdown {
  padding: 0;
}
.navbar-item.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}
.navbar-item.is-tab {
  border-bottom: 1px solid transparent;
  min-height: 3.25rem;
  padding-bottom: calc(0.5rem - 1px);
}
.navbar-item.is-tab:focus, .navbar-item.is-tab:hover {
  background-color: transparent;
  border-bottom-color: #4FB3D9;
}
.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #4FB3D9;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  color: #4FB3D9;
  padding-bottom: calc(0.5rem - 3px);
}

.navbar-content {
  flex-grow: 1;
  flex-shrink: 1;
}

.navbar-link:not(.is-arrowless) {
  padding-right: 2.5em;
}
.navbar-link:not(.is-arrowless)::after {
  border-color: #4FB3D9;
  margin-top: -0.375em;
  right: 1.125em;
}

.navbar-dropdown {
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
.navbar-dropdown .navbar-item {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.navbar-divider {
  background-color: whitesmoke;
  border: none;
  display: none;
  height: 2px;
  margin: 0.5rem 0;
}

@media screen and (max-width: 1023px) {
  .navbar > .container {
    display: block;
  }

  .navbar-brand .navbar-item,
.navbar-tabs .navbar-item {
    align-items: center;
    display: flex;
  }

  .navbar-link::after {
    display: none;
  }

  .navbar-menu {
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
  }
  .navbar-menu.is-active {
    display: block;
  }

  .navbar.is-fixed-bottom-touch, .navbar.is-fixed-top-touch {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-touch {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-touch.has-shadow {
    box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.1);
  }
  .navbar.is-fixed-top-touch {
    top: 0;
  }
  .navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {
    -webkit-overflow-scrolling: touch;
    max-height: calc(100vh - 3.25rem);
    overflow: auto;
  }

  html.has-navbar-fixed-top-touch,
body.has-navbar-fixed-top-touch {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-touch,
body.has-navbar-fixed-bottom-touch {
    padding-bottom: 3.25rem;
  }
}
@media screen and (min-width: 1024px) {
  .navbar,
.navbar-menu,
.navbar-start,
.navbar-end {
    align-items: stretch;
    display: flex;
  }

  .navbar {
    min-height: 3.25rem;
  }
  .navbar.is-spaced {
    padding: 1rem 2rem;
  }
  .navbar.is-spaced .navbar-start,
.navbar.is-spaced .navbar-end {
    align-items: center;
  }
  .navbar.is-spaced a.navbar-item,
.navbar.is-spaced .navbar-link {
    border-radius: 4px;
  }
  .navbar.is-transparent a.navbar-item:focus, .navbar.is-transparent a.navbar-item:hover, .navbar.is-transparent a.navbar-item.is-active,
.navbar.is-transparent .navbar-link:focus,
.navbar.is-transparent .navbar-link:hover,
.navbar.is-transparent .navbar-link.is-active {
    background-color: transparent !important;
  }
  .navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link {
    background-color: transparent !important;
  }
  .navbar.is-transparent .navbar-dropdown a.navbar-item:focus, .navbar.is-transparent .navbar-dropdown a.navbar-item:hover {
    background-color: whitesmoke;
    color: black;
  }
  .navbar.is-transparent .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: #4FB3D9;
  }

  .navbar-burger {
    display: none;
  }

  .navbar-item,
.navbar-link {
    align-items: center;
    display: flex;
  }

  .navbar-item.has-dropdown {
    align-items: stretch;
  }
  .navbar-item.has-dropdown-up .navbar-link::after {
    transform: rotate(135deg) translate(0.25em, -0.25em);
  }
  .navbar-item.has-dropdown-up .navbar-dropdown {
    border-bottom: 2px solid #dbdbdb;
    border-radius: 6px 6px 0 0;
    border-top: none;
    bottom: 100%;
    box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.1);
    top: auto;
  }
  .navbar-item.is-active .navbar-dropdown, .navbar-item.is-hoverable:focus .navbar-dropdown, .navbar-item.is-hoverable:focus-within .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown {
    display: block;
  }
  .navbar.is-spaced .navbar-item.is-active .navbar-dropdown, .navbar-item.is-active .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown, .navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown, .navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .navbar-menu {
    flex-grow: 1;
    flex-shrink: 0;
  }

  .navbar-start {
    justify-content: flex-start;
    margin-right: auto;
  }

  .navbar-end {
    justify-content: flex-end;
    margin-left: auto;
  }

  .navbar-dropdown {
    background-color: white;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 2px solid #dbdbdb;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
    display: none;
    font-size: 0.875rem;
    left: 0;
    min-width: 100%;
    position: absolute;
    top: 100%;
    z-index: 20;
  }
  .navbar-dropdown .navbar-item {
    padding: 0.375rem 1rem;
    white-space: nowrap;
  }
  .navbar-dropdown a.navbar-item {
    padding-right: 3rem;
  }
  .navbar-dropdown a.navbar-item:focus, .navbar-dropdown a.navbar-item:hover {
    background-color: whitesmoke;
    color: black;
  }
  .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: #4FB3D9;
  }
  .navbar.is-spaced .navbar-dropdown, .navbar-dropdown.is-boxed {
    border-radius: 6px;
    border-top: none;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: block;
    opacity: 0;
    pointer-events: none;
    top: calc(100% + (-4px));
    transform: translateY(-5px);
    transition-duration: 86ms;
    transition-property: opacity, transform;
  }
  .navbar-dropdown.is-right {
    left: auto;
    right: 0;
  }

  .navbar-divider {
    display: block;
  }

  .navbar > .container .navbar-brand,
.container > .navbar .navbar-brand {
    margin-left: -0.75rem;
  }
  .navbar > .container .navbar-menu,
.container > .navbar .navbar-menu {
    margin-right: -0.75rem;
  }

  .navbar.is-fixed-bottom-desktop, .navbar.is-fixed-top-desktop {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-desktop {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-desktop.has-shadow {
    box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.1);
  }
  .navbar.is-fixed-top-desktop {
    top: 0;
  }

  html.has-navbar-fixed-top-desktop,
body.has-navbar-fixed-top-desktop {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-desktop,
body.has-navbar-fixed-bottom-desktop {
    padding-bottom: 3.25rem;
  }
  html.has-spaced-navbar-fixed-top,
body.has-spaced-navbar-fixed-top {
    padding-top: 5.25rem;
  }
  html.has-spaced-navbar-fixed-bottom,
body.has-spaced-navbar-fixed-bottom {
    padding-bottom: 5.25rem;
  }

  a.navbar-item.is-active,
.navbar-link.is-active {
    color: #4FB3D9;
  }
  a.navbar-item.is-active:not(:focus):not(:hover),
.navbar-link.is-active:not(:focus):not(:hover) {
    background-color: #576573;
  }

  .navbar-item.has-dropdown:focus .navbar-link, .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #576573;
  }
}
.hero.is-fullheight-with-navbar {
  min-height: calc(100vh - 3.25rem);
}

.pagination {
  font-size: 1rem;
  margin: -0.25rem;
}
.pagination.is-small {
  font-size: 0.75rem;
}
.pagination.is-medium {
  font-size: 1.25rem;
}
.pagination.is-large {
  font-size: 1.5rem;
}
.pagination.is-rounded .pagination-previous,
.pagination.is-rounded .pagination-next {
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 290486px;
}
.pagination.is-rounded .pagination-link {
  border-radius: 290486px;
}

.pagination,
.pagination-list {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}

.pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis {
  font-size: 1em;
  justify-content: center;
  margin: 0.25rem;
  padding-left: 0.5em;
  padding-right: 0.5em;
  text-align: center;
}

.pagination-previous,
.pagination-next,
.pagination-link {
  border-color: #dbdbdb;
  color: #363636;
  min-width: 2.5em;
}
.pagination-previous:hover,
.pagination-next:hover,
.pagination-link:hover {
  border-color: #b5b5b5;
  color: #363636;
}
.pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus {
  border-color: #3273dc;
}
.pagination-previous:active,
.pagination-next:active,
.pagination-link:active {
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}
.pagination-previous[disabled],
.pagination-next[disabled],
.pagination-link[disabled] {
  background-color: #dbdbdb;
  border-color: #dbdbdb;
  box-shadow: none;
  color: #7a7a7a;
  opacity: 0.5;
}

.pagination-previous,
.pagination-next {
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
}

.pagination-link.is-current {
  background-color: #4FB3D9;
  border-color: #4FB3D9;
  color: #fff;
}

.pagination-ellipsis {
  color: #b5b5b5;
  pointer-events: none;
}

.pagination-list {
  flex-wrap: wrap;
}
.pagination-list li {
  list-style: none;
}

@media screen and (max-width: 768px) {
  .pagination {
    flex-wrap: wrap;
  }

  .pagination-previous,
.pagination-next {
    flex-grow: 1;
    flex-shrink: 1;
  }

  .pagination-list li {
    flex-grow: 1;
    flex-shrink: 1;
  }
}
@media screen and (min-width: 769px), print {
  .pagination-list {
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: flex-start;
    order: 1;
  }

  .pagination-previous {
    order: 2;
  }

  .pagination-next {
    order: 3;
  }

  .pagination {
    justify-content: space-between;
  }
  .pagination.is-centered .pagination-previous {
    order: 1;
  }
  .pagination.is-centered .pagination-list {
    justify-content: center;
    order: 2;
  }
  .pagination.is-centered .pagination-next {
    order: 3;
  }
  .pagination.is-right .pagination-previous {
    order: 1;
  }
  .pagination.is-right .pagination-next {
    order: 2;
  }
  .pagination.is-right .pagination-list {
    justify-content: flex-end;
    order: 3;
  }
}
.panel {
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1), 0 0px 0 1px rgba(0, 0, 0, 0.02);
  font-size: 1rem;
}
.panel:not(:last-child) {
  margin-bottom: 1.5rem;
}
.panel.is-white .panel-heading {
  background-color: white;
  color: black;
}
.panel.is-white .panel-tabs a.is-active {
  border-bottom-color: white;
}
.panel.is-white .panel-block.is-active .panel-icon {
  color: white;
}
.panel.is-black .panel-heading {
  background-color: black;
  color: white;
}
.panel.is-black .panel-tabs a.is-active {
  border-bottom-color: black;
}
.panel.is-black .panel-block.is-active .panel-icon {
  color: black;
}
.panel.is-light .panel-heading {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.panel.is-light .panel-tabs a.is-active {
  border-bottom-color: whitesmoke;
}
.panel.is-light .panel-block.is-active .panel-icon {
  color: whitesmoke;
}
.panel.is-dark .panel-heading {
  background-color: #363636;
  color: #fff;
}
.panel.is-dark .panel-tabs a.is-active {
  border-bottom-color: #363636;
}
.panel.is-dark .panel-block.is-active .panel-icon {
  color: #363636;
}
.panel.is-primary .panel-heading {
  background-color: #00d1b2;
  color: #fff;
}
.panel.is-primary .panel-tabs a.is-active {
  border-bottom-color: #00d1b2;
}
.panel.is-primary .panel-block.is-active .panel-icon {
  color: #00d1b2;
}
.panel.is-link .panel-heading {
  background-color: #4FB3D9;
  color: #fff;
}
.panel.is-link .panel-tabs a.is-active {
  border-bottom-color: #4FB3D9;
}
.panel.is-link .panel-block.is-active .panel-icon {
  color: #4FB3D9;
}
.panel.is-info .panel-heading {
  background-color: #3298dc;
  color: #fff;
}
.panel.is-info .panel-tabs a.is-active {
  border-bottom-color: #3298dc;
}
.panel.is-info .panel-block.is-active .panel-icon {
  color: #3298dc;
}
.panel.is-success .panel-heading {
  background-color: #48c774;
  color: #fff;
}
.panel.is-success .panel-tabs a.is-active {
  border-bottom-color: #48c774;
}
.panel.is-success .panel-block.is-active .panel-icon {
  color: #48c774;
}
.panel.is-warning .panel-heading {
  background-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.panel.is-warning .panel-tabs a.is-active {
  border-bottom-color: #F9CD69;
}
.panel.is-warning .panel-block.is-active .panel-icon {
  color: #F9CD69;
}
.panel.is-danger .panel-heading {
  background-color: #c21f3a;
  color: #fff;
}
.panel.is-danger .panel-tabs a.is-active {
  border-bottom-color: #c21f3a;
}
.panel.is-danger .panel-block.is-active .panel-icon {
  color: #c21f3a;
}

.panel-tabs:not(:last-child),
.panel-block:not(:last-child) {
  border-bottom: 1px solid #ededed;
}

.panel-heading {
  background-color: #ededed;
  border-radius: 6px 6px 0 0;
  color: #363636;
  font-size: 1.25em;
  font-weight: 700;
  line-height: 1.25;
  padding: 0.75em 1em;
}

.panel-tabs {
  align-items: flex-end;
  display: flex;
  font-size: 0.875em;
  justify-content: center;
}
.panel-tabs a {
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: -1px;
  padding: 0.5em;
}
.panel-tabs a.is-active {
  border-bottom-color: #4a4a4a;
  color: #363636;
}

.panel-list a {
  color: #4a4a4a;
}
.panel-list a:hover {
  color: #4FB3D9;
}

.panel-block {
  align-items: center;
  color: #363636;
  display: flex;
  justify-content: flex-start;
  padding: 0.5em 0.75em;
}
.panel-block input[type=checkbox] {
  margin-right: 0.75em;
}
.panel-block > .control {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
}
.panel-block.is-wrapped {
  flex-wrap: wrap;
}
.panel-block.is-active {
  border-left-color: #4FB3D9;
  color: #363636;
}
.panel-block.is-active .panel-icon {
  color: #4FB3D9;
}
.panel-block:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

a.panel-block,
label.panel-block {
  cursor: pointer;
}
a.panel-block:hover,
label.panel-block:hover {
  background-color: whitesmoke;
}

.panel-icon {
  display: inline-block;
  font-size: 14px;
  height: 1em;
  line-height: 1em;
  text-align: center;
  vertical-align: top;
  width: 1em;
  color: #7a7a7a;
  margin-right: 0.75em;
}
.panel-icon .fa {
  font-size: inherit;
  line-height: inherit;
}

.tabs {
  -webkit-overflow-scrolling: touch;
  align-items: stretch;
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
}
.tabs a {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: #4a4a4a;
  display: flex;
  justify-content: center;
  margin-bottom: -1px;
  padding: 0.5em 1em;
  vertical-align: top;
}
.tabs a:hover {
  border-bottom-color: #363636;
  color: #363636;
}
.tabs li {
  display: block;
}
.tabs li.is-active a {
  border-bottom-color: #4FB3D9;
  color: #4FB3D9;
}
.tabs ul {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
}
.tabs ul.is-left {
  padding-right: 0.75em;
}
.tabs ul.is-center {
  flex: none;
  justify-content: center;
  padding-left: 0.75em;
  padding-right: 0.75em;
}
.tabs ul.is-right {
  justify-content: flex-end;
  padding-left: 0.75em;
}
.tabs .icon:first-child {
  margin-right: 0.5em;
}
.tabs .icon:last-child {
  margin-left: 0.5em;
}
.tabs.is-centered ul {
  justify-content: center;
}
.tabs.is-right ul {
  justify-content: flex-end;
}
.tabs.is-boxed a {
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
}
.tabs.is-boxed a:hover {
  background-color: whitesmoke;
  border-bottom-color: #dbdbdb;
}
.tabs.is-boxed li.is-active a {
  background-color: white;
  border-color: #dbdbdb;
  border-bottom-color: transparent !important;
}
.tabs.is-fullwidth li {
  flex-grow: 1;
  flex-shrink: 0;
}
.tabs.is-toggle a {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0;
  position: relative;
}
.tabs.is-toggle a:hover {
  background-color: whitesmoke;
  border-color: #b5b5b5;
  z-index: 2;
}
.tabs.is-toggle li + li {
  margin-left: -1px;
}
.tabs.is-toggle li:first-child a {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.tabs.is-toggle li:last-child a {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.tabs.is-toggle li.is-active a {
  background-color: #4FB3D9;
  border-color: #4FB3D9;
  color: #fff;
  z-index: 1;
}
.tabs.is-toggle ul {
  border-bottom: none;
}
.tabs.is-toggle.is-toggle-rounded li:first-child a {
  border-bottom-left-radius: 290486px;
  border-top-left-radius: 290486px;
  padding-left: 1.25em;
}
.tabs.is-toggle.is-toggle-rounded li:last-child a {
  border-bottom-right-radius: 290486px;
  border-top-right-radius: 290486px;
  padding-right: 1.25em;
}
.tabs.is-small {
  font-size: 0.75rem;
}
.tabs.is-medium {
  font-size: 1.25rem;
}
.tabs.is-large {
  font-size: 1.5rem;
}

/* Bulma Grid */
.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75rem;
}
.columns.is-mobile > .column.is-narrow {
  flex: none;
  width: unset;
}
.columns.is-mobile > .column.is-full {
  flex: none;
  width: 100%;
}
.columns.is-mobile > .column.is-three-quarters {
  flex: none;
  width: 75%;
}
.columns.is-mobile > .column.is-two-thirds {
  flex: none;
  width: 66.6666%;
}
.columns.is-mobile > .column.is-half {
  flex: none;
  width: 50%;
}
.columns.is-mobile > .column.is-one-third {
  flex: none;
  width: 33.3333%;
}
.columns.is-mobile > .column.is-one-quarter {
  flex: none;
  width: 25%;
}
.columns.is-mobile > .column.is-one-fifth {
  flex: none;
  width: 20%;
}
.columns.is-mobile > .column.is-two-fifths {
  flex: none;
  width: 40%;
}
.columns.is-mobile > .column.is-three-fifths {
  flex: none;
  width: 60%;
}
.columns.is-mobile > .column.is-four-fifths {
  flex: none;
  width: 80%;
}
.columns.is-mobile > .column.is-offset-three-quarters {
  margin-left: 75%;
}
.columns.is-mobile > .column.is-offset-two-thirds {
  margin-left: 66.6666%;
}
.columns.is-mobile > .column.is-offset-half {
  margin-left: 50%;
}
.columns.is-mobile > .column.is-offset-one-third {
  margin-left: 33.3333%;
}
.columns.is-mobile > .column.is-offset-one-quarter {
  margin-left: 25%;
}
.columns.is-mobile > .column.is-offset-one-fifth {
  margin-left: 20%;
}
.columns.is-mobile > .column.is-offset-two-fifths {
  margin-left: 40%;
}
.columns.is-mobile > .column.is-offset-three-fifths {
  margin-left: 60%;
}
.columns.is-mobile > .column.is-offset-four-fifths {
  margin-left: 80%;
}
.columns.is-mobile > .column.is-0 {
  flex: none;
  width: 0%;
}
.columns.is-mobile > .column.is-offset-0 {
  margin-left: 0%;
}
.columns.is-mobile > .column.is-1 {
  flex: none;
  width: 8.3333333333%;
}
.columns.is-mobile > .column.is-offset-1 {
  margin-left: 8.3333333333%;
}
.columns.is-mobile > .column.is-2 {
  flex: none;
  width: 16.6666666667%;
}
.columns.is-mobile > .column.is-offset-2 {
  margin-left: 16.6666666667%;
}
.columns.is-mobile > .column.is-3 {
  flex: none;
  width: 25%;
}
.columns.is-mobile > .column.is-offset-3 {
  margin-left: 25%;
}
.columns.is-mobile > .column.is-4 {
  flex: none;
  width: 33.3333333333%;
}
.columns.is-mobile > .column.is-offset-4 {
  margin-left: 33.3333333333%;
}
.columns.is-mobile > .column.is-5 {
  flex: none;
  width: 41.6666666667%;
}
.columns.is-mobile > .column.is-offset-5 {
  margin-left: 41.6666666667%;
}
.columns.is-mobile > .column.is-6 {
  flex: none;
  width: 50%;
}
.columns.is-mobile > .column.is-offset-6 {
  margin-left: 50%;
}
.columns.is-mobile > .column.is-7 {
  flex: none;
  width: 58.3333333333%;
}
.columns.is-mobile > .column.is-offset-7 {
  margin-left: 58.3333333333%;
}
.columns.is-mobile > .column.is-8 {
  flex: none;
  width: 66.6666666667%;
}
.columns.is-mobile > .column.is-offset-8 {
  margin-left: 66.6666666667%;
}
.columns.is-mobile > .column.is-9 {
  flex: none;
  width: 75%;
}
.columns.is-mobile > .column.is-offset-9 {
  margin-left: 75%;
}
.columns.is-mobile > .column.is-10 {
  flex: none;
  width: 83.3333333333%;
}
.columns.is-mobile > .column.is-offset-10 {
  margin-left: 83.3333333333%;
}
.columns.is-mobile > .column.is-11 {
  flex: none;
  width: 91.6666666667%;
}
.columns.is-mobile > .column.is-offset-11 {
  margin-left: 91.6666666667%;
}
.columns.is-mobile > .column.is-12 {
  flex: none;
  width: 100%;
}
.columns.is-mobile > .column.is-offset-12 {
  margin-left: 100%;
}
@media screen and (max-width: 768px) {
  .column.is-narrow-mobile {
    flex: none;
    width: unset;
  }
  .column.is-full-mobile {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-mobile {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-mobile {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-mobile {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-mobile {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-mobile {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-mobile {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-mobile {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-mobile {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-mobile {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-mobile {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-mobile {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-mobile {
    margin-left: 50%;
  }
  .column.is-offset-one-third-mobile {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-mobile {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-mobile {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-mobile {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-mobile {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-mobile {
    margin-left: 80%;
  }
  .column.is-0-mobile {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-mobile {
    margin-left: 0%;
  }
  .column.is-1-mobile {
    flex: none;
    width: 8.3333333333%;
  }
  .column.is-offset-1-mobile {
    margin-left: 8.3333333333%;
  }
  .column.is-2-mobile {
    flex: none;
    width: 16.6666666667%;
  }
  .column.is-offset-2-mobile {
    margin-left: 16.6666666667%;
  }
  .column.is-3-mobile {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-mobile {
    margin-left: 25%;
  }
  .column.is-4-mobile {
    flex: none;
    width: 33.3333333333%;
  }
  .column.is-offset-4-mobile {
    margin-left: 33.3333333333%;
  }
  .column.is-5-mobile {
    flex: none;
    width: 41.6666666667%;
  }
  .column.is-offset-5-mobile {
    margin-left: 41.6666666667%;
  }
  .column.is-6-mobile {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-mobile {
    margin-left: 50%;
  }
  .column.is-7-mobile {
    flex: none;
    width: 58.3333333333%;
  }
  .column.is-offset-7-mobile {
    margin-left: 58.3333333333%;
  }
  .column.is-8-mobile {
    flex: none;
    width: 66.6666666667%;
  }
  .column.is-offset-8-mobile {
    margin-left: 66.6666666667%;
  }
  .column.is-9-mobile {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-mobile {
    margin-left: 75%;
  }
  .column.is-10-mobile {
    flex: none;
    width: 83.3333333333%;
  }
  .column.is-offset-10-mobile {
    margin-left: 83.3333333333%;
  }
  .column.is-11-mobile {
    flex: none;
    width: 91.6666666667%;
  }
  .column.is-offset-11-mobile {
    margin-left: 91.6666666667%;
  }
  .column.is-12-mobile {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-mobile {
    margin-left: 100%;
  }
}
@media screen and (min-width: 769px), print {
  .column.is-narrow, .column.is-narrow-tablet {
    flex: none;
    width: unset;
  }
  .column.is-full, .column.is-full-tablet {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters, .column.is-three-quarters-tablet {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds, .column.is-two-thirds-tablet {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half, .column.is-half-tablet {
    flex: none;
    width: 50%;
  }
  .column.is-one-third, .column.is-one-third-tablet {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter, .column.is-one-quarter-tablet {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth, .column.is-one-fifth-tablet {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths, .column.is-two-fifths-tablet {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths, .column.is-three-fifths-tablet {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths, .column.is-four-fifths-tablet {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {
    margin-left: 66.6666%;
  }
  .column.is-offset-half, .column.is-offset-half-tablet {
    margin-left: 50%;
  }
  .column.is-offset-one-third, .column.is-offset-one-third-tablet {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth, .column.is-offset-one-fifth-tablet {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths, .column.is-offset-two-fifths-tablet {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths, .column.is-offset-three-fifths-tablet {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths, .column.is-offset-four-fifths-tablet {
    margin-left: 80%;
  }
  .column.is-0, .column.is-0-tablet {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0, .column.is-offset-0-tablet {
    margin-left: 0%;
  }
  .column.is-1, .column.is-1-tablet {
    flex: none;
    width: 8.3333333333%;
  }
  .column.is-offset-1, .column.is-offset-1-tablet {
    margin-left: 8.3333333333%;
  }
  .column.is-2, .column.is-2-tablet {
    flex: none;
    width: 16.6666666667%;
  }
  .column.is-offset-2, .column.is-offset-2-tablet {
    margin-left: 16.6666666667%;
  }
  .column.is-3, .column.is-3-tablet {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3, .column.is-offset-3-tablet {
    margin-left: 25%;
  }
  .column.is-4, .column.is-4-tablet {
    flex: none;
    width: 33.3333333333%;
  }
  .column.is-offset-4, .column.is-offset-4-tablet {
    margin-left: 33.3333333333%;
  }
  .column.is-5, .column.is-5-tablet {
    flex: none;
    width: 41.6666666667%;
  }
  .column.is-offset-5, .column.is-offset-5-tablet {
    margin-left: 41.6666666667%;
  }
  .column.is-6, .column.is-6-tablet {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6, .column.is-offset-6-tablet {
    margin-left: 50%;
  }
  .column.is-7, .column.is-7-tablet {
    flex: none;
    width: 58.3333333333%;
  }
  .column.is-offset-7, .column.is-offset-7-tablet {
    margin-left: 58.3333333333%;
  }
  .column.is-8, .column.is-8-tablet {
    flex: none;
    width: 66.6666666667%;
  }
  .column.is-offset-8, .column.is-offset-8-tablet {
    margin-left: 66.6666666667%;
  }
  .column.is-9, .column.is-9-tablet {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9, .column.is-offset-9-tablet {
    margin-left: 75%;
  }
  .column.is-10, .column.is-10-tablet {
    flex: none;
    width: 83.3333333333%;
  }
  .column.is-offset-10, .column.is-offset-10-tablet {
    margin-left: 83.3333333333%;
  }
  .column.is-11, .column.is-11-tablet {
    flex: none;
    width: 91.6666666667%;
  }
  .column.is-offset-11, .column.is-offset-11-tablet {
    margin-left: 91.6666666667%;
  }
  .column.is-12, .column.is-12-tablet {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12, .column.is-offset-12-tablet {
    margin-left: 100%;
  }
}
@media screen and (max-width: 1023px) {
  .column.is-narrow-touch {
    flex: none;
    width: unset;
  }
  .column.is-full-touch {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-touch {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-touch {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-touch {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-touch {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-touch {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-touch {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-touch {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-touch {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-touch {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-touch {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-touch {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-touch {
    margin-left: 50%;
  }
  .column.is-offset-one-third-touch {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-touch {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-touch {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-touch {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-touch {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-touch {
    margin-left: 80%;
  }
  .column.is-0-touch {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-touch {
    margin-left: 0%;
  }
  .column.is-1-touch {
    flex: none;
    width: 8.3333333333%;
  }
  .column.is-offset-1-touch {
    margin-left: 8.3333333333%;
  }
  .column.is-2-touch {
    flex: none;
    width: 16.6666666667%;
  }
  .column.is-offset-2-touch {
    margin-left: 16.6666666667%;
  }
  .column.is-3-touch {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-touch {
    margin-left: 25%;
  }
  .column.is-4-touch {
    flex: none;
    width: 33.3333333333%;
  }
  .column.is-offset-4-touch {
    margin-left: 33.3333333333%;
  }
  .column.is-5-touch {
    flex: none;
    width: 41.6666666667%;
  }
  .column.is-offset-5-touch {
    margin-left: 41.6666666667%;
  }
  .column.is-6-touch {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-touch {
    margin-left: 50%;
  }
  .column.is-7-touch {
    flex: none;
    width: 58.3333333333%;
  }
  .column.is-offset-7-touch {
    margin-left: 58.3333333333%;
  }
  .column.is-8-touch {
    flex: none;
    width: 66.6666666667%;
  }
  .column.is-offset-8-touch {
    margin-left: 66.6666666667%;
  }
  .column.is-9-touch {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-touch {
    margin-left: 75%;
  }
  .column.is-10-touch {
    flex: none;
    width: 83.3333333333%;
  }
  .column.is-offset-10-touch {
    margin-left: 83.3333333333%;
  }
  .column.is-11-touch {
    flex: none;
    width: 91.6666666667%;
  }
  .column.is-offset-11-touch {
    margin-left: 91.6666666667%;
  }
  .column.is-12-touch {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-touch {
    margin-left: 100%;
  }
}
@media screen and (min-width: 1024px) {
  .column.is-narrow-desktop {
    flex: none;
    width: unset;
  }
  .column.is-full-desktop {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-desktop {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-desktop {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-desktop {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-desktop {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-desktop {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-desktop {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-desktop {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-desktop {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-desktop {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-desktop {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-desktop {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-desktop {
    margin-left: 50%;
  }
  .column.is-offset-one-third-desktop {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-desktop {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-desktop {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-desktop {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-desktop {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-desktop {
    margin-left: 80%;
  }
  .column.is-0-desktop {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-desktop {
    margin-left: 0%;
  }
  .column.is-1-desktop {
    flex: none;
    width: 8.3333333333%;
  }
  .column.is-offset-1-desktop {
    margin-left: 8.3333333333%;
  }
  .column.is-2-desktop {
    flex: none;
    width: 16.6666666667%;
  }
  .column.is-offset-2-desktop {
    margin-left: 16.6666666667%;
  }
  .column.is-3-desktop {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-desktop {
    margin-left: 25%;
  }
  .column.is-4-desktop {
    flex: none;
    width: 33.3333333333%;
  }
  .column.is-offset-4-desktop {
    margin-left: 33.3333333333%;
  }
  .column.is-5-desktop {
    flex: none;
    width: 41.6666666667%;
  }
  .column.is-offset-5-desktop {
    margin-left: 41.6666666667%;
  }
  .column.is-6-desktop {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-desktop {
    margin-left: 50%;
  }
  .column.is-7-desktop {
    flex: none;
    width: 58.3333333333%;
  }
  .column.is-offset-7-desktop {
    margin-left: 58.3333333333%;
  }
  .column.is-8-desktop {
    flex: none;
    width: 66.6666666667%;
  }
  .column.is-offset-8-desktop {
    margin-left: 66.6666666667%;
  }
  .column.is-9-desktop {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-desktop {
    margin-left: 75%;
  }
  .column.is-10-desktop {
    flex: none;
    width: 83.3333333333%;
  }
  .column.is-offset-10-desktop {
    margin-left: 83.3333333333%;
  }
  .column.is-11-desktop {
    flex: none;
    width: 91.6666666667%;
  }
  .column.is-offset-11-desktop {
    margin-left: 91.6666666667%;
  }
  .column.is-12-desktop {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-desktop {
    margin-left: 100%;
  }
}
@media screen and (min-width: 1216px) {
  .column.is-narrow-widescreen {
    flex: none;
    width: unset;
  }
  .column.is-full-widescreen {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-widescreen {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-widescreen {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-widescreen {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-widescreen {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-widescreen {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-widescreen {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-widescreen {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-widescreen {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-widescreen {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-widescreen {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-widescreen {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-widescreen {
    margin-left: 50%;
  }
  .column.is-offset-one-third-widescreen {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-widescreen {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-widescreen {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-widescreen {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-widescreen {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-widescreen {
    margin-left: 80%;
  }
  .column.is-0-widescreen {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-widescreen {
    margin-left: 0%;
  }
  .column.is-1-widescreen {
    flex: none;
    width: 8.3333333333%;
  }
  .column.is-offset-1-widescreen {
    margin-left: 8.3333333333%;
  }
  .column.is-2-widescreen {
    flex: none;
    width: 16.6666666667%;
  }
  .column.is-offset-2-widescreen {
    margin-left: 16.6666666667%;
  }
  .column.is-3-widescreen {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-widescreen {
    margin-left: 25%;
  }
  .column.is-4-widescreen {
    flex: none;
    width: 33.3333333333%;
  }
  .column.is-offset-4-widescreen {
    margin-left: 33.3333333333%;
  }
  .column.is-5-widescreen {
    flex: none;
    width: 41.6666666667%;
  }
  .column.is-offset-5-widescreen {
    margin-left: 41.6666666667%;
  }
  .column.is-6-widescreen {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-widescreen {
    margin-left: 50%;
  }
  .column.is-7-widescreen {
    flex: none;
    width: 58.3333333333%;
  }
  .column.is-offset-7-widescreen {
    margin-left: 58.3333333333%;
  }
  .column.is-8-widescreen {
    flex: none;
    width: 66.6666666667%;
  }
  .column.is-offset-8-widescreen {
    margin-left: 66.6666666667%;
  }
  .column.is-9-widescreen {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-widescreen {
    margin-left: 75%;
  }
  .column.is-10-widescreen {
    flex: none;
    width: 83.3333333333%;
  }
  .column.is-offset-10-widescreen {
    margin-left: 83.3333333333%;
  }
  .column.is-11-widescreen {
    flex: none;
    width: 91.6666666667%;
  }
  .column.is-offset-11-widescreen {
    margin-left: 91.6666666667%;
  }
  .column.is-12-widescreen {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-widescreen {
    margin-left: 100%;
  }
}
@media screen and (min-width: 1408px) {
  .column.is-narrow-fullhd {
    flex: none;
    width: unset;
  }
  .column.is-full-fullhd {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-fullhd {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-fullhd {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-fullhd {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-fullhd {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-fullhd {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-fullhd {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-fullhd {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-fullhd {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-fullhd {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-fullhd {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-fullhd {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-fullhd {
    margin-left: 50%;
  }
  .column.is-offset-one-third-fullhd {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-fullhd {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-fullhd {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-fullhd {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-fullhd {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-fullhd {
    margin-left: 80%;
  }
  .column.is-0-fullhd {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-fullhd {
    margin-left: 0%;
  }
  .column.is-1-fullhd {
    flex: none;
    width: 8.3333333333%;
  }
  .column.is-offset-1-fullhd {
    margin-left: 8.3333333333%;
  }
  .column.is-2-fullhd {
    flex: none;
    width: 16.6666666667%;
  }
  .column.is-offset-2-fullhd {
    margin-left: 16.6666666667%;
  }
  .column.is-3-fullhd {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-fullhd {
    margin-left: 25%;
  }
  .column.is-4-fullhd {
    flex: none;
    width: 33.3333333333%;
  }
  .column.is-offset-4-fullhd {
    margin-left: 33.3333333333%;
  }
  .column.is-5-fullhd {
    flex: none;
    width: 41.6666666667%;
  }
  .column.is-offset-5-fullhd {
    margin-left: 41.6666666667%;
  }
  .column.is-6-fullhd {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-fullhd {
    margin-left: 50%;
  }
  .column.is-7-fullhd {
    flex: none;
    width: 58.3333333333%;
  }
  .column.is-offset-7-fullhd {
    margin-left: 58.3333333333%;
  }
  .column.is-8-fullhd {
    flex: none;
    width: 66.6666666667%;
  }
  .column.is-offset-8-fullhd {
    margin-left: 66.6666666667%;
  }
  .column.is-9-fullhd {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-fullhd {
    margin-left: 75%;
  }
  .column.is-10-fullhd {
    flex: none;
    width: 83.3333333333%;
  }
  .column.is-offset-10-fullhd {
    margin-left: 83.3333333333%;
  }
  .column.is-11-fullhd {
    flex: none;
    width: 91.6666666667%;
  }
  .column.is-offset-11-fullhd {
    margin-left: 91.6666666667%;
  }
  .column.is-12-fullhd {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-fullhd {
    margin-left: 100%;
  }
}

.columns {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}
.columns:last-child {
  margin-bottom: -0.75rem;
}
.columns:not(:last-child) {
  margin-bottom: calc(1.5rem - 0.75rem);
}
.columns.is-centered {
  justify-content: center;
}
.columns.is-gapless {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}
.columns.is-gapless > .column {
  margin: 0;
  padding: 0 !important;
}
.columns.is-gapless:not(:last-child) {
  margin-bottom: 1.5rem;
}
.columns.is-gapless:last-child {
  margin-bottom: 0;
}
.columns.is-mobile {
  display: flex;
}
.columns.is-multiline {
  flex-wrap: wrap;
}
.columns.is-vcentered {
  align-items: center;
}
@media screen and (min-width: 769px), print {
  .columns:not(.is-desktop) {
    display: flex;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-desktop {
    display: flex;
  }
}

.columns.is-variable {
  --columnGap: 0.75rem;
  margin-left: calc(-1 * var(--columnGap));
  margin-right: calc(-1 * var(--columnGap));
}
.columns.is-variable > .column {
  padding-left: var(--columnGap);
  padding-right: var(--columnGap);
}
.columns.is-variable.is-0 {
  --columnGap: 0rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-0-mobile {
    --columnGap: 0rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-0-tablet {
    --columnGap: 0rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-0-tablet-only {
    --columnGap: 0rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-0-touch {
    --columnGap: 0rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-0-desktop {
    --columnGap: 0rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-0-desktop-only {
    --columnGap: 0rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-0-widescreen {
    --columnGap: 0rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-0-widescreen-only {
    --columnGap: 0rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-0-fullhd {
    --columnGap: 0rem;
  }
}
.columns.is-variable.is-1 {
  --columnGap: 0.25rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-1-mobile {
    --columnGap: 0.25rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-1-tablet {
    --columnGap: 0.25rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-1-tablet-only {
    --columnGap: 0.25rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-1-touch {
    --columnGap: 0.25rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-1-desktop {
    --columnGap: 0.25rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-1-desktop-only {
    --columnGap: 0.25rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-1-widescreen {
    --columnGap: 0.25rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-1-widescreen-only {
    --columnGap: 0.25rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-1-fullhd {
    --columnGap: 0.25rem;
  }
}
.columns.is-variable.is-2 {
  --columnGap: 0.5rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-2-mobile {
    --columnGap: 0.5rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-2-tablet {
    --columnGap: 0.5rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-2-tablet-only {
    --columnGap: 0.5rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-2-touch {
    --columnGap: 0.5rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-2-desktop {
    --columnGap: 0.5rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-2-desktop-only {
    --columnGap: 0.5rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-2-widescreen {
    --columnGap: 0.5rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-2-widescreen-only {
    --columnGap: 0.5rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-2-fullhd {
    --columnGap: 0.5rem;
  }
}
.columns.is-variable.is-3 {
  --columnGap: 0.75rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-3-mobile {
    --columnGap: 0.75rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-3-tablet {
    --columnGap: 0.75rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-3-tablet-only {
    --columnGap: 0.75rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-3-touch {
    --columnGap: 0.75rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-3-desktop {
    --columnGap: 0.75rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-3-desktop-only {
    --columnGap: 0.75rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-3-widescreen {
    --columnGap: 0.75rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-3-widescreen-only {
    --columnGap: 0.75rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-3-fullhd {
    --columnGap: 0.75rem;
  }
}
.columns.is-variable.is-4 {
  --columnGap: 1rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-4-mobile {
    --columnGap: 1rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-4-tablet {
    --columnGap: 1rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-4-tablet-only {
    --columnGap: 1rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-4-touch {
    --columnGap: 1rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-4-desktop {
    --columnGap: 1rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-4-desktop-only {
    --columnGap: 1rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-4-widescreen {
    --columnGap: 1rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-4-widescreen-only {
    --columnGap: 1rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-4-fullhd {
    --columnGap: 1rem;
  }
}
.columns.is-variable.is-5 {
  --columnGap: 1.25rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-5-mobile {
    --columnGap: 1.25rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-5-tablet {
    --columnGap: 1.25rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-5-tablet-only {
    --columnGap: 1.25rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-5-touch {
    --columnGap: 1.25rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-5-desktop {
    --columnGap: 1.25rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-5-desktop-only {
    --columnGap: 1.25rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-5-widescreen {
    --columnGap: 1.25rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-5-widescreen-only {
    --columnGap: 1.25rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-5-fullhd {
    --columnGap: 1.25rem;
  }
}
.columns.is-variable.is-6 {
  --columnGap: 1.5rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-6-mobile {
    --columnGap: 1.5rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-6-tablet {
    --columnGap: 1.5rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-6-tablet-only {
    --columnGap: 1.5rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-6-touch {
    --columnGap: 1.5rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-6-desktop {
    --columnGap: 1.5rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-6-desktop-only {
    --columnGap: 1.5rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-6-widescreen {
    --columnGap: 1.5rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-6-widescreen-only {
    --columnGap: 1.5rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-6-fullhd {
    --columnGap: 1.5rem;
  }
}
.columns.is-variable.is-7 {
  --columnGap: 1.75rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-7-mobile {
    --columnGap: 1.75rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-7-tablet {
    --columnGap: 1.75rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-7-tablet-only {
    --columnGap: 1.75rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-7-touch {
    --columnGap: 1.75rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-7-desktop {
    --columnGap: 1.75rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-7-desktop-only {
    --columnGap: 1.75rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-7-widescreen {
    --columnGap: 1.75rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-7-widescreen-only {
    --columnGap: 1.75rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-7-fullhd {
    --columnGap: 1.75rem;
  }
}
.columns.is-variable.is-8 {
  --columnGap: 2rem;
}
@media screen and (max-width: 768px) {
  .columns.is-variable.is-8-mobile {
    --columnGap: 2rem;
  }
}
@media screen and (min-width: 769px), print {
  .columns.is-variable.is-8-tablet {
    --columnGap: 2rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-8-tablet-only {
    --columnGap: 2rem;
  }
}
@media screen and (max-width: 1023px) {
  .columns.is-variable.is-8-touch {
    --columnGap: 2rem;
  }
}
@media screen and (min-width: 1024px) {
  .columns.is-variable.is-8-desktop {
    --columnGap: 2rem;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-8-desktop-only {
    --columnGap: 2rem;
  }
}
@media screen and (min-width: 1216px) {
  .columns.is-variable.is-8-widescreen {
    --columnGap: 2rem;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-8-widescreen-only {
    --columnGap: 2rem;
  }
}
@media screen and (min-width: 1408px) {
  .columns.is-variable.is-8-fullhd {
    --columnGap: 2rem;
  }
}

.tile {
  align-items: stretch;
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: min-content;
}
.tile.is-ancestor {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}
.tile.is-ancestor:last-child {
  margin-bottom: -0.75rem;
}
.tile.is-ancestor:not(:last-child) {
  margin-bottom: 0.75rem;
}
.tile.is-child {
  margin: 0 !important;
}
.tile.is-parent {
  padding: 0.75rem;
}
.tile.is-vertical {
  flex-direction: column;
}
.tile.is-vertical > .tile.is-child:not(:last-child) {
  margin-bottom: 1.5rem !important;
}
@media screen and (min-width: 769px), print {
  .tile:not(.is-child) {
    display: flex;
  }
  .tile.is-1 {
    flex: none;
    width: 8.3333333333%;
  }
  .tile.is-2 {
    flex: none;
    width: 16.6666666667%;
  }
  .tile.is-3 {
    flex: none;
    width: 25%;
  }
  .tile.is-4 {
    flex: none;
    width: 33.3333333333%;
  }
  .tile.is-5 {
    flex: none;
    width: 41.6666666667%;
  }
  .tile.is-6 {
    flex: none;
    width: 50%;
  }
  .tile.is-7 {
    flex: none;
    width: 58.3333333333%;
  }
  .tile.is-8 {
    flex: none;
    width: 66.6666666667%;
  }
  .tile.is-9 {
    flex: none;
    width: 75%;
  }
  .tile.is-10 {
    flex: none;
    width: 83.3333333333%;
  }
  .tile.is-11 {
    flex: none;
    width: 91.6666666667%;
  }
  .tile.is-12 {
    flex: none;
    width: 100%;
  }
}

/* Bulma Helpers */
.has-text-white {
  color: white !important;
}

a.has-text-white:hover, a.has-text-white:focus {
  color: #e6e6e6 !important;
}

.has-background-white {
  background-color: white !important;
}

.has-text-black {
  color: black !important;
}

a.has-text-black:hover, a.has-text-black:focus {
  color: black !important;
}

.has-background-black {
  background-color: black !important;
}

.has-text-light {
  color: whitesmoke !important;
}

a.has-text-light:hover, a.has-text-light:focus {
  color: #dbdbdb !important;
}

.has-background-light {
  background-color: whitesmoke !important;
}

.has-text-dark {
  color: #363636 !important;
}

a.has-text-dark:hover, a.has-text-dark:focus {
  color: #1c1c1c !important;
}

.has-background-dark {
  background-color: #363636 !important;
}

.has-text-primary {
  color: #00d1b2 !important;
}

a.has-text-primary:hover, a.has-text-primary:focus {
  color: #009e86 !important;
}

.has-background-primary {
  background-color: #00d1b2 !important;
}

.has-text-primary-light {
  color: #ebfffc !important;
}

a.has-text-primary-light:hover, a.has-text-primary-light:focus {
  color: #b8fff4 !important;
}

.has-background-primary-light {
  background-color: #ebfffc !important;
}

.has-text-primary-dark {
  color: #00947e !important;
}

a.has-text-primary-dark:hover, a.has-text-primary-dark:focus {
  color: #00c7a9 !important;
}

.has-background-primary-dark {
  background-color: #00947e !important;
}

.has-text-link {
  color: #4FB3D9 !important;
}

a.has-text-link:hover, a.has-text-link:focus {
  color: #2c9ec9 !important;
}

.has-background-link {
  background-color: #4FB3D9 !important;
}

.has-text-link-light {
  color: #eef8fb !important;
}

a.has-text-link-light:hover, a.has-text-link-light:focus {
  color: #c4e6f2 !important;
}

.has-background-link-light {
  background-color: #eef8fb !important;
}

.has-text-link-dark {
  color: #1e6d8a !important;
}

a.has-text-link-dark:hover, a.has-text-link-dark:focus {
  color: #278db4 !important;
}

.has-background-link-dark {
  background-color: #1e6d8a !important;
}

.has-text-info {
  color: #3298dc !important;
}

a.has-text-info:hover, a.has-text-info:focus {
  color: #207dbc !important;
}

.has-background-info {
  background-color: #3298dc !important;
}

.has-text-info-light {
  color: #eef6fc !important;
}

a.has-text-info-light:hover, a.has-text-info-light:focus {
  color: #c2e0f5 !important;
}

.has-background-info-light {
  background-color: #eef6fc !important;
}

.has-text-info-dark {
  color: #1d72aa !important;
}

a.has-text-info-dark:hover, a.has-text-info-dark:focus {
  color: #248fd6 !important;
}

.has-background-info-dark {
  background-color: #1d72aa !important;
}

.has-text-success {
  color: #48c774 !important;
}

a.has-text-success:hover, a.has-text-success:focus {
  color: #34a85c !important;
}

.has-background-success {
  background-color: #48c774 !important;
}

.has-text-success-light {
  color: #effaf3 !important;
}

a.has-text-success-light:hover, a.has-text-success-light:focus {
  color: #c8eed6 !important;
}

.has-background-success-light {
  background-color: #effaf3 !important;
}

.has-text-success-dark {
  color: #257942 !important;
}

a.has-text-success-dark:hover, a.has-text-success-dark:focus {
  color: #31a058 !important;
}

.has-background-success-dark {
  background-color: #257942 !important;
}

.has-text-warning {
  color: #F9CD69 !important;
}

a.has-text-warning:hover, a.has-text-warning:focus {
  color: #f7bd38 !important;
}

.has-background-warning {
  background-color: #F9CD69 !important;
}

.has-text-warning-light {
  color: #fef8eb !important;
}

a.has-text-warning-light:hover, a.has-text-warning-light:focus {
  color: #fce8ba !important;
}

.has-background-warning-light {
  background-color: #fef8eb !important;
}

.has-text-warning-dark {
  color: #8e6406 !important;
}

a.has-text-warning-dark:hover, a.has-text-warning-dark:focus {
  color: #bf8708 !important;
}

.has-background-warning-dark {
  background-color: #8e6406 !important;
}

.has-text-danger {
  color: #c21f3a !important;
}

a.has-text-danger:hover, a.has-text-danger:focus {
  color: #96182d !important;
}

.has-background-danger {
  background-color: #c21f3a !important;
}

.has-text-danger-light {
  color: #fcedf0 !important;
}

a.has-text-danger-light:hover, a.has-text-danger-light:focus {
  color: #f5c1ca !important;
}

.has-background-danger-light {
  background-color: #fcedf0 !important;
}

.has-text-danger-dark {
  color: #d72240 !important;
}

a.has-text-danger-dark:hover, a.has-text-danger-dark:focus {
  color: #e24b64 !important;
}

.has-background-danger-dark {
  background-color: #d72240 !important;
}

.has-text-black-bis {
  color: #121212 !important;
}

.has-background-black-bis {
  background-color: #121212 !important;
}

.has-text-black-ter {
  color: #242424 !important;
}

.has-background-black-ter {
  background-color: #242424 !important;
}

.has-text-grey-darker {
  color: #363636 !important;
}

.has-background-grey-darker {
  background-color: #363636 !important;
}

.has-text-grey-dark {
  color: #4a4a4a !important;
}

.has-background-grey-dark {
  background-color: #4a4a4a !important;
}

.has-text-grey {
  color: #7a7a7a !important;
}

.has-background-grey {
  background-color: #7a7a7a !important;
}

.has-text-grey-light {
  color: #b5b5b5 !important;
}

.has-background-grey-light {
  background-color: #b5b5b5 !important;
}

.has-text-grey-lighter {
  color: #dbdbdb !important;
}

.has-background-grey-lighter {
  background-color: #dbdbdb !important;
}

.has-text-white-ter {
  color: whitesmoke !important;
}

.has-background-white-ter {
  background-color: whitesmoke !important;
}

.has-text-white-bis {
  color: #fafafa !important;
}

.has-background-white-bis {
  background-color: #fafafa !important;
}

.is-flex-direction-row {
  flex-direction: row !important;
}

.is-flex-direction-row-reverse {
  flex-direction: row-reverse !important;
}

.is-flex-direction-column {
  flex-direction: column !important;
}

.is-flex-direction-column-reverse {
  flex-direction: column-reverse !important;
}

.is-flex-wrap-nowrap {
  flex-wrap: nowrap !important;
}

.is-flex-wrap-wrap {
  flex-wrap: wrap !important;
}

.is-flex-wrap-wrap-reverse {
  flex-wrap: wrap-reverse !important;
}

.is-justify-content-flex-start {
  justify-content: flex-start !important;
}

.is-justify-content-flex-end {
  justify-content: flex-end !important;
}

.is-justify-content-center {
  justify-content: center !important;
}

.is-justify-content-space-between {
  justify-content: space-between !important;
}

.is-justify-content-space-around {
  justify-content: space-around !important;
}

.is-justify-content-space-evenly {
  justify-content: space-evenly !important;
}

.is-justify-content-start {
  justify-content: start !important;
}

.is-justify-content-end {
  justify-content: end !important;
}

.is-justify-content-left {
  justify-content: left !important;
}

.is-justify-content-right {
  justify-content: right !important;
}

.is-align-content-flex-start {
  align-content: flex-start !important;
}

.is-align-content-flex-end {
  align-content: flex-end !important;
}

.is-align-content-center {
  align-content: center !important;
}

.is-align-content-space-between {
  align-content: space-between !important;
}

.is-align-content-space-around {
  align-content: space-around !important;
}

.is-align-content-space-evenly {
  align-content: space-evenly !important;
}

.is-align-content-stretch {
  align-content: stretch !important;
}

.is-align-content-start {
  align-content: start !important;
}

.is-align-content-end {
  align-content: end !important;
}

.is-align-content-baseline {
  align-content: baseline !important;
}

.is-align-items-stretch {
  align-items: stretch !important;
}

.is-align-items-flex-start {
  align-items: flex-start !important;
}

.is-align-items-flex-end {
  align-items: flex-end !important;
}

.is-align-items-center {
  align-items: center !important;
}

.is-align-items-baseline {
  align-items: baseline !important;
}

.is-align-items-start {
  align-items: start !important;
}

.is-align-items-end {
  align-items: end !important;
}

.is-align-items-self-start {
  align-items: self-start !important;
}

.is-align-items-self-end {
  align-items: self-end !important;
}

.is-align-self-auto {
  align-self: auto !important;
}

.is-align-self-flex-start {
  align-self: flex-start !important;
}

.is-align-self-flex-end {
  align-self: flex-end !important;
}

.is-align-self-center {
  align-self: center !important;
}

.is-align-self-baseline {
  align-self: baseline !important;
}

.is-align-self-stretch {
  align-self: stretch !important;
}

.is-flex-grow-0 {
  flex-grow: 0 !important;
}

.is-flex-grow-1 {
  flex-grow: 1 !important;
}

.is-flex-grow-2 {
  flex-grow: 2 !important;
}

.is-flex-grow-3 {
  flex-grow: 3 !important;
}

.is-flex-grow-4 {
  flex-grow: 4 !important;
}

.is-flex-grow-5 {
  flex-grow: 5 !important;
}

.is-flex-shrink-0 {
  flex-shrink: 0 !important;
}

.is-flex-shrink-1 {
  flex-shrink: 1 !important;
}

.is-flex-shrink-2 {
  flex-shrink: 2 !important;
}

.is-flex-shrink-3 {
  flex-shrink: 3 !important;
}

.is-flex-shrink-4 {
  flex-shrink: 4 !important;
}

.is-flex-shrink-5 {
  flex-shrink: 5 !important;
}

.is-clearfix::after {
  clear: both;
  content: " ";
  display: table;
}

.is-pulled-left {
  float: left !important;
}

.is-pulled-right {
  float: right !important;
}

.is-radiusless {
  border-radius: 0 !important;
}

.is-shadowless {
  box-shadow: none !important;
}

.is-clickable {
  cursor: pointer !important;
  pointer-events: all !important;
}

.is-clipped {
  overflow: hidden !important;
}

.is-relative {
  position: relative !important;
}

.is-marginless {
  margin: 0 !important;
}

.is-paddingless {
  padding: 0 !important;
}

.m-0 {
  margin: 0 !important;
}

.mt-0 {
  margin-top: 0 !important;
}

.mr-0 {
  margin-right: 0 !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.ml-0 {
  margin-left: 0 !important;
}

.mx-0 {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.m-1 {
  margin: 0.25rem !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mr-1 {
  margin-right: 0.25rem !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.ml-1 {
  margin-left: 0.25rem !important;
}

.mx-1 {
  margin-left: 0.25rem !important;
  margin-right: 0.25rem !important;
}

.my-1 {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mr-2 {
  margin-right: 0.5rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.ml-2 {
  margin-left: 0.5rem !important;
}

.mx-2 {
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.m-3 {
  margin: 0.75rem !important;
}

.mt-3 {
  margin-top: 0.75rem !important;
}

.mr-3 {
  margin-right: 0.75rem !important;
}

.mb-3 {
  margin-bottom: 0.75rem !important;
}

.ml-3 {
  margin-left: 0.75rem !important;
}

.mx-3 {
  margin-left: 0.75rem !important;
  margin-right: 0.75rem !important;
}

.my-3 {
  margin-top: 0.75rem !important;
  margin-bottom: 0.75rem !important;
}

.m-4 {
  margin: 1rem !important;
}

.mt-4 {
  margin-top: 1rem !important;
}

.mr-4 {
  margin-right: 1rem !important;
}

.mb-4 {
  margin-bottom: 1rem !important;
}

.ml-4 {
  margin-left: 1rem !important;
}

.mx-4 {
  margin-left: 1rem !important;
  margin-right: 1rem !important;
}

.my-4 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.m-5 {
  margin: 1.5rem !important;
}

.mt-5 {
  margin-top: 1.5rem !important;
}

.mr-5 {
  margin-right: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 1.5rem !important;
}

.ml-5 {
  margin-left: 1.5rem !important;
}

.mx-5 {
  margin-left: 1.5rem !important;
  margin-right: 1.5rem !important;
}

.my-5 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.m-6 {
  margin: 3rem !important;
}

.mt-6 {
  margin-top: 3rem !important;
}

.mr-6 {
  margin-right: 3rem !important;
}

.mb-6 {
  margin-bottom: 3rem !important;
}

.ml-6 {
  margin-left: 3rem !important;
}

.mx-6 {
  margin-left: 3rem !important;
  margin-right: 3rem !important;
}

.my-6 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.p-0 {
  padding: 0 !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pr-0 {
  padding-right: 0 !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pl-0 {
  padding-left: 0 !important;
}

.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.pt-1 {
  padding-top: 0.25rem !important;
}

.pr-1 {
  padding-right: 0.25rem !important;
}

.pb-1 {
  padding-bottom: 0.25rem !important;
}

.pl-1 {
  padding-left: 0.25rem !important;
}

.px-1 {
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pr-2 {
  padding-right: 0.5rem !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pl-2 {
  padding-left: 0.5rem !important;
}

.px-2 {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}

.py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.p-3 {
  padding: 0.75rem !important;
}

.pt-3 {
  padding-top: 0.75rem !important;
}

.pr-3 {
  padding-right: 0.75rem !important;
}

.pb-3 {
  padding-bottom: 0.75rem !important;
}

.pl-3 {
  padding-left: 0.75rem !important;
}

.px-3 {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}

.py-3 {
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}

.p-4 {
  padding: 1rem !important;
}

.pt-4 {
  padding-top: 1rem !important;
}

.pr-4 {
  padding-right: 1rem !important;
}

.pb-4 {
  padding-bottom: 1rem !important;
}

.pl-4 {
  padding-left: 1rem !important;
}

.px-4 {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.py-4 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.p-5 {
  padding: 1.5rem !important;
}

.pt-5 {
  padding-top: 1.5rem !important;
}

.pr-5 {
  padding-right: 1.5rem !important;
}

.pb-5 {
  padding-bottom: 1.5rem !important;
}

.pl-5 {
  padding-left: 1.5rem !important;
}

.px-5 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.py-5 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.p-6 {
  padding: 3rem !important;
}

.pt-6 {
  padding-top: 3rem !important;
}

.pr-6 {
  padding-right: 3rem !important;
}

.pb-6 {
  padding-bottom: 3rem !important;
}

.pl-6 {
  padding-left: 3rem !important;
}

.px-6 {
  padding-left: 3rem !important;
  padding-right: 3rem !important;
}

.py-6 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.is-size-1 {
  font-size: 3rem !important;
}

.is-size-2 {
  font-size: 2.5rem !important;
}

.is-size-3 {
  font-size: 2rem !important;
}

.is-size-4 {
  font-size: 1.5rem !important;
}

.is-size-5 {
  font-size: 1.25rem !important;
}

.is-size-6 {
  font-size: 1rem !important;
}

.is-size-7 {
  font-size: 0.75rem !important;
}

@media screen and (max-width: 768px) {
  .is-size-1-mobile {
    font-size: 3rem !important;
  }

  .is-size-2-mobile {
    font-size: 2.5rem !important;
  }

  .is-size-3-mobile {
    font-size: 2rem !important;
  }

  .is-size-4-mobile {
    font-size: 1.5rem !important;
  }

  .is-size-5-mobile {
    font-size: 1.25rem !important;
  }

  .is-size-6-mobile {
    font-size: 1rem !important;
  }

  .is-size-7-mobile {
    font-size: 0.75rem !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-size-1-tablet {
    font-size: 3rem !important;
  }

  .is-size-2-tablet {
    font-size: 2.5rem !important;
  }

  .is-size-3-tablet {
    font-size: 2rem !important;
  }

  .is-size-4-tablet {
    font-size: 1.5rem !important;
  }

  .is-size-5-tablet {
    font-size: 1.25rem !important;
  }

  .is-size-6-tablet {
    font-size: 1rem !important;
  }

  .is-size-7-tablet {
    font-size: 0.75rem !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-size-1-touch {
    font-size: 3rem !important;
  }

  .is-size-2-touch {
    font-size: 2.5rem !important;
  }

  .is-size-3-touch {
    font-size: 2rem !important;
  }

  .is-size-4-touch {
    font-size: 1.5rem !important;
  }

  .is-size-5-touch {
    font-size: 1.25rem !important;
  }

  .is-size-6-touch {
    font-size: 1rem !important;
  }

  .is-size-7-touch {
    font-size: 0.75rem !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-size-1-desktop {
    font-size: 3rem !important;
  }

  .is-size-2-desktop {
    font-size: 2.5rem !important;
  }

  .is-size-3-desktop {
    font-size: 2rem !important;
  }

  .is-size-4-desktop {
    font-size: 1.5rem !important;
  }

  .is-size-5-desktop {
    font-size: 1.25rem !important;
  }

  .is-size-6-desktop {
    font-size: 1rem !important;
  }

  .is-size-7-desktop {
    font-size: 0.75rem !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-size-1-widescreen {
    font-size: 3rem !important;
  }

  .is-size-2-widescreen {
    font-size: 2.5rem !important;
  }

  .is-size-3-widescreen {
    font-size: 2rem !important;
  }

  .is-size-4-widescreen {
    font-size: 1.5rem !important;
  }

  .is-size-5-widescreen {
    font-size: 1.25rem !important;
  }

  .is-size-6-widescreen {
    font-size: 1rem !important;
  }

  .is-size-7-widescreen {
    font-size: 0.75rem !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-size-1-fullhd {
    font-size: 3rem !important;
  }

  .is-size-2-fullhd {
    font-size: 2.5rem !important;
  }

  .is-size-3-fullhd {
    font-size: 2rem !important;
  }

  .is-size-4-fullhd {
    font-size: 1.5rem !important;
  }

  .is-size-5-fullhd {
    font-size: 1.25rem !important;
  }

  .is-size-6-fullhd {
    font-size: 1rem !important;
  }

  .is-size-7-fullhd {
    font-size: 0.75rem !important;
  }
}
.has-text-centered {
  text-align: center !important;
}

.has-text-justified {
  text-align: justify !important;
}

.has-text-left {
  text-align: left !important;
}

.has-text-right {
  text-align: right !important;
}

@media screen and (max-width: 768px) {
  .has-text-centered-mobile {
    text-align: center !important;
  }
}
@media screen and (min-width: 769px), print {
  .has-text-centered-tablet {
    text-align: center !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-centered-tablet-only {
    text-align: center !important;
  }
}
@media screen and (max-width: 1023px) {
  .has-text-centered-touch {
    text-align: center !important;
  }
}
@media screen and (min-width: 1024px) {
  .has-text-centered-desktop {
    text-align: center !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-centered-desktop-only {
    text-align: center !important;
  }
}
@media screen and (min-width: 1216px) {
  .has-text-centered-widescreen {
    text-align: center !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-centered-widescreen-only {
    text-align: center !important;
  }
}
@media screen and (min-width: 1408px) {
  .has-text-centered-fullhd {
    text-align: center !important;
  }
}
@media screen and (max-width: 768px) {
  .has-text-justified-mobile {
    text-align: justify !important;
  }
}
@media screen and (min-width: 769px), print {
  .has-text-justified-tablet {
    text-align: justify !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-justified-tablet-only {
    text-align: justify !important;
  }
}
@media screen and (max-width: 1023px) {
  .has-text-justified-touch {
    text-align: justify !important;
  }
}
@media screen and (min-width: 1024px) {
  .has-text-justified-desktop {
    text-align: justify !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-justified-desktop-only {
    text-align: justify !important;
  }
}
@media screen and (min-width: 1216px) {
  .has-text-justified-widescreen {
    text-align: justify !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-justified-widescreen-only {
    text-align: justify !important;
  }
}
@media screen and (min-width: 1408px) {
  .has-text-justified-fullhd {
    text-align: justify !important;
  }
}
@media screen and (max-width: 768px) {
  .has-text-left-mobile {
    text-align: left !important;
  }
}
@media screen and (min-width: 769px), print {
  .has-text-left-tablet {
    text-align: left !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-left-tablet-only {
    text-align: left !important;
  }
}
@media screen and (max-width: 1023px) {
  .has-text-left-touch {
    text-align: left !important;
  }
}
@media screen and (min-width: 1024px) {
  .has-text-left-desktop {
    text-align: left !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-left-desktop-only {
    text-align: left !important;
  }
}
@media screen and (min-width: 1216px) {
  .has-text-left-widescreen {
    text-align: left !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-left-widescreen-only {
    text-align: left !important;
  }
}
@media screen and (min-width: 1408px) {
  .has-text-left-fullhd {
    text-align: left !important;
  }
}
@media screen and (max-width: 768px) {
  .has-text-right-mobile {
    text-align: right !important;
  }
}
@media screen and (min-width: 769px), print {
  .has-text-right-tablet {
    text-align: right !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-right-tablet-only {
    text-align: right !important;
  }
}
@media screen and (max-width: 1023px) {
  .has-text-right-touch {
    text-align: right !important;
  }
}
@media screen and (min-width: 1024px) {
  .has-text-right-desktop {
    text-align: right !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-right-desktop-only {
    text-align: right !important;
  }
}
@media screen and (min-width: 1216px) {
  .has-text-right-widescreen {
    text-align: right !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-right-widescreen-only {
    text-align: right !important;
  }
}
@media screen and (min-width: 1408px) {
  .has-text-right-fullhd {
    text-align: right !important;
  }
}
.is-capitalized {
  text-transform: capitalize !important;
}

.is-lowercase {
  text-transform: lowercase !important;
}

.is-uppercase {
  text-transform: uppercase !important;
}

.is-italic {
  font-style: italic !important;
}

.has-text-weight-light {
  font-weight: 300 !important;
}

.has-text-weight-normal {
  font-weight: 400 !important;
}

.has-text-weight-medium {
  font-weight: 500 !important;
}

.has-text-weight-semibold {
  font-weight: 600 !important;
}

.has-text-weight-bold {
  font-weight: 700 !important;
}

.is-family-primary {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-secondary {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-sans-serif {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-monospace {
  font-family: monospace !important;
}

.is-family-code {
  font-family: monospace !important;
}

.is-block {
  display: block !important;
}

@media screen and (max-width: 768px) {
  .is-block-mobile {
    display: block !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-block-tablet {
    display: block !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-block-tablet-only {
    display: block !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-block-touch {
    display: block !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-block-desktop {
    display: block !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-block-desktop-only {
    display: block !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-block-widescreen {
    display: block !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-block-widescreen-only {
    display: block !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-block-fullhd {
    display: block !important;
  }
}
.is-flex {
  display: flex !important;
}

@media screen and (max-width: 768px) {
  .is-flex-mobile {
    display: flex !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-flex-tablet {
    display: flex !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-flex-tablet-only {
    display: flex !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-flex-touch {
    display: flex !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-flex-desktop {
    display: flex !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-flex-desktop-only {
    display: flex !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-flex-widescreen {
    display: flex !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-flex-widescreen-only {
    display: flex !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-flex-fullhd {
    display: flex !important;
  }
}
.is-inline {
  display: inline !important;
}

@media screen and (max-width: 768px) {
  .is-inline-mobile {
    display: inline !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-inline-tablet {
    display: inline !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-tablet-only {
    display: inline !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-inline-touch {
    display: inline !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-inline-desktop {
    display: inline !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-desktop-only {
    display: inline !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-inline-widescreen {
    display: inline !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-widescreen-only {
    display: inline !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-inline-fullhd {
    display: inline !important;
  }
}
.is-inline-block {
  display: inline-block !important;
}

@media screen and (max-width: 768px) {
  .is-inline-block-mobile {
    display: inline-block !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-inline-block-tablet {
    display: inline-block !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-block-tablet-only {
    display: inline-block !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-inline-block-touch {
    display: inline-block !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-inline-block-desktop {
    display: inline-block !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-block-desktop-only {
    display: inline-block !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-inline-block-widescreen {
    display: inline-block !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-block-widescreen-only {
    display: inline-block !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-inline-block-fullhd {
    display: inline-block !important;
  }
}
.is-inline-flex {
  display: inline-flex !important;
}

@media screen and (max-width: 768px) {
  .is-inline-flex-mobile {
    display: inline-flex !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-inline-flex-tablet {
    display: inline-flex !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-flex-tablet-only {
    display: inline-flex !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-inline-flex-touch {
    display: inline-flex !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-inline-flex-desktop {
    display: inline-flex !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-flex-desktop-only {
    display: inline-flex !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-inline-flex-widescreen {
    display: inline-flex !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-flex-widescreen-only {
    display: inline-flex !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-inline-flex-fullhd {
    display: inline-flex !important;
  }
}
.is-hidden {
  display: none !important;
}

.is-sr-only {
  border: none !important;
  clip: rect(0, 0, 0, 0) !important;
  height: 0.01em !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 0.01em !important;
}

@media screen and (max-width: 768px) {
  .is-hidden-mobile {
    display: none !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-hidden-tablet {
    display: none !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-hidden-tablet-only {
    display: none !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-hidden-touch {
    display: none !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-hidden-desktop {
    display: none !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-hidden-desktop-only {
    display: none !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-hidden-widescreen {
    display: none !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-hidden-widescreen-only {
    display: none !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-hidden-fullhd {
    display: none !important;
  }
}
.is-invisible {
  visibility: hidden !important;
}

@media screen and (max-width: 768px) {
  .is-invisible-mobile {
    visibility: hidden !important;
  }
}
@media screen and (min-width: 769px), print {
  .is-invisible-tablet {
    visibility: hidden !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-invisible-tablet-only {
    visibility: hidden !important;
  }
}
@media screen and (max-width: 1023px) {
  .is-invisible-touch {
    visibility: hidden !important;
  }
}
@media screen and (min-width: 1024px) {
  .is-invisible-desktop {
    visibility: hidden !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-invisible-desktop-only {
    visibility: hidden !important;
  }
}
@media screen and (min-width: 1216px) {
  .is-invisible-widescreen {
    visibility: hidden !important;
  }
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-invisible-widescreen-only {
    visibility: hidden !important;
  }
}
@media screen and (min-width: 1408px) {
  .is-invisible-fullhd {
    visibility: hidden !important;
  }
}
/* Bulma Layout */
.hero {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hero .navbar {
  background: none;
}
.hero .tabs ul {
  border-bottom: none;
}
.hero.is-white {
  background-color: white;
  color: black;
}
.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-white strong {
  color: inherit;
}
.hero.is-white .title {
  color: black;
}
.hero.is-white .subtitle {
  color: rgba(0, 0, 0, 0.9);
}
.hero.is-white .subtitle a:not(.button),
.hero.is-white .subtitle strong {
  color: black;
}
@media screen and (max-width: 1023px) {
  .hero.is-white .navbar-menu {
    background-color: white;
  }
}
.hero.is-white .navbar-item,
.hero.is-white .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-white a.navbar-item:hover, .hero.is-white a.navbar-item.is-active,
.hero.is-white .navbar-link:hover,
.hero.is-white .navbar-link.is-active {
  background-color: #f2f2f2;
  color: black;
}
.hero.is-white .tabs a {
  color: black;
  opacity: 0.9;
}
.hero.is-white .tabs a:hover {
  opacity: 1;
}
.hero.is-white .tabs li.is-active a {
  opacity: 1;
}
.hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a {
  color: black;
}
.hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {
  background-color: black;
  border-color: black;
  color: white;
}
.hero.is-white.is-bold {
  background-image: linear-gradient(141deg, #e8e3e4 0%, white 71%, white 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-white.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #e8e3e4 0%, white 71%, white 100%);
  }
}
.hero.is-black {
  background-color: black;
  color: white;
}
.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-black strong {
  color: inherit;
}
.hero.is-black .title {
  color: white;
}
.hero.is-black .subtitle {
  color: rgba(255, 255, 255, 0.9);
}
.hero.is-black .subtitle a:not(.button),
.hero.is-black .subtitle strong {
  color: white;
}
@media screen and (max-width: 1023px) {
  .hero.is-black .navbar-menu {
    background-color: black;
  }
}
.hero.is-black .navbar-item,
.hero.is-black .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}
.hero.is-black a.navbar-item:hover, .hero.is-black a.navbar-item.is-active,
.hero.is-black .navbar-link:hover,
.hero.is-black .navbar-link.is-active {
  background-color: black;
  color: white;
}
.hero.is-black .tabs a {
  color: white;
  opacity: 0.9;
}
.hero.is-black .tabs a:hover {
  opacity: 1;
}
.hero.is-black .tabs li.is-active a {
  opacity: 1;
}
.hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a {
  color: white;
}
.hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover {
  background-color: white;
  border-color: white;
  color: black;
}
.hero.is-black.is-bold {
  background-image: linear-gradient(141deg, black 0%, black 71%, #0d0c0c 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-black.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, black 0%, black 71%, #0d0c0c 100%);
  }
}
.hero.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-light strong {
  color: inherit;
}
.hero.is-light .title {
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-light .subtitle {
  color: rgba(0, 0, 0, 0.9);
}
.hero.is-light .subtitle a:not(.button),
.hero.is-light .subtitle strong {
  color: rgba(0, 0, 0, 0.7);
}
@media screen and (max-width: 1023px) {
  .hero.is-light .navbar-menu {
    background-color: whitesmoke;
  }
}
.hero.is-light .navbar-item,
.hero.is-light .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-light a.navbar-item:hover, .hero.is-light a.navbar-item.is-active,
.hero.is-light .navbar-link:hover,
.hero.is-light .navbar-link.is-active {
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-light .tabs a {
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}
.hero.is-light .tabs a:hover {
  opacity: 1;
}
.hero.is-light .tabs li.is-active a {
  opacity: 1;
}
.hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a {
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}
.hero.is-light.is-bold {
  background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-light.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);
  }
}
.hero.is-dark {
  background-color: #363636;
  color: #fff;
}
.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-dark strong {
  color: inherit;
}
.hero.is-dark .title {
  color: #fff;
}
.hero.is-dark .subtitle {
  color: rgba(255, 255, 255, 0.9);
}
.hero.is-dark .subtitle a:not(.button),
.hero.is-dark .subtitle strong {
  color: #fff;
}
@media screen and (max-width: 1023px) {
  .hero.is-dark .navbar-menu {
    background-color: #363636;
  }
}
.hero.is-dark .navbar-item,
.hero.is-dark .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}
.hero.is-dark a.navbar-item:hover, .hero.is-dark a.navbar-item.is-active,
.hero.is-dark .navbar-link:hover,
.hero.is-dark .navbar-link.is-active {
  background-color: #292929;
  color: #fff;
}
.hero.is-dark .tabs a {
  color: #fff;
  opacity: 0.9;
}
.hero.is-dark .tabs a:hover {
  opacity: 1;
}
.hero.is-dark .tabs li.is-active a {
  opacity: 1;
}
.hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a {
  color: #fff;
}
.hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #363636;
}
.hero.is-dark.is-bold {
  background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-dark.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);
  }
}
.hero.is-primary {
  background-color: #00d1b2;
  color: #fff;
}
.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-primary strong {
  color: inherit;
}
.hero.is-primary .title {
  color: #fff;
}
.hero.is-primary .subtitle {
  color: rgba(255, 255, 255, 0.9);
}
.hero.is-primary .subtitle a:not(.button),
.hero.is-primary .subtitle strong {
  color: #fff;
}
@media screen and (max-width: 1023px) {
  .hero.is-primary .navbar-menu {
    background-color: #00d1b2;
  }
}
.hero.is-primary .navbar-item,
.hero.is-primary .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}
.hero.is-primary a.navbar-item:hover, .hero.is-primary a.navbar-item.is-active,
.hero.is-primary .navbar-link:hover,
.hero.is-primary .navbar-link.is-active {
  background-color: #00b89c;
  color: #fff;
}
.hero.is-primary .tabs a {
  color: #fff;
  opacity: 0.9;
}
.hero.is-primary .tabs a:hover {
  opacity: 1;
}
.hero.is-primary .tabs li.is-active a {
  opacity: 1;
}
.hero.is-primary .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a {
  color: #fff;
}
.hero.is-primary .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #00d1b2;
}
.hero.is-primary.is-bold {
  background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-primary.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);
  }
}
.hero.is-link {
  background-color: #4FB3D9;
  color: #fff;
}
.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-link strong {
  color: inherit;
}
.hero.is-link .title {
  color: #fff;
}
.hero.is-link .subtitle {
  color: rgba(255, 255, 255, 0.9);
}
.hero.is-link .subtitle a:not(.button),
.hero.is-link .subtitle strong {
  color: #fff;
}
@media screen and (max-width: 1023px) {
  .hero.is-link .navbar-menu {
    background-color: #4FB3D9;
  }
}
.hero.is-link .navbar-item,
.hero.is-link .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}
.hero.is-link a.navbar-item:hover, .hero.is-link a.navbar-item.is-active,
.hero.is-link .navbar-link:hover,
.hero.is-link .navbar-link.is-active {
  background-color: #3aaad4;
  color: #fff;
}
.hero.is-link .tabs a {
  color: #fff;
  opacity: 0.9;
}
.hero.is-link .tabs a:hover {
  opacity: 1;
}
.hero.is-link .tabs li.is-active a {
  opacity: 1;
}
.hero.is-link .tabs.is-boxed a, .hero.is-link .tabs.is-toggle a {
  color: #fff;
}
.hero.is-link .tabs.is-boxed a:hover, .hero.is-link .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-link .tabs.is-boxed li.is-active a, .hero.is-link .tabs.is-boxed li.is-active a:hover, .hero.is-link .tabs.is-toggle li.is-active a, .hero.is-link .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #4FB3D9;
}
.hero.is-link.is-bold {
  background-image: linear-gradient(141deg, #1fc2d6 0%, #4FB3D9 71%, #5fa8e2 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-link.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #1fc2d6 0%, #4FB3D9 71%, #5fa8e2 100%);
  }
}
.hero.is-info {
  background-color: #3298dc;
  color: #fff;
}
.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-info strong {
  color: inherit;
}
.hero.is-info .title {
  color: #fff;
}
.hero.is-info .subtitle {
  color: rgba(255, 255, 255, 0.9);
}
.hero.is-info .subtitle a:not(.button),
.hero.is-info .subtitle strong {
  color: #fff;
}
@media screen and (max-width: 1023px) {
  .hero.is-info .navbar-menu {
    background-color: #3298dc;
  }
}
.hero.is-info .navbar-item,
.hero.is-info .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}
.hero.is-info a.navbar-item:hover, .hero.is-info a.navbar-item.is-active,
.hero.is-info .navbar-link:hover,
.hero.is-info .navbar-link.is-active {
  background-color: #238cd1;
  color: #fff;
}
.hero.is-info .tabs a {
  color: #fff;
  opacity: 0.9;
}
.hero.is-info .tabs a:hover {
  opacity: 1;
}
.hero.is-info .tabs li.is-active a {
  opacity: 1;
}
.hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a {
  color: #fff;
}
.hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #3298dc;
}
.hero.is-info.is-bold {
  background-image: linear-gradient(141deg, #159dc6 0%, #3298dc 71%, #4389e5 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-info.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #159dc6 0%, #3298dc 71%, #4389e5 100%);
  }
}
.hero.is-success {
  background-color: #48c774;
  color: #fff;
}
.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-success strong {
  color: inherit;
}
.hero.is-success .title {
  color: #fff;
}
.hero.is-success .subtitle {
  color: rgba(255, 255, 255, 0.9);
}
.hero.is-success .subtitle a:not(.button),
.hero.is-success .subtitle strong {
  color: #fff;
}
@media screen and (max-width: 1023px) {
  .hero.is-success .navbar-menu {
    background-color: #48c774;
  }
}
.hero.is-success .navbar-item,
.hero.is-success .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}
.hero.is-success a.navbar-item:hover, .hero.is-success a.navbar-item.is-active,
.hero.is-success .navbar-link:hover,
.hero.is-success .navbar-link.is-active {
  background-color: #3abb67;
  color: #fff;
}
.hero.is-success .tabs a {
  color: #fff;
  opacity: 0.9;
}
.hero.is-success .tabs a:hover {
  opacity: 1;
}
.hero.is-success .tabs li.is-active a {
  opacity: 1;
}
.hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a {
  color: #fff;
}
.hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #48c774;
}
.hero.is-success.is-bold {
  background-image: linear-gradient(141deg, #29b342 0%, #48c774 71%, #56d296 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-success.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #29b342 0%, #48c774 71%, #56d296 100%);
  }
}
.hero.is-warning {
  background-color: #F9CD69;
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-warning strong {
  color: inherit;
}
.hero.is-warning .title {
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-warning .subtitle {
  color: rgba(0, 0, 0, 0.9);
}
.hero.is-warning .subtitle a:not(.button),
.hero.is-warning .subtitle strong {
  color: rgba(0, 0, 0, 0.7);
}
@media screen and (max-width: 1023px) {
  .hero.is-warning .navbar-menu {
    background-color: #F9CD69;
  }
}
.hero.is-warning .navbar-item,
.hero.is-warning .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-warning a.navbar-item:hover, .hero.is-warning a.navbar-item.is-active,
.hero.is-warning .navbar-link:hover,
.hero.is-warning .navbar-link.is-active {
  background-color: #f8c550;
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-warning .tabs a {
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}
.hero.is-warning .tabs a:hover {
  opacity: 1;
}
.hero.is-warning .tabs li.is-active a {
  opacity: 1;
}
.hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a {
  color: rgba(0, 0, 0, 0.7);
}
.hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(0, 0, 0, 0.7);
  color: #F9CD69;
}
.hero.is-warning.is-bold {
  background-image: linear-gradient(141deg, #ff9d30 0%, #F9CD69 71%, #fdec7e 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-warning.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #ff9d30 0%, #F9CD69 71%, #fdec7e 100%);
  }
}
.hero.is-danger {
  background-color: #c21f3a;
  color: #fff;
}
.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-danger strong {
  color: inherit;
}
.hero.is-danger .title {
  color: #fff;
}
.hero.is-danger .subtitle {
  color: rgba(255, 255, 255, 0.9);
}
.hero.is-danger .subtitle a:not(.button),
.hero.is-danger .subtitle strong {
  color: #fff;
}
@media screen and (max-width: 1023px) {
  .hero.is-danger .navbar-menu {
    background-color: #c21f3a;
  }
}
.hero.is-danger .navbar-item,
.hero.is-danger .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}
.hero.is-danger a.navbar-item:hover, .hero.is-danger a.navbar-item.is-active,
.hero.is-danger .navbar-link:hover,
.hero.is-danger .navbar-link.is-active {
  background-color: #ac1b33;
  color: #fff;
}
.hero.is-danger .tabs a {
  color: #fff;
  opacity: 0.9;
}
.hero.is-danger .tabs a:hover {
  opacity: 1;
}
.hero.is-danger .tabs li.is-active a {
  opacity: 1;
}
.hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a {
  color: #fff;
}
.hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #c21f3a;
}
.hero.is-danger.is-bold {
  background-image: linear-gradient(141deg, #9f0f3f 0%, #c21f3a 71%, #de1c1c 100%);
}
@media screen and (max-width: 768px) {
  .hero.is-danger.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #9f0f3f 0%, #c21f3a 71%, #de1c1c 100%);
  }
}
.hero.is-small .hero-body {
  padding: 1.5rem;
}
@media screen and (min-width: 769px), print {
  .hero.is-medium .hero-body {
    padding: 9rem 1.5rem;
  }
}
@media screen and (min-width: 769px), print {
  .hero.is-large .hero-body {
    padding: 18rem 1.5rem;
  }
}
.hero.is-halfheight .hero-body, .hero.is-fullheight .hero-body, .hero.is-fullheight-with-navbar .hero-body {
  align-items: center;
  display: flex;
}
.hero.is-halfheight .hero-body > .container, .hero.is-fullheight .hero-body > .container, .hero.is-fullheight-with-navbar .hero-body > .container {
  flex-grow: 1;
  flex-shrink: 1;
}
.hero.is-halfheight {
  min-height: 50vh;
}
.hero.is-fullheight {
  min-height: 100vh;
}

.hero-video {
  overflow: hidden;
}
.hero-video video {
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.hero-video.is-transparent {
  opacity: 0.3;
}
@media screen and (max-width: 768px) {
  .hero-video {
    display: none;
  }
}

.hero-buttons {
  margin-top: 1.5rem;
}
@media screen and (max-width: 768px) {
  .hero-buttons .button {
    display: flex;
  }
  .hero-buttons .button:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}
@media screen and (min-width: 769px), print {
  .hero-buttons {
    display: flex;
    justify-content: center;
  }
  .hero-buttons .button:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.hero-head,
.hero-foot {
  flex-grow: 0;
  flex-shrink: 0;
}

.hero-body {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
}

.section {
  padding: 3rem 1.5rem;
}
@media screen and (min-width: 1024px) {
  .section.is-medium {
    padding: 9rem 1.5rem;
  }
  .section.is-large {
    padding: 18rem 1.5rem;
  }
}

.footer {
  background-color: #fafafa;
  padding: 3rem 1.5rem 6rem;
}

:host,
body {
  background-color: #fafafa;
}

.code-example {
  display: block;
  padding: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #2D3E50;
  color: white !important;
}

.details-card p {
  font-size: 1.5 em !important;
  margin-bottom: 0.5em !important;
}

.card-container {
  max-width: 70%;
  margin: 0 auto;
}

`;
let mainPageBaseUrl = "https://nfdi4plants.org";
let gitlabBaseUrl = "https://git.nfdi4plants.org/";
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let Navbar = class extends s {
  constructor() {
    super(...arguments);
    this.navbarIsActive = false;
    this.url = window.location.href;
  }
  render() {
    return $`
      <nav class="navbar is-fixed-top has-bg-darkblue">
        <div class="navbar-brand">
          <a class="navbar-item" href="${mainPageBaseUrl}">
            <img src="https://nfdi4plants.org/images/logo.svg" alt="Logo" width="32" height="32">
          </a>
          <div class=${this.navbarIsActive ? "navbar-burger is-active" : "navbar-burger"} data-target="navMenu" aria-label="menu" role="button" aria-expanded="false" @click=${this._toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div id="navMenu" class=${this.navbarIsActive ? "navbar-menu has-bg-darkblue is-active" : "navbar-menu has-bg-darkblue"}>
          <div class="navbar-start is-justify-content-center is-flex-grow-1">
            <a class=${this.url == mainPageBaseUrl ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}">
              Home
            </a>
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                Learn More
                </a>
                <div class="navbar-dropdown has-bg-darkblue is-active smooth-hover">
                  <a class=${this.url == "${mainPageBaseUrl}/content/learn-more/our-mission.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/learn-more/our-mission.html">
                    Our Mission
                  </a>
                  <a class=${this.url == "${mainPageBaseUrl}/content/learn-more/the-community.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/learn-more/the-community.html">
                    The Community
                  </a>
                  <a class=${this.url == "${mainPageBaseUrl}/content/learn-more/annotated-research-context.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/learn-more/annotated-research-context.html">
                    Annotated Research Context
                  </a>
                  <a class=${this.url == "${mainPageBaseUrl}/content/service.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/service.html">
                    Service
                  </a>
                  <hr class="navbar-divider">
                  <!-- http://www.email-obfuscator.com -->
                  <a class="navbar-item" href="javascript:location='mailto:\u0069\u006e\u0066\u006f\u0040\u006e\u0066\u0064\u0069\u0034\u0070\u006c\u0061\u006e\u0074\u0073\u002e\u006f\u0072\u0067';void 0">
                    <span style="margin-right: 1rem">Something missing? Write us!</span> 
                    <span style="float: right">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                        <path fill="currentColor" d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            <a class=${this.url == "${mainPageBaseUrl}/news.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/news.html">
              News
            </a>
            <a class=${this.url == "${mainPageBaseUrl}/content/about.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/about.html">
              About
            </a>
            <a class=${this.url == "${mainPageBaseUrl}/content/jobs.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/jobs.html">
              Jobs
            </a>
            <a class=${this.url == gitlabBaseUrl ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${gitlabBaseUrl}">
              DataHUB
            </a>
          </div>
          <div class="navbar-end">
            <a class="navbar-item" href="https://helpdesk.nfdi4plants.org/" title="Helpdesk">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                <path fill="currentColor" d="M191.1 224c0-17.72-14.34-32.04-32-32.04L144 192c-35.34 0-64 28.66-64 64.08v47.79C80 339.3 108.7 368 144 368H160c17.66 0 32-14.36 32-32.06L191.1 224zM256 0C112.9 0 4.583 119.1 .0208 256L0 296C0 309.3 10.75 320 23.1 320S48 309.3 48 296V256c0-114.7 93.34-207.8 208-207.8C370.7 48.2 464 141.3 464 256v144c0 22.09-17.91 40-40 40h-110.7C305 425.7 289.7 416 272 416H241.8c-23.21 0-44.5 15.69-48.87 38.49C187 485.2 210.4 512 239.1 512H272c17.72 0 33.03-9.711 41.34-24H424c48.6 0 88-39.4 88-88V256C507.4 119.1 399.1 0 256 0zM368 368c35.34 0 64-28.7 64-64.13V256.1C432 220.7 403.3 192 368 192l-16 0c-17.66 0-32 14.34-32 32.04L320 335.9C320 353.7 334.3 368 352 368H368z"/>
              </svg>
            </a>
            <!-- http://www.email-obfuscator.com -->
            <a class="navbar-item" title="E-Mail" href="javascript:location='mailto:\u0069\u006e\u0066\u006f\u0040\u006e\u0066\u0064\u0069\u0034\u0070\u006c\u0061\u006e\u0074\u0073\u002e\u006f\u0072\u0067';void 0">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                <path fill="currentColor" d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/>
              </svg>
            </a>
            <p class="navbar-item is-lightblue">
              |
            </p>
            <a class="navbar-item" href="https://twitter.com/nfdi4plants" title="Twitter">
              <!-- https://fontawesome.com/v6.0/docs/web/add-icons/svg-bare -->
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512">
                <path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"/>
              </svg>
            </a>
            <a class="navbar-item" href="https://github.com/nfdi4plants" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 496 512">
                <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
              </svg>
            </a>
            <a class="navbar-item" href="https://www.youtube.com/channel/UCrTBwQWOa0-aWYkwoY104Wg" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 576 512">
                <path fill="currentColor" d="M549.7 124.1c-6.281-23.65-24.79-42.28-48.28-48.6C458.8 64 288 64 288 64S117.2 64 74.63 75.49c-23.5 6.322-42 24.95-48.28 48.6-11.41 42.87-11.41 132.3-11.41 132.3s0 89.44 11.41 132.3c6.281 23.65 24.79 41.5 48.28 47.82C117.2 448 288 448 288 448s170.8 0 213.4-11.49c23.5-6.321 42-24.17 48.28-47.82 11.41-42.87 11.41-132.3 11.41-132.3s0-89.44-11.41-132.3zm-317.5 213.5V175.2l142.7 81.21-142.7 81.2z"/>
              </svg>
            <a class="navbar-item" href="https://zenodo.org/communities/nfdi4plants?page=1&amp;size=20" style="font-weight: bold;" title="Zenodo">
              Z
            </a>
          </div>
        </div>
      </nav>
      `;
  }
  _toggleNavbar() {
    this.navbarIsActive = !this.navbarIsActive;
  }
};
Navbar.styles = [
  bulmaStyles,
  r$2`
      :host {
        position: fixed;
        z-index: 30
      }

      .icon {
        width: 1em;
        height: 1em;
        vertical-align: -.125em;
    }`
];
__decorateClass$1([
  e({ type: Boolean })
], Navbar.prototype, "navbarIsActive", 2);
__decorateClass$1([
  e()
], Navbar.prototype, "url", 2);
Navbar = __decorateClass$1([
  n$1("nfdi-navbar")
], Navbar);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let Footer = class extends s {
  render() {
    return $`
            <footer class="footer has-bg-darkblue-lighter-20">
                <div class="container">
                <div class="columns">
                    <div class="column is-4 m-4">
                    <div class="block">
                        <h3 class="subtitle is-white">
                        DataPLANT - Democratization of plant research made easy.
                        </h3>
                    </div>
                    <div class="block">
                        <p>
                        DataPLANT is part of 
                        <a href="https://www.nfdi.de/">
                            NFDI
                        </a>
                        </p>
                    </div>
                    <div class="block">
                        <p>
                        This website is developed and maintained by members of DataPLANT
                        </p>
                    </div>
                    <div class="block">
                        <h3 class="subtitle is-white">
                        Legal
                        </h3>
                    </div>
                    <div class="block">
                        <a href="${mainPageBaseUrl}/content/imprint.html">
                        Imprint
                        </a>
                    </div>
                    <div class="block">
                        <a href="${mainPageBaseUrl}/content/privacy.html">
                        Privacy
                        </a>
                    </div>
                    </div>
                    <div class="column is-4 m-4">
                    <div class="block">
                        <h3 class="subtitle is-white">
                        Navigation
                        </h3>
                    </div>
                    <ul>
                        <div class="block">
                        <li>
                            <a href="${mainPageBaseUrl}">
                            Home
                            </a>
                        </li>
                        </div>
                        <div class="block">
                        <li>
                            <a href="${mainPageBaseUrl}/news.html">
                            News
                            </a>
                        </li>
                        </div>
                        <div class="block">
                        <li>
                            <a href="${mainPageBaseUrl}/content/service.html">
                            Service
                            </a>
                        </li>
                        </div>
                        <div class="block">
                        <li>
                            <a href="${mainPageBaseUrl}/content/about.html">
                            About
                            </a>
                        </li>
                        </div>
                        <div class="block">
                        <li>
                            <a href="${mainPageBaseUrl}/content/jobs.html">
                            Jobs
                            </a>
                        </li>
                        </div>
                        <div class="block">
                        <li>
                            <a href="${gitlabBaseUrl}">
                            DataHUB
                            </a>
                        </li>
                        </div>
                    </ul>
                    </div>
                    <div class="column is-4 m-4">
                    <div class="block">
                        <h3 class="subtitle is-white">
                        Help
                        </h3>
                    </div>
                    <div class="block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                            <path fill="currentColor" d="M191.1 224c0-17.72-14.34-32.04-32-32.04L144 192c-35.34 0-64 28.66-64 64.08v47.79C80 339.3 108.7 368 144 368H160c17.66 0 32-14.36 32-32.06L191.1 224zM256 0C112.9 0 4.583 119.1 .0208 256L0 296C0 309.3 10.75 320 23.1 320S48 309.3 48 296V256c0-114.7 93.34-207.8 208-207.8C370.7 48.2 464 141.3 464 256v144c0 22.09-17.91 40-40 40h-110.7C305 425.7 289.7 416 272 416H241.8c-23.21 0-44.5 15.69-48.87 38.49C187 485.2 210.4 512 239.1 512H272c17.72 0 33.03-9.711 41.34-24H424c48.6 0 88-39.4 88-88V256C507.4 119.1 399.1 0 256 0zM368 368c35.34 0 64-28.7 64-64.13V256.1C432 220.7 403.3 192 368 192l-16 0c-17.66 0-32 14.34-32 32.04L320 335.9C320 353.7 334.3 368 352 368H368z"/>
                        </svg>
                        <a href="https://helpdesk.nfdi4plants.org/">
                        DataPLANT Helpdesk
                        </a>
                    </div>
                    <div class="block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                            <path fill="currentColor" d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/>
                        </svg>
                        <!-- http://www.email-obfuscator.com -->
                        <a href="javascript:location='mailto:\u0069\u006e\u0066\u006f\u0040\u006e\u0066\u0064\u0069\u0034\u0070\u006c\u0061\u006e\u0074\u0073\u002e\u006f\u0072\u0067';void 0">
                            DataPLANT Info Point
                        </a>
                    </div>
                    <div class="block">
                        <h3 class="subtitle is-white">
                        Social
                        </h3>
                    </div>
                    <div class="block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"/>
                        </svg>
                        <a href="https://twitter.com/nfdi4plants">
                        DataPLANT on Twitter
                        </a>
                    </div>
                    <div class="block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 496 512">
                            <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                        </svg>
                        <a href="https://github.com/nfdi4plants">
                        DataPLANT open source projects on GitHub
                        </a>
                    </div>
                    <div class="block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 576 512">
                            <path fill="currentColor" d="M549.7 124.1c-6.281-23.65-24.79-42.28-48.28-48.6C458.8 64 288 64 288 64S117.2 64 74.63 75.49c-23.5 6.322-42 24.95-48.28 48.6-11.41 42.87-11.41 132.3-11.41 132.3s0 89.44 11.41 132.3c6.281 23.65 24.79 41.5 48.28 47.82C117.2 448 288 448 288 448s170.8 0 213.4-11.49c23.5-6.321 42-24.17 48.28-47.82 11.41-42.87 11.41-132.3 11.41-132.3s0-89.44-11.41-132.3zm-317.5 213.5V175.2l142.7 81.21-142.7 81.2z"/>
                        </svg>
                        <a href="https://www.youtube.com/channel/UCrTBwQWOa0-aWYkwoY104Wg">
                        DataPLANT video resources on youtube
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </footer>
        `;
  }
};
Footer.styles = [
  bulmaStyles,
  r$2`
            .icon {
                width: 1em;
                height: 1em;
                vertical-align: -.125em;
            }
        `
];
Footer = __decorateClass([
  n$1("nfdi-footer")
], Footer);
