class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    if (this.timesHit <= this.length) this.timesHit += 1;
    if (this.timesHit >= this.length) this.sunk = true;
  }

  isSunk() {
    return this.sunk;
  }
}

export default Ship;
