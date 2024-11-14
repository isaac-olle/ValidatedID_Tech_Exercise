import { Game } from "../game";
import { GameId } from "../vo/gameId";

export interface GameRepository {
    Add(game: Game): void
    Get(gameId: GameId): Game
}