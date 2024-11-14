"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMoveDto = void 0;
const gameId_1 = require("../../vo/gameId");
const playerId_1 = require("../../vo/playerId");
class RequestMoveDto {
    constructor(gameId, playerId, move) {
        this.gameId = new gameId_1.GameId(gameId);
        this.playerId = new playerId_1.PlayerId(playerId);
        this.move = move;
    }
}
exports.RequestMoveDto = RequestMoveDto;
