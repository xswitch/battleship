class GameBoard {
  constructor() {
    this.ships = [];
    this.hits = [];
    this.misses = [];
    this.size = 10;
  }

  checkForShip(coordinates) {
    let shipInLocation = false;
    this.ships.forEach((ship) => {
      if (
        coordinates[0] >= ship.x &&
        coordinates[1] >= ship.y &&
        coordinates[0] <= ship.xMax &&
        coordinates[1] <= ship.yMax
      )
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
    const max = { xMax: coords[0], yMax: coords[1] };
    max[`${direction}Max`] += ship.length - 1;
    if (max.xMax > this.size || max.yMax > this.size) return false;
    this.ships.push({
      x: coords[0],
      y: coords[1],
      xMax: max.xMax,
      yMax: max.yMax,
      ship,
      direction,
    });
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
    return true;
  }

  allSunk() {
    if (this.ships.filter((shipEntry) => !shipEntry.ship.sunk).length === 0)
      return true;
    return false;
  }
}

export default GameBoard;
