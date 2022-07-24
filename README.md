# battleship
                    ---- BATTLESHIP ----

---- Summary ---

BattleShip game with drag and drop, ship direction toggle, and fully functional ship attack and sinking, winner reporting and reset button. The game logic was built using TDD (Jest). 

---- Directions to Use This Program ----

To play, simply drag and drop the ships where you would like them. You can change where the ship is placed by clicking any coordinate it occupies and a new ship position will populate from that spot. Drag and drop checks for collisions of each direction and chooses proper direction or returns an error when wrong. Once all the ships are placed, you are locked in and can start attacking the computer board by clicking any place on the grid. If you hit, your score goes up, and the square turns red. If you miss, the square becomes an X. After you click on the square, the computer takes its turn (completely random right now; will build logic for the computer in the future, as the bones for doing that are already there (eliminating/choosing neighbor coordinates, directions, etc..). 

--- Person Reflections ----

I really enjoyed using TDD and can't wait to use it in conjunction with React in future projects. It helped me get off the ground since I did this project with very little guidance except suggestions about classes/objects neeeded to build the game. Little by little the functions and necessary values kept coming together, and it was a pleasure to write tests for different cases, and slowly root out unintended behavior and side effects to get things working well. 

Note: The tests are likely to break now since I grew a bit complacent once I had to start manipulating and building the DOM, but still enjoyed this project a lot. 

The game could absolutely use some more features, better styling, and maybe GIF incorporation to make it more visually interesting, but it's a fully functioning game, and I'm happy with that for now.