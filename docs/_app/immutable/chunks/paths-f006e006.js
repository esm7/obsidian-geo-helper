function p(){}function F(t,n){for(const e in n)t[e]=n[e];return t}function M(t){return t()}function C(){return Object.create(null)}function g(t){t.forEach(M)}function v(t){return typeof t=="function"}function lt(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function R(t){return Object.keys(t).length===0}function W(t,...n){if(t==null)return p;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function ft(t,n,e){t.$$.on_destroy.push(W(n,e))}function at(t,n,e,i){if(t){const r=P(t,n,e,i);return t[0](r)}}function P(t,n,e,i){return t[1]&&i?F(e.ctx.slice(),t[1](i(n))):e.ctx}function _t(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],o=Math.max(n.dirty.length,r.length);for(let c=0;c<o;c+=1)l[c]=n.dirty[c]|r[c];return l}return n.dirty|r}return n.dirty}function dt(t,n,e,i,r,l){if(r){const o=P(n,e,i,l);t.p(o,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function mt(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function pt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}function yt(t,n,e){return t.set(e),n}function gt(t){return t&&v(t.destroy)?t.destroy:p}let E=!1;function G(){E=!0}function I(){E=!1}function J(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function K(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&s.push(a)}n=s}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let s=0;s<n.length;s++){const u=n[s].claim_order,a=(r>0&&n[e[r]].claim_order<=u?r+1:J(1,r,x=>n[e[x]].claim_order,u))-1;i[s]=e[a]+1;const f=a+1;e[f]=s,r=Math.max(f,r)}const l=[],o=[];let c=n.length-1;for(let s=e[r]+1;s!=0;s=i[s-1]){for(l.push(n[s-1]);c>=s;c--)o.push(n[c]);c--}for(;c>=0;c--)o.push(n[c]);l.reverse(),o.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<o.length;s++){for(;u<l.length&&o[s].claim_order>=l[u].claim_order;)u++;const a=u<l.length?l[u]:null;t.insertBefore(o[s],a)}}function Q(t,n){if(E){for(K(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function bt(t,n,e){E&&!e?Q(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function V(t){return document.createElement(t)}function k(t){return document.createTextNode(t)}function xt(){return k(" ")}function $t(){return k("")}function wt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function Et(t){return function(n){return n.preventDefault(),t.call(this,n)}}function Nt(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function B(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function At(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in n)n[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=n[i]:i==="__value"?t.value=t[i]=n[i]:e[i]&&e[i].set?t[i]=n[i]:B(t,i,n[i])}function jt(t,n){Object.keys(n).forEach(e=>{X(t,e,n[e])})}function X(t,n,e){n in t?t[n]=typeof t[n]=="boolean"&&e===""?!0:e:B(t,n,e)}function Y(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function H(t,n,e,i,r=!1){Z(t);const l=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const c=t[o];if(n(c)){const s=e(c);return s===void 0?t.splice(o,1):t[o]=s,r||(t.claim_info.last_index=o),c}}for(let o=t.claim_info.last_index-1;o>=0;o--){const c=t[o];if(n(c)){const s=e(c);return s===void 0?t.splice(o,1):t[o]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,c}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function tt(t,n,e,i){return H(t,r=>r.nodeName===n,r=>{const l=[];for(let o=0;o<r.attributes.length;o++){const c=r.attributes[o];e[c.name]||l.push(c.name)}l.forEach(o=>r.removeAttribute(o))},()=>i(n))}function vt(t,n,e){return tt(t,n,e,V)}function nt(t,n){return H(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>k(n),!0)}function kt(t){return nt(t," ")}function St(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Tt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Ct(t,n){const e=[];let i=0;for(const r of n.childNodes)if(r.nodeType===8){const l=r.textContent.trim();l===`HEAD_${t}_END`?(i-=1,e.push(r)):l===`HEAD_${t}_START`&&(i+=1,e.push(r))}else i>0&&e.push(r);return e}function Dt(t,n){return new t(n)}let y;function m(t){y=t}function b(){if(!y)throw new Error("Function called outside component initialization");return y}function Ot(t){b().$$.on_mount.push(t)}function Mt(t){b().$$.after_update.push(t)}function Pt(t){b().$$.on_destroy.push(t)}function Bt(t,n){return b().$$.context.set(t,n),n}function Ht(t){return b().$$.context.get(t)}function Lt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const h=[],D=[],$=[],O=[],L=Promise.resolve();let A=!1;function q(){A||(A=!0,L.then(z))}function qt(){return q(),L}function j(t){$.push(t)}const N=new Set;let d=0;function z(){if(d!==0)return;const t=y;do{try{for(;d<h.length;){const n=h[d];d++,m(n),et(n.$$)}}catch(n){throw h.length=0,d=0,n}for(m(null),h.length=0,d=0;D.length;)D.pop()();for(let n=0;n<$.length;n+=1){const e=$[n];N.has(e)||(N.add(e),e())}$.length=0}while(h.length);for(;O.length;)O.pop()();A=!1,N.clear(),m(t)}function et(t){if(t.fragment!==null){t.update(),g(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(j)}}const w=new Set;let _;function zt(){_={r:0,c:[],p:_}}function Ft(){_.r||g(_.c),_=_.p}function it(t,n){t&&t.i&&(w.delete(t),t.i(n))}function Rt(t,n,e,i){if(t&&t.o){if(w.has(t))return;w.add(t),_.c.push(()=>{w.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}const Wt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Gt(t,n){const e={},i={},r={$$scope:1};let l=t.length;for(;l--;){const o=t[l],c=n[l];if(c){for(const s in o)s in c||(i[s]=1);for(const s in c)r[s]||(e[s]=c[s],r[s]=1);t[l]=c}else for(const s in o)r[s]=1}for(const o in i)o in e||(e[o]=void 0);return e}function It(t){return typeof t=="object"&&t!==null?t:{}}function Jt(t){t&&t.c()}function Kt(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(n,e),i||j(()=>{const o=t.$$.on_mount.map(M).filter(v);t.$$.on_destroy?t.$$.on_destroy.push(...o):g(o),t.$$.on_mount=[]}),l.forEach(j)}function st(t,n){const e=t.$$;e.fragment!==null&&(g(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ot(t,n){t.$$.dirty[0]===-1&&(h.push(t),q(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Qt(t,n,e,i,r,l,o,c=[-1]){const s=y;m(t);const u=t.$$={fragment:null,ctx:[],props:l,update:p,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(s?s.$$.context:[])),callbacks:C(),dirty:c,skip_bound:!1,root:n.target||s.$$.root};o&&o(u.root);let a=!1;if(u.ctx=e?e(t,n.props||{},(f,x,...S)=>{const T=S.length?S[0]:x;return u.ctx&&r(u.ctx[f],u.ctx[f]=T)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](T),a&&ot(t,f)),x}):[],u.update(),a=!0,g(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){G();const f=Y(n.target);u.fragment&&u.fragment.l(f),f.forEach(U)}else u.fragment&&u.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),I(),z()}m(s)}class Ut{$destroy(){st(this,1),this.$destroy=p}$on(n,e){if(!v(e))return p;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!R(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const ct="/obsidian-geo-helper";let ut=ct;function Vt(t){ut=t}export{It as $,st as A,qt as B,ct as C,Vt as D,p as E,ut as F,at as G,Ct as H,Q as I,dt as J,ht as K,_t as L,ft as M,wt as N,Lt as O,Et as P,Nt as Q,F as R,Ut as S,At as T,gt as U,Gt as V,v as W,g as X,pt as Y,b as Z,mt as _,xt as a,Ht as a0,jt as a1,Bt as a2,Pt as a3,yt as a4,Wt as a5,bt as b,kt as c,Ft as d,$t as e,it as f,zt as g,U as h,Qt as i,Mt as j,V as k,vt as l,Y as m,B as n,Ot as o,Tt as p,k as q,nt as r,lt as s,Rt as t,St as u,D as v,Dt as w,Jt as x,Kt as y,rt as z};
