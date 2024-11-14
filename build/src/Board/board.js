"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const game_1 = require("../Game/game");
class Board {
    constructor(numSquares) {
        this.squares = new Array(numSquares);
    }
    GetNumSquares() {
        return this.squares.length;
    }
    CheckMove(move, position) {
        if (position + move > this.GetNumSquares()) {
            return position;
        }
        else {
            return position + move;
        }
    }
    CheckWin(position) {
        if (position == this.GetNumSquares()) {
            return game_1.GameStatus.Finished;
        }
        return game_1.GameStatus.PlayersTurn;
    }
}
exports.Board = Board;
