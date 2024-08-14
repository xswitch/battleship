/* eslint-disable no-undef */
import Ship from "./ship";

describe("Ship tests", () => {
  it("should start with length < 5", () => {
    const newShip = new Ship(5);
    expect(newShip.length).toBe(5);
  });

  it("should increase hits on hit", () => {
    const newShip = new Ship(4);
    newShip.hit();
    expect(newShip.timesHit).toBe(1);
    newShip.hit();
    expect(newShip.timesHit).toBe(2);
  });

  it("should check if a ship is sunk", () => {
    const newShip = new Ship(2);
    newShip.hit();
    newShip.hit();
    newShip.isSunk();
    expect(newShip.sunk).toBe(true);
  });
});
