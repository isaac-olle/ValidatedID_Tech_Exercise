"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFinder = void 0;
class GameFinder {
    constructor(repository) {
        this.repository = repository;
    }
    FindGame(gameId) {
        return this.repository.Get(gameId);
    }
}
exports.GameFinder = GameFinder;
