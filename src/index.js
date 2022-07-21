/* eslint-disable import/extensions */
import './styles.css'
import gameBoard from './gameBoard.js'
import player from './player.js'
import computerPlayer from './computerplayer.js'
import ship  from './ship.js'
import page from './page.js'

const playerOne = player.player();
const playerTwo = computerPlayer.computerPlayer();
const gameBoardOne = gameBoard.gameBoard();
const gameBoardTwo = gameBoard.gameBoard();

const p2Ship1 = ship(5, gameBoardTwo.getCheckedCoordinates(5));
const p2Ship2 = ship(4, gameBoardTwo.getCheckedCoordinates(4));
const p2Ship3 = ship(4, gameBoardTwo.getCheckedCoordinates(4));
const p2Ship4 = ship(3, gameBoardTwo.getCheckedCoordinates(3));
const p2Ship5 = ship(2, gameBoardTwo.getCheckedCoordinates(2));
const p2Ship6 = ship(2, gameBoardTwo.getCheckedCoordinates(2));

gameBoardTwo.associateShip(p2Ship1);
gameBoardTwo.associateShip(p2Ship2);
gameBoardTwo.associateShip(p2Ship3);
gameBoardTwo.associateShip(p2Ship4);
gameBoardTwo.associateShip(p2Ship5);
gameBoardTwo.associateShip(p2Ship6);

page().generateHeader();
page().generateScoreBoard(gameBoardOne.getMap().hits.length, gameBoardTwo.getMap().hits.length);
page().generateBoardArea();
page().generateBoards()
page().displayPlayerShips(gameBoardOne.getMap);
page().generateResetButton()

function game() {
  const playerOne = player;
  const playerTwo = computerPlayer;
  const gameBoardOne = gameBoard.gameBoard();
  const gameBoardTwo = gameBoard.gameBoard();
  const newShip = ship
  const pageGen = page.page()
  
  const p2Ship1 = newShip.ship(5, gameBoardTwo.getCheckedCoordinates(5));
  const p2Ship2 = newShip.ship(4, gameBoardTwo.getCheckedCoordinates(4));
  const p2Ship3 = newShip.ship(4, gameBoardTwo.getCheckedCoordinates(4));
  const p2Ship4 = newShip.ship(3, gameBoardTwo.getCheckedCoordinates(3));
  const p2Ship5 = newShip.ship(2, gameBoardTwo.getCheckedCoordinates(2));
  const p2Ship6 = newShip.ship(2, gameBoardTwo.getCheckedCoordinates(2));

  gameBoardTwo.associateShip(p2Ship1);
  gameBoardTwo.associateShip(p2Ship2);
  gameBoardTwo.associateShip(p2Ship3);
  gameBoardTwo.associateShip(p2Ship4);
  gameBoardTwo.associateShip(p2Ship5);
  gameBoardTwo.associateShip(p2Ship6);

  pageGen.generateHeader();
  pageGen.generateScoreBoard(gameBoardOne.getMap().hits.length, gameBoardTwo.getMap().hits.length);
  pageGen.generateBoardArea();
  pageGen.generateVisualShips();
  pageGen.generateErrorSpan();
  pageGen.generateBoards();
  pageGen.displayPlayerShips(gameBoardOne.getMap().occupied);
  pageGen.generateResetButton();
  // page().playerPlacementTileListener(gameBoardOne)
  pageGen.drag(gameBoardOne)
  // adding event listener here, since it's the loop
  const visualComputerBoard = document.getElementById('gameboardtwo')
  const divArray = Array.from(visualComputerBoard.children);
  divArray.forEach((div) => {
    div.addEventListener('click', () => {
      if (gameBoardOne.getMap().sizesToPlace.length > 0) {
        return false
      }
      if (div.textContent === 'X' || div.classList.contains('bg-red-200')) {
        return false
      }
      gameBoardTwo.receiveHit(playerOne.attack(`${div.textContent}`));
      gameBoardOne.receiveHit(playerTwo.randomAttack());
      gameBoardOne.reportSunkenShips();
      gameBoardTwo.reportSunkenShips();
      pageGen().toggleToMissed(gameBoardOne.getMap().misses, '#gameboardone');
      pageGen().toggleToMissed(gameBoardTwo.getMap().misses, '#gameboardtwo')
      pageGen().toggleToHit(gameBoardOne.getMap().hits, '#gameboardone')
      pageGen().toggleToHit(gameBoardTwo.getMap().hits, '#gameboardtwo')
      pageGen().updateScore(gameBoardTwo.getMap().hits.length, '1');
      pageGen().updateScore(gameBoardOne.getMap().hits.length, '2');
    })
  })
}

game()