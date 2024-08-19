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

  placeShip(coords, ship) {
    for (let i = 0; i < ship.length; i += 1) {
      if (!this.checkCoordinates(coords)) return false;
    }
    for (let i = 0; i < ship.length; i += 1) {
      this.board[coords[0] + i][coords[1]] = {
        ship,
        x: coords[0],
        y: coords[1],
      }; // If not, push
    }
    return true;
  }
}

export default GameBoard;
