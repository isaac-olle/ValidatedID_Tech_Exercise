"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const board_1 = require("./board");
const player_1 = require("./player");
const status_1 = require("./status");
const gameId_1 = require("./vo/gameId");
class Game {
    constructor(numPlayers, numSquares, dice) {
        this.players = [];
        this.board = new board_1.Board(numSquares.GetValue());
        this.players = new Array(numPlayers.GetValue()).fill(null).map((_, i) => new player_1.Player(i + 1));
        this.dice = dice;
        this.status = status_1.GameStatus.PlayersTurn;
        this.id = new gameId_1.GameId();
    }
    Start() {
        this.players.forEach(player => player.SetPosition(1));
        this.turn = this.players[0].GetPlayerId();
    }
    MovePlayer(playerId, move) {
        let player = this.checkMoveConditions(playerId, move);
        this.move(player, move);
        return { currentPosition: player.GetPosition(), move: move, finish: this.status == status_1.GameStatus.Finished };
    }
    GetNumPlayers() {
        return this.players.length;
    }
    GetPlayers() {
        return this.players;
    }
    GetPlayersId() {
        return this.players.map(p => p.GetIdValue());
    }
    GetIdValue() {
        return this.id.GetValue();
    }
    GetStatus() {
        return this.status;
    }
    setFollowingTurn() {
        let nextTurnIndex = this.players.findIndex(pl => pl.GetPlayerId() == this.turn) + 1;
        this.turn = nextTurnIndex == this.players.length ? this.players[0].GetPlayerId() : this.players[nextTurnIndex].GetPlayerId();
    }
    move(player, move) {
        if (move === undefined) {
            move = this.dice.Throw();
        }
        let newPosition = this.board.CheckMove(move, player.GetPosition());
        player.SetPosition(newPosition);
        //newPosition = this.board.squares[player!.GetPosition()].ApplyRelationShip()
        if (this.board.CheckWin(player.GetPosition())) {
            this.status = status_1.GameStatus.Finished;
        }
        this.setFollowingTurn();
    }
    checkMoveConditions(playerId, move) {
        var _a, _b;
        if (this.status == status_1.GameStatus.Finished) {
            throw new Error("This game has ended");
        }
        let player = this.GetPlayers().find(pl => pl.GetIdValue() === playerId.GetValue());
        if (player === undefined) {
            throw new Error("This playerId does not exist in that game");
        }
        if (playerId.GetValue() != ((_a = this.turn) === null || _a === void 0 ? void 0 : _a.GetValue())) {
            throw new Error(`Is not the turn of player ${playerId.GetValue()}. Please player ${(_b = this.turn) === null || _b === void 0 ? void 0 : _b.GetValue()} start your turn.`);
        }
        return player;
    }
}
exports.Game = Game;
