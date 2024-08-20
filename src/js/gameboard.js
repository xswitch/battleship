class GameBoard {
  constructor() {
    this.ships = [];
    this.hits = [];
    this.misses = [];
  }

  checkForShip(coordinates) {
    let shipInLocation = false;
    this.ships.forEach((ship) => {
      if (ship.x === coordinates[0] && ship.y === coordinates[1])
        shipInLocation = ship;
    });
    return shipInLocation;
  }

  isAlreadyUsed(coordinates) {
    const matchingHits = this.hits.filter(
      (hitsCords) =>
        hitsCords[0] === coordinates[0] && hitsCords[1] === coordinates[1],
    );
    const matchingMiss = this.misses.filter(
      (missCords) =>
        missCords[0] === coordinates[0] && missCords[1] === coordinates[1],
    );
    if (matchingHits.length > 0 || matchingMiss.length > 0) return true;
    return false;
  }

  placeShip(coords, ship, direction = "x") {
    if (this.checkForShip(coords) !== false) return false;
    this.ships.push({ x: coords[0], y: coords[1], ship, direction });
    return true;
  }

  receiveAttack(coordinates) {
    if (this.isAlreadyUsed(coordinates)) return false;
    const { ship } = this.checkForShip(coordinates);
    if (ship === undefined) {
      this.misses.push(coordinates);
    } else {
      ship.hit();
      this.hits.push(coordinates);
    }
  }

  allSunk() {
    if (this.ships.filter((shipEntry) => !shipEntry.ship.sunk).length === 0)
      return true;
    return false;
  }

  getMisses() {}
}

export default GameBoard;
