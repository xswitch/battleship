class GameBoard {
  constructor() {
    this.board = [...Array(10)];
    this.board.forEach((entry, index) => {
      this.board[index] = [...Array(10)];
    });
  }

  placeShip(coords, ship) {
    if (this.board[coords[0]][coords[1]] !== undefined) return false;
    this.board[coords[0]][coords[1]] = { ship, x: coords[0], y: coords[1] };
    return true;
  }
}

export default GameBoard;
