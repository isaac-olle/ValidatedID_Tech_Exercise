
import { GameId } from "../../vo/gameId";
import { PlayerId } from "../../vo/playerId";

export class RequestMoveDto {

    gameId: GameId;
    playerId: PlayerId;
    move?: number;

    constructor(gameId: number, playerId: number, move?: number){
        this.gameId = new GameId(gameId);
        this.playerId = new PlayerId(playerId);
        this.move = move;
    }
}