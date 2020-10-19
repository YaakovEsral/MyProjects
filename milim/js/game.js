(function () {
    'use strict';

    let totalQuestions;
    const numChoices = 4;
    let pointValue;
    let studyWords = [];

    let questionNumber = 0;
    let score = 0;

    let wordsArray = [];
    let choicesArray = [];

    const game = get('game');
    const scoreDisplay = get('score');
    const progressBarFull = get('progress-bar-full');
    const questionCounter = get('questionCounter');
    const question = get('question');
    const choicesContainer = get('choices-container');

    function get(id) {
        return document.getElementById(id);
    }

    scoreDisplay.innerText = score;


    fetch(`${localStorage.getItem('selectedGroup') || ''}`)
        .then((r) => {
            if (!r.ok) {
                throw new Error(`${r.status} ${r.statusText}`);
            }
            return r.json();
        })
        .then((milim) => {
            wordsArray = [...milim];
            choicesArray = [...milim];
            getWord();
        })
        .catch((err) => {
            console.error(err);
        });

    function getWord() {
        if (!wordsArray.length || questionNumber >= totalQuestions) {
            // if (score < 100) {
            //     score = Math.ceil(score);
            // } else if (score > 100) {
            //     score = 100;
            // }
            localStorage.setItem('mostRecentScore', score);
            localStorage.setItem('studyWords', JSON.stringify(studyWords));
            return window.location.assign('end.html');
        }

        totalQuestions = choicesArray.length;

        //the points should always be out of 100. The actual score is rounded to the nearest tenth later
        pointValue = (100 / totalQuestions);

        questionNumber++;
        // fixing width due to Chrome bug - remove '+ 2' and marginLeft once necessary
        progressBarFull.style.width = `${(questionNumber / totalQuestions) * 100 + 2}%`;
        progressBarFull.style.marginLeft = '-1px';
        questionCounter.innerText = `Question ${questionNumber} / ${totalQuestions}`;        

        //clear the question and choices fields
        question.innerText = "";
        choicesContainer.innerHTML = "";

        //get a random word
        const index = Math.floor(Math.random() * wordsArray.length);
        question.innerText = wordsArray[index].word;

        //get choices and append them to HTML
        const choices = getChoices(index);

        for (let i = 0; i < numChoices; i++) {
            choicesContainer.innerHTML +=
                (`<div class="choice-container" data-correct="${choices[i].correct}">
                <p class="choice-prefix">${i + 1}</p>
                <p class="choice-text">${choices[i].translation}</p>
                </div>`);
        }

        game.classList.remove('hidden');


        //add event listeners to each choice
        const choiceElems = Array.from(document.getElementsByClassName('choice-container'));
        let acceptingAnswers = true;
        choiceElems.forEach(elem => {
            elem.addEventListener('click', () => {
                if (!acceptingAnswers) {
                    return;
                }

                elem.classList.add(elem.dataset.correct === 'true' ? 'correct' : 'incorrect');
                if (elem.classList.contains('correct')) {
                    score += pointValue;
                    score = Math.ceil(score * 10) / 10;
                    if(score > 100){
                        score = 100;
                    }
                    scoreDisplay.innerText = score;
                } else {
                    studyWords.push(wordsArray[index]);
                }

                //remove the current word from the wordsArray
                wordsArray.splice(index, 1);

                acceptingAnswers = false;

                setTimeout(getWord, 1000);
            });
        });

    }

    /*
    At the end of this function, we should have an array 'selectedChoices' containing numChoices 
    amount of choices. Each choice is an object with a String translation and a boolean correct.

    First, copy the array of milim. Create a new array that will contain the selection of choices.
    Loop for duration of numChoices - each time, select a random index from the milimCopy array.
    Add an object to the selectedChoices array - object will have a String translation and a boolean
    status of whether it's the correct choice. By default, all choices will be false(incorrect).
    At the end of each loop, remove the entry that was just used from the milimCopy array, so we
    don't get any duplicates.

    Next, determine whether the correct answer is in the array of selected choices. If it is, set its
    boolean status to correct(true). If it's not, add it to a random index in the selected choices array 
    and set its status to correct(true). (In this case, we are overwriting one of the indexes.)
    */
    function getChoices(corrAnswerIndex) {
        let choicesArrayCopy = [...choicesArray];
        let selectedChoices = [];

        //get numChoices amount of random choices
        for (let i = 0; i < numChoices; i++) {
            const index = Math.floor(Math.random() * choicesArrayCopy.length);
            selectedChoices.push({ translation: choicesArrayCopy[index].translation, correct: false });
            choicesArrayCopy.splice(index, 1);
        }

        //check if the correct answer is one of the generated choices
        const isCorrIndex = selectedChoices.findIndex((word) => {
            return word.translation === wordsArray[corrAnswerIndex].translation;
        });

        if (isCorrIndex > -1) {
            selectedChoices[isCorrIndex].correct = true;
        } else {
            const randomSpot = Math.floor(Math.random() * numChoices);
            selectedChoices[randomSpot] = { translation: wordsArray[corrAnswerIndex].translation };
            selectedChoices[randomSpot].correct = true;
        }

        return selectedChoices;
    }

    // function printArray(array) {
    //     console.log('printing array');
    //     array.forEach(element => {
    //         console.log(element);
    //     });
    //     console.log('');
    // }

}());