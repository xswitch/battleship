/* eslint-disable no-undef */
import GameBoard from "./gameboard";

describe("Gameboard class", () => {
  it("should place Ships at coords", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip([1, 1]);
    expect(gameBoard.placedCoords.length).toBe(1);
  });
});
