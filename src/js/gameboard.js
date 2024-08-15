class GameBoard {
  constructor() {
    this.placedCoords = [];
  }

  placeShip(coords) {
    if (this.placedCoords.includes(coords)) return false;
    this.placedCoords.push(coords);
    return true;
  }
}

export default GameBoard;
