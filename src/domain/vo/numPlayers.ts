import { MAX_PLAYERS, MIN_PLAYERS } from "../const";
import { Vo } from "./number";


export class NumPlayers extends Vo<number> {

    constructor(value: number) {
        super(value);
    }

    protected Validate(): void {
        if (this.value < MIN_PLAYERS || this.value > MAX_PLAYERS) {
            throw new Error(`Player number should be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`);
        } 
        return 
    }

}