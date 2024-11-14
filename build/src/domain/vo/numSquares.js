"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumSquares = void 0;
const const_1 = require("../const");
const number_1 = require("./number");
class NumSquares extends number_1.Vo {
    constructor(value) {
        super(value);
    }
    Validate() {
        if (this.value < const_1.MIN_SQUARES || this.value > const_1.MAX_SQUARES) {
            throw new Error(`Squares number should be between ${const_1.MIN_SQUARES} and ${const_1.MAX_SQUARES}`);
        }
        return;
    }
}
exports.NumSquares = NumSquares;
