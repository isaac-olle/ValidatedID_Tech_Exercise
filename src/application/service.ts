import { Dice } from "../domain/contracts/dice";
import { Game } from "../domain/game";
import { GameId } from "../domain/vo/gameId";
import { NumPlayers } from "../domain/vo/numPlayers";
import { NumSquares } from "../domain/vo/numSquares";
import { PlayerId } from "../domain/vo/playerId";
import { GameRepository } from "../domain/contracts/gameRepository";


// This class maybe does not makes a lot of sense in terms of logic, the fact that having 
// just 1 game initialized in all app makes that infrastructure layer could talk just with domain and do all logic.
// But if some persitance is needed (API rest) all the CRUD method would go here, and this class would make more sense. 
// Last but not least helps into decouple infrastructure from domain.
export class GameService{

    repository: GameRepository;

    constructor(repository: GameRepository) {
        this.repository = repository
    }

    Create(numPlayers: NumPlayers, numSquares: NumSquares, dice: Dice): ResponseCreateDTO {
        let game = new Game(numPlayers, numSquares, dice);
        game.Start();
        this.repository.Add(game);
        return {gameId: game.GetIdValue(), playersId: game.GetPlayersId()}
    }

    MovePlayer(gameId: GameId, playerId: PlayerId, move?: number): ResponseMoveDTO {
        let game = this.repository.Get(gameId);
        return game.MovePlayer(playerId, move);
    }

    GetPosition(gameId: GameId, playerId: PlayerId): number {
        let game = this.repository.Get(gameId);
        return game.GetPlayers().find(pl => playerId.GetValue() == pl.GetIdValue())?.GetIdValue()!
    }
}