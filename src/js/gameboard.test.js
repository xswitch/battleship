/* eslint-disable no-undef */
import GameBoard from "./gameboard";
import Ship from "./ship";

describe("Gameboard class", () => {
  const gameBoard = new GameBoard();
  gameBoard.placeShip([0, 0], new Ship(3), "x");
  gameBoard.placeShip([0, 1], new Ship(3), "y");

  it("should place Ships at coords", () => {
    gameBoard.placeShip([2, 1], new Ship(2));
    expect(gameBoard.ships[2].x).toBe(2);
  });

  it("should not place ships on used locations", () => {
    expect(gameBoard.placeShip([0, 0], new Ship(2))).toBe(false);
  });

  it("should send hit to ship if in position", () => {
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.ships[0].ship.timesHit).toBe(1);
  });

  it("should record misses", () => {
    gameBoard.receiveAttack([5, 5]);
    expect(gameBoard.misses.length).toBe(1);
  });

  it("should record hits", () => {
    expect(gameBoard.hits.length).toBe(1);
  });

  it("should check if all ships are sunken", () => {
    const gameBoard2 = new GameBoard();
    gameBoard2.placeShip([0, 0], new Ship(1), "x");
    gameBoard2.receiveAttack([0, 0]);
    expect(gameBoard2.allSunk()).toBe(true);
  });
});
