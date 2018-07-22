var staticCache = 'v3';
var filesToCache = [
    './',
    './index.html',
    './restaurant.html',
    './data/restaurants.json',
    './dist/style.min.css',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    './dist/img/1.jpg',
    './dist/img/2.jpg',
    './dist/img/3.jpg',
    './dist/img/4.jpg',
    './dist/img/5.jpg',
    './dist/img/6.jpg',
    './dist/img/7.jpg',
    './dist/img/8.jpg',
    './dist/img/9.jpg',
    './dist/img/10.jpg'
];

// installing event
self.addEventListener('install', e => {
    console.log('[ServiceWorker] Installed')
    // promise: install event needs to wait until this promise is resolved
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            console.log('[ServiceWorker] Caching cacheFiles:', cache);
            return cache.addAll(filesToCache);
        })
    )
})

// activating event
self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activated')
    //promise: loop through anything that's in the cache and remove the files, that do not fit to this.cache
    e.waitUntil(
        caches.keys().then(staticCaches => {
            return Promise.all(staticCaches.map(thisStaticCache => {
                if (thisStaticCache !== staticCache) {
                    console.log('[ServiceWorker] Removing Cached Files from', thisStaticCache);
                    return caches.delete(thisStaticCache);
                }
            }))
        })
    )
})

// fetching event
self.addEventListener('fetch', e => {
    console.log('[ServiceWorker] Fetching', e.request)
    e.respondWith(
        // if app is offline
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})