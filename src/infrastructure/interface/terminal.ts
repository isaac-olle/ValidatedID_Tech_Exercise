import { Dice } from "../../domain/contracts/dice";

import * as readline from 'readline';
import { GameService } from "../../application/service";
import { BasicDice } from "../dice/basic";
import { NumPlayers } from "../../domain/vo/numPlayers";
import { NumSquares } from "../../domain/vo/numSquares";
import { Vo } from "../../domain/vo/number";
import { GameMemoryRepository } from "../persistance/game";
import { PlayerId } from "../../domain/vo/playerId";
import { GameId } from "../../domain/vo/gameId";
import { Game } from "../../domain/game";

export class TerminalInterface {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    gameService: GameService;

    //Here we are saving this because is simulating an API.
    gameDto?: ResponseCreateDTO;

    constructor(service: GameService) {
        this.gameService = service;
    }

    async Init(): Promise<void>  {
        let numPlayers:NumPlayers , numSquares: NumSquares;
        let nextGame = true;

        //Here we could put a custom inicialization
        let dice = new BasicDice(6)

        while(nextGame) {
            try{
                this.rl.write("Welcome to Snakes and Ladders Game. \n");
                numPlayers = await this.askQuestion("How many players are playing? ", NumPlayers);
                this.rl.write("Excelent!\n")
                numSquares = await this.askQuestion("How much squares will have the board? ", NumSquares);
                this.rl.write(`Perfect! ${numPlayers.GetValue()} players are ready to play along ${numSquares.GetValue()} squares. \n`)
                this.gameDto = this.gameService!.Create(numPlayers, numSquares, dice);
                this.Play();
                nextGame = await this.nextGameQuestion("Do you want to play another game? Please type 'yes' or 'no'. ")
            } catch(error) {
                console.error("Error: " + error +"\n")
                console.log("Please start again the confugration. \n")
            }
        }
        return
    }

    private nextGameQuestion(questionStr: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.rl.question(questionStr, (answer) => {
                switch (answer) {
                    case 'yes':
                    case 'y':
                        resolve(true);
                        break;
                    default: 
                        resolve(false);
                        break;
                }
            })
        })
    }

    private askQuestion<T extends Vo<number>>(questionStr: string, vo: new (value: number) => T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.rl.question(questionStr, (answer: string) => {
                let parsedValue = Number(answer);
                if (isNaN(parsedValue)) {
                    reject(new Error(`Invalid input: '${answer}' is not a valid number.`));
                } else {
                    try {
                        resolve(new vo(parsedValue));
                    } catch(error) {
                        reject((error as Error).message)
                    }
                }
            });
        });
    }

    Play(): void {
        if (!this.gameDto) {
            throw new Error("Game not initialized");
        }
    
        const gameIdVo = new GameId(this.gameDto.gameId);
    
        while (true) {
            for (const playerId of this.gameDto.playersId) {
                this.rl.write(`It's Player ${playerId}'s turn.\n`);
                this.rl.prompt();
                
                let playerIdVo = new PlayerId(playerId);
                let move = this.gameService?.MovePlayer(gameIdVo, playerIdVo);
    
                if (move) {
                    this.rl.write(`The dice shows a ${move.move}\n`);
                    this.rl.write(`Player ${playerId}'s current position is ${move.currentPosition}\n`);
    
                    if (move.finish) {
                        this.rl.write(`Congratulations! Player ${playerId}, you have won the game!\n\n`);
                        return;
                    }
                } else {
                    this.rl.write("Error: MovePlayer failed to return a move.\n");
                    return;
                }
            }
        }
    }
}