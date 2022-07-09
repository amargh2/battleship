const index = require('./index')
//gameboard tests

//get letters tests -- these can be deleted haha
test('gameboard determines that the letter is the same bc of direction', () =>
  expect(index.gameBoard().getLetters('b', 3, 'down')).toEqual(['b','b','b']))

test('gameboard determines that the letter is the same bc of direction', () =>
  expect(index.gameBoard().getLetters('c', 3, 'down')).toEqual(['c','c','c']))

test('gameboard determines next letter going right (easiest case)', () =>
  expect(index.gameBoard().getLetters('a', 3, 'right')).toEqual(['a', 'b', 'c']))

test('gameboard determines next letter going right(easiest case) 2', () =>
  expect(index.gameBoard().getLetters('d', 5, 'right')).toEqual(['d', 'e', 'f', 'g', 'h']))

test('gameboard determines letters going left', () => 
  expect(index.gameBoard().getLetters('d', 4, 'left')).toEqual(['d','c','b','a']))

test('gameboard determines letters going left (2)', () => 
  expect(index.gameBoard().getLetters('j', 4, 'left')).toEqual(['j','i','h','g']))

test('gameboard determines letters going up (same 3 letters)', () => 
  expect(index.gameBoard().getLetters('j', 4, 'up')).toEqual(['j', 'j', 'j', 'j']))

//get number test

test('gameboard returns array of numbers based on length and direction (down)', () =>
  expect(index.gameBoard().getNumbers(3, 4, 'down')).toEqual([
    3,
    4,
    5,
    6
  ]))

test ('gameboard returns array of numbers based on length and direction (right)', () =>
  expect(index.gameBoard().getNumbers(10, 4, 'right')).toEqual([
    10, 10, 10, 10
  ]))

test('gameboard returns array of numbers based on length and direction (up)', () =>
  expect(index.gameBoard().getNumbers(10, 5, 'up')).toEqual([
    10, 9, 8, 7, 6
  ]))

//lettermatch tests
test('letter match function returns index of the letter array', () =>
  expect(index.gameBoard().letterMatch('a')).toEqual(0))

test('letter match function returns index of the letter array', () =>
  expect(index.gameBoard().letterMatch('g')).toEqual(6))


//check letter tests
  test('it checks to make sure the letter and length fit the board', () =>
  expect(index.gameBoard().checkLetter('j', 4, 'right')).toEqual(false))

  test('it checks to make sure the letter and length fit the board', () =>
  expect(index.gameBoard().checkLetter('e', 7, 'right')).toEqual(false))
  
  test('it calculates that a ship will fit', () =>
    expect(index.gameBoard().checkLetter('d', 4, 'right')).toEqual(true))
  
  
  test('it calculates letters if fit in the left direction', () => 
    expect(index.gameBoard().checkLetter('f', 4, 'left')).toEqual(true))

  test('it calculates letters if fit in the left direction', () => 
    expect(index.gameBoard().checkLetter('a',1,'left')).toEqual(false))

//check number tests
  test('calculates number validity going down (true case)', () => 
    expect(index.gameBoard().checkNumber(1, 4, 'down')).toEqual(true))
  
  test('calculates number validity going down (false case)', () => {
    expect(index.gameBoard().checkNumber(7, 4, 'down')).toEqual(false)
  })

  test('calculates number validity going up (false case)', () => 
    expect(index.gameBoard().checkNumber(2, 3, 'up')).toEqual(false))
  
  test('calculates number validity going up (true case)', () =>
    expect(index.gameBoard().checkNumber(3, 3, 'up')).toEqual(true));

//combineCoordinates test
  
  const numberCoordinates = index.gameBoard().getNumbers(1, 3, 'right')
  const letterCoordinates = index.gameBoard().getLetters('a', 3, 'right')
  
  const numberCoordinates2 = index.gameBoard().getNumbers(5, 5, 'down')
  const letterCoordinates2 = index.gameBoard().getLetters('j', 5, 'down')

  const numberCoordinates3 = index.gameBoard().getNumbers(5, 5, 'up')
  const letterCoordinates3 = index.gameBoard().getLetters('j', 5, 'up')

  const numberCoordinates4 = index.gameBoard().getNumbers(5, 5, 'left')
  const letterCoordinates4 = index.gameBoard().getLetters('j', 5, 'left')


  describe('rewrite of the combined test function to test array manipulation', () => {
  
    test('combines coordinates', () => 
    expect(index.gameBoard().combineCoordinates(numberCoordinates, letterCoordinates)).toEqual([
      'a1', 'b1', 'c1'
    ]))
  
    test('combines coordinates second case', () => 
      expect(index.gameBoard().combineCoordinates(numberCoordinates2, letterCoordinates2))
      .toEqual(['j5', 'j6', 'j7', 'j8', 'j9']))

      test('combines coordinates third case', () => 
        expect(index.gameBoard().combineCoordinates(numberCoordinates3, letterCoordinates3))
        .toEqual(['j5', 'j4', 'j3', 'j2', 'j1']))
  
    test('combines coordinates fourth case', () =>
      expect(index.gameBoard().combineCoordinates(numberCoordinates4, letterCoordinates4))
      .toEqual(['j5', 'i5', 'h5', 'g5', 'f5']))
  
  })

  
