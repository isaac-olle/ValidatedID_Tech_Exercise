import { PlayerId } from "./vo/playerId";

export class Player {
    private id: PlayerId;
    private posicion: number= 0;

    constructor(id: number) {
        this.id = new PlayerId(id) ;
        //this.posicion = 1; This is done to force an Start() Method.
    }

    GetIdValue(): number {
        return this.id.GetValue();
    }

    GetPlayerId(): PlayerId {
        return this.id;
    }

    GetPosition(): number {
        return this.posicion
    }

    SetPosition(newPosition:number): void {
        this.posicion = newPosition;
    } 
}