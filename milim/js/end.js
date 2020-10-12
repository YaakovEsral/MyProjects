(function (){
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }

    get('finalScore').innerText = localStorage.getItem('mostRecentScore');
}());