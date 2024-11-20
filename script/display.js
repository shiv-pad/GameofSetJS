import {scoreDisplay, players} from './main.js';
import {get_player_score} from './player_creator.js';

//Displays new cards to gameboard
function renderDealtCards(dealtCards, gameBoard, onCardSelect){
    gameBoard.innerHTML = '';

    dealtCards.forEach((card, index) => {
        const cardElement = document.createElement('img');
        cardElement.src = card.imagePath;
        cardElement.alt = `Card: ${card.shape}, ${card.color}, ${card.number}, ${card.shading}`;
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index); 
        cardElement.addEventListener('click', () => onCardSelect(index)); 
        gameBoard.appendChild(cardElement);
    });
}

//Status messages for player actions
function updateStatusMessage(output_msg, statusMessage){
    statusMessage.innerHTML = output_msg;
}

//Outline selected cards on the gameboard
function updateCardSelectionDisplay(selectedCards, gameBoard){
    const cardElements = gameBoard.querySelectorAll('.card');

    // Clear previous selection styles
    cardElements.forEach((cardElement, index) => {
        if (selectedCards.includes(index)) {
            cardElement.classList.add('selected');
        } else {
            cardElement.classList.remove('selected');
        }
    });

}

function displayPlayerScores() {
    scoreDisplay.innerHTML = '';
    players.forEach(player => {
        const playerScore = document.createElement('p');
        playerScore.textContent = `Player ${player.playerID}: ${get_player_score(player.playerID)} points`;
        scoreDisplay.appendChild(playerScore);
    });
}

export {renderDealtCards,updateStatusMessage,updateCardSelectionDisplay, displayPlayerScores}