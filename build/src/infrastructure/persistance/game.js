"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMemoryRepository = void 0;
class GameMemoryRepository {
    constructor() {
        this.games = [];
    }
    Add(game) {
        this.games.push(game);
    }
    Get(gameId) {
        let game = this.games.find(g => g.GetIdValue() == gameId.GetValue());
        if (game === undefined) {
            throw new Error(`Game with id: ${gameId.GetValue()}. Does not exist. `);
        }
        return game;
    }
}
exports.GameMemoryRepository = GameMemoryRepository;
