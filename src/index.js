/* eslint-disable no-param-reassign */
import './styles.css'

function shipTwo(length, coordinates) {
  
  if (coordinates === false) {
    return false
  }
  
  const map = {
  }
  
  
  coordinates.forEach((coord) => {
    map[coord] = coord;
  })
  
  function hit(coordinate) {
    if (map[coordinate] === 'hit') {
      return false
    }
    map[coordinate] = 'hit'
    this.hits += 1
    return this.hits
  }

  function isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
    return this.sunk
  }
  
  function setCoordinates(coords) {
    coords.forEach(coord => coordinates.push(coord))
    return coordinates
  }

  function getMap() { 
    return map
  }

  function getName() {
    return this.name
  }

  return {
    getName,
    getMap,
    map,
    length,
    sunk: false,
    hits: 0,
    hit,
    isSunk,
    setCoordinates,
    coordinates:[],
  }
}


function gameBoard() {
  const numberArray = [1,2,3,4,5,6,7,8,9,10]
  const letterArray = ['a','b','c','d','e','f','g','h','i','j']
  const map = {
    occupied: [],
    misses: [],
    hits: [],
    sunk: [],
    shipsOnBoard: [],
    neighborCoordinates: [],
    allSunk:false
  }

  function generateRandomCoordinate() {
    const randomLetterIndex = Math.floor(Math.random() * letterArray.length);
    const randomLetter = letterArray[randomLetterIndex];
    const randomNumberIndex = Math.floor(Math.random() * numberArray.length);
    const randomNumber = numberArray[randomNumberIndex]
    return randomLetter+randomNumber
  }

  function getRandomLetter() {
    const randomLetterIndex = Math.floor(Math.random() * letterArray.length);
    return letterArray[randomLetterIndex]
  }

  function getRandomNumber () {
    const randomNumberIndex = Math.floor(Math.random() * numberArray.length)
    return numberArray[randomNumberIndex]
  }

  // gets index of letter input
  function letterMatch(letter) {
    return letterArray.indexOf(letter)  
  }
  // checks letter + direction validity -- will throw an error to user eventually
  // for now, terminates the process by returning false
  function checkLetter(letter, length, direction) {
    const letterIndex = letterMatch(letter);
    if ((letterIndex + length) > 9 && direction === 'right') {
      return false 
    } if ((letterIndex - length) < 0 && direction ==='left') {
      return false
    }
    return true
  }
  // checks number +_direction for validity -- same as checkLetter;
  function checkNumber(number, length, direction) {
    if(parseInt(number, 10) > 10) {
      return false
    }
    if ((parseInt(number, 10) - 1 + length > 9) && direction === 'down') {
      return false
    } if ((parseInt(number, 10) - 1 - length < 0) && direction === 'up') {
      return false
    }
    return true
  }
  // gets letters and direction and puts them into array; 
  // gets letter coordinates 
  function getLetters(letter, length, direction) {
    const index = letterMatch(letter);
    const letterCoordinates = [];
    if (direction === 'down') {
      for (let i = 0; i < length; i += 1){
        letterCoordinates.push(letter);
      } 
    } if (direction === 'up') {
      for(let i=0; i < length; i += 1) {
        letterCoordinates.push(letter);
      }
    } if (direction === 'right') {
      for(let i = 0; i < length; i += 1) {
        letterCoordinates.push(letterArray[index+i]);
      }
    } if (direction === 'left') {
      for(let i = 0; i < length; i += 1) {
        letterCoordinates.push(letterArray[index-i]);
      }
    }
    return letterCoordinates
  }
  // returns the number coordinates based on choice
  function getNumbers(number, length, direction) {
    const numberCoordinates = []
    if (direction === 'down') {
      for (let i = 0; i < length; i += 1) {
        numberCoordinates.push(parseInt(number,10)+i);
      }
    } if (direction === 'up') {
      for (let i = 0; i < length; i += 1) {
        numberCoordinates.push(parseInt(number,10)-i);
      }
    } if (direction === 'right' || direction === 'left') {
      for (let i = 0; i <  length; i +=1) {
        numberCoordinates.push(parseInt(number,10));
      }
    }
    return numberCoordinates
  }
  // combines the arrays into simple coordinates (ie, 'j5', 'j3', etc.)
  function combineCoordinates(numberCoordinates, letterCoordinates) {
    const combined = []
    for (let i = 0; i < numberCoordinates.length; i += 1) {
      combined.push(letterCoordinates[i] + numberCoordinates[i])
    }
    return combined
  }

  function pushCoordinatesDirectly(coords) {
    coords.forEach((coord) => map.occupied.push(coord))
  }

  // receives coordinates and pushes to the proper array; also returns
  // a value; true if a hit; false if not; if true will send hit to appropriate
  // i think it makes sense for the receive hit to subsume the pass hit to ship
  // function, since it checks for a hit anyway; makes it easier to write the loop
  // and the functions themselves stand up on their own fairly well (i think!)

  function passHitToShip(coord) {
    map.shipsOnBoard.forEach((ship) => {
      if (Object.keys(ship.map).includes(coord)) {
        ship.hit(coord)
      } else {
        return false
      }
      return map.shipsOnBoard
    })
  }

  
  function receiveHit(coordinate) {
    if (map.occupied.includes(coordinate) === true) {
      map.hits.push(coordinate)
      passHitToShip(coordinate)
      return true
    } if (map.occupied.includes(coordinate) === false) {
      map.misses.push(coordinate)
      return false
    }
    return false
   }

   // returns the map
  function getMap() {
    return map
  }

  // adds the ship to the ship array
  function associateShip(boat) {
    map.shipsOnBoard.push(boat)
    return map.shipsOnBoard
  }
  // shows the hits array
  function getHits() {
    return map.hits
  }

  function reportSunkenShips() {
    map.shipsOnBoard.forEach((ship) => {
      ship.isSunk();
      if (ship.isSunk() === true) {
        map.sunk.push(ship)
      }
      return map.sunk
    })
    return map.sunk
  }

  function reportLoss() {
    if (map.sunk.length === map.shipsOnBoard.length) {
      map.allSunk = true;
    }
    return map.allSunk
  }

  function getRandomDirection() {
    const directions = ['right', 'left', 'up', 'down'];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex]
  }

  function getValidDirection(coord, length) {
    const directions = ['right', 'left', 'up', 'down'];
    const letter = coord[0];
    const number = parseInt(coord.slice(1), 10)
    const lengthNumber = parseInt(length, 10)
    if (letterMatch(letter) + lengthNumber > 9) {
      directions.splice(directions.indexOf('right'), 1);
    } if (letterMatch(letter) - lengthNumber < 0) {
      directions.splice(directions.indexOf('left'), 1);
    } if (number + lengthNumber > 10) {
      directions.splice(directions.indexOf('down'), 1);
    } if (number - lengthNumber < 0) {
      directions.splice(directions.indexOf('up'), 1);
    }
    console.log(directions)
    directions.forEach((direction) => {
      const coordinates = getCoordinatesFromCoordinate(length, coord, direction)
      if (checkIfContained(coordinates) === false || scanForDoubles(coordinates) === false) {
        const directionIndex = directions.indexOf(direction)
        directions.splice(directionIndex, 1)
      }
    })
    const randomChoiceIndex = Math.floor(Math.random() * directions.length)
    console.log(directions)
    return directions[randomChoiceIndex]
  }

  function getRandomCoordinates(shipLength) {
    let startingLetter = getRandomLetter();
    let startingNumber = getRandomNumber();
    const direction = getRandomDirection();
    // check letter and number with direction and length to make sure it is 'legal'
    let numberCheck = checkNumber(startingNumber, shipLength, direction);
    let letterCheck = checkLetter(startingLetter, shipLength, direction);
    while (letterCheck === false) {
      startingLetter = getRandomLetter()
      letterCheck = checkLetter(startingLetter, shipLength, direction)
    }
    while (numberCheck === false) {
      startingNumber = getRandomNumber()
      numberCheck = checkNumber(startingNumber, shipLength, direction)
    }
    // gets letter array [includes more checks]
    const letterCoordinates = getLetters(startingLetter, shipLength, direction);
    const numberCoordinates = getNumbers(startingNumber, shipLength, direction);
    const combinedArray = combineCoordinates(numberCoordinates, letterCoordinates);
    return combinedArray
  }

  function getCoordinatesFromCoordinate(shipLength, coordinate, direction) {
    const startingLetter = coordinate[0];
    const startingNumber = coordinate.slice(1);

    // check letter and number with direction and length to make sure it is 'legal'
    
    // gets letter array [includes more checks]
    const letterCoordinates = getLetters(startingLetter, shipLength, direction);
    const numberCoordinates = getNumbers(startingNumber, shipLength, direction);
    const combinedArray = combineCoordinates(numberCoordinates, letterCoordinates);
    return combinedArray
  }

  function scanForDoubles(array) {
    let truthValue = true;
    for (let i = 0; i < array.length; i += 1) {
      if (map.occupied.includes(array[i])) {
        truthValue = false
        break
      }
    }
    return truthValue
  }
