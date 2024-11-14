"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const status_1 = require("./status");
class Board {
    constructor(numSquares) {
        this.squares = new Array(numSquares);
        //Here is where the ladder and snake inicialitzation should be.
    }
    GetNumSquares() {
        return this.squares.length;
    }
    GetSquares() {
        return this.squares;
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
            return status_1.GameStatus.Finished;
        }
        return status_1.GameStatus.PlayersTurn;
    }
}
exports.Board = Board;
