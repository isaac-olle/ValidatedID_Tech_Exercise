export class BasicDice {

        faces: number
    
        constructor(faces: number) {
            this.faces = faces
        }
        
        Throw(): number{
            let roll = Math.floor(Math.random() * this.faces +1);
            return roll
        }
    }