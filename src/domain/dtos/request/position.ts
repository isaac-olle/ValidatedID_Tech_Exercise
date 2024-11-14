
import { GameId } from "../../vo/gameId";
import { PlayerId } from "../../vo/playerId";

export class RequestPositionDto {

    gameId: GameId;
    playerId: PlayerId;
    constructor(gameId: string, playerId: string){
        this.gameId = new GameId(+gameId);
        this.playerId = new PlayerId(+playerId);
    }
}