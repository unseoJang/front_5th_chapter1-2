var M=Object.defineProperty;var $=(e,t,n)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var v=(e,t,n)=>$(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const A=()=>{const e=new Set;return{subscribe:o=>e.add(o),notify:()=>e.forEach(o=>o())}},F=(e,t)=>{const{subscribe:n,notify:o}=A();let r={...e};const l=u=>{r={...r,...u},o()},i=()=>({...r}),d=Object.fromEntries(Object.entries(t).map(([u,c])=>[u,(...S)=>l(c(i(),...S))]));return{getState:i,setState:l,subscribe:n,actions:d}},q=(e,t=window.localStorage)=>({get:()=>JSON.parse(t.getItem(e)),set:l=>t.setItem(e,JSON.stringify(l)),reset:()=>t.removeItem(e)}),V=e=>{const{subscribe:t,notify:n}=A(),o=()=>window.location.pathname,r=()=>e[o()],l=i=>{window.history.pushState(null,null,i),n()};return window.addEventListener("popstate",()=>n()),{get path(){return o()},push:l,subscribe:t,getTarget:r}};function s(e,t,...n){const o=n.flat(1/0).filter(r=>r!=null&&r!==!1);return{type:e,props:t,children:o}}const L=e=>e===null?"null":typeof e,f=new Map,G=["click","mouseover","focus","keydown","submit"];function H(e){function t(n){let o=n.target;for(;o&&o!==e;){const r=f.get(o),l=r==null?void 0:r[n.type];if(l!=null&&l.length){l.slice().forEach(i=>i(n));break}o=o.parentNode}}G.forEach(n=>{e.addEventListener(n,t,!1)})}function C(e,t,n){f.has(e)||f.set(e,{});const o=f.get(e);o[t]||(o[t]=[]),o[t].includes(n)||o[t].push(n)}function B(e,t,n){const o=f.get(e);!o||!o[t]||(o[t]=o[t].filter(r=>r!==n),o[t].length===0&&delete o[t],Object.keys(o).length===0&&f.delete(e))}function h(e){console.log("vNode=>",e);const t=L(e);if(["null","undefined","boolean"].includes(t))return document.createTextNode("");const o=["string","number"];if(console.log("vNodeType=>",t),o.includes(t))return document.createTextNode(e);if(Array.isArray(e)){const l=document.createDocumentFragment();return l.append(...e.map(h)),l}const r=document.createElement(e.type);return W(r,e.props),e.children&&Array.isArray(e.children)&&e.children.forEach(l=>{r.appendChild(h(l))}),r}function W(e,t){t&&Object.entries(t).forEach(([n,o])=>{if(n.startsWith("on")&&typeof t[n]=="function"){const r=n.slice(2).toLowerCase();C(e,r,o);return}else if(n==="className"){e.setAttribute("class",o);return}else e.setAttribute(n,o)})}function P(e){const t=L(e),n=["null","undefined","boolean"];if(n.includes(t))return"";if(t==="number"||t==="string")return String(e);if(typeof(e==null?void 0:e.type)=="function"){const r=e.type({...e.props,children:e.children});return P(r)}const o=e.children?e.children.filter(r=>!n.includes(L(r))).map(r=>typeof r=="object"?P(r):r):[];return{...e,children:o}}function z(e,t,n){const o={...t},r={...n};Object.keys(r).forEach(l=>{if(l.startsWith("on")&&(!o[l]||o[l]!==r[l])){const i=l.toLowerCase().substring(2);B(e,i,r[l])}}),Object.keys(o).forEach(l=>{if(l.startsWith("on")){const i=l.toLowerCase().substring(2);C(e,i,o[l])}else l==="className"?e.setAttribute("class",o[l]):e.setAttribute(l,o[l])}),Object.keys(r).forEach(l=>{l in o||e.removeAttribute(l)})}function D(e,t,n,o=0){if(!e)return;const r=e.childNodes[o];if(!n){if(r&&t===n)return;e.appendChild(h(t));return}if(!t){e.removeChild(r);return}if(t.type!==n.type){e.replaceChild(h(t),r);return}if(typeof t=="string"||typeof t=="number"){t!==n&&(r.textContent=t);return}r instanceof HTMLElement&&z(r,t.props,n.props);const l=t.children||[],i=n.children||[],d=Math.max(l.length,i.length);if(l.every(c=>typeof c=="string"||typeof c=="number")&&i.every(c=>typeof c=="string"||typeof c=="number")&&r.textContent!==l.join("")){r.textContent=l.join("");return}for(let c=0;c<d;c++)r instanceof HTMLElement&&D(r,l[c],i[c],c)}function J(e,t){const n=P(e),o=t._vNode;if(o)D(t,n,o);else{const r=h(n);t.appendChild(r),H(t)}t._vNode=n}const K=1e3,I=K*60,U=I*60,R=U*24,Y=e=>{const t=Date.now()-e;return t<I?"방금 전":t<U?`${Math.floor(t/I)}분 전`:t<R?`${Math.floor(t/U)}시간 전`:new Date(e).toLocaleString()},b=q("user"),Q=(e,t)=>e.filter(n=>n!==t),X=(e,t)=>[...e,t],Z=1e3,g=Z*60,_=g*60,a=F({currentUser:b.get(),loggedIn:!!b.get(),posts:[{id:1,author:"홍길동",time:Date.now()-5*g,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",likeUsers:[]},{id:2,author:"김철수",time:Date.now()-15*g,content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",likeUsers:[]},{id:3,author:"이영희",time:Date.now()-30*g,content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",likeUsers:[]},{id:4,author:"박민수",time:Date.now()-30*g,content:"주말에 등산 가실 분 계신가요? 함께 가요!",likeUsers:[]},{id:5,author:"정수연",time:Date.now()-2*_,content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",likeUsers:[]}],error:null},{logout(e){return b.reset(),{...e,currentUser:null,loggedIn:!1}},toggleLikePost(e,t){if(!e.loggedIn)return{...e};const n=e.posts.map(o=>{if(o.id!==t)return o;const r=e.currentUser.username,i=o.likeUsers.includes(e.currentUser.username)?Q(o.likeUsers,r):X(o.likeUsers,r);return console.log("updatedLikeUsers=>",i),{...o,likeUsers:i,activationLike:!o.activationLike}});return{...e,posts:n}}}),ee=({id:e,author:t,time:n,content:o,likeUsers:r=[],activationLike:l=!1})=>{const{loggedIn:i,currentUser:d,posts:u}=a.getState(),{toggleLikePost:c}=a.actions,S=()=>{if(!i){alert("로그인 후 이용해주세요");return}c(e)};return s("div",{className:"bg-white rounded-lg shadow p-4 mb-4"},s("div",{className:"flex items-center mb-2"},s("div",null,s("div",{className:"font-bold"},t),s("div",{className:"text-gray-500 text-sm"},Y(n)))),s("p",null,o),s("div",{className:"mt-2 flex justify-between text-gray-500"},s("span",{onClick:S,className:`like-button cursor-pointer${l?" text-blue-500":""}`},"좋아요 ",r.length),s("span",null,"댓글"),s("span",null,"공유")))};function te(e){const{posts:t}=a.getState(),{currentUser:n}=a.getState(),o={id:t.length+1,author:n.username,time:Date.now(),content:e,likeUsers:[]};a.setState({posts:[...t,o]})}const ne=()=>{const e=t=>{t.preventDefault();const n=document.getElementById("post-content").value||"";n&&te(n)};return s("div",{className:"mb-4 bg-white rounded-lg shadow p-4"},s("textarea",{id:"post-content",placeholder:"무슨 생각을 하고 계신가요?",className:"w-full p-2 border rounded",key:!0}),s("button",{id:"post-submit",className:"mt-2 bg-blue-600 text-white px-4 py-2 rounded",onClick:t=>e(t)},"게시"))},j=()=>s("header",{className:"bg-blue-600 text-white p-4 sticky top-0"},s("h1",{className:"text-2xl font-bold"},"항해플러스")),O=()=>s("footer",{className:"bg-gray-200 p-4 text-center"},s("p",null,"© $",new Date().getFullYear()," 항해플러스. All rights reserved.")),m={value:null,get(){return this.value},set(e){this.value=e}},E=e=>window.location.pathname===e?"text-blue-600 font-bold":"text-gray-600";function N({onClick:e,children:t,...n}){return s("a",{onClick:r=>{r.preventDefault(),e==null||e(),m.get().push(r.target.href.replace(window.location.origin,""))},...n},t)}const T=()=>{const{loggedIn:e}=a.getState(),{logout:t}=a.actions;return s("nav",{className:"bg-white shadow-md p-2 sticky top-14"},s("ul",{className:"flex justify-around"},s("li",null,s(N,{href:"/",className:E("/")},"홈")),!e&&s("li",null,s(N,{href:"/login",className:E("/login")},"로그인")),e&&s("li",null,s(N,{href:"/profile",className:E("/profile")},"프로필")),e&&s("li",null,s("a",{href:"#",id:"logout",className:"text-gray-600",onClick:n=>{n.preventDefault(),t()}},"로그아웃"))))},se=()=>{const{posts:e}=a.getState(),{loggedIn:t}=a.getState();return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(j,null),s(T,null),s("main",{className:"p-4"},t?s(ne,null):"",s("div",{id:"posts-container",className:"space-y-4"},[...e].sort((n,o)=>o.time-n.time).map(n=>s(ee,{...n,activationLike:n.likeUsers.length>0})))),s(O,null)))};function re(e){const t={username:e,email:"",bio:""};a.setState({currentUser:t,loggedIn:!0}),b.set(t)}const oe=()=>s("div",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},s("h1",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"항해플러스"),s("form",{id:"login-form",onSubmit:t=>{t.preventDefault();const n=document.getElementById("username");if(n){const o=n.value;re(o)}}},s("input",{type:"text",id:"username",placeholder:"사용자 이름",className:"w-full p-2 mb-4 border rounded",required:!0}),s("input",{type:"password",placeholder:"비밀번호",className:"w-full p-2 mb-6 border rounded",required:!0}),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded"},"로그인")),s("div",{className:"mt-4 text-center"},s("a",{href:"#",className:"text-blue-600 text-sm"},"비밀번호를 잊으셨나요?")),s("hr",{className:"my-6"}),s("div",{className:"text-center"},s("button",{className:"bg-green-500 text-white px-4 py-2 rounded"},"새 계정 만들기")))),le=()=>s("main",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full text-center",style:"max-width: 480px"},s("h1",{className:"text-2xl font-bold text-blue-600 mb-4"},"항해플러스"),s("p",{className:"text-4xl font-bold text-gray-800 mb-4"},"404"),s("p",{className:"text-xl text-gray-600 mb-8"},"페이지를 찾을 수 없습니다"),s("p",{className:"text-gray-600 mb-8"},"요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."),s("a",{href:"/","data-link":"",className:"bg-blue-600 text-white px-4 py-2 rounded font-bold"},"홈으로 돌아가기")));function ie(e){const t={...a.getState().currentUser,...e};a.setState({currentUser:t}),b.set(t),alert("프로필이 업데이트되었습니다.")}const ae=()=>{const{loggedIn:e,currentUser:t}=a.getState(),{username:n="",email:o="",bio:r=""}=t??{};return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(j,null),s(T,{loggedIn:e}),s("main",{className:"p-4"},s("div",{className:"bg-white p-8 rounded-lg shadow-md"},s("h2",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"내 프로필"),s("form",{id:"profile-form",onSubmit:i=>{i.preventDefault();const d=new FormData(i.target),u=Object.fromEntries(d);ie(u)}},s("div",{className:"mb-4"},s("label",{for:"username",className:"block text-gray-700 text-sm font-bold mb-2"},"사용자 이름"),s("input",{type:"text",id:"username",name:"username",className:"w-full p-2 border rounded",value:n,required:!0})),s("div",{className:"mb-4"},s("label",{for:"email",className:"block text-gray-700 text-sm font-bold mb-2"},"이메일"),s("input",{type:"email",id:"email",name:"email",className:"w-full p-2 border rounded",value:o,required:!0})),s("div",{className:"mb-6"},s("label",{for:"bio",className:"block text-gray-700 text-sm font-bold mb-2"},"자기소개"),s("textarea",{id:"bio",name:"bio",rows:"4",className:"w-full p-2 border rounded"},r)),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded font-bold"},"프로필 업데이트")))),s(O,null)))},x=class x extends Error{constructor(){super(x.MESSAGE)}};v(x,"MESSAGE","ForbiddenError");let p=x;const w=class w extends Error{constructor(){super(w.MESSAGE)}};v(w,"MESSAGE","UnauthorizedError");let y=w;function k(){const e=m.get().getTarget()??le,t=document.querySelector("#root");try{J(s(e,null),t)}catch(n){if(n instanceof p){m.get().push("/");return}if(n instanceof y){m.get().push("/login");return}console.error(n)}}m.set(V({"/":se,"/login":()=>{const{loggedIn:e}=a.getState();if(e)throw new p;return s(oe,null)},"/profile":()=>{const{loggedIn:e}=a.getState();if(!e)throw new y;return s(ae,null)}}));function ce(){m.get().subscribe(k),a.subscribe(k),k()}ce();
