window.pcs = window.pcs || {};
window.pcs.messageBox = (function () {
    'use strict';

    //variables for sizing and positioning
    const width = 300;
    const height = 76;


    //function to show a message box
    function show(msg) {
        //message box with a span element for the message
        const messageBox = document.createElement('div');
        messageBox.id = 'messageBox';
        const span = document.createElement('span');
        messageBox.appendChild(span);
        span.innerHTML = msg;


        document.body.appendChild(messageBox);

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'messageBox.css');
        document.head.appendChild(link);

        //style for the message box - needs to be done here because it uses variables
        messageBox.style.width = `${width}px`;
        messageBox.style.marginLeft = `-${width / 2}px`;
        messageBox.style.marginTop = `-${height / 2}px`;
        
        setTimeout(() =>{
            messageBox.remove();
        }, 2000);
    }

    return {
        show: show
    };
}());