"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPositionDto = void 0;
const gameId_1 = require("../../vo/gameId");
const playerId_1 = require("../../vo/playerId");
class RequestPositionDto {
    constructor(gameId, playerId) {
        this.gameId = new gameId_1.GameId(+gameId);
        this.playerId = new playerId_1.PlayerId(+playerId);
    }
}
exports.RequestPositionDto = RequestPositionDto;
