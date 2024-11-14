"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatus = void 0;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["PlayersTurn"] = 0] = "PlayersTurn";
    GameStatus[GameStatus["Finished"] = 1] = "Finished";
})(GameStatus || (exports.GameStatus = GameStatus = {}));
