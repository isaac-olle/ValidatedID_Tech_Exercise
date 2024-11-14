

export class SquareRelationship {

    private jump: number = 0;

    constructor(jump: number) {
        this.jump = jump;
    }
    
    Apply(position: number): number {
        return position + this.jump
    }

}