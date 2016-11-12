# Development Service Worker

This development service worker allows you to serve localhost assets on production.

Especially useful in these use-cases:
  - Faster development process
  - Debugging production bugs
  - Use production data instead of mocks and stubs

## TL;DR:
[Watch the demo video](https://s3.amazonaws.com/yossi-eynav-uploads/dev-sw-demo.mp4)

## Installation

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
    
3. You must serve service-worker over TLS connection

4. Make sure that your local environment has a ssl certificate.
If you're using OSX operating system follow these instructions:
 - Double click on `/config/local-ssl/Certificates.cer`
 - Right click on the certificate in the KeyChain app, choose "Get Info".
 - Extend "Trust"
 - Set "When using this certificate" to "Always Trust"
For more instructions, please visit: https://certsimple.com/blog/localhost-ssl-fix 


5. Enable CORS on your local environment 

### Run the demo:
In my demo i'm using [http-server](https://www.npmjs.com/package/http-server) module from NPM.

Install the module, Make sure you're in the `demo` folder and run this command:
```
http-server --cors  --ssl  --cert="../config/localhost-ssl/cert.pem" --key="../config/localhost-ssl/key.pem" -p 3001
```

## Useful Links:

* https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API
* https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
