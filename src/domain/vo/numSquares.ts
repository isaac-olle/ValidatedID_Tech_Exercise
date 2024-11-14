import { MAX_SQUARES, MIN_SQUARES } from "../const";
import { Vo } from "./number";

export class NumSquares extends Vo<number>  {

    constructor(value: number) {
        super(value)
    }

    protected Validate(): void {
        if (this.value < MIN_SQUARES || this.value > MAX_SQUARES) {
            throw new Error(`Squares number should be between ${MIN_SQUARES} and ${MAX_SQUARES}`);
        } 
        return 
    }

}