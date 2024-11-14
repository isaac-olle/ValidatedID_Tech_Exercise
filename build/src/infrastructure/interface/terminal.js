"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalInterface = void 0;
const readline = __importStar(require("readline"));
const basic_1 = require("../dice/basic");
const numPlayers_1 = require("../../domain/vo/numPlayers");
const numSquares_1 = require("../../domain/vo/numSquares");
const playerId_1 = require("../../domain/vo/playerId");
const gameId_1 = require("../../domain/vo/gameId");
class TerminalInterface {
    constructor(service) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.gameService = service;
    }
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let numPlayers, numSquares;
            let nextGame = true;
            //Here we could put a custom inicialization
            let dice = new basic_1.BasicDice(6);
            while (nextGame) {
                try {
                    this.rl.write("Welcome to Snakes and Ladders Game. \n");
                    numPlayers = yield this.askQuestion("How many players are playing? ", numPlayers_1.NumPlayers);
                    this.rl.write("Excelent!\n");
                    numSquares = yield this.askQuestion("How much squares will have the board? ", numSquares_1.NumSquares);
                    this.rl.write(`Perfect! ${numPlayers.GetValue()} players are ready to play along ${numSquares.GetValue()} squares. \n`);
                    this.gameDto = this.gameService.Create(numPlayers, numSquares, dice);
                    this.Play();
                    nextGame = yield this.nextGameQuestion("Do you want to play another game? Please type 'yes' or 'no'. ");
                }
                catch (error) {
                    console.error("Error: " + error + "\n");
                    console.log("Please start again the confugration. \n");
                }
            }
            return;
        });
    }
    nextGameQuestion(questionStr) {
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
            });
        });
    }
    askQuestion(questionStr, vo) {
        return new Promise((resolve, reject) => {
            this.rl.question(questionStr, (answer) => {
                let parsedValue = Number(answer);
                if (isNaN(parsedValue)) {
                    reject(new Error(`Invalid input: '${answer}' is not a valid number.`));
                }
                else {
                    try {
                        resolve(new vo(parsedValue));
                    }
                    catch (error) {
                        reject(error.message);
                    }
                }
            });
        });
    }
    Play() {
        var _a;
        if (!this.gameDto) {
            throw new Error("Game not initialized");
        }
        const gameIdVo = new gameId_1.GameId(this.gameDto.gameId);
        while (true) {
            for (const playerId of this.gameDto.playersId) {
                this.rl.write(`It's Player ${playerId}'s turn.\n`);
                this.rl.prompt();
                let playerIdVo = new playerId_1.PlayerId(playerId);
                let move = (_a = this.gameService) === null || _a === void 0 ? void 0 : _a.MovePlayer(gameIdVo, playerIdVo);
                if (move) {
                    this.rl.write(`The dice shows a ${move.move}\n`);
                    this.rl.write(`Player ${playerId}'s current position is ${move.currentPosition}\n`);
                    if (move.finish) {
                        this.rl.write(`Congratulations! Player ${playerId}, you have won the game!\n\n`);
                        return;
                    }
                }
                else {
                    this.rl.write("Error: MovePlayer failed to return a move.\n");
                    return;
                }
            }
        }
    }
}
exports.TerminalInterface = TerminalInterface;
