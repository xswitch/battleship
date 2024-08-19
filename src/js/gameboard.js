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
    if (!this.checkCoordinates(coords)) return false; // If ship at coordinates, return false
    this.board[coords[0]][coords[1]] = { ship, x: coords[0], y: coords[1] }; // If not, push
    return true;
  }
}

export default GameBoard;
