/* uplog SW（単体HTML用）— index.html と CDN をキャッシュしてオフライン起動 */
const CACHE="uplog-v1";
const ASSETS=["./","./index.html",
 "https://unpkg.com/react@18/umd/react.production.min.js",
 "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
 "https://unpkg.com/@babel/standalone/babel.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(ASSETS.map(u=>c.add(u)))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>{try{c.put(req,copy);}catch(_){}});return res;}).catch(()=>req.mode==="navigate"?caches.match("./index.html"):undefined)));});
