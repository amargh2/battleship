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

export default {player}