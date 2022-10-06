
//initialise game variables
const players = [];
let numOfPlayers = 2;
let topScore = ["", 0];
let previousPlayer;

// const gameStatus = document.querySelector('#currentScore');
const currentPlayerDiv = document.querySelector('#currentPlayer');

//Funtion to set the number of players
const createPlayers = function(num) {
    numOfPlayers = num;
    const gameButtons = document.querySelector('#gameButtons');

    //Empty array AND clear all buttons first
    while (players.length > 0) {
        players.pop();

        gameButtons.removeChild(gameButtons.lastElementChild);

    }

    //clear Top Score from previous game
    topScore = ["", 0];

    //Add players
    for (let i = 1; i <= numOfPlayers; i++){

        //add player to players array
        let newPlayer = { 
            name: `Player ${i}`,
            total: 0,
            //scores: 2, 
            limit: 21
        }
        players.push(newPlayer);

        //Player data (holds total score and other info div)
        const newPlayerData = document.createElement('div');
        newPlayerData.classList.add('playerData');

        //Player's total score
        const newPlayerTotal = document.createElement('div');
        newPlayerTotal.innerText = 0;
        newPlayerTotal.id = `player${i}Total`;
        newPlayerTotal.classList.add('playerTotal');

        //Player other info (holds name and limit)
        const newPlayerOtherInfo = document.createElement('div');
        newPlayerOtherInfo.classList.add('playerOtherInfo');

        //Player name label
        const newPlayerName = document.createElement('div');
        newPlayerName.innerText = `Player ${i}`;
        newPlayerName.id = `player${i}Btn`;
        newPlayerName.classList.add('playerName');

        //Player's game limit
        const newPlayerLimit = document.createElement('div');
        newPlayerLimit.innerText = `Playing to 21`;
        newPlayerLimit.id = `player${i}Limit`;
        newPlayerLimit.classList.add('playerLimit');

        //append name and limit elements to other info div
        newPlayerOtherInfo.appendChild(newPlayerName);
        newPlayerOtherInfo.appendChild(newPlayerLimit);

        //append total and other info to player data
        newPlayerData.appendChild(newPlayerTotal);
        newPlayerData.appendChild(newPlayerOtherInfo);

        //Div to hold buttons
        const newPlayerButtons = document.createElement('div');
        newPlayerButtons.classList.add('playerButtons');
        newPlayerButtons.id = `player${i}Buttons`;

        //Button to score 1 point
        const score1Button = document.createElement('div');
        score1Button.innerText = "+1";
        score1Button.id = `player${i}Score1Button`;
        score1Button.classList.add('score1Button');

        //Button to score 2 points
        const score2Button = document.createElement('div');
        score2Button.innerText = "+2";
        score2Button.id = `player${i}Score2Button`;
        score2Button.classList.add('score2Button');

        //Button to score 3 points
        const score3Button = document.createElement('div');
        score3Button.innerText = "+3";
        score3Button.id = `player${i}Score3Button`;
        score3Button.classList.add('score3Button');

        //append score buttons to their div
        newPlayerButtons.appendChild(score1Button);
        newPlayerButtons.appendChild(score2Button);
        newPlayerButtons.appendChild(score3Button);
          

        //Div to hold all player elements
        const newPlayerDiv = document.createElement('div');
        newPlayerDiv.id = `player${i}`;
        newPlayerDiv.classList.add('playerDiv');
        newPlayerDiv.classList.add('topScorer');
        newPlayerDiv.classList.toggle('topScorer');

        //Append player elements (data and buttons) to player div
        newPlayerDiv.appendChild(newPlayerData);
        newPlayerDiv.appendChild(newPlayerButtons);
          
        //Append player div to parent elemtent gameButtons
        gameButtons.appendChild(newPlayerDiv);

        //Add event listener for each player
        newPlayerDiv.addEventListener('click', function(e){
            addScore((i-1)%numOfPlayers);
        })

    }
    
}


//Function to increase a player's score
//the first time they score during a turn they get 2 points,
//after that it's one point per score
const addScore = function (player) { 

    //if (players[player].scores === 2){
    if ( player !== previousPlayer) {
        players[player].total += 2;
        //players[player].scores = 1;

        //set the previous player's "scores" back to 2   
        //players[(player + (numOfPlayers -1))% numOfPlayers].scores = 2;

        //change the current player label
        currentPlayerDiv.innerText = `Playing now: ${players[player].name}`;

        //Update previousPlayer
        previousPlayer = player;

    } else {
        players[player].total += 1;
    }
    
    console.log(`${players[player].name} has total of ${players[player].total}`)

    //Update the player's total
    const playerTotal = document.querySelector(`#player${player+1}Total`);
    playerTotal.innerText = players[player].total;

    //Check if game is over or if limit has changed
    if (players[player].total === players[player].limit){
        //Player has won game
        console.log(`${players[player].name} has won the match.`)
    } else if (players[player].total > players[player].limit){
        //move limit and change display
        players[player].limit +=10;
        const gameLimitDiv = document.querySelector(`#player${player+1}Limit`);
        gameLimitDiv.innerText = `Playing to ${players[player].limit}`;
    }

    //Update top score if necessary
    // console.log(`Top Score before if statement: top scorer = Player ${topScore[0]+1} with score: ${topScore[1]}`);
    if (players[player].total > topScore[1]) {
        
        if (topScore[0] !== ""){
            // console.log(`Previous top scorer: #player${topScore[0]+1}`);
            const oldTopScorer = document.querySelector(`#player${topScore[0]+1}`);
            oldTopScorer.classList.toggle('topScorer');
        }
        
        const newTopScorer = document.querySelector(`#player${player+1}`);
        newTopScorer.classList.toggle('topScorer');
        topScore = [player, players[player].total];
            
        // console.log(`New top score: Player${topScore[0]+1} with score: ${topScore[1]}`);
  
    }
}

createPlayers(numOfPlayers);

// const player1Btn = document.querySelector('#player1Btn');
// player1Btn.addEventListener('click', function(e){
//     addScore(0);
// })

// const player2Btn = document.querySelector('#player2Btn');
// player2Btn.addEventListener('click', function(e){
//     addScore(1);
// })

// const resetBtn = document.querySelector('#resetBtn');
// resetBtn.addEventListener('click', function (e){
//     window.location.reload();
// })

const numPlayersSelect = document.querySelector('#numPlayers');
numPlayersSelect.addEventListener('change', function (e) {
    
    createPlayers(e.target.value);
})



