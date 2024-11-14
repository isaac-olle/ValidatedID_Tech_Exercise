"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const game_1 = require("../domain/game");
// This class maybe does not makes a lot of sense in terms of logic, the fact that having 
// just 1 game initialized in all app makes that infrastructure layer could talk just with domain and do all logic.
// But if some persitance is needed (API rest) all the CRUD method would go here, and this class would make more sense. 
// Last but not least helps into decouple infrastructure from domain.
class GameService {
    constructor(repository) {
        this.repository = repository;
    }
    Create(numPlayers, numSquares, dice) {
        let game = new game_1.Game(numPlayers, numSquares, dice);
        game.Start();
        this.repository.Add(game);
        return { gameId: game.GetIdValue(), playersId: game.GetPlayersId() };
    }
    MovePlayer(gameId, playerId, move) {
        let game = this.repository.Get(gameId);
        return game.MovePlayer(playerId, move);
    }
    GetPosition(gameId, playerId) {
        var _a;
        let game = this.repository.Get(gameId);
        return (_a = game.GetPlayers().find(pl => playerId.GetValue() == pl.GetIdValue())) === null || _a === void 0 ? void 0 : _a.GetIdValue();
    }
}
exports.GameService = GameService;