// receive attack tests
describe('test of occupied spot functionality and hit functionality', () =>  {
  beforeEach(() => {
    board = index.gameBoard()
    board.combineCoordinates(numberCoordinates2, letterCoordinates2)
    board.receiveHit('j9')
  })

  test('simple check', () =>
    expect(board.getMap().occupied).toEqual(['j5', 'j6', 'j7', 'j8', 'j9']))


  test('it takes a coord and adds it to the hits if it is a hit', () => {
    expect(board.getMap().hits).toEqual(['j9'])
  })

  test('report hit function returns the hits array', () => {
    expect(board.getHits()).toEqual(['j9'])
  })
})



// test of a scanning and ship association scheme

const testBoat = index.shipTwo(4, ['a2','a3','a4','a5'])
const testBoard = index.gameBoard()
testBoard.associateShip(testBoat)
const testBoat2 = index.shipTwo(3, ['a2', 'a3', 'a4'])
testBoat2.hit('a2')
testBoat2.hit('a3')
testBoat2.hit('a4')
describe('test of gameboard and ship cohesiveness', () => {
  test('the board stores the ships', () => {
    expect(testBoard.getMap().shipsOnBoard.at(0).map).toEqual(
      {
          'a2':'a2',
          'a3':'a3',
          'a4':'a4',
          'a5':'a5',
        })
  })
  test('the coordinate hit function manipulates the map', () => {
    expect(testBoat.hit('a2')).toEqual(1)
  })
  test('the hit function works for multiple hits', () => {
    expect(testBoat2.map).toEqual({
      'a2':'hit',
      'a3':'hit',
      'a4':'hit', 
    })
  })
  test('the is sunk function works with coords', () => {
    expect(testBoat2.isSunk()).toBeTruthy()
  })
  test('checking the hits counter', () => {
    expect(testBoat2.hits).toEqual(3)
  })
  test('checking if hits equals length', () => {
    expect(testBoat2.hits).toEqual(testBoat2.length)
  })
  
  test('the map shows test boat 2 is hit', () => {
    expect(testBoat2.getMap()).toEqual({
      'a2':'hit',
      'a3':'hit',
      'a4':'hit',
    })
  })

})


// tests of the player functions

const testPlayer = index.player();
testPlayer.setName('Anthony')

describe('tests of player functions', () => {  
  
  test('attack functions returns a value', () => {
    expect(testPlayer.attack('a10')).toEqual('a10')
  })
  
  test('name is stored correctly', () => {
    expect(testPlayer.getName()).toEqual('Anthony')
  })
  
})

/* 
const destroyer = index.shipTwo(2, ['a1', 'a2'])

const cruiser = index.shipTwo(3, ['b2', 'b3', 'b4', 'b5'])
// test ship getname function 
describe('testing the length to name function', () => {
  test('2 resolves to destroyer', () => {
    expect(destroyer.getName()).toEqual('Destroyer');
  })
  test('3 resolves to Submarine', () => {
    expect(cruiser.getName()).toEqual('Submarine');
  })
})
*/

// game loop stuff / testing whether the functions can talk to each other
glPlayer = index.player()
glBoard = index.gameBoard()
glBoard.pushCoordinatesDirectly(['c3', 'c4', 'c5', 'c6', 'f3', 'g3', 'h3', 'i3', 'a1','a2'])
const att1 = glPlayer.attack('g3')
const att2 = glPlayer.attack('h3')
const att3 = glPlayer.attack('c8')
glBoard.receiveHit(att1);
glBoard.receiveHit(att2);
glBoard.receiveHit(att3);
const ship1 = index.shipTwo(4, ['c3', 'c4', 'c5', 'c6'])
const ship2 = index.shipTwo(4, ['f3', 'g3', 'h3', 'i3'])
const ship3 = index.shipTwo(2, ['a1', 'a2'])
glBoard.associateShip(ship1);
glBoard.associateShip(ship2);
glBoard.associateShip(ship3);
glBoard.passHitToShip('g3');
glBoard.passHitToShip('h3');
glBoard.passHitToShip('c8')

