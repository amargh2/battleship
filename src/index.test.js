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

// tests for reworked gameboard, to replace current (coordinates instead of indices)
describe('tests of ship function 2', () => {
  test('it stores its own coordinates in an object', () => {
    expect(index.ship().setCoordinates(['j5', 'j6', 'j7'])).toEqual(['j5', 'j6', 'j7'])
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
