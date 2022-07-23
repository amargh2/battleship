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
    allSunk:false,
    sizesToPlace: ['5','4','4','3','2','2']
  }

  function filterCoordinatesFromOccupiedArray(coordinates) {
    const filtered = map.occupied.filter(coord => coordinates.indexOf(coord) === -1)
    return filtered
  }

  function getArrayFromCoordinate(coordinate) {
    let array
    map.shipsOnBoard.forEach(ship => {
      const arrayFromMap = Object.keys(ship.map)
      if (arrayFromMap.indexOf(coordinate) !== -1) {
        array = arrayFromMap
      }
    })
    return array
  }

  function filterFromOccupied(coordinate) {
    let filteredArray;
    map.shipsOnBoard.forEach(ship => {
      const array = Object.keys(ship.map);
      if (array.indexOf(coordinate) !== -1) {
        filteredArray = filterCoordinatesFromOccupiedArray(array)
      }
    })
    return filteredArray;
  }

  function deleteCoordinatesFromOccupied(coordinate) {
    const arrayForDeletion = getArrayFromCoordinate(coordinate)
    console.log(arrayForDeletion)
    arrayForDeletion.forEach(coord => {
      map.occupied.splice(map.occupied.indexOf(coord), 1)
    })
  }

  function disassociateShip(coord) {
    map.shipsOnBoard.forEach(ship => {
      const array = Object.keys(ship.map);
      if(array.indexOf(coord) !== -1) {
        map.shipsOnBoard.splice(map.shipsOnBoard.indexOf(ship), 1)
      }
    })
    console.log(map.shipsOnBoard)
  }

  function shipPlacementUpdate(size) {
    map.sizesToPlace.splice(map.sizesToPlace.indexOf(size), 1);
    console.log(map.sizesToPlace)
    return map.sizesToPlace
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
      if (ship.isSunk() === true && ship.reportedSunk === false) {
        map.sunk.push(ship)
        ship.reportedSunk = true
      }
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
  
  function scanForDoubles(array, inputArray = map.occupied) {
    let truthValue = true;
    for (let i = 0; i < array.length; i += 1) {
      if (inputArray.includes(array[i])) {
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

function createNeighborCoordinates(coordinates = map.occupied) {
  const neighborCoordinates = []  
  coordinates.forEach((coord) => {
    const letter = coord[0];
    const number = coord.slice(1)
    const letterIndex = letterMatch(letter);
    const numberIndex = numberArray.indexOf(parseInt(number, 10));
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

// my reasoning for this true equals false stuff is that false = bad value/start again from the gameboards point of view
// sand is also rough and the jedi are wrong from this gameboard's point of view. evil thing. :)
function checkIfContainedWithCustomArray(coordinates, filtered = map.occupied) {
  let value = true
  const neighborCoordinates = createNeighborCoordinates(filtered)
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
    pushCoordinatesDirectly(coordinates)
    return coordinates
  }

  function getCheckedPlacementCoordinates(length, coordinate, direction) {
    
    let coordinates = getCoordinatesFromCoordinate(length, coordinate, direction);
    if (checkIfContained(coordinates) === false || scanForDoubles(coordinates) === false) {
      coordinates = false
    }
    return coordinates
  }
  
  // checks for length mismatches, then duplicates, then neighbor clashes,
  // currently returns a random valid direction. this will likely change.

  function getValidDirection(coord, length) {
    const directions = ['right', 'left', 'up', 'down'];
    const letter = coord[0];
    const number = parseInt(coord.slice(1), 10)
    const lengthNumber = parseInt(length, 10)
    if (letterMatch(letter)+1 + lengthNumber > 10) {
      directions.splice(directions.indexOf('right'), 1);
    } if (letterMatch(letter)+1 - lengthNumber < 0) {
      directions.splice(directions.indexOf('left'), 1);
    } if (number + lengthNumber > 11) {
      directions.splice(directions.indexOf('down'), 1);
    } if (number - lengthNumber < 0) {
      directions.splice(directions.indexOf('up'), 1);
    }
    directions.forEach((direction) => {
      const coordinates = getCoordinatesFromCoordinate(length, coord, direction)
      if (scanForDoubles(coordinates) === false || checkIfContained(coordinates) === false) {
        const directionIndex = directions.indexOf(direction)
        directions.splice(directionIndex, 1)
      }
    })
    const randomChoiceIndex = Math.floor(Math.random() * directions.length)
    return directions[randomChoiceIndex]
  }

  function getValidDirectionArray(coord, length, filtered) {
    const directions = ['right', 'left', 'up', 'down'];
    const letter = coord[0];
    const number = parseInt(coord.slice(1), 10)
    const lengthNumber = parseInt(length, 10)
    if (letterMatch(letter) + lengthNumber > 10) {
      directions.splice(directions.indexOf('right'), 1);
    } if (letterMatch(letter)+1 - lengthNumber < 0) {
      directions.splice(directions.indexOf('left'), 1);
    } if (number + lengthNumber > 11) {
      directions.splice(directions.indexOf('down'), 1);
    } if (number - lengthNumber < 0) {
      directions.splice(directions.indexOf('up'), 1);
    }
    directions.forEach((direction) => {
      const coordinates = getCoordinatesFromCoordinate(length, coord, direction)
      if (scanForDoubles(coordinates, filtered) === false || checkIfContainedWithCustomArray(coordinates, filtered) === false) {
        const directionIndex = directions.indexOf(direction)
        directions.splice(directionIndex, 1)
      }
    })
    return directions
  }
  
  function getCheckedCoordinatesWithCustomArray(length, coordinate, filteredArray) {
    const directions = getValidDirectionArray(coordinate, length, filteredArray)
    const direction = directions[Math.floor(Math.random() * directions.length)]
    let coordinates = getCoordinatesFromCoordinate(length, coordinate, direction);
    if (checkIfContainedWithCustomArray(coordinates, filteredArray) === false || scanForDoubles(coordinates, filteredArray) === false) {
      coordinates = false
    }
    return coordinates
  }
  
  return {
    getValidDirection,
    getArrayFromCoordinate,
    getCheckedCoordinatesWithCustomArray,
    shipPlacementUpdate,
    getCheckedPlacementCoordinates,
    splitCoordinate,
    checkIfContained,
    createNeighborCoordinates,
    getCheckedCoordinates,
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
    filterFromOccupied,
    checkIfContainedWithCustomArray,
    deleteCoordinatesFromOccupied, 
    disassociateShip
  }
}

export default gameBoard