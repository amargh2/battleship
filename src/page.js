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
    shipMarkerArray.forEach((ship) => {
     /* ship.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text', ship.dataset.size)
      })
      ship.addEventListener('drag', event => {
        event.preventDefault()
        clearError()
      })
      ship.addEventListener('dragend', event => {
        event.preventDefault()
      }) */
    shipDiv.appendChild(ship)
    })  
    const gameArea = document.getElementById('gameboardarea')
    gameArea.appendChild(shipDiv) 
  }

  function addListenerForOccupied(playerGameBoard) {
    const tiles = Array.from(document.getElementById('gameboardone').children);
    tiles.forEach(tile => {
      tile.addEventListener('click', event => {  
        if (tile.classList.contains('bg-blue-200')) {
          const coordinate = event.target.textContent
          const filtered = playerGameBoard.filterFromOccupied(coordinate)
          const arrayLength = playerGameBoard.getArrayFromCoordinate(coordinate).length
          console.log(arrayLength)
          console.log(playerGameBoard.getCheckedCoordinatesWithCustomArray(arrayLength, coordinate, filtered))
        } 
      })
    })
  }

  function drag(board) {
    let dragged
    const divs = Array.from(document.getElementById('ships').children);
    divs.forEach((ship) => {
      ship.addEventListener('dragstart', event => {
        dragged = event.target;
        event.dataTransfer.setData('text', ship.dataset.size);
      })
      ship.addEventListener('drag', event => {
        event.preventDefault();
        clearError();
      })
      ship.addEventListener('dragend', event => {
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
          page().displayPlayerShips(board.getMap().occupied);
          board.associateShip(shipObject);
          dragged.remove()
          board.shipPlacementUpdate(size);
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

  function displayPlayerShips(coordinates) {
    const childrenArray = Array.from(document.getElementById('gameboardone').children)
    coordinates.forEach((coord) => {
      childrenArray.forEach((item) => {
        if (item.classList.contains(coord)) {
          item.className = `${coord} bg-blue-200 text-xs px-5 py-5 border-2 border-black`
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
    
  async function playerInput() {
    const computerBoard = document.getElementById('gameboardtwo');
    const childrenDivs = Array.from(computerBoard.children);
    childrenDivs.forEach((div) => {
      div.addEventListener('click', () => {
        const input = div.textContent;
        return input
      })
    })    
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

  function generateResetButton(callback) {
    const resetButtonDiv = document.createElement('div');
    const button = document.createElement('button');
    resetButtonDiv.className = 'flex justify-center py-4'
    button.className = 'reset bg-slate-200 hover:bg-blue-200 focus:ring-2 focus:ring-blue-200 focus:bg-white py-4 px-4 rounded-lg shadow-lg';
    button.id = 'reset';
    button.textContent = 'Reset'
    resetButtonDiv.appendChild(button);
    document.body.appendChild(resetButtonDiv);
    button.addEventListener('click', () => {
      const childrenDivs = [...document.body.children]
      childrenDivs.forEach((child) => {
        child.remove()
      })
      callback
    })
  }

  return {
    addListenerForOccupied,
    drag,
    generateVisualShips,
    generateResetButton,
    updateScore,
    toggleToHit,
    toggleToMissed,
    playerInput,
    generateHeader,
    generateBoardArea,
    generateBoards,
    displayPlayerShips,
    generateScoreBoard,
    reportError,
    clearError,
    generateErrorSpan,
  }
}

export default {page}