"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
//Si no hi ha ladders i snakes no te molt de sentit aquesta classe
class Square {
    constructor(position, relationship) {
        this.postion = position;
        this.relationship = relationship;
    }
    ApplyRelationShip() {
        return this.relationship.Apply(this.postion);
    }
}
exports.Square = Square;
