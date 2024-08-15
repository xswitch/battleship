class GameBoard {
  constructor() {
    this.placedCoords = [];
  }

  placeShip(coords) {
    if (
      this.placedCoords.filter(
        (current) => current[0] === coords[0] && current[1] === coords[1],
      ).length !== 0
    ) {
      return false;
    }
    this.placedCoords.push(coords);
    return true;
  }
}

export default GameBoard;
