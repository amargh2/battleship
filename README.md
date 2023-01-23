### Battleship
BattleShip game with drag and drop, ship direction toggle, ship attack and sinking, winner reporting and reset button. The initial game logic was built using TDD (Jest) and most HTML elements are generated via the JS DOM API.

## About this project
This is the first 'full-scale' application I built with any programming language (plain JavaScript), and I'm sure the code shows that! A big refactor is in order, but the game works pretty well in its current state. 

Most of the UI is generated with DOM manipulation/appending elements to the tree. I also accidentally implemented one extra rule that is actually not in Battleship. That accidental extra rule is that ships cannot be directly adjacent to one another. So if you notice weird behavior when placing your ships, or why can't I put this ship right next to this other ship, it's because I added an extra bit of 'collision detection' for the ships on placement that makes sure there's at least one space between a ship and another ship.

## Directions to Use This Program

To play, simply drag and drop the ships where you would like them. You can change where the ship is placed by clicking any coordinate it occupies and a new ship position will populate from that spot. Drag and drop checks for collisions of each direction and chooses proper direction or returns an error when wrong. Once all the ships are placed, you are locked in and can start attacking the computer board by clicking any place on the grid. If you hit, your score goes up, and the square turns red. If you miss, the square becomes an X. After you click on the square, the computer takes its turn (completely random right now; will build logic for the computer in the future, as the bones for doing that are already there (eliminating/choosing neighbor coordinates, directions, etc..). 

## What I learned
The big learning experience for me was getting better acquainted with JavaScript generally speaking. I learned a lot about types, the DOM API, and event driven programming. JavaScript is quirky but cool. Like me. :)

I really enjoyed using TDD at the start of the project. It helped me get off the ground and think more about the messages my app was sending to other parts of the app, and that really helped me keep sight of end goals for my functions. Little by little the functions, objects, and necessary values kept coming together.

As I started building out the virtual DOM and UI elements, some of the tests did break, and I haven't quite gotten back to refactoring and fixing them. But that's in the works. :)