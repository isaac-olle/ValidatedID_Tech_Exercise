import { MAX_GAME_ID, MAX_PLAYERS, MIN_GAME_ID, MIN_PLAYERS } from "../const";
import { Vo } from "./number";

export class GameId extends Vo<number> {

    constructor(value?: number) {
        value = value ?? Math.floor(Math.random() * (MAX_GAME_ID - MIN_GAME_ID + 1)) + MIN_GAME_ID;
        super(value);
    }

    protected Validate(): void {
        if (this.value < MIN_GAME_ID || this.value > MAX_GAME_ID) {
            throw new Error(`Game id are between ${MIN_GAME_ID} and ${MIN_GAME_ID}`);
        } 
        return 
    }

}
