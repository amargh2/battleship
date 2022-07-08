
function ship(length) {
  const map = {
    
  }


  for (let i = 1; i <= length; i+= 1) {
   map[i] = 'not hit';
  }
  
  function hit(number) {
    if (map[number] === 'hit') {
      return false
    }
    map[number] = 'hit'
    this.hits += 1
    return this.hits
  }

  function isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
  }
  
  function setCoordinates(coords) {
    coords.forEach(coord => coordinates.push(coord))
    return coordinates
  }

  return {
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

function shipTwo(length, coordinates) {
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

  return {
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
    shipsOnBoard: [],
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


  // receives coordinates and pushes to the proper array
  function receiveHit(coordinate) {
    if (map.occupied.includes(coordinate) === true) {
      map.hits.push(coordinate)
      return map.hits
    } if (map.occupied.includes(coordinate) === false) {
      map.misses.push(coordinate)
      return map.misses
    }
   }

  function getMap() {
    return map
  }

  function associateShip(boat) {
    map.shipsOnBoard.push(boat)
    return map.shipsOnBoard
  }

  function getHits() {
    return map.hits
  }

  return {
    getHits,
    getMap,
    receiveHit,
    letterMatch,
    getLetters,
    checkLetter,
    checkNumber,
    getNumbers,
    combineCoordinates,
    associateShip
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

function game() = {
  // instantiation of player and gameboard objects
  const playerOne = player();
  const playerTwo = player();
  const gameBoardOne = gameBoard();
  const gameBoardTwo = gameBoard();
  // get ship locations
  playerOneShips = [];
  playerTwoShips = [];
  playerOneShips.push()

  return {

  }
}

module.exports = {
  ship,
  gameBoard,
  shipTwo,
  player,
}



