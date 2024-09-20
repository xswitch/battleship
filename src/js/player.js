import GameBoard from "./gameboard";

class Player {
  #direction = undefined;

  constructor(ships, ai = false) {
    this.gameBoard = new GameBoard();
    this.ai = ai;
    this.ships = ships;
    this.direction = "x";
  }

  get direction() {
    if (this.ai === true) {
      const directions = ["x", "y"];
      return directions[Math.floor(Math.random() * directions.length)];
    }
    return this.#direction;
  }

  set direction(direction) {
    this.#direction = direction;
  }

  changeRotation() {
    this.direction = this.direction === "x" ? "y" : "x";
  }

  useShip() {
    this.ships[0].amount -= 1;
    this.checkShip();
  }

  checkShip() {
    if (this.ships.length === 0) return false;
    if (this.ships[0].amount <= 0) {
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

  getRandomNearby() {
    const nearbyArray = this.gameBoard.findNewFromLast();
    const randomChoice = Math.floor(Math.random() * nearbyArray.length);
    if (nearbyArray.length !== 0) {
      return nearbyArray[randomChoice];
    }
    return this.getValidCoordinates();
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
