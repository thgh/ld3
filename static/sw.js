self.addEventListener('fetch', function(event){

    if (!event.request.url.includes('plugin')) {
      return
    }

    console.log('Caught request for ' + event.request.url);
    event.respondWith(
        fetch(event.request).then(function(response){
            var init = {
                status:     response.status,
                statusText: response.statusText,
                headers:    {'X-Foo': 'My Custom Header'}
            };

            response.headers.forEach(function(v,k){
                init.headers[k] = v;
            });

            return response.text().then(function(body){
                return new Response(body + ";console.log('well this is weird');", init);
            });
        })
    );
});
self.addEventListener('install', function (event) {
  console.log('install');
  event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', function (event) {
  console.log('activate');
  event.waitUntil(self.clients.claim())
})
