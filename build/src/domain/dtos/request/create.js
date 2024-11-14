"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCreateDto = void 0;
const numPlayers_1 = require("../../vo/numPlayers");
const numSquares_1 = require("../../vo/numSquares");
class RequestCreateDto {
    constructor(numPlayers, numSquares) {
        this.numPlayers = new numPlayers_1.NumPlayers(numPlayers);
        this.numSquares = new numSquares_1.NumSquares(numSquares);
    }
}
exports.RequestCreateDto = RequestCreateDto;
