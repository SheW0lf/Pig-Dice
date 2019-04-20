const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const newBtn = document.querySelector('.btn-new');
const rulesBtn = document.querySelector('.btn-rules');
const againBtn = document.querySelector('.btn-again');
const player1Score = document.querySelector('#score-0');
const player2Score = document.querySelector('#score-1');
const alert = document.querySelector('.alert');
const winnerDiv = document.querySelector('.winner');
const rules = document.querySelector('.rules');
const closeBtn = document.querySelector('.btn-close');
const winnerName = document.querySelector('.winner-name');
let playerScoreDiv, currentScoreBoxDiv, activePlayerDiv;

const Game = {
    //Game state
    finalScores: [0, 0],
    currentScore: 0,
    activePlayer: 0,

    //removes the 'active' class from the previous player, changes the active player to the next player, and adds the 'active' class to the new player
    changeActivePlayer: function(){
        this.removeClass();
        this.activePlayer = this.activePlayer ? 0 : 1;
        this.addClass();
    },

    //renders the player scores to the DOM
    getPlayersScores: function(){
        player1Score.textContent = this.finalScores[0];
        player2Score.textContent = this.finalScores[1];
    },
    //renders the active player score
    getActivePlayerScore: function(){
        playerScoreDiv = document.querySelector(`#score-${this.activePlayer}`);
        return playerScoreDiv.textContent = this.finalScores[this.activePlayer];
    },
    //renders the current score for the active player
    getCurrentScore: function(){
        currentScoreBoxDiv = document.querySelector(`#current-score-${this.activePlayer}`);
        return currentScoreBoxDiv.textContent = this.currentScore;
    },
    //updates the total score with the value from the current score, and sets the current score to 0 after the update
    updateFinalScore: function(){
        this.finalScores[this.activePlayer] += this.currentScore;
        this.currentScore = 0;
    },
    //increments current score as long as the dice value is not 1. If it is, then sets current score to 0
    updateCurrentScore: function(val){
        if(val == 0){
            this.currentScore = 0;
        }else{
            this.currentScore += val;
        }
    },
    //removes the 'actove' class from the current player
    removeClass: function(){
        activePlayerDiv = document.querySelector(`.player-${this.activePlayer}`);
        return activePlayerDiv.classList.remove('active');
    },
    //adds the 'active' class to the current player
    addClass: function(){
        activePlayerDiv = document.querySelector(`.player-${this.activePlayer}`);
        return activePlayerDiv.classList.add('active');
    },
    //resets the total scores to 0 and sets player 1 as the active player
    reset: function(){
        this.finalScores = [0, 0];
        this.activePlayer = 0;
    }
};
//initializes the game by adding the 'active' class to player 1, hides the dice and alert divs at start, and retrieves the starting players scores
const init = () => {
    Game.addClass();
    dice.style.visibility = 'hidden';
    alert.style.visibility = 'hidden';
    winnerDiv.style.visibility = 'hidden';
    rules.style.visibility = 'hidden';
    Game.getPlayersScores();
};
//maps over the array with the player scores to see if either player has >= 100 points. If so, the winner alert is triggered and the winner displayed
const checkWinner = () => {
    Game.finalScores.map(item => {
        if(item >= 100){
            alert.style.visibility = 'visible';
            winnerDiv.style.visibility = 'visible';
            return winnerName.innerHTML = document.getElementById(`name-${Game.finalScores.indexOf(item)}`).textContent;
        }
    });
};
//creates a new game by setting the current score to 0, rendering it to the DOM, removing the 'active' class from which ever player it is currently on, resets the players and final scores, and re-initializes the game
const newGame = () => {
    Game.updateCurrentScore(0);
    Game.getCurrentScore();
    Game.removeClass();
    Game.reset();
    init();
};
//generates random number from 1 to 6, renders the matching dice img to the DOM, and adds the dice values to the current score variable and renders the value to the DO
//if the dice is 1 then resets the current score to 0 and changes the active player to the next one. 
const rollDice = () => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    dice.src = `img/dice-${diceVal}.png`;
    dice.style.visibility = 'visible';
    if(diceVal == 1){
        Game.updateCurrentScore(0);
        Game.getCurrentScore();
        Game.changeActivePlayer();
    }else{
        Game.updateCurrentScore(diceVal);
    }
    Game.getCurrentScore();
};

//event listener for the roll dice button to run the rollDice() function
rollBtn.addEventListener('click', () => {
    rollDice(); 
});

//event listener for the hold button. Updates the total score with the value inside the current score, changes the active player to the next player, hides the dice div and checks the finalScore array for a winner
holdBtn.addEventListener('click', () => {
    Game.updateFinalScore();
    Game.getActivePlayerScore();
    Game.getCurrentScore();
    Game.changeActivePlayer();
    dice.style.visibility = 'hidden';
    checkWinner();
});

//event listener for new game button. Runs the newGame() function
newBtn.addEventListener('click', () => {
   newGame();
});

//event listener for play again button visible at the winner alert screen. Hides the alert and winner div and runs the newGame() function.
againBtn.addEventListener('click', () => {
    alert.style.visibility = 'hidden';
    winnerDiv.style.visibility = 'hidden';
    newGame();
});
//event listener for rules button. Shows the alert div with the game rules.
rulesBtn.addEventListener('click', () => {
    alert.style.visibility = 'visible';
    rules.style.visibility = 'visible';
});
//event listener for close button in the rules div. Closes the rules alert
closeBtn.addEventListener('click', () => {
    rules.style.visibility = 'hidden';
    alert.style.visibility = 'hidden';
});
//initializes the game.
init();
