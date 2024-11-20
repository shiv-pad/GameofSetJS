import {createDeck, isSet, dealCards, removeSet, shuffle, checkCard} from './set.js';
import { get_players, get_player_score, update_score, switchPlayer, getCurrentPlayer } from './player_creator.js';
import { startCountdownTimer, stopTimer} from './timer.js';
import { renderDealtCards, updateStatusMessage, updateCardSelectionDisplay, displayPlayerScores} from './display.js';
let deck = [];
let dealtCards = [];
let selectedCards = [];
let players = [];
let currentPlayerIndex = 0;
const turnDuration = 40;
// Select HTML elements
const numPlayersInput = document.getElementById('num-players');
const startGameButton = document.getElementById('start-game-button');
const finishGameButton = document.getElementById('finish-game-button');
const statusMessage = document.getElementById('status-message');
const timerDisplay = document.getElementById('timer');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score-display');
const confirmButton = document.getElementById('confirm-button');
// Start a new game
function startNewGame() {
    confirmButton.disabled = false;
    startGameButton.disabled = true;
    finishGameButton.disabled = false;
    const numPlayers = parseInt(numPlayersInput.value) || 1;
    // Reset game state
    deck = createDeck();
    shuffle(deck);
    dealtCards = dealCards(dealtCards,deck, 12);
    selectedCards = [];
    if(get_players(numPlayers).length > 6){
        updateStatusMessage("You can only have 1-6 players. Please Try again...", statusMessage);
        startGameButton.disabled = false;
        return;
    }
    players = get_players(numPlayers);
    currentPlayerIndex = 0;
    stopTimer();

    // Start the turn timer
    startCountdownTimer(timerDisplay, turnDuration, handleTurnEnd);
    gameBoard.innerHTML = '';
    renderDealtCards(dealtCards, gameBoard, onCardSelect);
    updateStatusMessage("Game started! Select three cards to find a set.", statusMessage);
    displayPlayerScores();
}


// Handle card selection
function onCardSelect(cardIndex) {
    if (selectedCards.includes(cardIndex)) {
        selectedCards = selectedCards.filter(index => index !== cardIndex);
    } else {
        if (selectedCards.length < 3) {
            selectedCards.push(cardIndex);
        } else {
            updateStatusMessage("You can only select up to 3 cards.", statusMessage);
            return;
        }
    }
    updateCardSelectionDisplay(selectedCards, gameBoard);
}
// Confirm selected cards
function confirmSelection() {
    if (!isValidSelection()) return;
    const [card1, card2, card3] = getSelectedCards();
    if (isSet(card1, card2, card3)) {
        if(handleCorrectSet(card1, card2, card3)){
            updateStatusMessage("No more sets available. Game over!", statusMessage);
            finishGame(); // End the game if no more sets are possible
            console.log("Game is Over, all set clear!");
        }else {
            startCountdownTimer(timerDisplay, turnDuration, handleTurnEnd);
            resetSelection();
        }
    } else {
        handleIncorrectSet();
        startCountdownTimer(timerDisplay, turnDuration, handleTurnEnd);
        resetSelection();
    }

}
function isValidSelection() {
    if (selectedCards.length !== 3) {
        updateStatusMessage("Please select exactly three cards before confirming.", statusMessage);
        return false;
    }
    return true;
}
function getSelectedCards() {
    return selectedCards.map(i => dealtCards[i]);
}
function handleCorrectSet(card1, card2, card3) {
    update_score(getCurrentPlayer().playerID, 1);
    updateStatusMessage(`Player ${getCurrentPlayer().playerID} found a set!`, statusMessage);
    displayPlayerScores();

    // Remove the correct set from `dealtCards`
    removeSet(dealtCards, card1, card2, card3);

    // Deal new cards to replace the removed ones if there are more in the deck
    if (deck.length > 3) {
        dealtCards = dealCards(dealtCards, deck,12);
    }else if(deck.length >0){
        while (deck.length > 0) {
            dealtCards.push(deck.shift());
        }
    }
    // Check if there are still sets available
    if (!checkCard(dealtCards)) {
        return true;
    }
    // Re-render the dealt cards
    renderDealtCards(dealtCards, gameBoard, onCardSelect);
}

function handleIncorrectSet() {
    if (players.length === 1) {
        // Single player mode: prompt to try again
        updateStatusMessage("Not a set. Try again.", statusMessage);
    } else {
        // Multiplayer mode: switch to next player and update the message
        const currentPlayer = getCurrentPlayer();
        switchPlayer(); // Move to the next player
        const nextPlayer = getCurrentPlayer();
        updateStatusMessage(`Player ${currentPlayer.playerID} chose the wrong set. Now shifting to Player ${nextPlayer.playerID}.`, statusMessage);
    }
}
function handleTurnEnd() {
    const currentPlayer = getCurrentPlayer();
    switchPlayer();
    const nextPlayer = getCurrentPlayer();
    updateStatusMessage(`Player ${currentPlayer.playerID} Time's up! Switching to player ${nextPlayer.playerID}.`, statusMessage);
    resetSelection(selectedCards, gameBoard);
    startCountdownTimer(timerDisplay, turnDuration, handleTurnEnd);
}
function resetSelection() {
    selectedCards = [];
    updateCardSelectionDisplay(selectedCards, gameBoard);
}
function finishGame() {
    stopTimer();
    confirmButton.disabled = true;
    startGameButton.disabled = false;
    finishGameButton.disabled = true;
    dealtCards =[];
    deck = [];
    renderDealtCards(dealtCards, gameBoard, onCardSelect);
    const highestScore = Math.max(...players.map(player => get_player_score(player.playerID)));
    const winners = players.filter(player => get_player_score(player.playerID) === highestScore);
    if (winners.length === 1) {
        updateStatusMessage(`Player ${winners[0].playerID} wins with ${highestScore} points!`, statusMessage);
    } else if (winners.length > 1) {
        const winnerIDs = winners.map(player => player.playerID).join(', ');
        updateStatusMessage(`It's a tie between players ${winnerIDs}, each with ${highestScore} points!`, statusMessage);
    } else {
        updateStatusMessage("Game over. No valid sets left!", statusMessage);
    }
}

// Add event listeners
startGameButton.addEventListener('click', () => {
    stopTimer();
    startNewGame();
});
finishGameButton.addEventListener('click', finishGame);
confirmButton.addEventListener('click', confirmSelection);
export{players, statusMessage, gameBoard, onCardSelect, dealtCards, deck, selectedCards, timerDisplay, turnDuration, scoreDisplay};