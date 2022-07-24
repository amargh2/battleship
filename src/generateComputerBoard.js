// this module creates the gameboards and the ships for the computer player and player one
// and exports all these things as completed data sets

import ship from './ship.js'
import gameBoard from './gameBoard.js'

function generateComputerGameBoard() {
  const computerPlayerGameBoard = gameBoard()
  const computerPlayerShip1 = ship(5, computerPlayerGameBoard.getCheckedCoordinates(5))
  //const computerPlayerShip2 = ship(4, computerPlayerGameBoard.getCheckedCoordinates(4))
  //const computerPlayerShip3 = ship(4, computerPlayerGameBoard.getCheckedCoordinates(4))
  //const computerPlayerShip4 = ship(3, computerPlayerGameBoard.getCheckedCoordinates(3))
  //const computerPlayerShip5 = ship(2, computerPlayerGameBoard.getCheckedCoordinates(2))
  //const computerPlayerShip6 = ship(2, computerPlayerGameBoard.getCheckedCoordinates(2))
  computerPlayerGameBoard.associateShip(computerPlayerShip1)
  //computerPlayerGameBoard.associateShip(computerPlayerShip2)
  //computerPlayerGameBoard.associateShip(computerPlayerShip3)
  //computerPlayerGameBoard.associateShip(computerPlayerShip4)
  //computerPlayerGameBoard.associateShip(computerPlayerShip5)
  //computerPlayerGameBoard.associateShip(computerPlayerShip6)
  return computerPlayerGameBoard
}

const computerPlayerGameBoard = generateComputerGameBoard()
console.log(computerPlayerGameBoard.getMap())

export default generateComputerGameBoard