/* eslint-disable no-undef */
import GameBoard from "./gameboard";
import Ship from "./ship";

describe("Gameboard class", () => {
  it("should place Ships at coords", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip([1, 1], new Ship(2));
    expect(gameBoard.placedCoords.length).toBe(1);
  });

  it("should not place ships on used locations", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip([1, 1], new Ship(2));
    gameBoard.placeShip([1, 1]);
    console.log(gameBoard.placedCoords);
    expect(gameBoard.placeShip([1, 1])).toBe(false);
  });
});
