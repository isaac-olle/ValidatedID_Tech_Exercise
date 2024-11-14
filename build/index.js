"use strict";
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
const service_1 = require("./src/application/service");
const http_1 = require("./src/infrastructure/interface/http");
const terminal_1 = require("./src/infrastructure/interface/terminal");
const game_1 = require("./src/infrastructure/persistance/game");
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let repo = new game_1.GameMemoryRepository();
        let service = new service_1.GameService(repo);
        yield new http_1.HttpInterface(service);
        yield new terminal_1.TerminalInterface(service).Init();
        console.log("App finished");
    });
}
