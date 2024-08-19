class GameBoard {
  constructor() {
    this.placedCoords = [];
  }

  placeShip(coords, ship) {
    if (
      this.placedCoords.filter(
        (current) => current.x === coords[0] && current.y === coords[1],
      ).length !== 0
    ) {
      return false;
    }
    this.placedCoords.push({ ship, x: coords[0], y: coords[1] });
    return true;
  }
}

export default GameBoard;
