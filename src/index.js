
function ship(length) {
  const map = {};
  for (let i = 1; i <= length; i+= 1) {
   map[i] = 'not hit';
  }
  
  function hit(number) {
    map[number] = 'hit'
    this.hits += 1
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
  }
}

function gameBoard() {

}

module.exports = {
  ship,
  gameBoard
}