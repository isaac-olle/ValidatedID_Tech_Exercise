import { MAX_PLAYERS, MIN_PLAYERS } from "../const";
import { Vo } from "./number";

export class PlayerId extends Vo<number> {

    constructor(value: number) {
        super(value);
    }

    protected Validate(): void {
        if (this.value < MIN_PLAYERS || this.value > MAX_PLAYERS) {
            throw new Error(`Player id are between ${MIN_PLAYERS} and ${MAX_PLAYERS}`);
        } 
        return 
    }

}