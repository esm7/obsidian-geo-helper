import{I as p,s as m}from"./index.0be0ef82.js";import{a as k}from"./paths.52a64369.js";const u=[];function R(e,t){return{subscribe:d(e,t).subscribe}}function d(e,t=p){let n;const o=new Set;function r(s){if(m(e,s)&&(e=s,n)){const l=!u.length;for(const i of o)i[1](),u.push(i,e);if(l){for(let i=0;i<u.length;i+=2)u[i][0](u[i+1]);u.length=0}}}function c(s){r(s(e))}function a(s,l=p){const i=[s,l];return o.add(i),o.size===1&&(n=t(r)||p),s(e),()=>{o.delete(i),o.size===0&&n&&(n(),n=null)}}return{set:r,update:c,subscribe:a}}const w="1685903816105",S="sveltekit:snapshot",y="sveltekit:scroll",T="sveltekit:index",b={tap:1,hover:2,viewport:3,eager:4,off:-1};function x(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function O(){return{x:pageXOffset,y:pageYOffset}}function f(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const _={...b,"":b.hover};function h(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function U(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=h(e)}}function L(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,r=!n||!!o||v(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),c=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:r,target:o,download:c}}function N(e){let t=null,n=null,o=null,r=null,c=null,a=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=f(s,"preload-code")),r===null&&(r=f(s,"preload-data")),t===null&&(t=f(s,"keepfocus")),n===null&&(n=f(s,"noscroll")),c===null&&(c=f(s,"reload")),a===null&&(a=f(s,"replacestate")),s=h(s);function l(i){switch(i){case"":case"true":return!0;case"off":case"false":return!1;default:return null}}return{preload_code:_[o??"off"],preload_data:_[r??"off"],keep_focus:l(t),noscroll:l(n),reload:l(c),replace_state:l(a)}}function g(e){const t=d(e);let n=!0;function o(){n=!0,t.update(a=>a)}function r(a){n=!1,t.set(a)}function c(a){let s;return t.subscribe(l=>{(s===void 0||n&&l!==s)&&a(s=l)})}return{notify:o,set:r,subscribe:c}}function E(){const{set:e,subscribe:t}=d(!1);let n;async function o(){clearTimeout(n);try{const r=await fetch(`${k}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const a=(await r.json()).version!==w;return a&&(e(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:t,check:o}}function v(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}function P(e){e.client}const V={url:g({}),page:g({}),navigating:d(null),updated:E()};export{T as I,b as P,y as S,S as a,L as b,N as c,O as d,P as e,U as f,x as g,v as i,R as r,V as s,d as w};