describe('testing the game loop is working', () => {
  beforeEach(() => {
    glPlayer = index.player()
    glBoard = index.gameBoard()
    glBoard.pushCoordinatesDirectly(['c3', 'c4', 'c5', 'c6', 'f3', 'g3', 'h3', 'i3', 'a1','a2'])
    const att1 = glPlayer.attack('g3')
    const att2 = glPlayer.attack('h3')
    const att3 = glPlayer.attack('c8')
    glBoard.receiveHit(att1);
    glBoard.receiveHit(att2);
    glBoard.receiveHit(att3);
    const ship1 = index.shipTwo(4, ['c3', 'c4', 'c5', 'c6'])
    const ship2 = index.shipTwo(4, ['f3', 'g3', 'h3', 'i3'])
    const ship3 = index.shipTwo(2, ['a1', 'a2'])
    glBoard.associateShip(ship1);
    glBoard.associateShip(ship2);
    glBoard.associateShip(ship3);
    glBoard.passHitToShip('g3');
    glBoard.passHitToShip('h3');
    glBoard.passHitToShip('c8')
  })

  test('it adds 10 destroyers to the game board', () => {
    expect(glBoard.getMap().occupied.length).toEqual(10)
  })
  test('player attack that is a hit hits', () => {
    expect(glBoard.getMap().hits).toEqual(['g3', 'h3'])
  })
  test('player attack that is a miss ticks the miss', () => {
    expect(glBoard.getMap().misses).toEqual(['c8'])
  })
  test('ships associate to the gameboard properly', () => {
    expect(glBoard.getMap().shipsOnBoard.length).toEqual(3)
  })
  test('hit passes to the appropriate ship', () => {
    expect(glBoard.getMap().shipsOnBoard.at(1).map).toEqual({
      'f3':'f3',
      'g3':'hit',
      'h3':'hit',
      'i3':'i3',
    })
  })
  test('the pass function returns false on miss', () => {
    expect(glBoard.passHitToShip('c8')).toBeFalsy()  
  })
})

const anotherPlayer = index.player()
    const anotherBoard = index.gameBoard()
    anotherBoard.pushCoordinatesDirectly(['c3', 'c4', 'c5', 'c6', 'f3', 'g3', 'h3', 'i3', 'a1','a2'])
    const anotherShip1 = index.shipTwo(4, ['c3', 'c4', 'c5', 'c6'])
    const anotherShip2 = index.shipTwo(4, ['f3', 'g3', 'h3', 'i3'])
    const anotherShip3 = index.shipTwo(2, ['a1', 'a2'])
    anotherBoard.associateShip(anotherShip3)
    anotherBoard.passHitToShip('a1');
    anotherBoard.passHitToShip('a2');
    anotherBoard.associateShip(anotherShip2)

describe('tests the sunken ship scanning feature on the game board', () =>{
  
  test('a sunken ship pushes to the sunk array', () => {
    expect(anotherBoard.reportSunkenShips().length).toEqual(1)
  })
  test('is sunk returns false when false from the board map', () => {
    expect(anotherBoard.getMap().shipsOnBoard.at(1).isSunk()).toBeFalsy()
  })
})

const computerPlayerTest = index.computerPlayer()
computerPlayerTest.randomAttack()
computerPlayerTest.randomAttack()
computerPlayerTest.randomAttack()
computerPlayerTest.randomAttack()
computerPlayerTest.randomAttack()

const computerPlayerTest2 = index.computerPlayer()
for (i=0; i < 100; i += 1) {
  computerPlayerTest2.randomAttack()
}

describe('tests the computer player function', () => {
  test('random attack returns a value', () => {
    expect(index.computerPlayer().randomAttack()).toEqual('a3')
  })
  test('randomattack ticks the attempted attack array', () => {
    expect(computerPlayerTest.attemptedAttacks.length).toEqual(5)
  })
  test('random attack returns 100 unique values', () => {
    expect(computerPlayerTest2.attemptedAttacks.length).toEqual(100)
  })
  test('random attack returns 100 unique values', () => {
    expect(computerPlayerTest2.attemptedAttacks).toEqual(100)
  })
})

describe('test of win conditions', () => {
  test('when all occupied spaces are hit, the board toggles to lost', () => {
    expect()
  })
})