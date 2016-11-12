(function(){
    'use strict';

    const LOCALHOST_URL = 'https://localhost:3001/';
    const PRODUCTION_URL = 'https://s3.amazonaws.com/yossi-eynav/';

    self.addEventListener('fetch', function(event) {
        const requestURL = event.request.url;

        if (isStyleOrScriptRequest(requestURL)) {
            let localURL = serveFromLocalhost(requestURL);
            localURL = removeURLParams(localURL);
            localURL = removeCacheKey(localURL);

            console.info('Fetching: ', localURL);

            event.respondWith(
                fetch(localURL,{
                    mode: 'cors'
                })
                .catch(e => {
                    console.error('Error:' ,e);
                    return new Response("Service Unavailable", {
                        status: 500,
                        statusText: `Asset is unavailable on ${LOCALHOST_URL}`,
                        headers: new Headers({ "Content-Type": "text/plain"})
                    })
                })
            )
        }
        else if (isAssetServedFromLocalhost(requestURL)){
            let localURL = serveFromLocalhost(requestURL);
            console.info('Fetching local asset from localhost: ',localURL);
            return event.respondWith(fetch(localURL));
        }
        else{
            return fetch(event.request);
        }
    });

    /**
     * Change the request host to localhost.
     * @param url
     * @returns {string|XML|void|*}
     */
    function serveFromLocalhost(url){
        return url.replace(PRODUCTION_URL, LOCALHOST_URL);
    }

    /**
     * Remove any url params.
     * @param url
     * @returns {string|XML|void|*}
     */
    function removeURLParams(url){
         return url.replace(/\?.*/g,'');
    }

    /**
     * In case the production assets have a cached based suffix, we want to remove it.
     * e.g: 'application-A34gfl4d4g429gff.css' will be changed to 'application.css'
     * @param url
     * @returns {string|XML|void|*}
     */
    function removeCacheKey(url) {
        return url.replace(/-[a-zA-Z0-9]{20,}\.(css|js)/g,'.$1');
    }

    /**
     * Test if the assets should be served from localhost.
     * We only wants to serve assets that are located in our source code,
     * e.g: if the web page include images that being hosted in CDN - we don't want to interfere the request.
     * @param url
     * @returns {Array|{index: number, input: string}|*}
     */
    function isAssetServedFromLocalhost(url) {
        return url.match(/\/assets\/.*\.(jpg|jpeg|woff|ttf|png|svg|mp3|mp4|wav)/);
    }

    /**
     * Test if the request wants css || js file.
     * @param url
     * @returns {Array|{index: number, input: string}|*}
     */
    function isStyleOrScriptRequest(url) {
        return url.match(/\.(css|js)/)
    }

}());