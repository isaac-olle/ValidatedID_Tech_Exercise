# ValidatedID_Tech_Exercise

## Available Interfaces

There are two interfaces to interact with the program. They are defined in `index.js`, and you can comment them out if you find it necessary.

### 1. Terminal Interface

The **Terminal** interface is particularly useful for testing, as it automatically runs the entire game until one player wins. While the interface currently has more logic than needed, it could be simplified to just run the game using the existing game logic. This interface has been adapted to work with an HTTP API to demonstrate the scalability of the system, and it also simulates a frontend interacting with the game.

### 2. HTTP Interface

The **HTTP** interface allows interaction with the game through POST requests, and it can be tested with Postman. The Postman collection is available in the repository. The `GameId` is automatically set for subsequent requests, making it easier to create games and move players.

Although the basic functionality is implemented, edge cases have not been thoroughly tested, and error handling is limited. In future versions, the robustness and error responses could be improved to handle a broader range of scenarios.
