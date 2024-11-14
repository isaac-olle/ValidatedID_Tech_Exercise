"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatus = exports.Game = void 0;
const board_1 = require("../Board/board");
const player_1 = require("../Player/player");
class Game {
    constructor(numPlayers, numSquares, dice) {
        this.players = [];
        this.board = new board_1.Board(numSquares);
        this.players = new Array(numPlayers).fill(null).map((_, i) => new player_1.Player(i + 1));
        console.log(this.players);
        this.dice = dice;
    }
    Start() {
        console.log("Game Started!");
        for (var player of this.players) {
            player.SetPosition(1);
        }
    }
    Move(player, move) {
        if (move == null) {
            move = this.dice.Throw();
        }
        player.SetPosition(this.board.CheckMove(move, player.GetPosition()));
        console.log(`Player ${player.GetId()} current position is ${player.GetPosition()}`);
        return this.board.CheckWin(player.GetPosition());
    }
    GetNumPlayers() {
        return this.players.length;
    }
    GetPlayers() {
        return this.players;
    }
}
exports.Game = Game;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["PlayersTurn"] = 0] = "PlayersTurn";
    GameStatus[GameStatus["Finished"] = 1] = "Finished";
})(GameStatus || (exports.GameStatus = GameStatus = {}));
