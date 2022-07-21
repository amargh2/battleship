
function gameTwo() {
  const playerOne = player();
  const playerTwo = computerPlayer();
  const gameBoardOne = gameBoard();
  const gameBoardTwo = gameBoard();

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
  page().generateVisualShips();
  page().generateErrorSpan();
  page().generateBoards();
  page().displayPlayerShips(gameBoardOne.getMap().occupied);
  page().generateResetButton();
  // page().playerPlacementTileListener(gameBoardOne)
  page().drag(gameBoardOne)
  // adding event listener here, since it's the loop
  const visualComputerBoard = document.getElementById('gameboardtwo')
  const divArray = Array.from(visualComputerBoard.children);
  divArray.forEach((div) => {
    div.addEventListener('click', () => {
      if (gameBoardOne.getMap().sizesToPlace.length > 0) {
        console.log('no')
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
      return gameBoardOne.getMap() 
    })
  })
}
gameTwo()