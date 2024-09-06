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

  createShipMeasurements(coords, length, direction) {
    const max = { xMax: coords[0], yMax: coords[1] };
    max[`${direction}Max`] += length - 1;
    const newShip = {
      x: coords[0],
      y: coords[1],
      xMax: max.xMax,
      yMax: max.yMax,
      direction,
    };
    return newShip;
  }

  outOfBounds(x, y) {
    if (x >= this.size || y >= this.size) return true;
    return false;
  }

  placeShip(coords, ship, direction = "x") {
    const newShip = this.createShipMeasurements(coords, ship.length, direction);
    const newShipArray = this.createCoordinatesFromDifference(newShip); // Use coords to light up cells
    newShip.ship = ship;
    if (
      newShipArray.some((entry) => this.checkForShip(entry)) === true ||
      this.outOfBounds(newShip.xMax, newShip.yMax)
    )
      return false;
    this.ships.push(newShip);
    return true;
  }

  createCoordinatesFromDifference(ship) {
    const array = [];
    const direction = ship.x !== ship.xMax ? "x" : "y";
    for (let i = ship[direction]; i <= ship[`${direction}Max`]; i += 1) {
      if (direction === "x") array.push([i, ship.y]);
      if (direction === "y") array.push([ship.x, i]);
    }
    return array;
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
