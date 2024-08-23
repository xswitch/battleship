import UI from "./js/DOM/domLogic";
import Player from "./js/player";
import Ship from "./js/ship";
import "./style.css";

const driver = (() => {
  const players = [new Player(), new Player()];
  const ui = new UI(players);
  players.forEach((player) => {
    player.gameBoard.placeShip([0, 1], new Ship(2));
    player.gameBoard.placeShip([5, 3], new Ship(2));
    player.gameBoard.placeShip([5, 1], new Ship(2), "y");
  });

  ui.createBoards();

  players[0].gameBoard.receiveAttack([0, 1]);
  players[1].gameBoard.receiveAttack([1, 1]);
  players[0].gameBoard.receiveAttack([1, 1]);
  players[1].gameBoard.receiveAttack([5, 1]);
  players[0].gameBoard.receiveAttack([5, 1]);
  players[1].gameBoard.receiveAttack([5, 2]);
  players[1].gameBoard.receiveAttack([5, 6]);

  ui.updateBoards();
  ui.displayShips(players[0]);
})();
