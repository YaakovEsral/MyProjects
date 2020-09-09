(function () {
    'use strict';

    //action listener for scroll button
    const scroll = document.getElementById('scroll');
    let intId;
    //boolean used in speed input listener
    let scrolling = false;
    //y axis where we will scroll to
    let y = 0;
    //saving the input field into variable const speed
    const speed = document.getElementById('speed');

    //listener for when user clicks scroll button
    scroll.addEventListener('click', () => {
        if (!scrolling) { //don't allow multiple clicks

        //call scrolling method which takes care of everything
        commenceScrolling();

        scrolling = true; //update status so we don't process any more clicks for this button
            
        //v2
            //convert the input value from string to number
            // let px = parseInt(speed.value);
            // start(px)();
            // intId = setInterval(start(px), 1000);

            //v1
            //original method using the direct input, which is in string format.
            //since we are now using the += and scrollTo method, this would result
            //in a concatenated string, which is a bug.
            //Therefore, we have switched to v2 where we convert the input to a number
            // start(speed.value)();
            // intId = setInterval(start(speed.value), 1000);

            // window.scrollBy(0, 1);
            // console.log('scrolling 1 px');
            // start(1)();
            // intId = setInterval(start(1+10), 1000);

            
            console.log(speed.value, typeof speed.value);
        }
    });



    //start function takes a number of pixels per second
    //we need to use a closure so the function can take a parameter
    //when it is called by setInterval
    function incrementScroll(pxps) {  //originally called 'start()'
        return function () {
            //v2
            //now we are scrolling TO a specific spot on the screen, so
            //we don't have the same issue
            y += pxps;
            window.scrollTo(0, y);

            //v1
            //original method where we scroll by a given number of pixels
            //this causes issues when you scroll by 1px - the computer
            //seems to round the 1 down to 0, and does nothing
            // window.scrollBy(0, pxps);

            console.log('scroll y', window.scrollY);
        };
    }

    /*
    this function commences the auto-scrolling, using the
    current input value as the speed. It is called in 2 cases:
    1.When user first clicks the scroll button
    2.When user updates the speed after the scroll button has been
    pressed (scrolling = true)
    */
    function commenceScrolling() { //originally called 'scrollWithInterval()'
        //parse the input into a number, clear interval (for #2 above),
        //and commence with new interval        
        let px = parseInt(speed.value)/100;
        console.log(px);
        clearInterval(intId);
        incrementScroll(px)();
        intId = setInterval(incrementScroll(px), 10);

        // clearInterval(intId);
        // start(pxps)();
        // intId = setInterval(start(pxps), 1000);

    }

    //listener to change scroll speed with user input
    speed.addEventListener('input', () => {
        if (scrolling) {
            commenceScrolling();
        }
        console.log('updated speed');
    });

    //action listener for stop button
    const stop = document.getElementById('stop');
    stop.addEventListener('click', () => {
        clearInterval(intId);
        scrolling = false;
    });

    const top = document.getElementById('top');
    top.addEventListener('click', () =>{
        clearInterval(intId);
        scrolling = false;
        window.scrollTo(0, 0);
        y = 0;
    });
}());