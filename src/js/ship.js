class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    if (this.sunk === false) this.timesHit += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.timesHit >= this.length) this.sunk = true;
  }
}

export default Ship;
