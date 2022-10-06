
//initialise game variables
const players = [];
let numOfPlayers = 2;
let topScore = ["", 0];

//Function to set the number of players and generate display
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
            limit: 21
        }
        players.push(newPlayer);

        //GENERATE UI ELEMENTS:

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
        newPlayerName.id = `player${i}Name`;
        newPlayerName.classList.add('playerName');
        newPlayerName.contentEditable = true;

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
        score1Button.classList.add('scoreButton');

        //Button to score 2 points
        const score2Button = document.createElement('div');
        score2Button.innerText = "+2";
        score2Button.id = `player${i}Score2Button`;
        score2Button.classList.add('score2Button');
        score2Button.classList.add('scoreButton');``

        //Button to score 3 points
        const score3Button = document.createElement('div');
        score3Button.innerText = "+3";
        score3Button.id = `player${i}Score3Button`;
        score3Button.classList.add('score3Button');
        score3Button.classList.add('scoreButton');

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
        newPlayerDiv.classList.add('winner');
        newPlayerDiv.classList.toggle('winner');

        //Append player elements (data and buttons) to player div
        newPlayerDiv.appendChild(newPlayerData);
        newPlayerDiv.appendChild(newPlayerButtons);
          
        //Append player div to parent element gameButtons
        gameButtons.appendChild(newPlayerDiv);

        //Add event listener for each button
        score1Button.addEventListener('click', function(e){
            addScore((i-1)%numOfPlayers, 1);
        })
        score2Button.addEventListener('click', function(e){
            addScore((i-1)%numOfPlayers, 2);
        })
        score3Button.addEventListener('click', function(e){
            addScore((i-1)%numOfPlayers, 3);
        })

    }
    
}

//Function to increase a player's score
const addScore = function (player, score) { 

    //Increase player's score
    players[player].total += score;

    //Update the player's total in UI
    const playerTotal = document.querySelector(`#player${player+1}Total`);
    playerTotal.innerText = players[player].total;

    //Check if player won or if their game limit has changed
    if (players[player].total === players[player].limit){
        
        //Player has won game: toggle winner class on
        const newWinner = document.querySelector(`#player${player+1}`);
        newWinner.classList.toggle('winner');

        //Display winner message with player's name
        const winnerDiv = document.querySelector('#gameEndMessage');
        const winnerName = document.querySelector(`#player${player+1}Name`).textContent;
        winnerDiv.innerText = `Well done ${winnerName}!!!`;

        
    } else if (players[player].total > players[player].limit){
        
        //Player has overpassed limit: move limit and change display
        players[player].limit +=10;
        const gameLimitDiv = document.querySelector(`#player${player+1}Limit`);
        gameLimitDiv.innerText = `Playing to ${players[player].limit}`;
    }

    //Update top score if necessary
    if (players[player].total > topScore[1]) {
        
        if (topScore[0] !== ""){
            //toggle OFF topScorer class for previous player to hold top score
            const oldTopScorer = document.querySelector(`#player${topScore[0]+1}`);
            oldTopScorer.classList.toggle('topScorer');
        }
        
        //toggle ON topScorer class for player holding new top score
        const newTopScorer = document.querySelector(`#player${player+1}`);
        newTopScorer.classList.toggle('topScorer');

        //Update topScore with new data
        topScore = [player, players[player].total];
  
    }
}

//Reset button to reload window
const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', function (e){
    window.location.reload();
})

//Regenerate display if user choosing a different number of players
const numPlayersSelect = document.querySelector('#numPlayers');
numPlayersSelect.addEventListener('change', function (e) {
    
    createPlayers(e.target.value);
})

createPlayers(numOfPlayers);


