/* uplog SW — index.html をキャッシュしてオフライン起動。CACHE名はビルドごとに自動更新 */
const CACHE="uplog-202607040616";
const ASSETS=["./","./index.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(ASSETS.map(u=>c.add(u)))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>{try{c.put(req,copy);}catch(_){}});return res;}).catch(()=>req.mode==="navigate"?caches.match("./index.html"):undefined)));});
