import { GameService } from "./src/application/service";
import { HttpInterface } from "./src/infrastructure/interface/http";
import { TerminalInterface } from "./src/infrastructure/interface/terminal";
import { GameMemoryRepository } from "./src/infrastructure/persistance/game";

main()

async function main(): Promise<void> {
    let repo = new GameMemoryRepository()
    let service = new GameService(repo)
    await new HttpInterface(service)
    await new TerminalInterface(service).Init()
    console.log("App finished")
}