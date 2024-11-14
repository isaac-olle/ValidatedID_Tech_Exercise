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
const dice_1 = require("../domain/dice");
const readline = __importStar(require("readline"));
const service_1 = require("../application/service");
class TerminalInterface {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.gameService = new service_1.GameService();
    }
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let numPlayers, numSquares;
            //Here we could put a custom inicialization
            let dice = new dice_1.Dice(6);
            this.rl.write("Welcome to Snakes and Ladders Game. \n");
            numPlayers = yield this.askQuestion("How many players are playing? ");
            this.rl.write("Excelent!\n");
            numSquares = yield this.askQuestion("How much squares will have the board? ");
            this.rl.write(`Perfect! ${numPlayers} players are ready to play along ${numSquares} squares. \n`);
            this.gameService.Start(numPlayers, numSquares, dice);
            this.Play();
            return;
        });
    }
    askQuestion(questionStr) {
        return new Promise((resolve) => {
            this.rl.question(questionStr, (answer) => resolve(+answer));
        });
    }
    Play() {
        var _a;
        while (true) {
            for (var player of this.gameService.GetPlayers()) {
                this.rl.write(`It is Player ${player.GetId()}'s turn.`);
                let move = (_a = this.gameService) === null || _a === void 0 ? void 0 : _a.MovePlayer(player);
                this.rl.write(`Dice has shown a ${move === null || move === void 0 ? void 0 : move.move} \n`);
                this.rl.write(`Player ${player.GetId()} current position is  ${move === null || move === void 0 ? void 0 : move.currentPosition} \n`);
                if (this.gameService.IsGameFinished()) {
                    this.rl.write(`Congratulations! Player ${player.GetId()} you have won the game!`);
                    return;
                }
            }
        }
    }
}
exports.TerminalInterface = TerminalInterface;
