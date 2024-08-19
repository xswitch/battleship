class GameBoard {
  constructor() {
    this.board = [...Array(10)];
    this.board.forEach((entry, index) => {
      this.board[index] = [...Array(10)];
    });
  }

  checkCoordinates(coordinates) {
    if (this.board[coordinates[0]][coordinates[1]] !== undefined) return false; // If ship at coordinates, return false
    return true;
  }

  placeShip(coords, ship, direction = "x") {
    for (let i = 0; i < ship.length; i += 1) {
      if (!this.checkCoordinates(coords)) return false;
    }
    for (let i = 0; i < ship.length; i += 1) {
      if (direction === "x") {
        this.board[coords[0] + i][coords[1]] = ship;
      } else {
        this.board[coords[0]][coords[1] + i] = ship;
      }
    }
    return true;
  }

  receiveAttack(coordinates) {
    if (!this.checkCoordinates(coordinates)) {
      this.board[coordinates[0]][coordinates[1]].hit();
    }
  }
}

export default GameBoard;
