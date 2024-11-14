"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const playerId_1 = require("./vo/playerId");
class Player {
    constructor(id) {
        this.posicion = 0;
        this.id = new playerId_1.PlayerId(id);
        //this.posicion = 1; This is done to force an Start() Method.
    }
    GetIdValue() {
        return this.id.GetValue();
    }
    GetPlayerId() {
        return this.id;
    }
    GetPosition() {
        return this.posicion;
    }
    SetPosition(newPosition) {
        this.posicion = newPosition;
    }
}
exports.Player = Player;
