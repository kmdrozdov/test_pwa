// TODO: проверить, можно ли вытащить в CDN

(function() {
    /* Classes for custom pwa notification. */
    const container = document.querySelector('.pl763847__wrap');
    const closeButton = document.querySelector('.pl763847__closelink');
    const installButton = document.querySelector('.pl763847__btn');

    /* Getting GET parameters of the preland url */
    const { searchParams } = new URL(window.location.href);
    const s2s = searchParams.get('s2s');
    const url1 = searchParams.get('url1');
    const url2 = searchParams.get('url2');

    /* Other settings. */
    const pixel_domain = 'dividedscientific.com';



    const redirectURL = url1 || eddOptionsOrValue('redirect_url', 'https://www.highperformancecpmgate.com/s7qfdt3g?key=d9f2af4fb7f3e818573cfc95453509eb');
    const closeURL = url2 || eddOptionsOrValue('close_url', '');

    function eddOptionsOrValue(paramName, defaultValue) {
        if (typeof eddOptions !== 'object') {
            return defaultValue;
        }
        if (paramName in eddOptions) {
            return eddOptions[paramName];
        }
        return defaultValue;
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./pwa_dir/sw.js')
            .catch(() => {});

        if (s2s !== null) {
            navigator.serviceWorker.ready.then(registration => {
                registration.active.postMessage({ s2s });
            });
        }

        navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({ url1: redirectURL });
        });
    }

    /* We hide the custom pwa notification. */
    container.style.display = 'none';

    /* Setting up the close button. */
    if (closeButton !== null) {
        closeButton.onclick = function(event) {
            event.preventDefault();

            if (closeURL !== '') {
                window.location.href = closeURL + '&psid=' + window.location.hostname;
            } else {
                container.style.display = 'none';
            }
        };
    }

    /* Setting up the install button. */
    let deferredPrompt;
    installButton.addEventListener('click', function() {
        /* We hide the  custom pwa notification. */
        container.style.display = 'none';
        /* We show the native  custom pwa notification. */
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
               
                new Image().src = '//' + pixel_domain + '/pixel/pwa?a=1&h=' + window.location.hostname;
            }
            deferredPrompt = null;
        });
    });

    /* Subscribe to the opportunity to show the custom pwa notification. */
    window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        deferredPrompt = e;
        /* Open the custom pwa notification */
        container.style.display = "inline-block";
       
        new Image().src = '//' + pixel_domain + '/pixel/pwa?a=0&h=' + window.location.hostname;
    });
})();