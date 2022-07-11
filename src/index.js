import './styles.css'

function shipTwo(length, coordinates) {
  const map = {
  }

  function setName() {
    if (this.length === 2) {
      this.name = 'Destroyer'
    } if (this.length === 3) {
      this.name = 'Cruiser'
    } if (this.length === 4) {
      this.name = 'Battleship'
    } if (this.length === 5) {
      this.name = 'Carrier'
    }
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
    name:setName(),
    getName,
    getMap,
    setName,
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
    allSunk:false
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
    if ((number + length > 10) && direction === 'down') {
      return false
    } if ((number - length < 0) && direction === 'up') {
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
        numberCoordinates.push(number+i);
      }
    } if (direction === 'up') {
      for (let i = 0; i < length; i += 1) {
        numberCoordinates.push(number-i);
      }
    } if (direction === 'right' || direction === 'left') {
      for (let i = 0; i <  length; i +=1) {
        numberCoordinates.push(number);
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
    combined.forEach(coord => map.occupied.push(coord))
    return map.occupied
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

  return {
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

/* for my reference: where name, length, (quant): 
Carrier 5 (1); Batleship 4 (2); Cruiser 3 (3); 
Submarine 4 (3) Destroyer 2 (5); 44 occupied spots on board */

function game() {
  // instantiation of player and gameboard objects
  const playerOne = player();
  const playerTwo = player();
  const gameBoardOne = gameBoard();
  const gameBoardTwo = gameBoard();
  
  // assigning occupied coordinates -- manual for now; input/random later
  gameBoardOne.pushCoordinatesDirectly(['a1', 'a2', 'a3', 'c1', 'd1', 'e1', 'f1', 'b4', 'c4', 'd4'])
  gameBoardTwo.pushCoordinatesDirectly(['c3', 'c4', 'c5', 'c6', 'b3', 'c3', 'd3', 'e3', 'a1','a2'])
  
  // ship creation and association to the boards
  const p1Ship1 = shipTwo(3, ['a1', 'a2', 'a3']);
  const p1Ship2 = shipTwo(4, ['c1', 'd1', 'e1', 'f1']);
  const p1Ship3 = shipTwo(3, ['b4', 'c4', 'd4'])
  const p2Ship1 = shipTwo(4, ['c3', 'c4', 'c5', 'c6'])
  const p2Ship2 = shipTwo(4, ['f3', 'f4', 'f5', 'f6'])
  const p2Ship3 = shipTwo(4, ['a1','a2'])

  gameBoardOne.associateShip(p1Ship1);
  gameBoardOne.associateShip(p1Ship2);
  gameBoardOne.associateShip(p1Ship3);

  gameBoardTwo.associateShip(p2Ship1);
  gameBoardTwo.associateShip(p2Ship2);
  gameBoardTwo.associateShip(p2Ship3);

  // simple test of the dom stuff
  page().displayPlayerShips(gameBoardOne.getMap().occupied)

  // basic structure of the attack
  while (gameBoardOne.reportLoss() === false || gameBoardTwo.reportLoss() === false) {
    gameBoardTwo.receiveHit(playerOne.attack(playerinput));
    gameBoardOne.receiveHit(playerTwo.randomAttack());
    gameBoardOne.reportSunkenShips();
    gameBoardTwo.reportSunkenShips();
  }
  
}

// for fun and laughs and practice i wrote the page to generate
// entirely with JavaScript

function page() { 

  function generateBoardArea() {
    const gameBoardArea = document.createElement('div');
    gameBoardArea.id = 'gameboardarea'
    gameBoardArea.className = 'flex justify-center gap-2'
    const gameBoardOne = document.createElement('div');
    const gameBoardTwo = document.createElement('div');
    gameBoardOne.id = 'gameboardone';
    gameBoardTwo.id = 'gameboardtwo';
    gameBoardOne.classList = 'grid grid-template-rows'
    document.body.appendChild(gameBoardArea);
    gameBoardArea.appendChild(gameBoardOne);
    gameBoardArea.appendChild(gameBoardTwo);
  }
  
  function generateBoards() {
    const gameBoardOne = document.getElementById('gameboardone');
    const gameBoardTwo = document.getElementById('gameboardtwo');
    gameBoardOne.className = 'grid grid-cols-10 grid-rows-10'
    gameBoardTwo.className = 'grid grid-cols-10 grid-rows-10'
    const numberArray = [1,2,3,4,5,6,7,8,9,10];
    const letterArray = ['a','b','c','d','e','f','g','h','i','j'];
    numberArray.forEach((num) => {
      letterArray.forEach((letter) => {
        let coord = letter+num;
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
      const children = document.getElementById('gameboardone').children;
      const childrenArray = [...children]
      coordinates.forEach((coord) => {
        childrenArray.forEach((child) => {
          if (child.classList.contains(coord)) {
            child.className = `${coord} bg-blue-200 text-xs px-5 py-5 border-2 border-black`
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
      const scoreDiv2 = document.createElement('div');
      scoreDiv1.textContent = `Player 1: ${score1}`;
      scoreDiv2.textContent = `Computer Player: ${score2}`
      scoreDiv.appendChild(scoreDiv1);
      scoreDiv.appendChild(scoreDiv2);
      document.body.appendChild(scoreDiv);
    }
    
    function getPlayerChoice() {

    }
  
  return {
    generateHeader,
    generateBoardArea,
    generateBoards,
    displayPlayerShips,
    generateScoreBoard,
  }
}
const gameBoardOne = gameBoard()
gameBoardOne.pushCoordinatesDirectly(['a1', 'a2', 'a3', 'c1', 'd1', 'e1', 'f1', 'h4', 'i4', 'j4'])

page().generateHeader()
page().generateScoreBoard()
page().generateBoardArea(gameBoardOne.getMap().hits.length);
page().generateBoards();
page().displayPlayerShips(gameBoardOne.getMap().occupied)

/*module.exports = {
  gameBoard,
  shipTwo,
  player,
  game,
  computerPlayer,
  page,
}*/
