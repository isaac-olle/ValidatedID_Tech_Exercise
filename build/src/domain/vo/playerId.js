"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerId = void 0;
const const_1 = require("../const");
const number_1 = require("./number");
class PlayerId extends number_1.Vo {
    constructor(value) {
        super(value);
    }
    Validate() {
        if (this.value < const_1.MIN_PLAYERS || this.value > const_1.MAX_PLAYERS) {
            throw new Error(`Player id are between ${const_1.MIN_PLAYERS} and ${const_1.MAX_PLAYERS}`);
        }
        return;
    }
}
exports.PlayerId = PlayerId;
