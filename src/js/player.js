import GameBoard from "./gameboard";

class Player {
  constructor(ai = false) {
    this.gameBoard = new GameBoard();
    this.ai = ai;
    this.ships = [
      { name: "Destroyer", length: 2, amount: 2 },
      { name: "Submarine", length: 3, amount: 2 },
      { name: "Cruiser", length: 3, amount: 1 },
      { name: "Battleship", length: 4, amount: 1 },
      { name: "Carrier", length: 5, amount: 1 },
    ];
  }

  useShip() {
    this.ships[0].amount -= 1;
    this.checkShip();
  }

  checkShip() {
    if (this.ships.length === 0) return false;
    if (this.ships[0].amount === 0) {
      this.ships.shift();
    }
    return true;
  }

  getShip(name) {
    return this.ships.filter((ship) => ship.name === name)[0];
  }

  randomCoordinates() {
    const num1 = Math.floor(Math.random() * this.gameBoard.size);
    const num2 = Math.floor(Math.random() * this.gameBoard.size);
    return [num1, num2];
  }

  getValidCoordinates() {
    const randomCoords = this.randomCoordinates();
    if (this.gameBoard.isAlreadyUsed(randomCoords)) {
      return this.getValidCoordinates();
    }
    return randomCoords;
  }
}

export default Player;
