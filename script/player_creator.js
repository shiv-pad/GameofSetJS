let game_players = [];
let currentPlayerIndex = 0;
class Player {
    constructor(playerNumber) {
        this.playerID = playerNumber;
        this.score = 0;
    }
}

function get_players(num_of_players){
    game_players = [];
    for (let i = 0; i < num_of_players; i++) {
        let created_player = new Player(i + 1);
        game_players.push(created_player);
    }
    currentPlayerIndex = 0;
    return game_players;
}

function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % game_players.length;
}


function get_player_score(playerID)
{
    return game_players[playerID - 1].score;
}

function update_score(playerID, point)
{
    game_players[playerID - 1].score += point;
}
function getCurrentPlayer() {
    return game_players[currentPlayerIndex];
}

export {get_players, get_player_score, update_score, switchPlayer, getCurrentPlayer}