import game from './game.js';
import ship from './ship.js'

function page() { 

  function generateErrorSpan() {
    const shipsArea = document.getElementById('ships')
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error'
    errorDiv.className = 'relative right-50 px-3 justify-center py-6 text-sm'
    shipsArea.appendChild(errorDiv);
  }

  function reportError() {
    const errorDiv = document.getElementById('error')
    errorDiv.classList.add('bg-red-200')
    errorDiv.textContent = 'Make sure you select a valid tile!' 
  }

  function clearError() {
    const errorDiv = document.getElementById('error')
    errorDiv.textContent = ''
    errorDiv.classList.remove('bg-red-200')
  }

  // for now making this a single function, but it can easily be two or three to make it more
// extensible, reusable, able to change the rules/ships/whatever

  function generateVisualShips() {
    const shipDiv = document.createElement('div');
    const ship1 = document.createElement('div');
    shipDiv.id = 'ships'
    shipDiv.className = 'flex flex-col gap-2 px-3 py-1 rounded shadow-lg bg-slate-200 col-span-1 col-start-1 row-start-1'
    ship1.draggable = true;
    ship1.className = 'py-3 text-sm rounded-lg px-16 bg-blue-200';
    ship1.textContent = 'Ship Size: 5'
    ship1.dataset.size = 5   
    const ship2 = document.createElement('div')
    ship2.draggable = true;
    ship2.className = 'py-3 text-sm rounded-lg px-14 bg-blue-200'
    ship2.dataset.size = 4;
    ship2.textContent = 'Ship Size: 4';
    const ship3 = document.createElement('div')
    ship3.draggable = true;
    ship3.className = 'py-3 text-sm rounded-lg px-14 bg-blue-200'
    ship3.dataset.size = 4;
    ship3.textContent = 'Ship Size: 4';
    const ship4 = document.createElement('div')
    ship4.draggable = true;
    ship4.className = 'py-3 text-sm rounded-lg px-10 bg-blue-200'
    ship4.dataset.size = 3;
    ship4.textContent = 'Ship Size: 3';
    const ship5 = document.createElement('div')
    ship5.draggable = true;
    ship5.className = 'py-3 text-sm rounded-lg px-8 bg-blue-200'
    ship5.dataset.size = 2;
    ship5.textContent = 'Ship Size: 2';
    const ship6 = document.createElement('div')
    ship6.draggable = true;
    ship6.className = 'py-3 text-sm rounded-lg px-8 bg-blue-200'
    ship6.dataset.size = 2;
    ship6.textContent = 'Ship Size: 2';
    const shipMarkerArray = [ship1, ship2, ship3, ship4, ship5, ship6]
    shipMarkerArray.forEach((shipMarker) => {
    shipDiv.appendChild(shipMarker)
    })  
    const gameArea = document.getElementById('gameboardarea')
    gameArea.appendChild(shipDiv) 
  }

  function refreshOccupiedSpots(occupiedCoordinates) {
    const gameTiles = Array.from(document.getElementById('gameboardone').children);
    gameTiles.forEach(tile => {
      if (occupiedCoordinates.indexOf(tile.textContent) !== -1) {
        tile.className = `${tile.textContent} bg-blue-200 text-xs px-5 py-5 border-2 border-black`;
      } if (occupiedCoordinates.indexOf(tile.textContent) === -1) {
        tile.className = `${tile.textContent} bg-slate-200 text-xs px-5 py-5 border-2 border-black`
      }
    })
  }

  function addListenerForOccupied(playerGameBoard) {
    const tiles = Array.from(document.getElementById('gameboardone').children);
    tiles.forEach(tile => {
      tile.addEventListener('click', event => {  
        if (playerGameBoard.getMap().occupied.includes(event.target.textContent) && playerGameBoard.getMap().sizesToPlace.length > 0) {
          const coordinate = event.target.textContent
          const filtered = playerGameBoard.filterFromOccupied(coordinate)
          const arrayLength = playerGameBoard.getArrayFromCoordinate(coordinate).length
          const newArray = playerGameBoard.getCheckedCoordinatesWithCustomArray(arrayLength, coordinate, filtered)
          playerGameBoard.deleteCoordinatesFromOccupied(coordinate);
          playerGameBoard.disassociateShip(coordinate);
          playerGameBoard.pushCoordinatesDirectly(newArray);
          const newShip = ship(arrayLength, newArray);
          playerGameBoard.associateShip(newShip);
          const occupied = playerGameBoard.getMap();
          refreshOccupiedSpots(occupied.occupied);
        } 
      })
    })
  }

  function drag(board) {
    let dragged
    const divs = Array.from(document.getElementById('ships').children);
    divs.forEach((div) => {
      div.addEventListener('dragstart', event => {
        dragged = event.target;
        event.dataTransfer.setData('text', event.target.dataset.size);
      })
      div.addEventListener('drag', event => {
        event.preventDefault();
        clearError();
      })
      div.addEventListener('dragend', event => {
        event.preventDefault()
      })
    })
    const playerTilesArray = Array.from(document.getElementById('gameboardone').children);
      playerTilesArray.forEach((tile => {
        tile.addEventListener('dragover', event => {
          event.preventDefault()
        })
        tile.addEventListener('drop', event => {
          event.preventDefault()
          const size = event.dataTransfer.getData('text');
          const coords = board.getCheckedPlacementCoordinates(size, tile.textContent, board.getValidDirection(tile.textContent, size));
          if (coords === false) {
            page().reportError();
          }
          const shipObject = ship(size, coords)
          board.pushCoordinatesDirectly(coords);
          board.associateShip(shipObject);
          dragged.remove()
          board.shipPlacementUpdate(size);
          refreshOccupiedSpots(board.getMap().occupied)
          addListenerForOccupied(board);
        })
      }))
  }


  function generateBoardArea() {
    const gameBoardArea = document.createElement('div');
    gameBoardArea.id = 'gameboardarea'
    gameBoardArea.className = 'grid-cols-8 grid justify-center gap-2'
    const gameBoardOne = document.createElement('div');
    const gameBoardTwo = document.createElement('div');
    gameBoardOne.id = 'gameboardone';
    gameBoardTwo.id = 'gameboardtwo';
    gameBoardOne.classList = 'col-start-2 col-span-3'
    document.body.appendChild(gameBoardArea);
    gameBoardArea.appendChild(gameBoardOne);
    gameBoardArea.appendChild(gameBoardTwo);
  }
  
  function generateBoards() {
    const gameBoardOne = document.getElementById('gameboardone');
    const gameBoardTwo = document.getElementById('gameboardtwo');
    gameBoardOne.className = 'col-span-3 col-start-2 grid grid-cols-10 grid-rows-10'
    gameBoardTwo.className = 'col-span-3 col-start-5 span-3 grid grid-cols-10 grid-rows-10'
    const numberArray = [1,2,3,4,5,6,7,8,9,10];
    const letterArray = ['a','b','c','d','e','f','g','h','i','j'];
    numberArray.forEach((num) => {
      letterArray.forEach((letter) => {
        const coord = letter+num;
        const newDivOne = document.createElement('div');
        newDivOne.className = `${coord} text-xs px-5 py-5 border-2 bg-slate-200 border-black`;
        newDivOne.textContent = coord
        const newDivTwo = document.createElement('div')
        newDivTwo.className = `${coord} text-xs px-5 py-5 border-2 bg-slate-200 border-black`;
        newDivTwo.textContent = coord
        gameBoardOne.appendChild(newDivOne);
        gameBoardTwo.appendChild(newDivTwo);
      })
    })
  }
  
  // called in addlistenerforoccupied
  function displayPlayerShips(coordinates) {
    const childrenArray = Array.from(document.getElementById('gameboardone').children)
    coordinates.forEach((coord) => {
      childrenArray.forEach((item) => {
        if (item.textContent === coord) {
          item.className = `${coord} bg-blue-200 text-xs px-5 py-5 border-2 border-black`;
        } if (playerBoard.getMap().occupied.indexOf(coord) && item.classList.contains('bg-blue-200')) {
          item.classList.remove('bg-blue-200');
          item.classList.add('bg-slate-200')
        }
      })
    })
  }

  function generateHeader() {
    const headerDiv = document.createElement('div');
    headerDiv.textContent = 'Battleship';
    headerDiv.className = 'flex justify-center text-xl font-bold shadow-lg bg-slate-200 gap-2'
    document.body.appendChild(headerDiv);
  }

  function generateScoreBoard(score1 = 0, score2 = 0) {
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score'
    scoreDiv.className = 'flex justify-evenly font-bold gap-2'
    const scoreDiv1 = document.createElement('div');
    scoreDiv1.className = 'flex justify-center'
    scoreDiv1.id = 'scorediv1'
    const scoreDiv2 = document.createElement('div');
    scoreDiv1.textContent = `Player 1: ${score1}`;
    scoreDiv2.textContent = `Computer Player: ${score2}`
    scoreDiv2.id = 'scorediv2'
    scoreDiv.appendChild(scoreDiv1);
    scoreDiv.appendChild(scoreDiv2);
    document.body.appendChild(scoreDiv);
  }

  function toggleToMissed(missedArray, selector) {
    const divs = Array.from(document.querySelector(selector).children)
    divs.forEach((div) => {
      missedArray.forEach((missed) => {
        if (missed === div.textContent) {
          div.textContent = 'X';
        }
      });
    })
  }

  function toggleToHit(hitArray, selector) {
    const divs = Array.from(document.querySelector(selector).children);
    divs.forEach((div) => {
      hitArray.forEach((hit) => {
        if(hit === div.textContent) {
          div.classList.add('bg-red-200')
          div.classList.remove('bg-slate-200')
          div.classList.remove('bg-blue-200')
        }
      })
    })
  }

  function updateScore(score, playerNumber) {
    const scoreArea = document.getElementById(`scorediv${playerNumber}`)
    scoreArea.textContent = `Player ${playerNumber}: ${score}`
  }

  function generateResetButton() {
    const resetButtonDiv = document.createElement('div');
    const button = document.createElement('button');
    resetButtonDiv.className = 'flex justify-center py-4'
    button.className = 'reset bg-slate-200 hover:bg-blue-200 focus:ring-2 focus:ring-blue-200 focus:bg-white py-4 px-4 rounded-lg shadow-lg';
    button.id = 'reset';
    button.textContent = 'Reset'
    resetButtonDiv.appendChild(button);
    document.body.appendChild(resetButtonDiv);
  }

  function addResetListener() {
    const button = document.getElementById('reset')
    button.addEventListener('click', () => {
      const childrenDivs = [...document.body.children]
      childrenDivs.forEach((child) => {
        child.remove()
      })
      game()
    })
  }

  function reportWinner(string) {
    const gameBoardAreaChildrenArray = Array.from(document.getElementById('gameboardarea').children)
    gameBoardAreaChildrenArray.forEach(child => child.remove());
    const gameBoardArea = document.getElementById('gameboardarea'); 
    gameBoardArea.textContent = `${string}... You're a winner baby`
  }

  function betterReportWinner(string) {
    const scoreDiv = document.getElementById('score');
    const popUpDiv = document.createElement('div');
    popUpDiv.className = 'border-4 border-white bg-slate-200 gap-2 shadow sm:rounded-lg flex justify-center';
    const h3Div = document.createElement('div');
    h3Div.className = 'px-4 py-5 sm:p-6';
    const h3 = document.createElement('h3');
    h3.className = 'text-lg leading-6 font-medium text-gray-900';
    h3.textContent = `${string}... you're a winner baby.`
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'mt-5';
    const button = document.createElement('button');
    button.className = 'inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
    buttonDiv.appendChild(button);
    button.textContent = 'Play again!'
    h3Div.appendChild(h3);
    popUpDiv.appendChild(h3Div);
    popUpDiv.appendChild(buttonDiv);
    const gameBoardArea = document.getElementById('gameboardarea')
    const scoreDivChildren = Array.from(scoreDiv.children)
    scoreDivChildren.forEach(child => child.remove())
    scoreDiv.appendChild(popUpDiv)
    button.addEventListener('click', () => {
      const childrenDivs = [...document.body.children]
      childrenDivs.forEach((child) => {
        child.remove()
      })
      game()
    })
  }

  function generatePage(playerBoard, computerBoard) {
    generateHeader()
    generateScoreBoard(playerBoard.getMap().hits.length, computerBoard.getMap().hits.length);
    generateBoardArea();
    generateBoards();
    generateResetButton();
    addResetListener();
    generateVisualShips();
    generateErrorSpan();
    drag(playerBoard)
    addListenerForOccupied(playerBoard)
  }
  
  return {
    generatePage,
    toggleToHit,
    toggleToMissed,
    displayPlayerShips,
    generateScoreBoard,
    reportError,
    clearError,
    generateErrorSpan,
    refreshOccupiedSpots,
    updateScore,
    reportWinner,
    betterReportWinner,
  }
}

export default page