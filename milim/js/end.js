(function (){
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }
    const studyWordsDiv = get('studyWords');

    get('finalScore').innerText = localStorage.getItem('mostRecentScore');

    const studyWordsArray = JSON.parse(localStorage.getItem('studyWords'));
    if(studyWordsArray.length){
        studyWordsDiv.classList.remove('hidden');
        for (let i = 0; i < studyWordsArray.length; i++) {
            const elem = `<p>${studyWordsArray[i].word} - ${studyWordsArray[i].translation}</p>`;
            studyWordsDiv.innerHTML += elem;
            console.log(elem);
        }
        
    }
}());