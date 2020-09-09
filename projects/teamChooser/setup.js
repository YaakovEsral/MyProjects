(function(){
    'use strict';
    let players = []; //array for storing player object
    let playerElems = []; //array for storing player elements in array

    //defining form and action upon submission
    const form = document.getElementById('form');
    form.onsubmit = function(e){
        e.preventDefault();
        console.log(form.name.value, form.rating.value);
        generatePlayer(form.name.value, form.rating.value);
        playerElems.push(addHtml(form.name.value));
        form.reset();
        currentPlayer++;
    };

    //generate a player
    let currentPlayer = 0;
    function generatePlayer(name, rating){
        players[currentPlayer] = {
            name: name,
            rating: rating
        };
    }

    //create new player's html and send it into the box
    function addHtml(name){
        let newPlayer = document.createElement('p');
        newPlayer.innerHTML = name;
        
        newPlayer.style.border = '2px solid black';
        newPlayer.style.borderRadius = '10px';
        newPlayer.style.display = 'inline-block';
        newPlayer.style.fontSize = '2em';
        newPlayer.style.padding = '0 .5em';
        newPlayer.style.backgroundColor = 'cadetblue';
        newPlayer.style.height = "fit-content";

        document.getElementById('players').appendChild(newPlayer);
        return newPlayer;
    }

    //preparing to add actionListener to 'Create Teams' button
    const teamsBtn = document.getElementById('createTeams');
    //arrays for storing each team's players
    let team1 = [];
    let team2 = [];
    //boolean to let computer know which team to assign the given player
    let teamOne = true;


    //first, sort the current players in descending order of their rating
    teamsBtn.addEventListener('click', () =>{
        players.sort(function(a,b){
            return b.rating - a.rating;
        });

        players.forEach(assignToTeam);
        console.log('team1', team1, 'team2', team2);
        removeOrig();
        appendTeamsToHtml();
    });

    //distribute each player, first to team one, then to team two
    //(this algorithm needs work, as it will not come out fair every time)
    function assignToTeam(player){
        if (teamOne){
            team1.push(player);
        } 
        else {
            team2.push(player);
        }
        teamOne = !teamOne;
    }

    //ensure that the #team divs in original html aren't showing
    const teamDiv = document.getElementsByClassName('team');
    for (let i = 0; i < teamDiv.length; i++) {
        teamDiv[i].style.display = 'none';
    }

    function removeOrig(){ //remove original player html's from the div
        for (let i = 0; i < players.length; i++) {
            playerElems[i].remove();
        }
    }

    function appendTeamsToHtml(){
        for (let i = 0; i < teamDiv.length; i++) {
            teamDiv[i].style.display = 'block';
        }
        for (let i = 0; i < team1.length; i++) {
            let newPlayer = document.createElement('li');
            newPlayer.innerHTML = team1[i].name;
            document.getElementById('team1').appendChild(newPlayer);
        }

        for (let i = 0; i < team2.length; i++) {
            let newPlayer = document.createElement('li');
            newPlayer.innerHTML = team2[i].name;
            document.getElementById('team2').appendChild(newPlayer);
        }
    }
})();