/*bug fixing: 
1. track once the page has stopped scrolling, i.e. it has reached the bottom, then call stopScrolling()
(this is what documentHeight was for, though it didn't work so well the first time)
2. need a feature to detect when the user has scrolled up, upon which the scrollY should change
to that value
Alternatively, we can track any screen scrolling as an event and save the screen position
into a variable instead of scrollY
*/

(function () {
    'use strict';

    const scroll = $('#scroll');
    const stop = $('#stop');
    const speed = $('#speed');
    const tooltip = $('#tooltip');
    const topBtn = $('#topBtn');

    const interval = 10;
    const divider = 100;

    let scrolling = false;
    let intId;
    let scrollY = 0;

    let documentHeight;

    $('document').ready(getDocumentHeight);

    function getDocumentHeight() {
        const body = document.body,
            html = document.documentElement;

        documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,
            html.scrollHeight, html.offsetHeight);
            console.log(documentHeight);
    }

    //scrollTo is preferred over scrollBy, because we can scroll by much smaller increments
    //this way
    function commenceScrolling() {
        scrollY += parseInt(speed.val()) / divider;
        window.scrollTo({
            top: scrollY,
            left: 0,
            behavior: 'smooth'
        });

        scrolling = true;
    }

    function stopScrolling() {
        clearInterval(intId);
        scrolling = false;
    }

    $(scroll).click(() => {
        commenceScrolling();
        intId = setInterval(commenceScrolling, interval);
    });

    $(stop).click(() => {
        stopScrolling();
    });

    $(speed).on('input', () => {
        clearInterval(intId);

        if (scrolling) {
            commenceScrolling();
            intId = setInterval(commenceScrolling, interval);
        }

        $(tooltip).text(speed.val());
    });

    $(topBtn).click(() => {
        stopScrolling();
        window.scrollTo(0, 0);
        scrollY = 0; // to ultimately be removed once we add event listener to track scroll position
    });

    //the following code is copied from https://developers.google.com/web/updates/2019/12/nic79#wake-lock
    //the purpose is to keep the screen awake

    // The wake lock sentinel.
    let wakeLock = null;

    // Function that attempts to request a wake lock.
    const requestWakeLock = async () => {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock was released');
            });
            console.log('Wake Lock is active');
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    };

    requestWakeLock();
}());