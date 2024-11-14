"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameId = void 0;
const const_1 = require("../const");
const number_1 = require("./number");
class GameId extends number_1.Vo {
    constructor(value) {
        value = value !== null && value !== void 0 ? value : Math.floor(Math.random() * (const_1.MAX_GAME_ID - const_1.MIN_GAME_ID + 1)) + const_1.MIN_GAME_ID;
        super(value);
    }
    Validate() {
        if (this.value < const_1.MIN_GAME_ID || this.value > const_1.MAX_GAME_ID) {
            throw new Error(`Game id are between ${const_1.MIN_GAME_ID} and ${const_1.MIN_GAME_ID}`);
        }
        return;
    }
}
exports.GameId = GameId;
