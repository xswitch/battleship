/* eslint-disable no-undef */
import Player from "./player";
import Ship from "./ship";

describe("Player Class", () => {
  it("should contain its own gameboard", () => {
    const player = new Player();
    player.gameBoard.placeShip([1, 1], new Ship(3), "x");
    expect(player.gameBoard).toBeDefined();
  });

  test("should return true if AI", () => {
    const player = new Player(true);
    expect(player.ai).toBe(true);
  });

  it("should produce random coordinates", () => {
    const player = new Player(true);
    const randomCoords = player.randomCoordinates();
    console.log(randomCoords);
    expect(randomCoords.length).toBe(2);
    expect(randomCoords[0]).toBeLessThan(10);
    expect(randomCoords[1]).toBeLessThan(10);
  });
});