/* this is a little complicated and i think there is a better way to do it with total array values,
but the idea is that the occupied spots are taken; map then produces the neighbor coordinates;
the coordinates are evaluated against the neighbors; if a coord exists in the neighbor array,
false is returned */

function splitCoordinate(coordinate) {
  const newArray = coordinate.split('');
  const letter = newArray[0];
  const number = newArray[1];
  return [letter, number]
}

function createNeighborCoordinates() {
  const neighborCoordinates = []  
  map.occupied.forEach((coord) => {
    const splitArray = splitCoordinate(coord);
    const letterIndex = letterMatch(splitArray[0]);
    const numberIndex = numberArray.indexOf(parseInt(splitArray[1], 10));
    const neighborCoord1 = letterArray[letterIndex-1] + numberArray[numberIndex-1];
    const neighborCoord2 = letterArray[letterIndex -1] + numberArray[numberIndex];
    const neighborCoord3 = letterArray[letterIndex -1] + numberArray[numberIndex +1];
    const neighborCoord4 = letterArray[letterIndex] + numberArray[numberIndex+1];
    const neighborCoord5 = letterArray[letterIndex] + numberArray[numberIndex-1];
    const neighborCoord6 = letterArray[letterIndex+1] + numberArray[numberIndex+1]
    const neighborCoord7 = letterArray[letterIndex+1] + numberArray[numberIndex -1];
    const neighborCoord8 = letterArray[letterIndex+1] + numberArray[numberIndex];
    neighborCoordinates.push(neighborCoord1, neighborCoord2, neighborCoord3, neighborCoord4, neighborCoord5, neighborCoord6, neighborCoord7, neighborCoord8)
  })  
  return neighborCoordinates
}
// my reasoning for this true equals false stuff is that false = bad value/start again from the gameboards point of view
function checkIfContained(coordinates) {
  let value = true
  const neighborCoordinates = createNeighborCoordinates(map.occupied)
  if ((neighborCoordinates.some(coord => coordinates.includes(coord))) === true) {
    value = false;
  }
  return value;
}

  function getCheckedCoordinates(length) {
    let coordinates = getRandomCoordinates(length);
    while (coordinates === false || checkIfContained(coordinates) === false || scanForDoubles(coordinates) === false) {
      coordinates = getRandomCoordinates(length)
    }
    console.log(coordinates)
    pushCoordinatesDirectly(coordinates)
    console.log(map.occupied)
    return coordinates
  }

  function getCheckedPlacementCoordinates(length, coordinate) {
    const direction = getValidDirection(coordinate, length)
    const coordinates = getCoordinatesFromCoordinate(length, coordinate, direction);
    console.log(checkIfContained(coordinates))
    console.log(scanForDoubles(coordinates))
    console.log(createNeighborCoordinates(map.occupied))
    if (checkIfContained(coordinates) === false || scanForDoubles(coordinates) === false) {
      return false
    }
    console.log(coordinates)
    return coordinates
  }

  function selectionRoutine() {
    
  }
  
  
  return {
    getCheckedPlacementCoordinates,
    splitCoordinate,
    checkIfContained,
    createNeighborCoordinates,
    getCheckedCoordinates,
    // checkCoordinates,
    scanForDoubles,
    getRandomCoordinates,
    generateRandomCoordinate,
    reportSunkenShips,
    reportLoss,
    getHits,
    getMap,
    passHitToShip,
    receiveHit,
    letterMatch,
    getLetters,
    checkLetter,
    checkNumber,
    getNumbers,
    combineCoordinates,
    associateShip,
    pushCoordinatesDirectly,
  }
}
// player functions

