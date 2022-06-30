const index = require('./index')
//ship tests
test('ship object takes and returns length', () => 
  expect(index.ship(3).length).toBe(3))

test('reports sunk status as false initially', () => 
  expect(index.ship().sunk).toBe(false))

test('ship has a test counter variable', () => 
  expect(index.ship().hits).toBe(0))

test('returns map object', () => 
  expect(index.ship().map).toEqual({}))

test ('returns a map object based on length', () =>
  expect(index.ship(3).map).toEqual({
    1: 'not hit',
    2: 'not hit',
    3: 'not hit',
  }))


const newShip = index.ship(3);
newShip.hit(2)
test('hit ticks corresponding object', () =>
    expect(newShip.map[2]).toEqual('hit'))
test('hit increases hit count', () => {
  expect(newShip.hits).toBe(1);
})

const nextShip = index.ship(3);
nextShip.hit(1);
nextShip.hit(2);
nextShip.hit(3);
nextShip.isSunk()
test('ship reports itself sunk when all parts are hit', () => 
  expect(nextShip.sunk).toBe(true))

anotherShip = index.ship(4);
anotherShip.hit(2);
anotherShip.hit(1);
anotherShip.hit(1)
anotherShip.isSunk();

test('show proper number of hits when same spot is hit more than once', () => {
  expect(anotherShip.hits).toBe(2)
})

test('ship does not report as sunk when not sunk', () =>
  expect(anotherShip.sunk).toBeFalsy())



//gameboard tests

test('gameboard determines next numbers going down (easiest case)', () => 
  expect(index.gameBoard().getCoordinates('a', 3, 3, 'down')).toEqual(['a3', 'a4', 'a5']))

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

  test('combines coordinates', () => 
    expect(index.gameBoard().combineCoordinates(numberCoordinates, letterCoordinates)).toEqual([
      'a1', 'b1', 'c1'
    ]))
  
  test('combines coordinates second case', () => 
    expect(index.gameBoard().combineCoordinates(numberCoordinates2, letterCoordinates2))
    .toEqual(['j5', 'j6', 'j7', 'j8', 'j9']))

    test('combines coordinates second case', () => 
    expect(index.gameBoard().combineCoordinates(numberCoordinates3, letterCoordinates3))
    .toEqual(['j5', 'j4', 'j3', 'j2', 'j1']))
    