const index = require('./index')

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
anotherShip.isSunk();
test('ship shows the proper number of hits', () => {
  expect(anotherShip.hits).toBe(2)
})
test('ship does not report as sunk when not sunk', () =>
  expect(anotherShip.sunk).toBeFalsy())