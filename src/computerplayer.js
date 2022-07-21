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

export default computerPlayer