"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareRelationship = void 0;
class SquareRelationship {
    constructor(jump) {
        this.jump = 0;
        this.jump = jump;
    }
    Apply(position) {
        return position + this.jump;
    }
}
exports.SquareRelationship = SquareRelationship;
