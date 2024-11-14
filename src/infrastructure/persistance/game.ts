import { GameRepository } from "../../domain/contracts/gameRepository";
import { Game } from "../../domain/game";
import { GameId } from "../../domain/vo/gameId";

export class GameMemoryRepository implements GameRepository {
    private games: Game[] = [];

    constructor() {

    }

    Add(game: Game): void {
        this.games.push(game)
    }

    Get(gameId: GameId): Game {
        let game = this.games.find(g => g.GetIdValue() == gameId.GetValue())
        if (game === undefined) {
            throw new Error(`Game with id: ${gameId.GetValue()}. Does not exist. `)
        }
        return game
    }
}