/* eslint-disable no-undef */
import Player from "./player";
import Ship from "./ship";

describe("Player Class", () => {
  it("should contain its own gameboard", () => {
    const player = new Player();
    player.gameBoard.placeShip([1, 1], new Ship(3), "x");
    expect(player.gameBoard).toBeDefined();
  });
});