function player() {
  const playerInfo = {
    name: '',
  }

  function attack(attackCoordinate) {
    return attackCoordinate
  }

  function setName(name) {
    playerInfo.name = name
  }

  function getName() {
    return playerInfo.name
  }
  
  return {
    setName,
    getName,
    attack,
  }
}

function computerPlayer() {
  const attemptedAttacks = []
  
  function getRandomNumber() {
    const numberArray = ['1','2','3','4','5','6','7','8','9','10'];
    const randomNumberIndex = Math.floor(Math.random() * numberArray.length)
    const randomNumber = numberArray[randomNumberIndex]
    return randomNumber
  }

  function getRandomLetter() {
    const letterArray = ['a','b','c','d','e','f','g','h','i','j'];
    const randomLetterIndex = Math.floor(Math.random() * letterArray.length);
    const randomLetter = letterArray[randomLetterIndex]
    return randomLetter
  }

  function newCoordinate() {
    const coordinates = [getRandomLetter(), getRandomNumber()]
    return coordinates.join('')
  }
  
  function randomAttack() {
    let attackCoordinate = newCoordinate()
    while (attemptedAttacks.includes(attackCoordinate) === true) {
      attackCoordinate = newCoordinate()
    }
    attemptedAttacks.push(attackCoordinate)
    return attackCoordinate;
  }

  return {
    randomAttack,
    attemptedAttacks,
  }
}

