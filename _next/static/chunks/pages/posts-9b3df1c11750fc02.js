(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[679],{25144:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts",function(){return c(80951)}])},81168:function(a,b,c){"use strict";var d=c(85893),e=c(67294),f=c(94184),g=c.n(f),h=c(50665);function i(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var j=(0,e.forwardRef)(function(a,b){var c=a.children,e=a.withIcon,f=function(a,b){if(null==a)return{};var c,d,e=function(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],b.indexOf(c)>=0||(e[c]=a[c]);return e}(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(b.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}(a,["children","withIcon"]);return(0,d.jsxs)("button",function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){i(a,b,c[b])})}return a}({ref:b,className:g()("group inline-block items-center font-normal select-none","transition-colors duration-300 hover:text-black group-hover:text-black","dark:hover:text-white dark:group-hover:text-white")},f,{children:[c,(void 0===e||e)&&(0,d.jsx)(h.Z,{className:g()("inline-block w-2 h-2 ml-2 text-black opacity-30","dark:text-white","transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100","sm:w-2.5 sm:h-2.5 sm:ml-2.5","md:w-3 md:h-3 md:ml-3","xl:w-3.5 xl:h-3.5")})]}))});j.displayName="ButtonArrowLink",b.Z=j},74189:function(a,b,c){"use strict";c.d(b,{Z:function(){return e}});var d=c(85893),e=function(a){var b,c,e,f=a.dateString,g=a.className;return(0,d.jsx)("time",{dateTime:f,className:g,children:(b=f,e=(c=new Date(b)).getMonth(),"".concat(["January","February","March","April","May","June","July","August","September","October","November","December",][e]," ").concat(c.getDate(),", ").concat(c.getFullYear()))})}},92982:function(a,b,c){"use strict";c.d(b,{Z:function(){return m}});var d=c(85893),e=c(67294),f=c(94184),g=c.n(f),h=c(45989),i=c(61292),j=c(56856),k=c(8035);function l(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function m(a){var b=a.title,c=a.description,f=a.isMinHeightFull,k=(0,j.s4)(),m=(0,e.useRef)(null);return(0,d.jsx)(h.Z,{children:(0,d.jsx)(i.ZP,{nodeRef:m,timeout:500,mountOnEnter:!0,unmountOnExit:!0,children:function(a){var e;return(0,d.jsxs)("section",{ref:m,className:g()("relative flex flex-col justify-center bg-gray-750 py-28 px-6 text-center overflow-hidden","transform transition-transform ease-in-out duration-500","sm:px-20","lg:px-32",(l(e={},f?"min-h-full":"min-h-96",!0),l(e,k&&"entered"===a?"translate-y-0":"-translate-y-full",!0),e)),"data-testid":"container",children:[(0,d.jsx)(n,{}),(0,d.jsx)(o,{}),(0,d.jsx)(p,{title:b,state:a}),(0,d.jsx)(q,{description:c,state:a})]})}},b)})}function n(){var a=(0,e.useRef)(null),b=(0,e.useState)(!1),c=b[0],f=b[1],h=(0,j.Tn)();return(0,e.useEffect)(function(){f(!0)},[]),(0,d.jsx)(i.ZP,{in:c&&!h,nodeRef:a,timeout:1000,mountOnEnter:!0,unmountOnExit:!0,children:function(b){return(0,d.jsx)(k.Z,{ref:a,className:g()("absolute inset-0 m-auto w-8 h-8 border-2","transition-opacity duration-1000 delay-1250","sm:w-10 sm:h-10 sm:border-4","md:w-12 md:h-12","xl:w-14 xl:h-14",l({},"entered"===b?"opacity-100":"opacity-0",!0)),color:"#ffffff"})}})}function o(){var a=(0,j.Tn)();return(0,d.jsx)("div",{className:g()("absolute top-0 left-0 w-full h-full bg-repeat bg-center","animate-slide transition-opacity duration-1250 delay-500",l({},"opacity-0",!a)),style:{backgroundImage:"url('/images/bg/pattern.png')"},"data-testid":"background"})}function p(a){var b=a.title,c=a.state,f=(0,e.useRef)(null),h=(0,j.Tn)(),i=(0,j.ur)(f);return(0,d.jsx)("div",{ref:f,className:"overflow-hidden py-2",style:{opacity:i},children:(0,d.jsx)("h1",{className:g()("text-3xl font-bold text-white leading-tight","transform transition duration-1000 delay-500","sm:text-4xl","md:text-5xl","lg:text-6xl","xl:text-7xl",l({},h&&"entered"===c?"opacity-100 translate-y-0":"opacity-0 translate-y-full",!0)),children:b})})}function q(a){var b=a.description,c=a.state,f=(0,e.useRef)(null),h=(0,j.Tn)(),i=(0,j.ur)(f);return(0,d.jsx)("div",{ref:f,className:"overflow-hidden",style:{opacity:i},children:(0,d.jsx)("p",{className:g()("font-light text-white","transform transition duration-1000 delay-1000","xl:text-2xl",l({},h&&"entered"===c?"opacity-100 translate-y-0":"opacity-0 translate-y-full",!0)),children:b})})}},90855:function(a,b,c){"use strict";var d=c(85893),e=c(41664),f=c(94184),g=c.n(f),h=c(74189),i=c(81168),j=c(56204);b.Z=function(a){var b=a.post,c=a.headingLevel,f=a.className,k=a.style,l=a.anchorClassName,m=g()("mt-2 font-bold text-lg","sm:text-xl","md:text-2xl","xl:text-3xl");return(0,d.jsx)("li",{className:g()("mt-4 first:mt-0 select-none","sm:mt-6","md:mt-8","xl:mt-10",f),style:k,children:(0,d.jsx)(e.default,{href:"".concat(j.AW.POSTS,"/").concat(b.id),passHref:!0,children:(0,d.jsx)("a",{className:g()("group flex w-full shadow-md py-6 px-4","transition-shadow duration-300 hover:shadow-xl","sm:px-6","md:p-8","xl:p-10",l),children:(0,d.jsxs)("article",{className:"flex flex-col w-full",children:[(0,d.jsxs)("div",{className:"flex justify-between items-center",children:[(0,d.jsx)(h.Z,{dateString:b.date,className:g()("text-xs","md:text-sm")}),(0,d.jsx)("div",{className:g()("rounded py-0.5 px-1.5 bg-gray-200 text-2xs capitalize","dark:bg-gray-600","md:py-1 md:px-2 md:text-xs","xl:text-sm"),children:b.category})]}),2===c?(0,d.jsx)("h2",{className:m,children:b.title}):(0,d.jsx)("h3",{className:m,children:b.title}),(0,d.jsx)("p",{className:"mt-4",children:b.excerpt}),(0,d.jsx)("div",{className:"mt-6",children:(0,d.jsx)(i.Z,{children:"Read More"})})]})})})})}},51127:function(a,b,c){"use strict";var d=c(85893),e=c(67294),f=c(94184),g=c.n(f);function h(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var i=(0,e.forwardRef)(function(a,b){var c=a.className,e=a.children,f=function(a,b){if(null==a)return{};var c,d,e=function(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],b.indexOf(c)>=0||(e[c]=a[c]);return e}(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(b.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}(a,["className","children"]);return(0,d.jsx)("section",function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){h(a,b,c[b])})}return a}({ref:b,className:g()("pt-16 pb-20 px-6","sm:pt-20 sm:pb-24 sm:px-8","md:pt-24 md:pb-28 lg:px-10","xl:pt-28 xl:pb-32",c)},f,{children:e}))});i.displayName="Section",b.Z=i},76399:function(a,b,c){"use strict";c.d(b,{Z:function(){return h}});var d=c(85893),e=c(9008),f=c(56204),g=c(88927);function h(a){var b=a.path,c=a.title,h=a.description,i=a.imageUrl,j=void 0===i?g.Ov:i,k=a.imageWidth,l=void 0===k?g.DN:k,m=a.imageHeight,n=void 0===m?g.oM:m,o=b===f.AW.HOME,p="".concat(g.cG).concat(b).concat(o?"":"/"),q=o?c:"".concat(c," - ").concat(g.fB),r="".concat(g.cG).concat(j);return(0,d.jsxs)(e.default,{children:[(0,d.jsx)("meta",{charSet:"utf-8"}),(0,d.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,d.jsx)("meta",{name:"theme-color",content:"#000000"}),(0,d.jsx)("meta",{name:"description",content:h}),(0,d.jsx)("meta",{name:"author",content:g.Z9}),(0,d.jsx)("link",{rel:"canonical",href:p}),(0,d.jsx)("link",{rel:"icon",href:"".concat(g.cG,"/favicon.ico")}),(0,d.jsx)("link",{rel:"manifest",href:"".concat(g.cG,"/manifest.json")}),(0,d.jsx)("meta",{property:"og:locale",content:"en_US"}),(0,d.jsx)("meta",{property:"og:type",content:"website"}),(0,d.jsx)("meta",{property:"og:title",content:q}),(0,d.jsx)("meta",{property:"og:description",content:h}),(0,d.jsx)("meta",{property:"og:url",content:p}),(0,d.jsx)("meta",{property:"og:site_name",content:g.px}),(0,d.jsx)("meta",{property:"og:image",content:r}),(0,d.jsx)("meta",{property:"og:image:secure_url",content:r}),(0,d.jsx)("meta",{property:"og:image:width",content:"".concat(l)}),(0,d.jsx)("meta",{property:"og:image:height",content:"".concat(n)}),(0,d.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,d.jsx)("meta",{name:"twitter:description",content:h}),(0,d.jsx)("meta",{name:"twitter:title",content:q}),(0,d.jsx)("meta",{name:"twitter:image",content:r}),(0,d.jsx)("title",{children:q})]})}},8035:function(a,b,c){"use strict";var d=c(85893),e=c(94184),f=c.n(e),g=c(67294),h=(0,g.forwardRef)(function(a,b){var c=a.className,e=a.color;return(0,d.jsx)("div",{ref:b,className:f()("border-transparent rounded-full","animate-spin",c),style:{borderRightColor:e},"data-testid":"spinner"})});h.displayName="Spinner",b.Z=h},50665:function(a,b,c){"use strict";var d=c(85893);function e(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}c(67294),b.Z=function(a){return(0,d.jsx)("svg",function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){e(a,b,c[b])})}return a}({viewBox:"0 0 320 512",role:"img"},a,{children:(0,d.jsx)("path",{fill:"currentColor",d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"})}))}},80951:function(a,b,c){"use strict";c.r(b),c.d(b,{"__N_SSG":function(){return q},"default":function(){return r}});var d=c(85893),e=c(92982),f=c(67294),g=c(94184),h=c.n(g),i=c(56856),j=c(51127),k=c(90855),l=c(81168),m=c(88927),n=function(a){var b=a.posts,c=(0,i.Tn)(),e=(0,f.useState)(!1),g=e[0],n=e[1],o=c&&!g&&b.length>m.XB;return(0,d.jsxs)(j.Z,{id:"posts",children:[(0,d.jsx)("ul",{className:"relative flex flex-col max-w-screen-3xl mx-auto","data-testid":"posts-list",children:b.map(function(a,b){var e=b>=m.XB,f=g||!e;return(0,d.jsx)(k.Z,{post:a,headingLevel:2,className:h()("transform transition-transform-opacity duration-700",{"opacity-0 translate-y-10":!(c&&f),"h-0 pointer-events-none":!f}),style:{transitionDelay:e?"".concat((b-m.XB)*150,"ms"):"".concat(150*b+1500,"ms"),margin:f?void 0:0},anchorClassName:"bg-gray-100 dark:bg-gray-750"},b)})}),o&&(0,d.jsx)("div",{className:h()("mt-12 text-center","md:mt-16","lg:mt-18","xl:mt-20"),children:(0,d.jsx)(l.Z,{withIcon:!1,onClick:function(){return n(!0)},children:"Show All Posts"})})]})},o=c(76399),p=c(56204),q=!0;function r(a){var b=a.posts,c="Blog",f="A place to share my knowledge and learnings from my web development experiences";return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.Z,{path:p.AW.POSTS,title:c,description:f}),(0,d.jsx)(e.Z,{title:c,description:f}),(0,d.jsx)(n,{posts:b})]})}}},function(a){a.O(0,[774,888,179],function(){return a(a.s=25144)}),_N_E=a.O()}])