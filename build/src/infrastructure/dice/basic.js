"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicDice = void 0;
class BasicDice {
    constructor(faces) {
        this.faces = faces;
    }
    Throw() {
        let roll = Math.floor(Math.random() * this.faces + 1);
        return roll;
    }
}
exports.BasicDice = BasicDice;
