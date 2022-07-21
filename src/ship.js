function ship(length, coordinates) {
  
  if (coordinates === false) {
    return false
  }
  
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

  function getName() {
    return this.name
  }

  return {
    getName,
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

export default ship