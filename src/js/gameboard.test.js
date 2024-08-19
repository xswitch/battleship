/* eslint-disable no-undef */
import GameBoard from "./gameboard";
import Ship from "./ship";

describe("Gameboard class", () => {
  it("should create a gameboard of size 10x10", () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
  });

  it("should place Ships at coords", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip([1, 1], new Ship(2));
    expect(gameBoard.board[1][1]).not.toBe(undefined);
  });

  it("should not place ships on used locations", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip([1, 1], new Ship(2));
    gameBoard.placeShip([1, 1]);
    console.log(gameBoard.placedCoords);
    expect(gameBoard.placeShip([1, 1])).toBe(false);
  });
});
