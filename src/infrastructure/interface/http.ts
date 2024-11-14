

import express, { Request, Response } from 'express';
import { GameService } from '../../application/service';
import { RequestCreateDto } from '../../domain/dtos/request/create';
import { BasicDice } from '../dice/basic';
import { RequestMoveDto } from '../../domain/dtos/request/move';
import { RequestPositionDto } from '../../domain/dtos/request/position';

const app = express();
app.use(express.json())
const port = 3000;

export class HttpInterface {

    service: GameService;

    constructor(service: GameService) {
        this.service = service;
        this.init()
    }

    private init(): void {
        app.post('/game', (req: Request, res: Response) => {
            try{
                const numPlayers = parseInt(req.body.numPlayers, 10);
                const numSquares = parseInt(req.body.numSquares, 10);
                if (isNaN(numPlayers) || isNaN(numSquares)) {
                    res.status(400).json({
                        error: 'Bad Request',
                        message: 'Both numPlayers and numSquares must be numbers.'
                    });
                    return 
                }
                let dto = new RequestCreateDto(req.body["numPlayers"], req.body["numSquares"]);
                let resp = this.service.Create(dto.numPlayers, dto.numSquares, new BasicDice(6));
                res.status(201).json(resp);
            } catch (error) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: (error as Error).message
                })
            }
        });

        app.put('/move', (req: Request, res: Response) => {
            try{
                let dto = new RequestMoveDto(req.body.gameId, req.body.playerId, req.body.move);
                let resp = this.service.MovePlayer(dto.gameId, dto.playerId, req.body.move);
                res.status(201).json(resp);
            } catch (error) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: (error as Error).message
                })
            }
        });

        
        app.get('/position/:gameId/:playerId', (req: Request, res: Response) => {
            try{
                let dto = new RequestPositionDto(req.params.gameId, req.params.playerId);
                let resp = this.service.GetPosition(dto.gameId, dto.playerId);
                res.status(200).json({"position": resp});
            } catch (error) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: (error as Error).message
                })
            }
        });
          
        app.listen(port, () => {
            console.log(`Servidor en execució a http://localhost:${port}`);
        });
    }
    

}
