import { Board } from "./board";
import { Player } from "./player";
import { Dice } from "./contracts/dice";
import { GameStatus } from "./status";
import { NumPlayers } from "./vo/numPlayers";
import { NumSquares } from "./vo/numSquares";
import { PlayerId } from "./vo/playerId";
import { GameId } from "./vo/gameId";

export class Game {
    private id: GameId;
    private board: Board;
    private players: Player[] = [];

    private dice: Dice;
    private status: GameStatus;
    private turn?: PlayerId;

    constructor(numPlayers: NumPlayers, numSquares: NumSquares, dice: Dice) {
        this.board = new Board(numSquares.GetValue())
        this.players = new Array(numPlayers.GetValue()).fill(null).map((_, i) => new Player(i+1))
        this.dice = dice
        this.status = GameStatus.PlayersTurn;
        this.id = new GameId()
    }

    Start(): void {
        this.players.forEach(player => player.SetPosition(1));
        this.turn = this.players[0].GetPlayerId();
    }

    MovePlayer(playerId: PlayerId, move?: number): ResponseMoveDTO {
        let player = this.checkMoveConditions(playerId,move)
        this.move(player, move)
        return {currentPosition: player!.GetPosition(), move: move!, finish: this.status == GameStatus.Finished}
    }

    GetNumPlayers(): number {
        return this.players.length;
    }

    GetPlayers(): Player[] {
        return this.players;
    }

    GetPlayersId(): number[] {
        return this.players.map(p => p.GetIdValue());
    }

    GetIdValue(): number {
        return this.id.GetValue();
    }

    GetStatus(): GameStatus {
        return this.status;
    }

    private setFollowingTurn(): void {
        let nextTurnIndex = this.players.findIndex(pl => pl.GetPlayerId() == this.turn)+1;
        this.turn = nextTurnIndex == this.players.length ? this.players[0].GetPlayerId() : this.players[nextTurnIndex].GetPlayerId();
    }

    private move(player: Player, move?: number): void {
        if (move === undefined) {
            move = this.dice.Throw();
        }
        let newPosition = this.board.CheckMove(move!, player!.GetPosition());
        player!.SetPosition(newPosition);
        //newPosition = this.board.squares[player!.GetPosition()].ApplyRelationShip()
        if(this.board.CheckWin(player!.GetPosition())) {
            this.status = GameStatus.Finished
        }
        this.setFollowingTurn();
    }

    private checkMoveConditions(playerId: PlayerId, move?: number): Player {
        if (this.status == GameStatus.Finished) {
            throw new Error("This game has ended");
        }
        let player = this.GetPlayers().find(pl => pl.GetIdValue() === playerId.GetValue())
        if ( player === undefined ) {
            throw new Error("This playerId does not exist in that game") 
        }
        if(playerId.GetValue() != this.turn?.GetValue()) {
            throw new Error(`Is not the turn of player ${playerId.GetValue()}. Please player ${this.turn?.GetValue()} start your turn.`)
        }

        return player
    }
}
