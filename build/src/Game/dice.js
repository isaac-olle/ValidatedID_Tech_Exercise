"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dice = void 0;
class Dice {
    constructor(faces) {
        this.faces = faces;
    }
    Throw() {
        let roll = Math.floor(Math.random() * this.faces);
        console.log(`Dice shows a ${roll}`);
        return roll;
    }
}
exports.Dice = Dice;
