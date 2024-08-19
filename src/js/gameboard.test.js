/* eslint-disable no-undef */
import GameBoard from "./gameboard";
import Ship from "./ship";

describe("Gameboard class", () => {
  const gameBoard = new GameBoard();
  gameBoard.placeShip([0, 0], new Ship(3), "x");
  gameBoard.placeShip([0, 1], new Ship(3), "y");

  it("should create a gameboard of size 10x10", () => {
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
  });

  it("should place Ships at coords", () => {
    gameBoard.placeShip([2, 1], new Ship(2));
    expect(gameBoard.board[2][1]).not.toBe(undefined);
  });

  it("should not place ships on used locations", () => {
    expect(gameBoard.placeShip([0, 0], new Ship(2))).toBe(false);
  });

  it("should place the full length of the ship", () => {
    expect(gameBoard.checkCoordinates([2, 0])).toBe(false);
  });

  it("should allow for choosing placement direction", () => {
    console.log(gameBoard.board);
    expect(gameBoard.checkCoordinates([0, 3])).toBe(false);
  });
});