function page() { 

  function generateContainerDiv() {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'px-4 py-4';
  }
// for now making this a single function, but it can easily be two or three to make it more
// extensible, reusable, able to change the rules/ships/whatever
  function generateVisualShips() {
    const shipDiv = document.createElement('div');
    const ship1 = document.createElement('div');
    
    shipDiv.className = 'flex justify-start gap-2 px-3 py-1 shadow-lg bg-slate-200'
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
    ship4.className = 'py-3 text-sm rounded-lg px-14 bg-blue-200'
    ship4.dataset.size = 3;
    ship4.textContent = 'Ship Size: 3';
    const ship5 = document.createElement('div')
    ship5.draggable = true;
    ship5.className = 'py-3 text-sm rounded-lg px-14 bg-blue-200'
    ship5.dataset.size = 2;
    ship5.textContent = 'Ship Size: 2';
    const ship6 = document.createElement('div')
    ship6.draggable = true;
    ship6.className = 'py-3 text-sm rounded-lg px-14 bg-blue-200'
    ship6.dataset.size = 2;
    ship6.textContent = 'Ship Size: 2';
    const shipMarkerArray = [ship1, ship2, ship3, ship4, ship5, ship6]
    shipMarkerArray.forEach((ship) => {
      ship.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text', ship.dataset.size)
      })
      ship.addEventListener('drag', event => {
        event.preventDefault()
      })
      ship.addEventListener('dragend', event => {
        event.preventDefault()
      })
    shipDiv.appendChild(ship)
    })  
    document.body.appendChild(shipDiv)
  }

  function generateBoardArea() {
    const gameBoardArea = document.createElement('div');
    gameBoardArea.id = 'gameboardarea'
    gameBoardArea.className = 'flex justify-center gap-2'
    const gameBoardOne = document.createElement('div');
    const gameBoardTwo = document.createElement('div');
    gameBoardOne.id = 'gameboardone';
    gameBoardTwo.id = 'gameboardtwo';
    gameBoardOne.classList = 'grid grid-cols-6'
    document.body.appendChild(gameBoardArea);
    gameBoardArea.appendChild(gameBoardOne);
    gameBoardArea.appendChild(gameBoardTwo);
  }
  
  function generateBoards() {
    const gameBoardOne = document.getElementById('gameboardone');
    const gameBoardTwo = document.getElementById('gameboardtwo');
    gameBoardOne.className = 'col-span-2 grid grid-cols-10 grid-rows-10'
    gameBoardTwo.className = 'col span-2 grid grid-cols-10 grid-rows-10'
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

  function playerPlacementTileListener(gameBoard) {
    const playerTilesArray = Array.from(document.getElementById('gameboardone').children);
    playerTilesArray.forEach((tile => {
      tile.addEventListener('dragover', event => {
        event.preventDefault();
      })
      tile.addEventListener('drop', event => {
        event.preventDefault()
        const size = event.dataTransfer.getData('text')
        const coord = tile.textContent[0]
        const number = tile.textContent.slice(1)
        const coords = gameBoard.getCheckedPlacementCoordinates(size, tile.textContent);
        console.log(coords)
        const shipObject = shipTwo(size, coords)
        gameBoard.pushCoordinatesDirectly(coords)
        page().displayPlayerShips(gameBoard.getMap().occupied);
        gameBoard.associateShip(shipObject)
      })
  })
)}

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
    button.addEventListener('click', () => {
      const childrenDivs = [...document.body.children]
      childrenDivs.forEach((child) => {
        child.remove()
      })
      gameTwo()
    })
  }

  return {
    playerPlacementTileListener,
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
  }
}

