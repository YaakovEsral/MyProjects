'use strict';
/*global files */

function get(id) {
    return document.getElementById(id);
}

const options = get('options');
    for (let i = 0; i < files.length; i++) {
           options.innerHTML += `<button class="btn">${files[i].name}</button>`;
    }
    const buttonElems = Array.from(document.getElementsByTagName('button'));
    buttonElems.forEach(button =>{
        button.addEventListener('click', () =>{
            const selectedGroup = files.find(file => file.name === button.innerText);
            localStorage.setItem('selectedGroup', selectedGroup.url);
            return window.location.assign('game.html');
        });
    });
