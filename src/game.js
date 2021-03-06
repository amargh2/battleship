import gameBoard from './gameBoard.js'
import player from './player.js'
import computerPlayer from './computerplayer.js'
import page from './page.js'
import generateComputerBoard from './generateComputerBoard.js'

function game() {
  const playerOne = player();
  const playerTwo = computerPlayer();
  const gameBoardOne = gameBoard();
  const gameBoardTwo = generateComputerBoard();
  page().generatePage(gameBoardOne, gameBoardTwo);
  
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
      page().toggleToMissed(gameBoardOne.getMap().misses, '#gameboardone');
      page().toggleToMissed(gameBoardTwo.getMap().misses, '#gameboardtwo')
      page().toggleToHit(gameBoardOne.getMap().hits, '#gameboardone')
      page().toggleToHit(gameBoardTwo.getMap().hits, '#gameboardtwo')
      page().updateScore(gameBoardTwo.getMap().hits.length, '1');
      page().updateScore(gameBoardOne.getMap().hits.length, '2');
      if (gameBoardOne.reportLoss() === true) {
        page().betterReportWinner('Computer')
      } if (gameBoardTwo.reportLoss() === true) {
        page().betterReportWinner('Player One')
      }
    })
  })
}

export default game