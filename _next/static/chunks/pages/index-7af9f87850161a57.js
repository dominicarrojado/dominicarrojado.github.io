(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{89208:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(58318)}])},52464:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893);function s(e){let{dateString:t,className:r}=e;return(0,n.jsx)("time",{dateTime:t,className:r,children:function(e){let t=new Date(e),r=t.getMonth();return"".concat(["January","February","March","April","May","June","July","August","September","October","November","December"][r]," ").concat(t.getDate(),", ").concat(t.getFullYear())}(t)})}},67098:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(85893),s=r(94184),l=r.n(s),i=r(79852);function o(){let e=(0,i.s4)();return(0,n.jsx)("div",{className:l()("absolute left-0 top-0 h-full w-full bg-center bg-repeat invert-[.1]","dark:invert-0","transition-opacity duration-1250 motion-safe:animate-slide","motion-reduce:transition-none",{"opacity-0":!e}),style:{backgroundImage:"url('/images/bg/pattern.png')"}})}},10290:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(85893),s=r(94184),l=r.n(s);function i(e){let{isMinHeightFull:t,children:r}=e;return(0,n.jsx)("section",{className:l()("relative flex flex-col items-center justify-center overflow-hidden bg-gray-550 px-6 text-center","dark:bg-gray-650","sm:px-20","lg:px-32",t?"min-h-full py-32":"min-h-96 py-28"),children:r})}},63895:function(e,t,r){"use strict";r.d(t,{Z:function(){return x}});var n=r(85893),s=r(94184),l=r.n(s),i=r(52464),o=r(67294),a=r(77888),c=r(381);let d=(0,o.forwardRef)((e,t)=>{let{children:r,as:s="button",withIcon:i=!0,...o}=e,d={...o,ref:t,className:l()("group inline-block items-center font-normal select-none","transition-colors duration-300 hover:text-black group-hover:text-black","motion-reduce:transition-none","dark:hover:text-white dark:group-hover:text-white")},m=(0,n.jsxs)(n.Fragment,{children:[r,i&&(0,n.jsx)(c.Z,{className:l()("ml-2 inline-block h-2 w-2 text-black opacity-30","dark:text-white","transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100","motion-reduce:transition-none","sm:ml-2.5 sm:h-2.5 sm:w-2.5","md:ml-3 md:h-3 md:w-3","xl:h-3.5 xl:w-3.5")})]});return"button"===s?(0,n.jsx)(a.z,{...d,children:m}):(0,n.jsx)(s,{...d,children:m})});d.displayName="ButtonArrowLink";var m=r(63761),u=r(76001);function x(e){let{post:t,headingLevel:r,className:s,style:o,anchorClassName:a}=e,c=l()("mt-2 font-bold text-lg","sm:text-xl","md:text-2xl","xl:text-3xl");return(0,n.jsx)("li",{className:l()("mt-4 select-none first:mt-0","sm:mt-6","md:mt-8","xl:mt-10",s),style:o,children:(0,n.jsx)(m.Z,{href:"".concat(u.AW.POSTS,"/").concat(t.id),children:(0,n.jsx)("a",{className:l()("group flex w-full px-4 py-6 shadow-md","transition-shadow duration-300 hover:shadow-xl","motion-reduce:transition-none","sm:px-6","md:p-8","xl:p-10",a),children:(0,n.jsxs)("article",{className:"flex w-full flex-col",children:[(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[(0,n.jsx)(i.Z,{dateString:t.date,className:l()("text-xs","md:text-sm")}),(0,n.jsx)("div",{className:l()("rounded bg-gray-200 px-1.5 py-0.5 text-2xs capitalize","dark:bg-gray-600","md:px-2 md:py-1 md:text-xs","xl:text-sm"),children:t.category})]}),2===r?(0,n.jsx)("h2",{className:c,children:t.title}):(0,n.jsx)("h3",{className:c,children:t.title}),(0,n.jsx)("p",{className:"mt-4",children:t.excerpt}),(0,n.jsx)("div",{className:"mt-6",children:(0,n.jsx)(d,{as:"span",children:"Read Post"})})]})})})})}},97746:function(e,t,r){"use strict";r.d(t,{Z:function(){return k}});var n=r(85893),s=r(94184),l=r.n(s),i=r(67294),o=r(72849),a=r(60069),c=r(9420),d=r(79852);function m(e){let{className:t,color:r}=e;return(0,n.jsx)("div",{className:l()("rounded-full border-transparent","animate-spin",t),style:{borderRightColor:r},"data-testid":"spinner"})}function u(){return(0,n.jsx)(m,{className:l()("absolute inset-0 z-0 m-auto h-7 w-7 border-2","sm:h-9 sm:w-9","md:h-11 md:w-11 md:border-4"),color:"#999999"})}var x=r(29093),h=r(75957),f=r(76930);function g(e){let{progress:t}=e,r=(0,x.K)({animated:300,placement:"left"}),s=(0,i.useRef)(null);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(h.e,{state:r,ref:s,className:l()("absolute right-3 top-3 z-30 rounded-full bg-black bg-opacity-60 p-1","sm:right-4 sm:top-4"),"data-testid":"gif-loader",children:[(0,n.jsx)(m,{className:l()("h-7 w-7 border-2","transition-opacity duration-700","motion-reduce:transition-none","sm:h-9 sm:w-9","md:h-11 md:w-11 md:border-4"),color:"#ffffff"}),(0,n.jsx)("div",{className:l()("absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs text-white","sm:text-sm","md:text-base"),children:t})]}),(0,n.jsx)(f.Z,{tooltip:r,className:"mr-3",children:"Downloading GIF..."})]})}var p=r(76001);function j(e){let{imageUrl:t,imageWidth:r,imageHeight:s,gifUrl:m,title:x}=e,h=(0,i.useRef)(null),f=(0,i.useRef)(null),[j,w]=(0,i.useState)(!1),[v,b]=(0,i.useState)(!1),[y,N]=(0,i.useState)(!1),[k,L]=(0,i.useState)(0),[T,M]=(0,i.useState)(""),S=(0,d._D)(),{startDownloadGif:E,cancelDownloadGif:Z}=(0,d.UX)({url:m,onStart:()=>{L(0)},onProgress:e=>{L(e)},onSuccess:e=>{let{durationMs:t,data:r}=e;L(100),M(r),(0,a.L)({event:p.bg.GIF_AUTO_PLAY_START,projectTitle:x,gifLoadTime:t})},onCancel:e=>{let{durationMs:t,progress:r}=e;(0,a.L)({event:p.bg.GIF_AUTO_PLAY_CANCEL,projectTitle:x,gifCancelTime:t,gifCancelProgress:r})},onError:e=>{console.error("Error on Work GIF download:",e)}}),C={width:r,height:s,className:"z-10 max-w-full h-auto shadow-3xl",style:{aspectRatio:"".concat(r," / ").concat(s)},draggable:!1},A=!!(S&&v&&y&&!j&&100!==k),_=!!(S&&T&&y&&!j);return(0,i.useEffect)(()=>{let e;let t=()=>{window.requestAnimationFrame(()=>{let t=(0,c.e)(h);if(!t)return;let{scrollY:r,innerHeight:n}=window,{top:s,height:l}=t.getBoundingClientRect();w(!0),0!==r&&s>=0&&s+l<=n?N(!0):N(!1),clearTimeout(e),e=window.setTimeout(()=>{w(!1)},200)})};return o.Z.on("scroll",t),()=>{clearTimeout(e),o.Z.off("scroll",t)}},[]),(0,i.useEffect)(()=>{S&&!T&&(y?E():Z())},[S,y,T]),(0,n.jsx)("div",{className:l()("flex w-full items-center justify-center","lg:w-4/6"),children:(0,n.jsxs)("div",{ref:h,className:"relative inline-flex min-h-24 min-w-11",children:[!v&&(0,n.jsx)(u,{}),(0,n.jsx)("img",{...C,src:t,alt:"Screenshot of ".concat(x),onLoad:()=>b(!0),loading:"lazy"}),(0,n.jsx)("img",{ref:f,src:T,alt:"GIF of ".concat(x),className:l()("absolute left-0 top-0 z-20 h-full w-full","transition-opacity duration-300","motion-reduce:transition-none",_?"opacity-100":"opacity-0"),draggable:!1}),A&&(0,n.jsx)(g,{progress:k})]})})}function w(e){return(0,n.jsx)("svg",{viewBox:"0 0 576 512",role:"img",...e,children:(0,n.jsx)("path",{fill:"currentColor",d:"M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"})})}function v(){return(0,n.jsxs)("div",{className:l()("mt-1 flex select-none items-center justify-center text-xs font-normal uppercase text-yellow-400","md:text-sm","lg:justify-start"),children:[(0,n.jsx)(w,{className:l()("-mt-0.5 mr-1 inline-block h-2.5 w-2.5","md:h-3.5 md:w-3.5")}),"Best Project"]})}var b=r(60082);function y(e){let{title:t,url:r,projectTitle:s}=e,o=(0,i.useRef)(!1),c=!r.startsWith(p.AW.HOME);return(0,n.jsx)("li",{className:l()("mt-4","sm:mt-2","lg:mt-1"),children:(0,n.jsx)(b.Z,{href:r,onClick:()=>{o.current=!0,(0,a.L)({projectTitle:s,event:p.bg.PROJECT_CLICK,linkText:t,linkUrl:r})},target:"_blank",isExternal:c,children:t})})}function N(e){let{headingLevel:t,title:r,description:s,links:i,isBest:o}=e,a=l()("inline-flex items-center font-bold text-lg","sm:text-xl","md:text-2xl","xl:text-3xl");return(0,n.jsxs)("div",{className:l()("mt-8 w-full text-center","md:mt-10","lg:mt-0 lg:w-2/6 lg:pl-10 lg:text-left","xl:px-14"),children:[2===t?(0,n.jsx)("h2",{className:a,children:r}):(0,n.jsx)("h3",{className:a,children:r}),o&&(0,n.jsx)(v,{}),(0,n.jsx)("p",{className:l()("mt-1","md:mt-4"),children:s}),(0,n.jsx)("div",{className:l()("mt-6","md:mt-8"),children:(0,n.jsx)("ul",{children:i.map((e,t)=>(0,n.jsx)(y,{...e,projectTitle:r},t))})})]})}function k(e){let{project:t,className:r,style:s,headingLevel:i}=e;return(0,n.jsxs)("li",{className:l()("mt-16 flex flex-col items-center first:mt-0","sm:mt-24","lg:mt-48 lg:flex-row","xl:mt-52",r),style:s,children:[(0,n.jsx)(j,{imageUrl:t.imageUrl,imageWidth:t.imageWidth,imageHeight:t.imageHeight,gifUrl:t.gifUrl,title:t.title}),(0,n.jsx)(N,{headingLevel:i,title:t.title,description:t.description,links:t.links,isBest:t.isBest})]})}},85784:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(85893),s=r(94184),l=r.n(s);function i(e){let{className:t,children:r,...s}=e;return(0,n.jsx)("section",{className:l()("px-6 pb-20 pt-16","sm:px-8 sm:pb-24 sm:pt-20","md:pb-28 md:pt-24 lg:px-10","xl:pb-32 xl:pt-28",t),...s,children:r})}},381:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893);function s(e){return(0,n.jsx)("svg",{viewBox:"0 0 320 512",role:"img",...e,children:(0,n.jsx)("path",{fill:"currentColor",d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"})})}r(67294)},60082:function(e,t,r){"use strict";var n=r(85893),s=r(67294),l=r(94184),i=r.n(l),o=r(381);let a=(0,s.forwardRef)((e,t)=>{let{target:r,rel:s,children:l,isExternal:a,...c}=e;return(0,n.jsxs)("a",{ref:t,className:i()("group inline-flex select-none items-center font-normal","dark:hover:text-white","transition-colors duration-300 hover:text-black group-hover:text-black","motion-reduce:transition-none"),target:a?"_blank":r,rel:a?"noopener noreferrer nofollow":s,...c,children:[l,(0,n.jsx)(o.Z,{className:i()("ml-2 inline-block h-2 w-2 text-black opacity-30","dark:text-white","transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100","motion-reduce:transition-none","sm:ml-2.5 sm:h-2.5 sm:w-2.5","md:ml-3 md:h-3 md:w-3","xl:h-3.5 xl:w-3.5")})]})});a.displayName="TextArrowLink",t.Z=a},8976:function(e,t,r){"use strict";r.d(t,{N:function(){return s},b:function(){return l}});var n=r(49623);function s(e){return"".concat(e," | ").concat(n.fB)}function l(e){return"".concat(n.cG).concat(e,"/")}},58318:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return G},default:function(){return H}});var n=r(85893),s=r(2962),l=r(8976),i=r(67098),o=r(67294),a=r(94184),c=r.n(a),d=r(79852),m=r(60510);function u(e){return(0,n.jsx)("svg",{viewBox:"0 0 20.19 20.85",role:"img",...e,children:(0,n.jsx)("g",{fill:"currentColor",children:(0,n.jsx)("path",{d:"M 20.19 3.076 L 3.198 10.449 L 20.19 17.773 L 20.19 20.85 L 0 11.597 L 0 9.229 L 20.19 0 L 20.19 3.076 Z"})})})}function x(e){let{isLeft:t}=e,r=(0,d.s4)();return(0,n.jsx)(u,{className:c()("absolute top-12 h-14 w-14 text-white","transform transition duration-1250","motion-reduce:transition-none","sm:top-16 sm:h-24 sm:w-24","md:top-20 md:h-32 md:w-32","xl:top-24 xl:h-40 xl:w-40",{[t?"-left-14 sm:-left-24 md:-left-32 xl:-left-40":"-right-14 rotate-180 sm:-right-24 md:-right-32 xl:-right-40"]:!0,[r?"text-opacity-30":"text-opacity-0"]:!0,"translate-x-3":!r&&t,"-translate-x-3":!r&&!t})})}function h(){let e=(0,o.useRef)(null),t=(0,d.s4)(),r=(0,d.ur)(e);return(0,n.jsxs)("div",{ref:e,className:"relative inline-flex",style:{opacity:r},children:[(0,n.jsx)(x,{isLeft:!0}),(0,n.jsx)(m.Z,{className:c()("h-40 w-40 text-white","transform transition-transform-opacity duration-1250","motion-reduce:transition-none","sm:h-60 sm:w-60","md:h-80 md:w-80","xl:h-96 xl:w-96",{"-translate-y-4 opacity-0":!t}),role:"img","aria-label":"Dominic Arrojado logo"}),(0,n.jsx)(x,{})]})}function f(){let e=(0,o.useRef)(null),t=(0,d.s4)(),r=(0,d.ur)(e);return(0,n.jsx)("div",{ref:e,className:"overflow-hidden",style:{opacity:r},children:(0,n.jsx)("h1",{className:c()("mt-2 px-4 text-base font-light text-white","transform transition duration-700","motion-reduce:transition-none","sm:text-lg","md:mt-3 md:text-2xl","xl:mt-4 xl:text-3xl",{"translate-y-full opacity-0":!t}),children:"Guides, Tips and Tricks to Web Development"})})}var g=r(10290),p=r(9420);async function j(){let e;try{e=(await r.e(251).then(r.t.bind(r,64251,23))).default}catch(e){console.error("Error on MoveTo import:",e)}return e}var w=r(60069);function v(e){return(0,n.jsx)("svg",{viewBox:"0 0 448 512",role:"img",...e,children:(0,n.jsx)("path",{fill:"currentColor",d:"M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"})})}var b=r(76001),y=r(49623);function N(){let e="Scroll Down",t=(0,o.useRef)(null),r=(0,d.s4)(),s=(0,d.Tn)();return(0,o.useEffect)(()=>{let e;return s&&async function(){let r=await j();if(void 0===r)return;let n=(0,p.e)(t);e=new r({duration:y.DY}).registerTrigger(n)}(),()=>{"function"==typeof e&&e()}},[s]),(0,n.jsx)("div",{className:c()("absolute bottom-0 left-0 z-10 w-full text-center","transform transition duration-700","motion-reduce:transition-none",{"opacity-0":!r,"-translate-y-3":!r}),"data-testid":"scroll-down-btn",children:(0,n.jsxs)("a",{ref:t,href:"#about",className:"group relative inline-flex flex-col items-center pb-2",onClick:t=>{t.currentTarget.blur(),(0,w.L)({event:b.bg.SCROLL_CLICK,linkText:e})},children:[(0,n.jsxs)("div",{className:c()("relative inline-flex select-none pb-0.5 pt-1 text-2xs text-gray-400","transform transition duration-300 group-hover:translate-y-0.5 group-hover:text-white","motion-reduce:transition-none","md:mb-1 md:text-sm md:group-hover:translate-y-1","xl:mb-2 xl:text-lg"),children:[e,(0,n.jsx)("div",{className:"pointer-events-none absolute bottom-0 right-0 z-0 h-px w-full bg-white bg-opacity-20"}),(0,n.jsx)("div",{className:c()("pointer-events-none absolute bottom-0 right-0 z-10 h-px w-0 bg-white","transition-width duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full","motion-reduce:transition-none")})]}),(0,n.jsx)(v,{className:c()("mt-2 inline-flex h-2 w-2 text-gray-500","dark:text-gray-600","transition-colors duration-300 group-hover:text-gray-300 motion-safe:animate-bounce","motion-reduce:transition-none","md:h-3 md:w-3","xl:h-4 xl:w-4")})]})})}function k(){return(0,n.jsxs)(g.Z,{isMinHeightFull:!0,children:[(0,n.jsx)(i.Z,{}),(0,n.jsxs)("div",{className:"-mt-16",children:[(0,n.jsx)(h,{}),(0,n.jsx)(f,{})]}),(0,n.jsx)(N,{})]})}var L=r(85784);function T(e){let{children:t}=e;return(0,n.jsx)("h2",{className:c()("text-center text-2xl font-bold","sm:text-3xl","md:text-4xl","xl:text-5xl"),children:t})}function M(e){let{className:t,children:r}=e;return(0,n.jsx)("p",{className:c()("mt-6 text-center",t),children:r})}var S=r(48491),E=r(60082),Z=r(63761);function C(){return(0,n.jsx)(L.Z,{id:"about",className:"bg-gray-100 dark:bg-gray-750",children:(0,n.jsxs)("div",{className:"mx-auto max-w-5xl",children:[(0,n.jsx)(T,{children:"About Me"}),(0,n.jsxs)(M,{children:["My name is Dominic Arrojado. I write"," ",(0,n.jsx)(Z.Z,{href:b.AW.POSTS,children:(0,n.jsx)("a",{children:"tech blogs"})})," ","and create"," ",(0,n.jsx)(S.Z,{href:b.RU.PERSONAL_YOUTUBE,isExternal:!0,children:"videos"})," ","to share my knowledge and learnings from my web development experiences. It is my passion to translate design into code with great attention to details and solve complicated problems with simple solutions."]}),(0,n.jsxs)(M,{children:["I'm currently based in Singapore and working at"," ",(0,n.jsx)(S.Z,{href:b.RU.PROPERTY_GURU_FINANCE,isExternal:!0,children:"PropertyGuru Finance"})," ","as a Lead Engineer."]}),(0,n.jsx)("div",{className:"mt-12 text-center",children:(0,n.jsx)(Z.Z,{href:b.AW.ABOUT,passHref:!0,children:(0,n.jsx)(E.Z,{children:"Read My Story"})})})]})})}var A=r(97746);function _(){return(0,n.jsxs)(L.Z,{id:"projects",children:[(0,n.jsx)(T,{children:"Featured Projects"}),(0,n.jsx)(M,{children:"A selection of projects I've done so far."}),(0,n.jsx)("ul",{className:c()("mx-auto mt-8 max-w-screen-3xl","sm:mt-10","lg:mt-12"),"data-testid":"projects-list",children:y.ei.map((e,t)=>(0,n.jsx)(A.Z,{project:e,headingLevel:3},t))}),(0,n.jsx)("div",{className:c()("mt-12 text-center","md:mt-16","lg:mt-24","xl:mt-28"),children:(0,n.jsx)(Z.Z,{href:b.AW.PROJECTS,passHref:!0,children:(0,n.jsx)(E.Z,{children:"See All Projects"})})})]})}var R=r(63895);function P(e){let{latestPosts:t}=e;return(0,n.jsxs)(L.Z,{id:"posts",className:"bg-gray-100 dark:bg-gray-750",children:[(0,n.jsx)(T,{children:"Blog"}),(0,n.jsx)(M,{children:"A place to share my knowledge and learnings from my web development experiences."}),(0,n.jsx)("ul",{className:c()("mx-auto mt-8 flex max-w-screen-3xl flex-col","sm:mt-10","lg:mt-12"),children:t.map((e,t)=>(0,n.jsx)(R.Z,{post:e,headingLevel:3,anchorClassName:"bg-white dark:bg-gray-650"},t))}),(0,n.jsx)("div",{className:c()("mt-12 text-center","md:mt-16","lg:mt-18","xl:mt-20"),children:(0,n.jsx)(Z.Z,{href:"".concat(b.AW.POSTS_PAGE,"/2"),passHref:!0,children:(0,n.jsx)(E.Z,{children:"See More Posts"})})})]})}var z=r(77888),I=r(52134);function B(e){return"changedTouches"in e?e.changedTouches[0]:e}function O(e){return(0,n.jsx)("svg",{viewBox:"0 0 512 512",role:"img",...e,children:(0,n.jsx)("path",{fill:"currentColor",d:"M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"})})}function W(e){let{testimonial:t}=e;return(0,n.jsx)("li",{className:c()("group flex w-full shrink-0 px-3","xs:w-11/12","sm:w-5/6","md:w-7/12","lg:w-1/2","xl:w-1/3","transform transition-transform duration-300 odd:-rotate-1 even:rotate-1 hover:rotate-0","motion-reduce:transition-none","md:px-5"),children:(0,n.jsxs)("figure",{className:c()("overflow-hidden rounded-lg border shadow-md","dark:border-gray-400 dark:border-opacity-30","transition-shadow hover:shadow-xl","motion-reduce:transition-none"),children:[(0,n.jsxs)("blockquote",{className:c()("rounded-t-xl bg-white p-5","dark:bg-gray-650","sm:p-6","md:p-8 md:text-xl md:leading-8"),children:[(0,n.jsx)(O,{className:c()("mb-2 mt-2 h-6 w-6 text-gray-300","dark:text-gray-400 dark:text-opacity-40","-translate-y-1.5 transform","sm:h-7 sm:w-7","md:h-8 md:w-8 md:-translate-y-2","xl:h-9 xl:w-9 xl:-translate-y-2.5")}),t.quote]}),(0,n.jsxs)("figcaption",{className:c()("bg-gray-100 p-5","dark:bg-gray-750","sm:p-6","md:p-8"),children:[(0,n.jsx)("div",{className:"font-normal",children:t.name}),(0,n.jsx)("small",{className:"block",children:t.jobTitle}),(0,n.jsx)("small",{className:"block",children:t.companyName})]})]})})}function F(e){return(0,n.jsx)("svg",{viewBox:"0 0 320 512",role:"img",...e,children:(0,n.jsx)("path",{fill:"currentColor",d:"M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z"})})}function U(e){return(0,n.jsx)("svg",{viewBox:"0 0 448 512",role:"img",...e,children:(0,n.jsx)("path",{fill:"currentColor",d:"M448 240v96c0 3.084-.356 6.159-1.063 9.162l-32 136C410.686 499.23 394.562 512 376 512H168a40.004 40.004 0 0 1-32.35-16.473l-127.997-176c-12.993-17.866-9.043-42.883 8.822-55.876 17.867-12.994 42.884-9.043 55.877 8.823L104 315.992V40c0-22.091 17.908-40 40-40s40 17.909 40 40v200h8v-40c0-22.091 17.908-40 40-40s40 17.909 40 40v40h8v-24c0-22.091 17.908-40 40-40s40 17.909 40 40v24h8c0-22.091 17.908-40 40-40s40 17.909 40 40zm-256 80h-8v96h8v-96zm88 0h-8v96h8v-96zm88 0h-8v96h8v-96z"})})}function D(){let e=(0,o.useRef)(null),t=(0,o.useRef)(null),r=(0,o.useRef)(0),s=(0,o.useRef)(0),l=(0,o.useRef)(0),i=(0,o.useRef)(!1),{windowWidth:a}=(0,d.iP)(),[m,u]=(0,o.useState)(!0),[x,h]=(0,o.useState)(!1),[f,g]=(0,o.useState)(0),[j,v]=(0,o.useState)(0),N=(0,o.useMemo)(()=>Array.from(Array(j).keys()),[j]),[k,S,E]=(0,p.Y)(0),Z=a<y.k4?U:F,C=()=>{let r=(0,p.e)(e),n=(0,p.e)(t),s=r.offsetWidth,l=n.scrollWidth,i=n.firstElementChild.offsetWidth,o=y.wI-Math.round(s/i)+1;return{offsetXMin:-(l-2*Math.round(s/2)),offsetXMax:0,swipeWidth:i,maxSwipe:o}},A=e=>{let t=B(e).clientX,n=(0,p.e)(l)-t,o=(0,p.e)(r)-n,{offsetXMin:a,offsetXMax:c,swipeWidth:d,maxSwipe:m}=C();0!==n&&(o>c||o<a)&&(n>0?o-=Math.round((o-a)*.7):o-=Math.round((o-c)*.7)),S(o),Math.abs(n)>=y.ao&&(u(!1),(0,p.e)(i)||(i.current=!0,(0,w.L)({event:b.bg.TESTIMONIALS_SWIPE})));let x=(0,p.e)(r);if(Math.abs(n)>y.ao){let e=Math.ceil(Math.abs((x=Math.max(x=Math.min(x=n>0?Math.floor(o/d)*d:Math.ceil(o/d)*d,c),a))/d));g(e=Math.min(e,m-1))}s.current=x},_=()=>{h(!1),S((0,p.e)(s)),window.removeEventListener("touchmove",A),window.removeEventListener("touchend",_),window.removeEventListener("mouseup",_),window.removeEventListener("mousemove",A)},R=e=>{h(!0),l.current=B(e).clientX,r.current=(0,p.e)(E),window.addEventListener("touchmove",A),window.addEventListener("touchend",_),window.addEventListener("mousemove",A),window.addEventListener("mouseup",_)},P=e=>{let{swipeWidth:t,offsetXMin:r}=C(),n=-(t*e);S(n=Math.max(n,r)),g(e)};return(0,o.useEffect)(()=>{let{maxSwipe:e}=C();S(0),g(0),v(e||0),u(!0)},[a]),(0,n.jsxs)(L.Z,{children:[(0,n.jsx)(T,{children:"Testimonials"}),(0,n.jsx)(M,{children:"Kind words from people I've worked with and currently working with."}),(0,n.jsxs)("div",{className:c()("relative -mx-6 overflow-hidden","sm:-mx-8","lg:-mx-10"),style:{touchAction:"pan-y"},children:[(0,n.jsxs)("div",{ref:e,className:"relative pb-10",children:[(0,n.jsx)("ul",{ref:t,className:c()("relative mt-8 flex cursor-grab select-none flex-row items-center active:cursor-grabbing","transform transition-transform ease-out","motion-reduce:transition-none","sm:mt-10","lg:mt-12",{[x?"duration-0":"duration-300"]:!0}),style:{transform:"translate3d(".concat(k,"px, 0, 0)")},onTouchStart:R,onMouseDown:R,children:y.aP.map((e,t)=>(0,n.jsx)(W,{testimonial:e},t))}),(0,n.jsx)("div",{className:"mt-8 flex items-center justify-center","data-testid":"indicators",children:N.map(e=>(0,n.jsx)(z.z,{className:c()("ml-1 h-1 w-1 cursor-pointer rounded-full first:ml-0","transition-colors","motion-reduce:transition-none","md:h-1.5 md:w-1.5","lg:ml-1.5 lg:h-2 lg:w-2","xl:ml-2 xl:h-2.5 xl:w-2.5",e===f?"bg-gray-400 dark:bg-gray-300":"bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400"),onClick:()=>P(e),children:(0,n.jsxs)(I.T,{children:["Slide ",e+1]})},e))})]}),(0,n.jsxs)("small",{className:c()("pointer-events-none absolute right-16 top-5 flex select-none items-center border border-transparent bg-white px-3 py-2 shadow-lg","dark:border-gray-400 dark:border-opacity-20 dark:bg-gray-650","transform transition-transform-opacity duration-700","motion-reduce:transition-none","md:right-20",{"opacity-0":!m,"translate-x-6":!m}),children:[(0,n.jsx)(Z,{className:c()("mr-2 h-3 w-3 animate-pulse","md:h-4 md:w-4")}),"Swipe to See More"]})]})]})}var G=!0;function H(e){let{latestPosts:t}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.PB,{title:(0,l.N)("Guides, Tips and Tricks to Web Development"),description:"My name is Dominic Arrojado. I write tech blogs and create videos to share my knowledge and learnings from my web development experiences."}),(0,n.jsx)(k,{}),(0,n.jsx)(C,{}),(0,n.jsx)(_,{}),(0,n.jsx)(P,{latestPosts:t}),(0,n.jsx)(D,{})]})}}},function(e){e.O(0,[888,774,179],function(){return e(e.s=89208)}),_N_E=e.O()}]);