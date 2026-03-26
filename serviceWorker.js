const CACHE_NAME = 'techify-v1';

const urlsToCache = [
    '/', 
    '/shop.html', 
    '/index.html',
    '/aboutus.html',
    '/contact.html',
    '/CSS/style.css',
    '/CSS/shop.css',
    '/JS/shop.js',
 
    'Icons/logo.png',
    'Icons/icon-192.png', 
    'Icons/icon-512.png',
   
    '/api/products' 
];


self.addEventListener('install', (event) => {
 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching App Shell');

                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {

                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {

    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {

                    if (response) {
                        return response;
                    }


                    return fetch(event.request).catch(() => {


                        console.log("Network request failed and not in cache. Serving a fallback.");
                        return new Response("<h1>You are offline.</h1><p>Please connect to the internet to continue browsing.</p>", {
                            headers: { 'Content-Type': 'text/html' }
                        });
                    });
                })
        );
    }
});