
function ship(length) {
  const map = {};
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
  

  return {
    map,
    length,
    sunk: false,
    hits: 0,
    hit,
    isSunk,
    coordinates:[],
  }
}


function gameBoard() {
  const numberArray = [1,2,3,4,5,6,7,8,9,10]
  const letterArray = ['a','b','c','d','e','f','g','h','i','j']
  
  function letterMatch(letter) {
    return letterArray.indexOf(letter)  
  }

  function checkLetter(letter, length, direction) {
    const letterIndex = letterMatch(letter);
    if ((letterIndex + length) > 9 && direction === 'right') {
      return false 
    } if ((letterIndex - length) < 0 && direction ==='left') {
      return false
    }
    return true
  }

  function checkNumber(number, length, direction) {
    if ((number + length > 10) && direction === 'down') {
      return false
    } if ((number - length < 0) && direction === 'up') {
      return false
    }
    return true
  }

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
  
  function combineCoordinates(numberCoordinates, letterCoordinates) {
    const combined = []
    for (let i = 0; i < numberCoordinates.length; i += 1) {
      combined.push(letterCoordinates[i] + numberCoordinates[i])
    }
    return combined
  }

  function getCoordinates(letter, length, number, direction) {
    if (direction === 'down' || direction === 'up') {
      const letterCoord = letter;
    }

    const coordArray = []
    
    const index = number - 1;
    for (let i = 0; i < length; i+=1) {
      coordArray.push(letter + numberArray[index+i])
    }

    return coordArray

  }

  return {
    getCoordinates,
    letterMatch,
    getLetters,
    checkLetter,
    checkNumber,
    getNumbers,
    combineCoordinates
  }
}

module.exports = {
  ship,
  gameBoard
}