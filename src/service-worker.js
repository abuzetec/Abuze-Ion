let log = console.log.bind(console);
let err = console.error.bind(console);

let version = '8';
let cacheName = 'abuze-V' + version;
let dataCacheName = 'abuze-data-V' + version;
let appShellFilesToCache = [
  './',
  './index.html',
  './build/main.js',
  './build/main.css',
  './build/polyfills.js',
  './manifest.json',
  './assets/img/default-user-pic-.png',
  './assets/fonts/ionicons.woff2',
  './assets/fonts/ionicons.svg',
  './assets/fonts/ionicons.ttf',
  './assets/fonts/OCRA.otf',
  './assets/fonts/OCRA.ttf',
  './assets/fonts/roboto-regular.woff2',
  './assets/fonts/roboto-light.woff2',
  './assets/fonts/roboto-medium.woff2',
  './assets/fonts/roboto-bold.woff2',
  './assets/fonts/noto-sans-bold.ttf',
  './assets/fonts/noto-sans.scss',
  './assets/fonts/roboto-light.ttf',
  './assets/fonts/roboto-medium.woff',
  './assets/fonts/noto-sans-bold.woff',
  './assets/fonts/roboto-bold.ttf',
  './assets/fonts/roboto-light.woff',
  './assets/fonts/roboto.scss',
  './assets/fonts/ionicons.eot',
  './assets/fonts/ionicons.woff',
  './assets/fonts/noto-sans-regular.ttf',
  './assets/fonts/roboto-bold.woff',
  './assets/fonts/roboto-regular.ttf',
  './assets/fonts/ionicons.scss',
  './assets/fonts/noto-sans-regular.woff',
  './assets/fonts/roboto-medium.ttf',
  './assets/fonts/roboto-regular.woff',
  './assets/icon/favicon.ico',
  './assets/img/logo-header.png',
  './assets/img/ico-monkey-25.png',
  './build/sw-toolbox.js',
  './assets/js/offline.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
  log('Service Worker: Installed');

  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      log('Service Worker: Caching App Shell');
      return cache.addAll(appShellFilesToCache);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
  log('Service Worker: Active');

  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {

        if (key !== cacheName) {
          log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }

      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.indexOf('/login') < 0 && e.request.url.indexOf('/check-login') < 0){
    log('Service Worker: Fetch URL ', e.request.url);

    // Match requests for data and handle them separately
    e.respondWith(
      caches.match(e.request.clone()).then((response) => {
        return response || fetch(e.request.clone()).then((r2) => {
            return caches.open(dataCacheName).then((cache) => {
              console.log('Service Worker: Fetched & Cached URL ', e.request.url);
              cache.put(e.request.url, r2.clone());
              return r2.clone();
            });
          });
      })
    );
  }
});
