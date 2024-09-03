import UI from "./js/DOM/domLogic";
import Player from "./js/player";
import Ship from "./js/ship";
import "./style.css";

const driver = (() => {
  const players = [new Player(), new Player(true)];
  const ui = new UI(players);
  players[0].gameBoard.placeShip([2, 2], new Ship(5), "y");
  players[1].gameBoard.placeShip([3, 1], new Ship(5), "y");

  ui.createBoards();
  ui.createControls();

  ui.updateBoards();
  ui.showShips(1);
  ui.showShips(0);
})();