function gameTwo() {
  const playerOne = player();
  const playerTwo = computerPlayer();
  const gameBoardOne = gameBoard();
  const gameBoardTwo = gameBoard();

  const p1Ship1 = shipTwo(3, gameBoardOne.getCheckedCoordinates(3));
  const p1Ship2 = shipTwo(4, gameBoardOne.getCheckedCoordinates(4));
  const p1Ship3 = shipTwo(3, gameBoardOne.getCheckedCoordinates(3));
  const p2Ship1 = shipTwo(4, gameBoardTwo.getCheckedCoordinates(4));
  const p2Ship2 = shipTwo(4, gameBoardTwo.getCheckedCoordinates(4));
  const p2Ship3 = shipTwo(2, gameBoardTwo.getCheckedCoordinates(2));

  gameBoardOne.associateShip(p1Ship1);
  gameBoardOne.associateShip(p1Ship2);
  gameBoardOne.associateShip(p1Ship3);

  gameBoardTwo.associateShip(p2Ship1);
  gameBoardTwo.associateShip(p2Ship2);
  gameBoardTwo.associateShip(p2Ship3);

  page().generateHeader();
  page().generateScoreBoard(gameBoardOne.getMap().hits.length, gameBoardTwo.getMap().hits.length);
  page().generateVisualShips();
  page().generateBoardArea();
  page().generateBoards();
  page().displayPlayerShips(gameBoardOne.getMap().occupied);
  page().generateResetButton();
  page().playerPlacementTileListener(gameBoardOne)
  
  // adding event listener here, since it's the loop
  const visualComputerBoard = document.getElementById('gameboardtwo')
  const divArray = Array.from(visualComputerBoard.children);
  divArray.forEach((div) => {
    div.addEventListener('click', () => {
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
      console.log(gameBoardOne.getMap().occupied)
    })
  })
}
gameTwo()



module.exports = {
  gameBoard,
  shipTwo,
  player,
  // game,
  computerPlayer,
  // page,
}
