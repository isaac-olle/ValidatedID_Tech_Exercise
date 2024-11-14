"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(id) {
        this.posicion = 0;
        this.id = id;
        //this.posicion = 1; This is done to force an Start() Method.
    }
    GetId() {
        return this.id;
    }
    GetPosition() {
        return this.posicion;
    }
    SetPosition(newPosition) {
        this.posicion = newPosition;
    }
    Turn() {
        let dice = Math.floor(Math.random() * 6);
        this.posicion = this.posicion + dice;
    }
}
exports.Player = Player;
