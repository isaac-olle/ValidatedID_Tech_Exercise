
import { Square } from "./square";
import { GameStatus } from "./status";

export class Board {
    private squares: Square[];


    constructor(numSquares: number) {
        this.squares = new Array(numSquares);

        //Here is where the ladder and snake inicialitzation should be.
    }

    GetNumSquares(): number {
        return this.squares.length
    }

    GetSquares(): Square[] {
        return this.squares
    }

    CheckMove(move: number, position: number): number {
        if (position + move > this.GetNumSquares()){
            return position;
        } else {
            return position + move;
        }
    }

    CheckWin(position: number): GameStatus {
        if (position == this.GetNumSquares()) {
            return GameStatus.Finished
        }
        return GameStatus.PlayersTurn
    }
}