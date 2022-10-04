
//initialise game variables
const players = [
    {   
        name: "Player 1",
        total: 0,
        scores: 2
    }, 
    {
        name: "Player 2",
        total: 0,
        scores: 2
    }]

let currentPlayer;
let currentGameLimit = 21;

const gameStatus = document.querySelector('#currentScore');
const currentPlayerDiv = document.querySelector('#currentPlayer');


//Function to increase a player's score
//the first time they score during a turn they get 2 points,
//after that it's one point per score
const addScore = function (player) {
    console.log(`add score to player: ${player}`)

    if (players[player].scores === 2){
        players[player].total += 2;
        players[player].scores = 1;

        //set the opposing player's "scores" back to 2
        players[(player + 1)%2].scores = 2;

        //change the current player
        currentPlayer = players[player].name;
        currentPlayerDiv.innerText = `Playing now: ${players[player].name}`
    } else {
        players[player].total += 1;
    }
    //Update the status
    gameStatus.innerText = `${players[0].total} to ${players[1].total}`;

    //Check if game is over or if limit has changed
    if (players[player].total === currentGameLimit){
        //Player has won game
        console.log(`${players[player].name} has won the match.`)
    } else if (players[player].total > currentGameLimit){
        //move limit and change display
        currentGameLimit +=10;
        const gameLimitDiv = document.querySelector('#playingTo');
        gameLimitDiv.innerText = `Playing to ${currentGameLimit}`;
    }
}

const player1Btn = document.querySelector('#player1Btn');
player1Btn.addEventListener('click', function(e){
    addScore(0);
})

const player2Btn = document.querySelector('#player2Btn');
player2Btn.addEventListener('click', function(e){
    addScore(1);
})

const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', function (e){
    window.location.reload();
})



