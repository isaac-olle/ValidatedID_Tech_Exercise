import { SquareRelationship } from "./relationship";

//Si no hi ha ladders i snakes no te molt de sentit aquesta classe
export class Square {
    private postion: number 
    private relationship: SquareRelationship;

    constructor(position: number, relationship: SquareRelationship) {
        this.postion = position
        this.relationship = relationship
    }

    ApplyRelationShip(): number {
        return this.relationship.Apply(this.postion)
    }
}