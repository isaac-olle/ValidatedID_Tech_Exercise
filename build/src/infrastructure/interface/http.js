"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterface = void 0;
const express_1 = __importDefault(require("express"));
const create_1 = require("../../domain/dtos/request/create");
const basic_1 = require("../dice/basic");
const move_1 = require("../../domain/dtos/request/move");
const position_1 = require("../../domain/dtos/request/position");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
class HttpInterface {
    constructor(service) {
        this.service = service;
        this.init();
    }
    init() {
        app.post('/game', (req, res) => {
            try {
                const numPlayers = parseInt(req.body.numPlayers, 10);
                const numSquares = parseInt(req.body.numSquares, 10);
                if (isNaN(numPlayers) || isNaN(numSquares)) {
                    res.status(400).json({
                        error: 'Bad Request',
                        message: 'Both numPlayers and numSquares must be numbers.'
                    });
                    return;
                }
                let dto = new create_1.RequestCreateDto(req.body["numPlayers"], req.body["numSquares"]);
                let resp = this.service.Create(dto.numPlayers, dto.numSquares, new basic_1.BasicDice(6));
                res.status(201).json(resp);
            }
            catch (error) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: error.message
                });
            }
        });
        app.put('/move', (req, res) => {
            try {
                let dto = new move_1.RequestMoveDto(req.body.gameId, req.body.playerId, req.body.move);
                let resp = this.service.MovePlayer(dto.gameId, dto.playerId, req.body.move);
                res.status(201).json(resp);
            }
            catch (error) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: error.message
                });
            }
        });
        app.get('/position/:gameId/:playerId', (req, res) => {
            try {
                let dto = new position_1.RequestPositionDto(req.params.gameId, req.params.playerId);
                let resp = this.service.GetPosition(dto.gameId, dto.playerId);
                res.status(200).json({ "position": resp });
            }
            catch (error) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: error.message
                });
            }
        });
        app.listen(port, () => {
            console.log(`Servidor en execució a http://localhost:${port}`);
        });
    }
}
exports.HttpInterface = HttpInterface;
