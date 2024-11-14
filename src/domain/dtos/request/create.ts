import { NumPlayers } from "../../vo/numPlayers";
import { NumSquares } from "../../vo/numSquares";

export class RequestCreateDto {

    numPlayers: NumPlayers;
    numSquares: NumSquares;

    constructor(numPlayers: number, numSquares: number){
        this.numPlayers = new NumPlayers(numPlayers);
        this.numSquares = new NumSquares(numSquares);
    }
}