/*
Coding Steps:
-Using any of the tools you’ve worked with so far, create a game of Tic-Tac-Toe.
-Create a Tic-Tac-Toe game grid using your HTML element of choice. 
-When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
-A heading should say whether it is X’s or O’s turn and change with each move made.
-A button should be available to clear the grid and restart the game.
-When a player has won, or the board is full and the game results in a draw, 
    a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
*/

//creating variables by referencing to html elements
const tiles = Array.from(document.querySelectorAll('.tile')); //create an array from elements in the class .tile
const playerDisplay = document.querySelector('.display-player');
const restartButton = document.querySelector('#restart');
const announcer = document.querySelector('.announcer');

//other variables needed to play the game
let board = ['', '', '', '', '', '', '', '', '']; //array of 9 empty strings
let currentPlayer = 'X'; //player X starts the game everytime
let isGameActive = true; //will be set to false when the game is over

//variables that will be used to announce the winner
const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const DRAW = 'DRAW';


/*
    Reference of indexes within the grid
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

// 8 winning combinations    
const winningConditions = [ //array of arrays
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//function to check for a winner or not
function checkResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) { //loop through winningConditions[]
        const winCondition = winningConditions[i];
        /*for every sub [] (which all contain 3 numbers), 
            check if it matches the indexes below */
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        //if a, b, or c is an empty string '' (empty tile), the game continues (skip the iteration w continue keyword)
        if (a === '' || b === '' || c === '') {
            continue;
        }

        //if a, b, and c are equal then break out of the for loop to announce the winner
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    //if a player wins, announce the winner
    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
    
    //if there is no winner and the board does not have any empty strings/tiles the annouce a draw
    if (!board.includes(''))
        announce(DRAW);
    }

//function to announce winner or end game state with a bootstrap alert
const announce = (type) => { //receives end game state string called type
    switch(type){ //based on the string received it will change the inner HTML of the boostrap alert
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case DRAW:
            announcer.innerText = 'Draw';
    }
    announcer.classList.remove('hide'); //remove the hide class to show the annoucer to the user
};

//function check if tile has a value already. player can only click empty tiles. (false=tile taken. true=tile empty)
const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }

    return true;
};

//function to set a tile to X or O based on the current player
const updateBoard =  (index) => {
    board[index] = currentPlayer;
}

//function to change the player
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`); //remove classList from the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //if X=true then change player to O, if X=false change player to X
    playerDisplay.innerText = currentPlayer; //update playerDisplay to the current player
    playerDisplay.classList.add(`player${currentPlayer}`);
}

//function to play a turn in the game
const playGame = (tile, index) => {
    if(isValidAction(tile) && isGameActive) { //check if tile is empty & if game is active
        tile.innerText = currentPlayer; //X or O
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index); //update board array
        checkResult(); //check if there is a winner
        changePlayer(); //change players
    }
}

//function to restart the game
const restartBoard = () => {
    board = ['', '', '', '', '', '', '', '', '']; //set the board[] to 9 empty strings
    isGameActive = true;
    announcer.classList.add('hide'); //hide announcer

    if (currentPlayer === 'O') { //player X starts the game everytime, so if the current play is O then call changePlayer function
        changePlayer();
    }

    tiles.forEach(tile => { //empty tiles
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

/*addEventListener to every tile, so playGame function will be called with a reference to the tile and its index
    when the user clicks on a tile*/
tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => playGame(tile, index));
});

//restart game when restart button is clicked
restartButton.addEventListener('click', restartBoard);

