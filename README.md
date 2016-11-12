# Development Service Worker

This development service worker allows you to serve localhost assets on production.

Especially useful in these use-cases:
  - Faster development process
  - Debugging production bugs
  - Use production data instead of mocks and stubs


### Installation

1. You'll need to register the service worker from one of your assets.
    ```
    navigator.serviceWorker.register('/service-workers/dev-sw.js', {scope: '/'})
        .then(function(reg) {
            // registration worked
            console.warn('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function(error) {
        // registration failed
        console.warn('Registration failed with ' + error);
    });
    ```
    
2. Make sure you're sending this header field when serving the service-worker:
    ```
      headers['Service-Worker-Allowed'] = '/'
    ```
    
3. If your production environment is using ssl certificate, make sure that your local environment has ssl certificate as well.
for more instructions, please visit: https://certsimple.com/blog/localhost-ssl-fix

Useful Links:

* https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API
* https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
