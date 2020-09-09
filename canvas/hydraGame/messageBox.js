window.pcs = window.pcs || {};
window.pcs.messageBox = (function () {
    'use strict';

    //variables for sizing and positioning
    const width = 300;
    const height = 150;


    //function to show a message box
    function show(msg) {
        //message box with a span element for the message
        const messageBox = document.createElement('div');
        const span = document.createElement('span');
        messageBox.appendChild(span);
        span.innerHTML = msg;


        document.body.appendChild(messageBox);


        //style for the message box
        messageBox.style.backgroundColor = '#29c715';
        messageBox.style.width = `${width}px`;
        messageBox.style.height = `${height}px`;
        messageBox.style.padding = '1em';
        messageBox.style.paddingBottom = '38px';
        messageBox.style.marginLeft = `-${width/2}px`;
        messageBox.style.marginTop = `-${height/2}px`;
        messageBox.style.boxSizing = 'border-box';
        messageBox.style.position = 'absolute';
        messageBox.style.top = '50%';
        messageBox.style.left = '50%';
        messageBox.style.border = '1px solid black';

        //style for the span element
        span.style.overflow = 'auto';
        span.style.height = "100%";
        span.style.display = 'inline-block';

        setTimeout(() =>{
            messageBox.remove();
        }, 2000);
    }

    return {
        show: show
    };
}());